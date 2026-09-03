fs=require('fs');

qtdimagens=120; //qtd de imagens para treinar
chunks=Array.from({length:qtdimagens},()=>new Array(8).fill(0.0)); //array de representacoes numericas das imagens

//carregamento das imagens
for(i=0;i<qtdimagens;i++){
	buffer=fs.readFileSync(`imagens/amostra${String(i).padStart(4,'0')}.jpg`);
	tamanho=parseInt(buffer.length/8); //tamanho do arquivo
	for(h=0;h<8;h++)for(x=0;x<tamanho;x++)chunks[i][h]+=buffer[(h*tamanho)+x];
}

//inicializa estruturas de dados
bias=Array.from({length:8},()=>Math.random());
finalbias=0.0;

for(x=0;x<20000;x++){ //treinamento
	erros=0;

	for(i=0;i<300;i++){ //cada geracao tem 300 individuos
		alguma=parseInt(Math.random()*qtdimagens); //escolhe uma imagem qualquer

		somatorio=finalbias;
		for(h=0;h<8;h++)somatorio+=bias[h]*chunks[alguma][h];

		degrau=somatorio>=0.0?1.0:0.0;
		target=alguma>qtdimagens/2?1.0:0.0;
		degrau=target-degrau;

		if(degrau!=0.0){
			erros++;
			for(h=0;h<8;h++)bias[h]+=0.01*degrau*chunks[alguma][h]; //ajusta os bias nos 4 casos
			finalbias+=0.01*degrau;
		}
	}

	console.log(`${20000-x} finalbias = ${finalbias.toFixed(6)}`);

	if(x%1000==0&&erros==0)break; //o finalbias foi encontrado
}

//salva os bias e finalbias
data=[bias,finalbias];
fs.writeFileSync('bias2.txt',JSON.stringify(data),'utf-8');

console.log("\nTreinamento finalizado. bias e finalbias salvos em 'bias2.txt'");

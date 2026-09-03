fs=require('fs');

qtdimagens=120; //qtd de imagens para comparar
chunks=Array.from({length:qtdimagens},()=>new Array(8).fill(0.0)); //array de representacoes numericas das imagens

//carregamento das imagens
for(i=0;i<qtdimagens;i++){
	buffer=fs.readFileSync(`imagens/amostra${String(i).padStart(4,'0')}.jpg`);
	tamanho=parseInt(buffer.length/8); //tamanho do arquivo
	for(h=0;h<8;h++)for(x=0;x<tamanho;x++)chunks[i][h]+=buffer[(h*tamanho)+x];
}

//inicializa os bias e o finalbias com valor buscado do txt
lidas=JSON.parse(fs.readFileSync('bias2.txt','utf-8'));
bias=lidas[0];
finalbias=lidas[1];

//contabilizando acertos e erros
circulocerto=0,circuloerrado=0,quadradocerto=0,quadradoerrado=0;

//testa a inteligencia artificial com 1000 predições aleatórias
for(x=0;x<1000;x++){
		alguma=Math.floor(Math.random()*qtdimagens); //escolhe uma fruta qualquer

		somatorio=finalbias;
		for(h=0;h<8;h++)somatorio+=bias[h]*chunks[alguma][h];

		if(alguma<qtdimagens/2) //se a imagem contem um circulo
			if(somatorio<0)circulocerto++;
			else circuloerrado++;
		if(alguma>qtdimagens/2) //se a imagem contem um quadrado
			if(somatorio>0)quadradocerto++;
			else quadradoerrado++;
}

console.log("\nEsperado circulo dado circulo (acertos): "+circulocerto);
console.log("Esperado circulo dado quadrado (erros): "+circuloerrado);
console.log("Esperado quadrado dado quadrado (acertos): "+quadradocerto);
console.log("Esperado quadrado dado circulo (erros): "+quadradoerrado);

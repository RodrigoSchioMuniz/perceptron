fs=require('fs');

//busca os valores no arquivo e armazena em um array 'dataset'
linhas=fs.readFileSync('entradas1.txt','utf-8').split('\n');
dataset=linhas.map(linha=>{
	[peso,especie]=linha.split(' ');
	return{peso:parseFloat(peso),especie};
});

//inicializa o finalbias com um valor aleatorio
finalbias=Math.random(); //valor entre 0 e 1

for(x=0;x<4000;x++){ //ajusta o finalbias centenas de vezes
	alguma=dataset[parseInt(Math.random()*25)]; //escolhe uma laranja qualquer

	//ajusta o finalbias pouco a pouco
	if(alguma.peso>finalbias)finalbias+=finalbias*0.01; //ajusta o finalbias um pouco a mais
	if(alguma.peso<finalbias)finalbias-=finalbias*0.01; //ajusta o finalbias um pouco a menos

	console.log(`finalbias = ${finalbias.toFixed(6)}`);
}

console.log(`\nO valor que diferencia as laranjas: ${finalbias.toFixed(6)}\n\nCom uma margem de erro calibrada esse valor pode ser utilizado para classificar a fruta.`);

import random

inputs=[]
target=[]
#busca os valores no arquivo entradas2.txt
with open("entradas2.txt","r") as f:
    for line in f:
        parts=line.split()
        inputs.append([float(parts[i])for i in range(8)])
        target.append(1.0 if parts[8]=='l' else 0.0)

#buscando dados no arquivo texto
vals=[]
with open("bias1.txt","r")as f:
    for line in f:
        vals.append(float(line.strip()))
bias=[0.0 for _ in range(8)]
for h in range(8):bias[h]=vals[h];
finalbias=vals[8]

#contabilizando acertos e erros
laranjacerto=laranjaerrado=qualquercerto=qualquererrado=0

#testa a inteligencia artificial com 1000 predições aleatórias
for x in range(1000):
    alguma=random.randrange(60) #escolhe uma fruta qualquer

    somatorio=finalbias
    for h in range(8):somatorio+=inputs[alguma][h]*bias[h]

    if target[alguma]>0.5:
        if somatorio>0:
            laranjacerto=laranjacerto+1
        else:
            laranjaerrado=laranjaerrado+1
    if target[alguma]<0.5:
        if somatorio<0:
            qualquercerto=qualquercerto+1
        else:
            qualquererrado=qualquererrado+1

print(f"\nEsperado laranja dado laranja (acertos): {laranjacerto}")
print(f"Esperado laranja dado qualquer (erros): {laranjaerrado}")
print(f"Esperado qualquer dado qualquer (acertos): {qualquercerto}")
print(f"Esperado qualquer dado laranja (erros): {qualquererrado}\n")

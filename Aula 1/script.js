/* Variaveis e notas do aluno*/
var total = 0;
let media = 0;
var numeros = [9, 8, 8, 4]

/* For que realiza a soma das notas*/
for (let index = 0; index < numeros.length; index++) {
    let element = numeros[index];
    total += element;
}

/* Cálculo de média */
media = total / numeros.length;

/* Exibição de resultado */
if (media >= 7){
    alert("Parabéns você foi aprovado por média " + media + ".");
} else{
    alert("Tente outra vez, você não foi aprovado, sua média foi " + media + ".");
}

/*Atividade realizada em grupo por:
    Felipe de Andrade 
    Thiago Rocha Vaconcelos Silva
    Febronio Bomfim Alves
*/ 
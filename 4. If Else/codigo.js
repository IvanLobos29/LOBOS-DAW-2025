//Listado de ejercicios

//* 4. If Else

let numeroAleatorio = Math.random()
if(numeroAleatorio >= 0.5){
    alert("Greater than 0,5");
}
else{
    alert("Lower than 0.5");
}

var age = 64;

if (age < 2){
    alert("Bebe")
}
else if(age >= 2 && age <= 12){
    alert("Niño")
}
else if(age >= 13 && age <= 19){
    alert("Adolecente")
}
else if(age >= 20 && age <= 30){
    alert("Joven")
}
else if(age >= 31 && age <= 60){
    alert("Adulto")
}
else if(age >= 61 && age <= 75){
    alert("Adulto Mayor")
}
else{
    alert("Anciano")
}


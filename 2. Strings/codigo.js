//Listado de ejercicios

// 2. Strings

var stringsA = "Hola como estas?";
var mayuscula = stringsA.toUpperCase();

var stringB = "Tengo sueño haciendo esto";
var newStringB = stringB.substring(0,4);
console.log(newStringB);

var stringC = "Tengo sueño";
var newStringC = stringC.substring(8);
console.log(newStringC);

var stringD = "eJERCICIO ";
var newStringD = stringD.substring(0,1).toUpperCase() + stringD.substring(1).toLowerCase();
console.log(newStringD);

let stringE = "hola mundo";
let newStringE = stringE.indexOf(" ");
console.log(newStringE);

var stringF = "Posicionamiento Estandarizado"
let espacio = stringF.indexOf(" ");
let palabraA = stringF.substring(0,1).toUpperCase() + stringF.substring(1, espacio).toLowerCase();
let palabraB = stringF.substring(espacio + 1, espacio + 2).toUpperCase() + stringF.substring(espacio + 2).toLowerCase();
let newStringF = palabraA + " " + palabraB; 
console.log(newStringF);


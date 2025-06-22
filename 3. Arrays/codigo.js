//Listado de ejercicios

//* 3. Arrays

let meses= ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre","Octubre","Noviembre","Diciembre"];
console.log(meses[4], meses[10]);

let mesesOrd = meses.sort();
console.log(mesesOrd);

let elemento1= "Sabado";
let elemento2= "Domingo";
meses.unshift(elemento1)
meses.push(elemento2)

meses.shift();
meses.pop();

meses.reverse();

let mesesUnidos = meses.join("-");

let copiaMeses= meses.slice(4,11);
console.log(copiaMeses)


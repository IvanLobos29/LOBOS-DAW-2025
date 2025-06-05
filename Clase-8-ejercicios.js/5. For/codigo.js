//Listado de ejercicios

//* 5. For

let palabras = ["primero", "segundo", "tercero", "cuarto", "quinto"];
for (let i = 0; i < palabras.length; i++) {
    alert(palabras[i]);
}

for (let i = 0; i < palabras.length; i++) {
    let palabraModificada = palabras[i][0].toUpperCase() + palabras[i].substring(1);
    alert(palabraModificada);
}

let sentence = " ";
for (let i = 0; i < palabras.length; i++) {
    sentence = sentence + palabras[i] + " ";
}
alert(sentence.trim());

let arrayVacio = [ ];
for(c=0;c<10;c++){
    arrayVacio.push(c); 
}
console.log(arrayVacio)


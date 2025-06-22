//Listado de ejercicios

//  6. Funciones


function sumaA(a,b){
    return a + b ;
}
let sumaResultadoA = sumaA(3,7);
console.log(sumaResultadoA)

function sumaB(a,b){
    if(isNaN(a) || isNaN(b)){
        return NaN
    }
    return a + b ;
}
let sumaResultadoB = sumaB("adas",7);
console.log(sumaResultadoB)

function validateInteger(c){
    return Number.isInteger(c);
}

function sumaD(a,b){
    if(isNaN(a) || isNaN(b)){
        return NaN
    }
    else if(!validateInteger(a)|| !validateInteger(b)){
        alert("Uno de los números no es entero");
        a = Math.round(a);
        b = Math.round(b);
    }
    return a + b ;
}

function validacionEnteros(a,b){
    if(!validateInteger(a)|| !validateInteger(b)){
        alert("Uno de los números no es entero");
        a = Math.round(a);
        b = Math.round(b);
    }
    return[a,b]
}

function sumaE(a,b){
    if(isNaN(a) || isNaN(b)){
        return NaN
    }
    [a,b] = validacionEnteros(a,b);
    
    return a + b ;
}
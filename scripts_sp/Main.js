var listaSemaforos;
var valores = [];
var matrizEntrada;
var posiciones;
var salida;
var sema;
var hilosDormidos;
var hilosTerminados
const CANTIDAD_COLUMNAS = 5;
const CANTIDAD_FILAS_DAFAULT = 13;

/*---------------------------------------------------------
 --- Algoritmos para Generar valores y semáforos aleatorios
 ----------------------------------------------------------
*/

export function generarSemaforosAleatorios(textSemaforos){
    
    listaSemaforos = textSemaforos.split("]");

   return aleatorios();

}

function obtenerSemaforos(textSemaforos){
    var lista = textSemaforos.split(/(\d)/);

    for (let index = 0; index < lista.length; index++) {

        if(!isNaN(lista[index]) && lista[index-1]==" valor: "){
            valores.push(parseInt(lista[index]));
        }
    } 
}


function inicializarMatrizEntrada(){

    matrizEntrada = null;
    matrizEntrada = new Array(CANTIDAD_FILAS_DAFAULT);

    for (let i = 0; i < matrizEntrada.length; i++) {
        matrizEntrada[i] = new Array(CANTIDAD_COLUMNAS);
    }
}


function aleatorios(){

    inicializarMatrizEntrada();
    let index_j = 1;

    for (let index = 0; index < (listaSemaforos.length-1)*2; index++) {
     
       var hiloAleatorio =  Math.floor(Math.random() * CANTIDAD_COLUMNAS);
       var filaAleatoria =  Math.floor(Math.random() * CANTIDAD_FILAS_DAFAULT);
       var isPositionInvalid = matrizEntrada[filaAleatoria][hiloAleatorio]!="" && matrizEntrada[filaAleatoria][hiloAleatorio]!=null;
       
       while(isPositionInvalid){
        filaAleatoria = Math.floor(Math.random() * CANTIDAD_FILAS_DAFAULT);
        isPositionInvalid = matrizEntrada[filaAleatoria][hiloAleatorio]!="" && matrizEntrada[filaAleatoria][hiloAleatorio]!=null;
       }

       if(index < (listaSemaforos.length-1)){
         matrizEntrada[filaAleatoria][hiloAleatorio] = "S"+(index+1)+".acquire()";
         continue;
       }
       matrizEntrada[filaAleatoria][hiloAleatorio] = "S"+(index_j)+".release()";
       index_j++;
    }

    for (let index = 0; index < matrizEntrada.length; index++) {

        for (let index_j = 0; index_j < matrizEntrada[0].length; index_j++) {

            var isPositionInvalid = matrizEntrada[index][index_j]!="" && matrizEntrada[index][index_j]!=null;

            if(!isPositionInvalid){
                var ranNum = Math.ceil(Math.random() * 25);
                matrizEntrada[index][index_j] = String.fromCharCode(65+ranNum);
            }            
        }
    }

    return fijarAleatorios(matrizEntrada);
}

function fijarAleatorios(matrizEntrada){

    let salida = new Array(CANTIDAD_COLUMNAS);

    for (let index = 0; index < matrizEntrada[0].length; index++) {
        let hilo = "";

        for (let index_j = 0; index_j < matrizEntrada.length; index_j++) {
           hilo+=matrizEntrada[index_j][index]+"\n";
        }

        salida[index] = hilo;
        salida[index] = salida[index].substring(0,salida[index].length-1);
    }
    
    return salida;
}


/*----------------------------------------------------------------------------
--- Algoritmos para realizar la Sincrinizacion de procesos
------------------------------------------------------------------------------
*/

/*
Este algoritmo permite la ejecución del 
*/
export function ejecutarAlgoritmo(textSemaforos,tablaEntrada){
    valores = [];
    obtenerSemaforos(textSemaforos);
    let textHilosBloqueados = "";

    tablaEntrada = inicializarVariablesGlobales(textSemaforos,tablaEntrada);

    while(!IsStop(tablaEntrada)){

        let hiloAleatorio = definirHiloAleatorio();
        let cuerpo = String(tablaEntrada[hiloAleatorio]);
        let elemento = cuerpo.split('\n')[posiciones[hiloAleatorio]];
        
        let esAcquire = elemento.includes(".acquire()");
        let esRelease = elemento.includes(".release()");
    
        let semaforo = elemento.split(".");
        let posSemaforo = parseInt(semaforo[0].split("S")[1])-1;

        textHilosBloqueados = definirComportamiento(posSemaforo,hiloAleatorio,elemento,esAcquire,esRelease,textHilosBloqueados);

        posiciones[hiloAleatorio]+=1;
    }

    let estaElSistemaBloqueado = estaBloqueadoElSistema();
    textHilosBloqueados = textHilosBloqueados.substring(0,textHilosBloqueados.length-2);

    return [salida,estaElSistemaBloqueado,textHilosBloqueados];
}

function inicializarVariablesGlobales (textSemaforos,tablaEntrada){

    posiciones = [0,0,0,0,0];
    salida = new Array();
    hilosDormidos = new Array();
    hilosTerminados = new Array();
    sema = obtenerSemaforosV2(textSemaforos);
    tablaEntrada = [tablaEntrada.Hilo_1,tablaEntrada.Hilo_2,tablaEntrada.Hilo_3,tablaEntrada.Hilo_4,tablaEntrada.Hilo_5];

    return tablaEntrada;
}

function definirComportamiento(posSemaforo,hiloAleatorio,elemento,esAcquire,esRelease,textHilosBloqueados){
    if(esAcquire){
        let valor = 0;
        let valorSemaforo = valores[posSemaforo];

        if(valorSemaforo===0){
            sema[posSemaforo].push(hiloAleatorio);
            textHilosBloqueados+="Hilo_"+(hiloAleatorio+1)+" , "
        }else{
            valores[posSemaforo]-=1;
        }
    }else if (esRelease){

        let cantidadHilosDormidos = sema[posSemaforo].length;

        if(cantidadHilosDormidos===0){
            valores[posSemaforo]+=1;
        }else{
            sema[posSemaforo].shift();
        }
    }else{
        salida.push(elemento+" ");
    }
    
    return textHilosBloqueados;
}

function estaIncluidoElHilo(hiloAleatorio){
    let esHiloDormido = false;

    for (let index = 0; index < sema.length && !esHiloDormido; index++) {
        const element = sema[index];
        if(element.includes(hiloAleatorio)){
            esHiloDormido = true;
        }
    }

    return esHiloDormido;
}


function definirHiloAleatorio (){

    let hiloAleatorio = Math.floor(Math.random() * CANTIDAD_COLUMNAS);
    let esHiloDormido = estaIncluidoElHilo(hiloAleatorio);
    
    while(esHiloDormido || hilosTerminados.includes(hiloAleatorio)){
         hiloAleatorio = Math.floor(Math.random() * CANTIDAD_COLUMNAS);
         esHiloDormido = estaIncluidoElHilo(hiloAleatorio);
    }

    return hiloAleatorio;
}

function estaBloqueadoElSistema(){
    
    let contador = obtenerCantidadDeDormidos();

    return contador===CANTIDAD_COLUMNAS ? true : false;
}

function IsStop(tablaEntrada){

    let cantidadDeHilosDormidos= obtenerCantidadDeDormidos();
    let cantidadDeHilosTerminados = obtenerCantidadDeTerminado(tablaEntrada);

    return (cantidadDeHilosDormidos+cantidadDeHilosTerminados===CANTIDAD_COLUMNAS) ? true : false;
}

function obtenerCantidadDeDormidos(){

    let cantidadHilosDormidos = 0;
    for (let index = 0; index < sema.length; index++) {
        cantidadHilosDormidos+=sema[index].length;
    }
    
    return cantidadHilosDormidos;
}

function obtenerCantidadDeTerminado(tablaEntrada){

    let cantidadDeHilosterminados = 0;

    for (let index = 0; index < CANTIDAD_COLUMNAS; index++) {
        let cuerpo = String(tablaEntrada[index]);

        if(cuerpo.split('\n').length===posiciones[index]){

            if(!hilosTerminados.includes(index)){
                hilosTerminados.push(index);
            }
            cantidadDeHilosterminados++;
        }
    }

    return cantidadDeHilosterminados;
}

function obtenerSemaforosV2(textSemaforos){

    listaSemaforos = textSemaforos.split("]");
    var lista = textSemaforos.split(/(\d)/);
    var sema = new Array();

    for (let index = 0; index < valores.length; index++) {
        sema.push(new Array());
    } 

    return sema;
}



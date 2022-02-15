
var listaSemaforos;
var valores = [];
var matrizEntrada;

export function generarSemaforosAleatorios(textSemaforos,tablaEntrada){
    
    obtenerSemaforos(textSemaforos);

   return aleatorios(tablaEntrada);

}

function obtenerSemaforos(textSemaforos){
    listaSemaforos = textSemaforos.split("]");
    var lista = textSemaforos.split(/(\d)/);

    for (let index = 0; index < lista.length; index++) {
        if(!isNaN(lista[index]) && lista[index-1]==" valor: "){
            valores.push(parseInt(lista[index]));
        }
    } 
}


function inicializarMatrizEntrada(tablaEntrada){
    matrizEntrada = null;
    matrizEntrada = new Array(tablaEntrada.length);
    for (let i = 0; i < matrizEntrada.length; i++) {
        matrizEntrada[i] = new Array(5);
    }
}

function inicializarMatrizConDatos(tablaEntrada){
    matrizEntrada = null;
    matrizEntrada = new Array(tablaEntrada.length);
    for (let i = 0; i < matrizEntrada.length; i++) {
        matrizEntrada[i] = new Array(5);
        matrizEntrada[i][0] = tablaEntrada[i].Hilo_1;
        matrizEntrada[i][1] = tablaEntrada[i].Hilo_2;
        matrizEntrada[i][2] = tablaEntrada[i].Hilo_3;
        matrizEntrada[i][3] = tablaEntrada[i].Hilo_4;
        matrizEntrada[i][4] = tablaEntrada[i].Hilo_5;
    }

}

function aleatorios(tablaEntrada){

    inicializarMatrizEntrada(tablaEntrada);
    let index_j = 1;

    for (let index = 0; index < (listaSemaforos.length-1)*2; index++) {
     
       var hiloAleatorio =  Math.floor(Math.random() * 5);

       var filaAleatoria =  Math.floor(Math.random() * matrizEntrada.length);
       var isPositionInvalid = matrizEntrada[filaAleatoria][hiloAleatorio]!="" && matrizEntrada[filaAleatoria][hiloAleatorio]!=null;
       while(isPositionInvalid){
        filaAleatoria = Math.floor(Math.random() * matrizEntrada.length);
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

    return matrizEntrada;
}

var tablaSemaforos;

function inicializarTablaSemaforos (textSemaforos){
    tablaSemaforos = new Array(listaSemaforos.length-1);
    obtenerSemaforos(textSemaforos);
    for (let index = 0; index < listaSemaforos.length-1; index++) {
        tablaSemaforos[index] = new Array(4);
        tablaSemaforos[index][0] = "S"+(index+1);
        tablaSemaforos[index][1] = valores[index];
        semaforos.push(tablaSemaforos[index][0]);
    }
}

var semaforos = new Array();
var nombreSemaforos = new Array();

function generarPosicionAleatoria(){
    let hilo =  Math.floor(Math.random() * 5);
    while(hilosDormidos.includes(hilo) || hilosTerminados.includes(hilo)){
        hilo =   Math.floor(Math.random() * 5);
    }
    return hilo;
}

var hilosDormidos = new Array();
var hilosTerminados = new Array();
var columnasTerminadas;

export function ejecutarAlgoritmo(textSemaforos,tablaEntrada){
    columnasTerminadas = 0;

    semaforos = new Array();
    let listaSalida = new Array();
    hilosDormidos = new Array();
    hilosTerminados = new Array();
    nombreSemaforos = new Array();

    inicializarMatrizConDatos(tablaEntrada);
    inicializarTablaSemaforos(textSemaforos);

    while(hilosDormidos.length + hilosTerminados.length < 5){
      let hilo =  generarPosicionAleatoria();
      encontrarListaFinal(0,hilo,listaSalida);
    }

    return listaSalida.toString();
}


function encontrarListaFinal(inicio,hilo,listaSalida){
    let aletorioRelease ;
    let esAcquire;
    let index;
    let nombreSemaforo = "";

    for (index = inicio; index < matrizEntrada.length; index++) {
        let element = matrizEntrada[index][hilo];
        esAcquire = element.includes(".acquire()");
        let esRelease = element.includes(".release()");
        let semaforo = element.split(".");
        
        let posicionSemaforo;

        nombreSemaforo = semaforo[0];
        posicionSemaforo = semaforos.indexOf(nombreSemaforo);

        if(esAcquire){
            if(tablaSemaforos[posicionSemaforo][1] === 0){
                tablaSemaforos[posicionSemaforo][2] = index;
                tablaSemaforos[posicionSemaforo][3]= hilo;
                hilosDormidos.push(hilo);
                nombreSemaforos.push(nombreSemaforo);
                break;
            }
            continue; 
        }else if(esRelease){
          if(nombreSemaforos.includes(nombreSemaforo)){
             aletorioRelease = Math.floor(Math.random() * (3 - 1)) + 1;
             let filaInicio = tablaSemaforos[posicionSemaforo][2]+1;
             let hiloSiguiente = tablaSemaforos[posicionSemaforo][3];
              if(aletorioRelease===1){
                  encontrarListaFinal(filaInicio,hiloSiguiente,listaSalida);
                  encontrarListaFinal(index+1,hilo,listaSalida);
                  //columnasTerminadas++;
              }else{
                encontrarListaFinal(index+1,hilo,listaSalida);
                encontrarListaFinal(filaInicio,hiloSiguiente,listaSalida);
              }
              break;
          }else{
              tablaSemaforos[posicionSemaforo][2]+=1;
              continue;
          }
        }
        listaSalida.push(element+"  ");
    }

    if(index===matrizEntrada.length){
        let posicionToRemoved = hilosDormidos.indexOf(hilo);
        if( posicionToRemoved != -1){
            hilosDormidos.splice(posicionToRemoved,1);
            nombreSemaforos.splice(posicionToRemoved,1);
        }
        hilosTerminados.push(hilo);
       //columnasTerminadas++;
    }
}




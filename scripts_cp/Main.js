var variables = [];
var valoresVariables = [];
var listaSemaforos;
var valores = [];
var matrizEntrada;
var posiciones;
var salida;
var sema;
var hilosDormidos;
var hilosTerminados;
const CANTIDAD_COLUMNAS = 5;
const CANTIDAD_FILAS_DAFAULT = 13;

/*---------------------------------------------------------
 --- Algoritmos para Generar valores y semáforos aleatorios
 ----------------------------------------------------------
*/
//-----------------------------------------------------------------------------------------------

function validarExistSend(posHiloReceive,indexReceive, posHiloSend){
    let isSend = false;
    for (let index = 0; index < tablaValores[posHiloSend].length && !isSend; index++) {
        
        let valor = tablaValores[posHiloSend][index];
        if(valor.includes(".send")){
            let valorEnviado = valor.substr(7,7).split("(")[1].split(")")[0];
            tablaValores[posHiloReceive][indexReceive]= valorEnviado;
            tablaValores[posHiloSend][index]="";
            isSend=true;
        }
    }

    if(!isSend){
        tablaValores[posHiloReceive][indexReceive]= "<bloqueo>";
    }
}

function validarExistReceive(posHiloSend,indexSend,posHiloReceive){
    let isReceive = false;

    for (let index = 0; index < tablaValores[posHiloReceive].length && !isReceive; index++) {
        let valor = tablaValores[posHiloReceive][index];
        if(valor.includes(".receive()")){
            let valorEnviado = tablaValores[posHiloSend][indexSend].substr(7,7).split("(")[1].split(")")[0];
            tablaValores[posHiloReceive][index]= valorEnviado;
            isReceive=true;
        }
    }
    
     tablaValores[posHiloSend][indexSend]="";

}

export function ejecutar(tablaEntrada){

    let tabla =  Object.assign([], tablaEntrada);

    tabla.Hilo_1 = tabla.Hilo_1.split("\n");
    tabla.Hilo_2 = tabla.Hilo_2.split("\n");
    tabla.Hilo_3 = tabla.Hilo_3.split("\n");
    tabla.Hilo_4 = tabla.Hilo_4.split("\n");
    tabla.Hilo_5 = tabla.Hilo_5.split("\n");

    tabla = [tabla.Hilo_1,tabla.Hilo_2,tabla.Hilo_3,tabla.Hilo_4,tabla.Hilo_5];

    tablaValores = tabla;

    for (let i = 0; i < tablaValores.length; i++) {
        for (let j = 0; j < tablaValores[i].length; j++) {
           let valor = tablaValores[i][j];
           let isReceive = valor.toLowerCase().includes(".receive()");
           let isSend = valor.toLowerCase().includes(".send");
           
           if(isReceive){
               let posHiloSend = parseInt(valor.substr(1,1))-1;
               validarExistSend(i,j,posHiloSend);
           }

           if(isSend){
               let posHiloReceive = parseInt(valor.substr(1,1))-1;
               validarExistReceive(i,j,posHiloReceive);
           }
        }
    }

    let bloqueados = "";
    let h1 = obtnerHilo(tablaValores,0);
    bloqueados+=h1[1]+" ";
    let h2 = obtnerHilo(tablaValores,1);
    bloqueados+=h2[1]+" ";
    let h3 = obtnerHilo(tablaValores,2);
    bloqueados+=h3[1]+" ";
    let h4 = obtnerHilo(tablaValores,3);
    bloqueados+=h4[1]+" ";
    let h5 = obtnerHilo(tablaValores,4);
    bloqueados+=h5[1]+" ";

    let resultado = "H1: ["+h1[0]+"]"+
    " H2: ["+h2[0]+"]"+
    " H3: ["+h3[0]+"]"+
    " H4: ["+h4[0]+"]"+
    " H5: ["+h5[0]+"]";

    return [resultado,bloqueados];
}

function obtnerHilo(lista,posicion){
    let resultado = "";
    let bloqueados = "";
    for (let index = 0; index < lista[posicion].length; index++) {
        
        if(lista[posicion][index]==="<bloqueo>"){
            bloqueados+="H"+(posicion+1);
            break;
        }

        if(lista[posicion][index]!=""){
            resultado+=lista[posicion][index]+",";
        }
    }
    return [resultado,bloqueados];
}

var tablaValores = [];

export function generarAleatorios(){
    let matrizEntrada = [];

    for (let index = 0; index < 5; index++) {
        matrizEntrada.push();
        matrizEntrada[matrizEntrada.length] = new Array(13);

        if(index===0){
            let aleatorio = Math.floor(Math.random() * CANTIDAD_COLUMNAS);
            matrizEntrada[index][aleatorio] = "H2.send(p)";
        }

        if(index===1){
            let aleatorio = Math.floor(Math.random() * CANTIDAD_COLUMNAS);
            matrizEntrada[index][aleatorio] = "H1.receive()";
        }

        if(index===2){
            let aleatorio = Math.floor(Math.random() * CANTIDAD_COLUMNAS);
            matrizEntrada[index][aleatorio] = "H4.send(w)";
        }
        
        if(index===3){
            let aleatorio = Math.floor(Math.random() * CANTIDAD_COLUMNAS);
            matrizEntrada[index][aleatorio] = "H3.receive()";
        }
        
        for (let index_j = 0; index_j < 13; index_j++) {
            
            var isPositionInvalid = matrizEntrada[index][index_j]!="" && matrizEntrada[index][index_j]!=null;

            if(!isPositionInvalid){
                var ranNum = Math.ceil(Math.random() * 25);
                matrizEntrada[index][index_j] = String.fromCharCode(65+ranNum);
            }        
        }
    }

    tablaValores = matrizEntrada;
    
    return fijarAleatorios(matrizEntrada);

}


function fijarAleatorios(matrizEntrada){

    let salida = new Array(CANTIDAD_COLUMNAS);

    for (let index = 0; index < matrizEntrada.length; index++) {
        let hilo = "";

        for (let index_j = 0; index_j < matrizEntrada[0].length; index_j++) {
           hilo+=matrizEntrada[index][index_j]+"\n";
        }

        salida[index] = hilo;
        salida[index] = salida[index].substring(0,salida[index].length-1);
    }
    
    return salida;
}
//-----------------------------------------------------------------------------------------------


export function inicializarTablaEntradaNumerosAleatorios(tablaEntrada){
    let celdasALiberar = new Array();
    const MININO_SOLICITA =1;
    const MAXIMO_SOLICITA =4; 
    const DIVISION_TABLA = parseInt(tablaEntrada.length/3);
    for (let index_i = 0; index_i < tablaEntrada.length; index_i++) {
        if(index_i<=DIVISION_TABLA || index_i>DIVISION_TABLA*2){
            realizarSolicitud(MAXIMO_SOLICITA,MININO_SOLICITA,tablaEntrada,index_i);
            continue;
        }
        liberarSolicitud(DIVISION_TABLA,celdasALiberar,tablaEntrada,index_i);
    }
    limpiarCeldasLiberadas(celdasALiberar);
    reescribirSolicitudesFinales(tablaEntrada,DIVISION_TABLA);
}

function reescribirSolicitudesFinales(tablaEntrada,DIVISION_TABLA){
    let initialValue = parseInt(tablaEntrada[DIVISION_TABLA].proceso.substring(1))+1;
    for (let index = DIVISION_TABLA*2+1; index < tablaEntrada.length; index++) {
       tablaEntrada[index].proceso= "S"+initialValue;
       initialValue++;    
    }
}

function realizarSolicitud(MAXIMO_SOLICITA,MININO_SOLICITA,tablaEntrada,index_i){
    let intervaloAleatorio = (MAXIMO_SOLICITA - MININO_SOLICITA) ;
    let numeroAleatorio = parseInt(Math.random() * intervaloAleatorio) + MININO_SOLICITA;
    tablaEntrada[index_i].solicita = numeroAleatorio;
    tablaEntrada[index_i].libera = "--";
}

function liberarSolicitud(DIVISION_TABLA,celdasALiberar,tablaEntrada,index_i){
    let solicitudAletoria =  encontarSolicitudAleatoria(tablaEntrada,DIVISION_TABLA,celdasALiberar);
    tablaEntrada[index_i].proceso = tablaEntrada[solicitudAletoria].proceso;
    celdasALiberar.push(tablaEntrada[index_i].proceso);
    tablaEntrada[index_i].libera = "X";
    tablaEntrada[index_i].solicita = "--";
}

function encontarSolicitudAleatoria(tablaEntrada,DIVISION_TABLA,celdasALiberar){
    let encontrarEspacioEnMemoria = true;
    while(encontrarEspacioEnMemoria){
        var aleatoria = parseInt(Math.random()*(DIVISION_TABLA+1));
        let valor = tablaEntrada[aleatoria].proceso;
        encontrarEspacioEnMemoria=false;
        for (let index = 0; index <= celdasALiberar.length && !encontrarEspacioEnMemoria; index++) {
            if(celdasALiberar[index]===valor){
                encontrarEspacioEnMemoria=true;
            }
        }
    }
    
    return aleatoria;
}

function limpiarCeldasLiberadas (celdasALiberar){
    while(celdasALiberar.length!=0){
        celdasALiberar.pop();
    }
}


export function ejecutarAlgoritmo(item_algoritmo,tablaEntrada){
   return ejecutarPrimerAjuste(item_algoritmo,tablaEntrada);
}

function ejecutarPrimerAjuste(item_algoritmo,tablaEntrada){
    let listaCeldas = new Array(20);
    for (let index = 0; index < tablaEntrada.length; index++) {
        if(listaCeldas[index]==null && (tablaEntrada[index].solicita!="--" || tablaEntrada[index].solicita!="")){
            
            let posicionFinal=encontrarEspacioEnMemoria(tablaEntrada,index);

            //alert(posicionFinal);
            cantidadDeEspacios =tablaEntrada[index].solicita-1;
            let pos = posicionFinal-cantidadDeEspacios;
            cantidadDeEspacios =tablaEntrada[index].solicita+pos;

            for (let index_k = pos; index_k < cantidadDeEspacios; index_k++) {
                listaCeldas[index_k]=tablaEntrada[index].proceso; 
            }

        }else{
        //    let cantidadLiberadas =tablaEntrada[index].libera;
            let proceso = tablaEntrada[index].proceso;
            let posicionLiberar = listaCeldas.indexOf(proceso);
            listaCeldas[posicionLiberar]="";

            /*
            for (let index_l = 0; index_l < listaCeldas.length ; index_l++) {
                if(listaCeldas[index_l]!=null && listaCeldas[index_l]==proceso){
                    listaCeldas[index_l]="";
                }
             }
             */

        }
        
        
    }


    function encontrarEspacioEnMemoria(tablaEntrada,index){
        let cantidadDeEspacios =tablaEntrada[index].solicita;
        let posicionFinal ;
        for (let index_j = 0; index_j < listaCeldas.length  && cantidadDeEspacios!=0; index_j++) {
            if(listaCeldas[index_j]==null || listaCeldas[index_j]==""){
                cantidadDeEspacios-=1;
                posicionFinal=index_j;
                continue;
            }
            cantidadDeEspacios =tablaEntrada[index].solicita;
        }

        return posicionFinal;
    }

    return listaCeldas;
}


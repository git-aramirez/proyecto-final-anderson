export function inicializarTablaEntradaNumerosAleatorios(tablaEntrada){
    let celdasALiberar = new Array();
    const MININO_SOLICITA =1;
    const MAXIMO_SOLICITA =4; 
    const DIVISION_TABLA = parseInt(tablaEntrada.length/3);
    for (let index_i = 0; index_i < tablaEntrada.length; index_i++) {
        if(index_i<=DIVISION_TABLA || index_i>=DIVISION_TABLA*2){
            realizarSolicitudAleatoria(MAXIMO_SOLICITA,MININO_SOLICITA,tablaEntrada,index_i);
            continue;
        }
        liberarSolicitudAleatoria(DIVISION_TABLA,celdasALiberar,tablaEntrada,index_i);
    }
    limpiarCeldasLiberadas(celdasALiberar);
    reescribirSolicitudesFinales(tablaEntrada,DIVISION_TABLA);
}

function reescribirSolicitudesFinales(tablaEntrada,DIVISION_TABLA){
    let initialValue = parseInt(tablaEntrada[DIVISION_TABLA].proceso.substring(1))+1;
    for (let index = DIVISION_TABLA*2; index < tablaEntrada.length; index++) {
       tablaEntrada[index].proceso= "S"+initialValue;
       initialValue++;    
    }
}

function realizarSolicitudAleatoria(MAXIMO_SOLICITA,MININO_SOLICITA,tablaEntrada,index_i){
    let intervaloAleatorio = (MAXIMO_SOLICITA - MININO_SOLICITA) ;
    let numeroAleatorio = parseInt(Math.random() * intervaloAleatorio) + MININO_SOLICITA;
    tablaEntrada[index_i].solicita = numeroAleatorio;
    tablaEntrada[index_i].libera = "--";
}

function liberarSolicitudAleatoria(DIVISION_TABLA,celdasALiberar,tablaEntrada,index_i){
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

var listaCeldas = new Array(20);
var index = 0;

//----------------- Estrategia de Ajuste Sobre Huecos -------------------------------
export function ejecutarAlgoritmo(itemAjusteHuecos,tablaEntrada,isPasoAPaso){
    if(index==tablaEntrada.length){
        listaCeldas = new Array(20);
        index=0;
    }
    for (index; index < tablaEntrada.length; index++) {
        if(tablaEntrada[index].solicita!="--" && tablaEntrada[index].solicita!=""){
            if(parseInt(tablaEntrada[index].solicita)<=0){
                continue;
            }
            let listaPosiciones = encontrarEspacioEnMemoria(tablaEntrada,index,listaCeldas,itemAjusteHuecos);
            let posicionFinal=listaPosiciones[0];
            if(posicionFinal===listaCeldas.length){
                continue;
            }            
            realizarSolicitud(tablaEntrada,listaCeldas,index,posicionFinal,itemAjusteHuecos,listaPosiciones[1]);
        }else{
            realizarLiberacion(listaCeldas,tablaEntrada,index);
        }
        if(isPasoAPaso){
            index=index+1;
            break;
        } 
    }

    return listaCeldas;
}

function realizarSolicitud(tablaEntrada,listaCeldas,index,posicionFinal,itemAlgoritmo,posicionInicial){
    let cantidadDeEspacios =parseInt(tablaEntrada[index].solicita)-1;
    let pos = posicionFinal-cantidadDeEspacios;
    if(itemAlgoritmo==="Peor Ajuste"){
        pos = posicionInicial;
    }
    cantidadDeEspacios =parseInt(tablaEntrada[index].solicita)+pos;
    for (let index_k = pos; index_k < cantidadDeEspacios; index_k++) {
        listaCeldas[index_k]=tablaEntrada[index].proceso; 
    }
}

function realizarLiberacion(listaCeldas,tablaEntrada,index){
    let proceso = tablaEntrada[index].proceso;
    let posicionLiberar = listaCeldas.indexOf(proceso);
    while(posicionLiberar!=-1){
        listaCeldas[posicionLiberar]="";
        posicionLiberar = listaCeldas.indexOf(proceso);
    }
}

function encontrarEspacioEnMemoria(tablaEntrada,index,listaCeldas,item_algoritmo){
    let cantidadDeEspacios =parseInt(tablaEntrada[index].solicita);
    let posicionFinal;
    let posicionInicial;
    if(item_algoritmo==="Mejor Ajuste"){
        posicionFinal = encontarEspacioEnMemoriaMejorAjuste(listaCeldas,cantidadDeEspacios);
        if(posicionFinal===listaCeldas.length){
            posicionFinal = encontrarEspacioEnMemoriaPrimerAjuste(tablaEntrada,index,listaCeldas,cantidadDeEspacios)[0];
        }
        return [posicionFinal,posicionInicial];
    }else if(item_algoritmo==="Peor Ajuste"){
        let listaPosiciones = encontarEspacioEnMemoriaPeorAjuste(listaCeldas,cantidadDeEspacios);
        posicionFinal=listaPosiciones[0];
        posicionInicial=listaPosiciones[1];
        if(posicionFinal===listaCeldas.length){
            posicionFinal = encontrarEspacioEnMemoriaPrimerAjuste(tablaEntrada,index,listaCeldas,cantidadDeEspacios)[0];
            posicionInicial=posicionFinal-(cantidadDeEspacios-1);
        }
        return [posicionFinal,posicionInicial];  
    }

    return encontrarEspacioEnMemoriaPrimerAjuste(tablaEntrada,index,listaCeldas,cantidadDeEspacios);
}

function encontrarEspacioEnMemoriaPrimerAjuste(tablaEntrada,index,listaCeldas,cantidadDeEspacios){
    let posicionFinal;
    for (let index_j = 0; index_j < listaCeldas.length  && cantidadDeEspacios!=0; index_j++) {
        if(listaCeldas[index_j]==null || listaCeldas[index_j]==""){
            cantidadDeEspacios-=1;
            posicionFinal=index_j;
            continue;
        }
        cantidadDeEspacios =parseInt(tablaEntrada[index].solicita);
    }
    if(cantidadDeEspacios!=0){
        posicionFinal=listaCeldas.length;
    }

    return [posicionFinal,0];
}

function encontarEspacioEnMemoriaPeorAjuste(listaCeldas,cantidadDeEspacios){
    let cantidadDeHuecosMayor=0;
    let posicionFinal=listaCeldas.length;
    let posicionInicialTemp =0;
    let posicionInicial=0;
    let cantidadDeHuecos=0;
    for (var index_j = 0; index_j < listaCeldas.length; index_j++) {
        if(cantidadDeHuecos===0){
            posicionInicialTemp=index_j;
        }
        if(listaCeldas[index_j]==null || listaCeldas[index_j]==""){
            cantidadDeHuecos++;
            continue;
        }
        if(cantidadDeHuecos>cantidadDeHuecosMayor){
            cantidadDeHuecosMayor=cantidadDeHuecos;
            posicionFinal=index_j-1;
            posicionInicial=posicionInicialTemp;
        }
        cantidadDeHuecos=0;
    }
    if(cantidadDeHuecos>cantidadDeHuecosMayor){
        cantidadDeHuecosMayor=cantidadDeHuecos;
        posicionFinal=index_j-1;
        posicionInicial=posicionInicialTemp;
    }
    if(cantidadDeHuecosMayor<cantidadDeEspacios){
        posicionFinal=listaCeldas.length;
    }

    return [posicionFinal,posicionInicial];
}

function encontarEspacioEnMemoriaMejorAjuste(listaCeldas,cantidadDeEspacios){
    let posicionFinal;
    let cantidadDeHuecos=0;
    let cantidadDeHuecosMenor=-1;
    for (let index_j = 0; index_j < listaCeldas.length ; index_j++) {
        if(listaCeldas[index_j]==null || listaCeldas[index_j]==""){
            cantidadDeHuecos++;
            continue;
        }
        if(cantidadDeHuecos!=0 && cantidadDeHuecos<cantidadDeHuecosMenor || cantidadDeHuecosMenor===-1){
            cantidadDeHuecosMenor=cantidadDeHuecos;
            posicionFinal=index_j-1;
        }
        cantidadDeHuecos=0;
    }
    if(cantidadDeEspacios!=cantidadDeHuecosMenor){
        posicionFinal=listaCeldas.length;
    }

    return posicionFinal;
}
//-----------------------------------------------------------------------------------
//----------------- Estrategia de Ajuste Sobre Solicitudes --------------------------


export function ejecutarAlgoritmoAjusteSolicitudes(tablaEntrada){

    listaCeldas = new Array(20);
    let bloque = encontrarBloquesDeMemoria(0);
    let posicionInicial = bloque[0];
    let posicionFinal = bloque[1];
    let solicitudesRealizadas = 0;
    let solicitudesAgregadas = new Array();

    while(posicionInicial!=-1){
        let tamanioBloque = posicionFinal-posicionInicial+1;
        let posicionSolicitud=-1;
        let diferenciaMenor=-1;
        for (let index = 0; index < tablaEntrada.length; index++) {
            if(tablaEntrada[index].solicita!="--" && tablaEntrada[index].solicita!=""){
                var tamanioSolicitud = tablaEntrada[index].solicita;
                let diferencia = tamanioBloque-tamanioSolicitud;
                let EssolicitudExistente = solicitudesAgregadas.indexOf(tablaEntrada[index].proceso);
                if(diferencia>=0 && (diferencia<diferenciaMenor || diferenciaMenor===-1) && EssolicitudExistente==-1){
                    posicionSolicitud=index;
                    diferenciaMenor=diferencia;
                }
            } 
        }
        realizarSolicitudAjusteSolicitudes(tablaEntrada,posicionSolicitud,posicionInicial,solicitudesAgregadas);
        solicitudesRealizadas++;
        if(solicitudesRealizadas==3){
            realizarLiberaciónAjusteSolicitudes(tablaEntrada);
        }
        bloque = encontrarBloquesDeMemoria(posicionInicial+tamanioSolicitud);
        posicionInicial = bloque[0];
        posicionFinal = bloque[1];
    } 

    return listaCeldas;
}

function realizarLiberaciónAjusteSolicitudes(tablaEntrada){
    let index = parseInt(Math.random() * 2);
    let proceso = listaCeldas[index].proceso;
    let posicionLiberar = listaCeldas.indexOf(proceso);
    while(posicionLiberar!=-1){
        listaCeldas[posicionLiberar]="";
        posicionLiberar = listaCeldas.indexOf(proceso);
    }
}

function realizarSolicitudAjusteSolicitudes(tablaEntrada,index,posicionInicial,solicitudesAgregadas){
    
    let cantidadDeEspacios =parseInt(tablaEntrada[index].solicita)+posicionInicial;
    for (let index_k = posicionInicial; index_k < cantidadDeEspacios; index_k++) {
        listaCeldas[index_k]=tablaEntrada[index].proceso; 
        solicitudesAgregadas.push(tablaEntrada[index].proceso);
    }
}



function encontrarBloquesDeMemoria (posicionPartida){
    let posicionInicial =-1;
    let posicionFinal=-1;
    for (var index = posicionPartida; index < listaCeldas.length; index++) {
        if(( listaCeldas[index]==null|| listaCeldas[index]==="" ) && posicionInicial===-1 ){
            posicionInicial=index;
        }
        if(listaCeldas[index]!=null && listaCeldas[index]!="" && posicionInicial!=-1){
            posicionFinal=index-1;
            posicionInicial=-1;
            break;
        } 
    }
    if(index===listaCeldas.length){
        posicionFinal=index-1;
    }
    return [posicionInicial,posicionFinal];   
}
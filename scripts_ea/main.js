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


export function ejecutarAlgoritmo(item_algoritmo,tablaEntrada){
   return ejecutarPrimerAjuste(item_algoritmo,tablaEntrada);
}

function ejecutarPrimerAjuste(item_algoritmo,tablaEntrada){
    let listaCeldas = new Array(20);
    for (let index = 0; index < tablaEntrada.length; index++) {
        if(tablaEntrada[index].solicita!="--" && tablaEntrada[index].solicita!=""){
            let posicionFinal=encontrarEspacioEnMemoria(tablaEntrada,index,listaCeldas,"Mejor Ajuste");
            if(posicionFinal===listaCeldas.length){
                continue;
            }            
            realizarSolicitud(tablaEntrada,listaCeldas,index,posicionFinal);
        }else{
            realizarLiberacion(listaCeldas,tablaEntrada,index);
        }  
    }

    return listaCeldas;
}

function realizarSolicitud(tablaEntrada,listaCeldas,index,posicionFinal){
    let cantidadDeEspacios =parseInt(tablaEntrada[index].solicita)-1;
    let pos = posicionFinal-cantidadDeEspacios;
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
    if(item_algoritmo==="Mejor Ajuste"){
        let posicionFinal = encontarEspacioEnMemoriaMejorAjuste(listaCeldas,cantidadDeEspacios);
        if(posicionFinal===listaCeldas.length){
            posicionFinal = encontrarEspacioEnMemoriaPrimerAjuste(tablaEntrada,index,listaCeldas,cantidadDeEspacios);
        }
        return posicionFinal;
    }else if(item_algoritmo==="Peor Ajuste"){
        return encontarEspacioEnMemoriaPeorAjuste(listaCeldas,cantidadDeEspacios);
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

    return posicionFinal;
}

function encontarEspacioEnMemoriaPeorAjuste(listaCeldas,cantidadDeEspacios){
    let cantidadDeHucosMayor=0;
    let posicionFinal=listaCeldas.length;
    let cantidadDeHuecos=0;
    for (let index_j = 0; index_j < listaCeldas.length && cantidadDeEspacios!=cantidadDeHuecos; index_j++) {
        if(listaCeldas[index_j]==null || listaCeldas[index_j]==""){
            cantidadDeHuecos++;
            continue;
        }
        if(cantidadDeHuecos>cantidadDeHucosMayor){
            cantidadDeHucosMayor=cantidadDeHuecos;
            posicionFinal=index_j;
        }
        cantidadDeHuecos=0;
    }

    return posicionFinal;
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

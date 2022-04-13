var listaCeldas;
var index = 0;
var posicionesBloques;

var posicionesBloquesPasoAPaso;
var listaCeldasPasoAPaso;
var bloquePasoAPaso;
var posicionInicialPasoAPaso;
var posicionFinalPasoAPaso;
var solicitudesRealizadasPasoAPaso;
var solicitudesAgregadasPasoAPaso;
var tabla;
var esEjecucionPrimerVez = true;

export function inicializarListasAleatorias(listaProcesos,listaRequerimientos,tablaEntrada){
    listaProcesos = "";
    for (let index = 0; index < tablaEntrada.length; index++) {
        
        if(index===tablaEntrada.length-1){
            listaProcesos += tablaEntrada[index].proceso;
        }else{
            listaProcesos += tablaEntrada[index].proceso+"\n";
        }
        
        if(tablaEntrada[index].solicita==="--"){
            listaRequerimientos[index]="Liberar";
        }else{
            listaRequerimientos[index]="Solicitar "+tablaEntrada[index].solicita;
        }
    }
    return [listaProcesos,listaRequerimientos];
}

export function inicializarTablaEntrada(listaProcesos,listaRequerimientos,tablaEntrada){
    let procesos = listaProcesos.split("\n");
    for (let index = 0; index < listaRequerimientos.length; index++) {
        tablaEntrada[index].proceso = procesos[index];
        if(listaRequerimientos[index].includes("Solicitar")){
            let resultado = listaRequerimientos[index].split("Solicitar");
            tablaEntrada[index].solicita = parseInt(resultado[1].replace(/ /g, ""));
            tablaEntrada[index].libera= "--";
        }else{
            tablaEntrada[index].solicita = "--";
            tablaEntrada[index].libera = "X";
        }        
    }
}


export function inicializarTablaEntradaNumerosAleatorios(itemAlgoritmo,tablaEntrada){
    let celdasALiberar = new Array();
    const MININO_SOLICITA =1;
    const MAXIMO_SOLICITA =4; 
    const DIVISION_TABLA = parseInt(tablaEntrada.length/3);
    for (let index_i = 0; index_i < tablaEntrada.length; index_i++) {

        if(itemAlgoritmo!= "Ajuste Sobre Solicitudes"){
            if(index_i<=DIVISION_TABLA || index_i>=DIVISION_TABLA*2){
                realizarSolicitudAleatoria(MAXIMO_SOLICITA,MININO_SOLICITA,tablaEntrada,index_i);
                continue;
            }
            liberarSolicitudAleatoria(DIVISION_TABLA,celdasALiberar,tablaEntrada,index_i);
        }else{
            realizarSolicitudAleatoria(MAXIMO_SOLICITA,MININO_SOLICITA,tablaEntrada,index_i);
        }

    }
    limpiarCeldasLiberadas(celdasALiberar);
    if(itemAlgoritmo!= "Ajuste Sobre Solicitudes"){
         reescribirSolicitudesFinales(tablaEntrada,DIVISION_TABLA);
    }
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

export function inicializarVariables(){
    index =0;
    //listaCeldas = new Array(20);
    posicionesBloques = new Array();
    initVariablesGlobalesAlgoritmoSolicitudes();
}

function initVariablesGlobalesAlgoritmoSolicitudes(){
    posicionesBloquesPasoAPaso = new Array();
    listaCeldasPasoAPaso = new Array(20);
    bloquePasoAPaso = [];
    posicionInicialPasoAPaso= 0;
    posicionFinalPasoAPaso= 0;
    solicitudesRealizadasPasoAPaso = 0;
    solicitudesAgregadasPasoAPaso = new Array();
    tabla = [];
    esEjecucionPrimerVez = true;
}

function crearParrafoResultado(estrategia,itemAlgoritmoAjuste,tablaEntrada,listaCeldas,isPasoAPaso){

    if(estrategia==="Ajuste Sobre Huecos"){

        if(isPasoAPaso && index!=tablaEntrada.length){
            return "";
        }
    }else{

        if(isPasoAPaso && posicionInicialPasoAPaso!=-1){
            return "";
        }
    }

    let resultado = "Se realizó la ejecución de la estrategia de ajuste sobre: "+estrategia+" por medio del "+itemAlgoritmoAjuste
    +", mediante el siguiente proceso:\n\n";

    for (let index = 0; index < tablaEntrada.length; index++) {
        if(tablaEntrada[index].solicita=="--"){
            resultado+=" se liberó el proceso "+tablaEntrada[index].proceso;
        }else{
            resultado+=" se solicitó el proceso "+tablaEntrada[index].proceso;
        }
    }
    resultado+=".\n\n Obteniendose como resultado final los procesos en el siguiente orden: "
    for (let index = 0; index < listaCeldas.length; index++) {
        if(listaCeldas[index]!=undefined){
            resultado+=listaCeldas[index]+ " , ";
        }
    }
    resultado = resultado.substring(0,resultado.length-2);
    
    return resultado;
}

//----------------- Estrategia de Ajuste Sobre Huecos -------------------------------



export function ejecutarAlgoritmoAjusteHuecos(itemAlgoritmoAjuste,tablaEntrada,isPasoAPaso,cantidadCeldasMemoria){
    if(index===tablaEntrada.length){
        listaCeldas = new Array(parseInt(cantidadCeldasMemoria));
        index=0;
    }
    for (index; index < tablaEntrada.length; index++) {
        if(tablaEntrada[index].solicita!="--" && tablaEntrada[index].solicita!=""){
            if(parseInt(tablaEntrada[index].solicita)<=0){
                continue;
            }
            let listaPosiciones = encontrarEspacioEnMemoria(tablaEntrada,index,listaCeldas,itemAlgoritmoAjuste);
            let posicionFinal=listaPosiciones[0];
            if(posicionFinal===listaCeldas.length){
                continue;
            }            
            realizarSolicitud(tablaEntrada,listaCeldas,index,posicionFinal,itemAlgoritmoAjuste,listaPosiciones[1]);
        }else{
            realizarLiberacion(listaCeldas,tablaEntrada,index);
        }
        if(isPasoAPaso){
            index=index+1;
            break;
        } 
    }

    let parrafoResultado = crearParrafoResultado("Ajuste Sobre Huecos",itemAlgoritmoAjuste,tablaEntrada,listaCeldas,isPasoAPaso);
    return [listaCeldas,parrafoResultado];
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
//-----------------------------------------------------------------------------------

   

export function ejecutarAlgoritmoAjusteSolicitudes(itemAlgoritmoAjuste,tablaEntrada,isPasoAPaso){

    if(!isPasoAPaso){
        initVariablesGlobalesAlgoritmoSolicitudes();
    }
   
    posicionesBloques = new Array();
    listaCeldas = new Array(parseInt(cantidadCeldasMemoria));
    let bloque = encontrarBloquesDeMemoria(0);
    let posicionInicial = bloque[0];
    let posicionFinal = bloque[1];
    let solicitudesRealizadas = 0;
    let solicitudesAgregadas = new Array();

    if(posicionInicialPasoAPaso===-1){
        esEjecucionPrimerVez = true;
    }

    if(isPasoAPaso && !esEjecucionPrimerVez){
        posicionesBloques= posicionesBloquesPasoAPaso ;
        listaCeldas = listaCeldasPasoAPaso;
        bloque= bloquePasoAPaso;
        posicionInicial= posicionInicialPasoAPaso ;
        posicionFinal= posicionFinalPasoAPaso ;
        solicitudesRealizadas = solicitudesRealizadasPasoAPaso ;
        solicitudesAgregadas= solicitudesAgregadasPasoAPaso ;
        tablaEntrada = tabla;
    }

    if(isPasoAPaso && esEjecucionPrimerVez){
        esEjecucionPrimerVez=false;
    }

    while(posicionInicial!=-1){

        let tamanioBloque = posicionFinal-posicionInicial+1;
        let posicionSolicitud=-1;

        switch (itemAlgoritmoAjuste) {
            case "Primer Ajuste":
                posicionSolicitud = realizarPrimerAjusteSobreSolicitudes(solicitudesAgregadas,tablaEntrada,posicionSolicitud,tamanioBloque);
              break;

            case "Mejor Ajuste":
                posicionSolicitud = realizarMejorAjusteSobreSolicitudes(solicitudesAgregadas,tablaEntrada,posicionSolicitud,tamanioBloque);
              break;

              default:
                 posicionSolicitud = realizarPeorAjusteSobreSolicitudes(solicitudesAgregadas,tablaEntrada,posicionSolicitud,tamanioBloque);
            break;
        }

        if(posicionSolicitud!=-1){

            realizarSolicitudAjusteSolicitudes(tablaEntrada,posicionSolicitud,posicionInicial,solicitudesAgregadas);
            solicitudesRealizadas++;
            if(solicitudesRealizadas==3){
                realizarLiberacionAjusteSolicitudes(tablaEntrada);
                solicitudesRealizadas=0;
            }
        }
        bloque = encontrarBloquesDeMemoria();
        posicionInicial = bloque[0];
        posicionFinal = bloque[1];

        if(isPasoAPaso){
            posicionesBloquesPasoAPaso = posicionesBloques;
            listaCeldasPasoAPaso = listaCeldas;
            bloquePasoAPaso = bloquePasoAPaso;
            posicionInicialPasoAPaso = posicionInicial;
            posicionFinalPasoAPaso = posicionFinal;
            solicitudesRealizadasPasoAPaso = solicitudesRealizadas;
            solicitudesAgregadasPasoAPaso = solicitudesAgregadas;
            tabla = tablaEntrada;
            break;
        }
    } 

    let parrafoResultado = crearParrafoResultado("Ajuste de Solicitudes",itemAlgoritmoAjuste,tablaEntrada,listaCeldas,isPasoAPaso);
    return [listaCeldas,parrafoResultado];
}

function realizarPrimerAjusteSobreSolicitudes(solicitudesAgregadas,tablaEntrada,posicionSolicitud,tamanioBloque){
    
    for (let index = 0; index < tablaEntrada.length; index++) {
        if(tablaEntrada[index].solicita!="--" && tablaEntrada[index].solicita!=""){
            let tamanioSolicitud = parseInt(tablaEntrada[index].solicita);
            let diferencia = tamanioBloque-tamanioSolicitud;
            let EssolicitudExistente = solicitudesAgregadas.indexOf(tablaEntrada[index].proceso);
            if(diferencia>=0 && EssolicitudExistente==-1){
                posicionSolicitud=index;
                break;
            }
        } 
    }
    return posicionSolicitud;
}

function realizarMejorAjusteSobreSolicitudes(solicitudesAgregadas,tablaEntrada,posicionSolicitud,tamanioBloque){
    let diferenciaMenor=-1;
    for (let index = 0; index < tablaEntrada.length; index++) {
        if(tablaEntrada[index].solicita!="--" && tablaEntrada[index].solicita!=""){
            let tamanioSolicitud = parseInt(tablaEntrada[index].solicita);
            let diferencia = tamanioBloque-tamanioSolicitud;
            let EssolicitudExistente = solicitudesAgregadas.indexOf(tablaEntrada[index].proceso);
            if(diferencia>=0 && (diferencia<diferenciaMenor || diferenciaMenor===-1) && EssolicitudExistente==-1){
                posicionSolicitud=index;
                diferenciaMenor=diferencia;
            }
        } 
    }
    return posicionSolicitud;
}

function realizarPeorAjusteSobreSolicitudes(solicitudesAgregadas,tablaEntrada,posicionSolicitud,tamanioBloque){
    let diferenciaMayor=-1;
    for (let index = 0; index < tablaEntrada.length; index++) {
        if(tablaEntrada[index].solicita!="--" && tablaEntrada[index].solicita!=""){
            let tamanioSolicitud = parseInt(tablaEntrada[index].solicita);
            let diferencia = tamanioBloque-tamanioSolicitud;
            let EssolicitudExistente = solicitudesAgregadas.indexOf(tablaEntrada[index].proceso);
            if(diferencia>=0 && (diferencia > diferenciaMayor || diferenciaMayor === -1) && EssolicitudExistente==-1){
                posicionSolicitud=index;
                diferenciaMayor=diferencia;
            }
        } 
    }
    return posicionSolicitud;
}

function realizarLiberacionAjusteSolicitudes(tablaEntrada){
    let index = parseInt(Math.random() * 3);
    let proceso = listaCeldas[index];
    let posicionLiberar = listaCeldas.indexOf(proceso);
    let posicionFinal = 0;
    while(posicionLiberar!=-1){
        if(posicionLiberar!=-1){
            posicionFinal=posicionLiberar;
        }
        listaCeldas[posicionLiberar]="";
        posicionLiberar = listaCeldas.indexOf(proceso);
    }
}

function realizarLiberacionPosicionesBloque(posicionInicial,posicionFinal){
    let posicion = -1;
    for (var index = 0; index < posicionesBloques.length; index+=2) {
        if(posicionesBloques[index]>=posicionInicial && posicionesBloques[index+1]>=posicionFinal)
            posicion=index;
    }
    if(posicion!=-1)
        posicionesBloques.splice(posicion, 2);
}

function realizarSolicitudAjusteSolicitudes(tablaEntrada,index,posicionInicial,solicitudesAgregadas){
    let cantidadDeEspacios =parseInt(tablaEntrada[index].solicita)+posicionInicial;
    for (let index_k = posicionInicial; index_k < cantidadDeEspacios; index_k++) {
        listaCeldas[index_k]=tablaEntrada[index].proceso; 
        solicitudesAgregadas.push(tablaEntrada[index].proceso);
    }
    realizarLiberacionPosicionesBloque(posicionInicial,cantidadDeEspacios-1);
}



function encontrarBloquesDeMemoria (){
    let posicionInicial =-1;
    let posicionFinal =-1;
    for (var index = 0; index < listaCeldas.length; index++) {
        if(( listaCeldas[index]==null|| listaCeldas[index]==="" ) && posicionInicial===-1){
            posicionInicial=index;
        }
        if(listaCeldas[index]!=null && listaCeldas[index]!="" && posicionInicial!=-1){
            posicionFinal=index-1;
            if(isBloqueExistente(posicionInicial,posicionFinal)==false){
                break;
            }
            posicionInicial =-1;
            posicionFinal =-1;
        } 
    }
    if(index===listaCeldas.length){
        posicionFinal=index-1;
    }
    if(isBloqueExistente(posicionInicial,posicionFinal)){
        return [-1,-1]
    }
    posicionesBloques.push(posicionInicial);
    posicionesBloques.push(posicionFinal);
    return [posicionInicial,posicionFinal];   
}

function isBloqueExistente(posicionInicial,posicionFinal){
    for (var index = 0; index < posicionesBloques.length; index+=2) {
        if(posicionesBloques[index]==posicionInicial && posicionesBloques[index+1]==posicionFinal){
            return true;
        }
    }
    return false;
}

export function validarCantidadCeldas(textCantidadCeldas){
    if(textCantidadCeldas===""){
        return false;
    }

    if(parseInt(textCantidadCeldas)===0){
        return false;
    }
    return true;
}

export function contieneLiberarTablaEntrada(tablaEntrada){

    for (let index = 0; index < tablaEntrada.length; index++) {
        if(tablaEntrada[index].solicita=="--" || tablaEntrada[index].solicita==""){
            return true;
        } 
    }

    return false;
}   

export function asignarCantidadCeldasMemoria(cantidadCeldasMemoria){
    listaCeldas = new Array(parseInt(cantidadCeldasMemoria));
 }

/**
 * Funcionalidades y variables de los algortimos de Creacion y Particiones de Discos.
 * @author Kevin David Sanchez Solis
 * @author Anderson Ramirez Vasquez
 */

//--------------------------------------Importaciones----------------------------------------------------

import React from 'react';

//--------------------------------------Variables--------------------------------------------------------

// Log de particiones 
export var logDiscos = new Array();
//Variable que almacena los discos creados [nombre, tamaño, tipo]
export var discosCreados =  new Array();
//Variable que almacena los discos creados [nombre, tamaño, tipo]
export var memoriaDiscos =  new Array();
//Arreglo de arreglos que almacena las particiones de los discos[[particion1, particion1][particion]...]
export var particiones    =  [];
//Arreglo de parametros de los discos = [[Particion primaria, Extendida, Logica, tamaño particion extendida] [] [] ...]
export var especificacionesDisco     =  new Array();
//Tamaño maximo del disco MBR (MB)
var tamañoDiscoMBR = 2048;
//Cantidad maxima de particiones primarias en un disco MBR
var mbrPrimarias   = 4;
//Cantidad maxima de particiones Extendidas en en disco MBR
var mbrExtendidas  = 1;
//Cantidad maxima de particiones logicas en un disco MBR
var mbrLogicas     = 20;
//Cantidad maxima de particiones primarias en un disco Gpt
var gptPrimarias   = 128;
// Indice
var Indice = 1;

var listaIndices = [];

var posicionDiscoEnParticiones = [];

//--------------------------------------Metodos----------------------------------------------------------

export function encontrarDisco(nombreDisco){
    let posicionDisco = -1;
    for (let index = 0; index < memoriaDiscos.length; index++) {
        if(memoriaDiscos[index][5]===nombreDisco){
            return index;
        }
    }
    return posicionDisco;
}

export function obtenerNombreDiscosCreados(){
    let nombres = [];
    for (let index = 0; index < discosCreados.length; index++) {
        nombres.push(discosCreados[index]['nombre']);
    }
    return nombres;
}

/**
 * Crea disco
 *
 * @param {*} tipoDisco MBR - GPT
 * @param {*} nombreDisco Nombre del disco
 * @param {*} tamaño Tamaño del disco
 */
export  function  crearDisco(tipoDisco, nombreDisco, tamanioDisco) {

    let posicionDisco = encontrarDisco(nombreDisco);
    if(posicionDisco===-1){
        posicionDisco = memoriaDiscos.length;
    }else{
        alert('Ya existe un disco con este nombre.');
        return -1;
    }
    
    // Valida si existe el disco
    discosCreados.push();
    if (discosCreados[posicionDisco]) {
        alert('Ya existe un disco con este nombre.');
        return -1;
    }

    //Se agrega registro en el log del disco
    logDiscos[nombreDisco] = `Se crea el disco ${nombreDisco} con tamaño ${tamanioDisco} y de tipo ${tipoDisco}. \n`;

    // Ingresa el disco creado
    discosCreados[posicionDisco] = {
        'tipo': tipoDisco,
        'nombre': nombreDisco,
        'tamaño': tamanioDisco
    };

    // Agrega espacio de memoria usada para el disco creado
    memoriaDiscos.push();
    memoriaDiscos[posicionDisco] = new Array(7);
    memoriaDiscos[posicionDisco][2] = tamanioDisco;
    memoriaDiscos[posicionDisco][5] = nombreDisco;
    memoriaDiscos[posicionDisco][6] = tipoDisco;

    memoriaDiscos[posicionDisco][0] = tamanioDisco;
   
    listaIndices.push(0);
    particiones.push();
    particiones[particiones.length] = new Array(3);

    // Array de datos
    let datos;
    // Valida si el disco es GPT
    if (tipoDisco == "GPT") {
        // Asigna los datos para disco Gpt
        datos = {
            'tipo': tipoDisco,
            'gptPrimarias': gptPrimarias
        }
    } else {
        // Asigna los datos para disco MBR
        datos = {
            'tipo': tipoDisco,
            'mbrPrimarias': mbrPrimarias,
            'mbrExtendidas': mbrExtendidas,
            'mbrLogicas': mbrLogicas
        }
    }

    // Agrega las especificaciones del disco
    especificacionesDisco.push();
    especificacionesDisco[posicionDisco] = datos;

    
    let discos = obtenerDiscosMemoria();
     
    return [discos,particiones];
}

function obtenerDiscosMemoria(){
    let discos = [];
    for (let index = 0; index < memoriaDiscos.length; index++) {
        discos.push();
        discos[index] = [ memoriaDiscos[index][5] ,memoriaDiscos[index][2] , memoriaDiscos[index][6] ];
    }

    return discos;
}

/**
 * Elimina informacion del disco seleccionado
 * @param {*} disco nombre del disco seleccionado
 */
export function eliminarDisco(disco) {

    let posicionDisco = encontrarDisco(disco);
    if(posicionDisco===-1){
        alert('Debe crear un disco primero.');
        return -1;
    }

    //Se agrega registro en el log del disco
    logDiscos[disco] += `Se elimina el disco. \n`;
    // Elimina la informacion del disco seleccionado
   
    particiones.splice(posicionDisco,1);
    memoriaDiscos.splice(posicionDisco,1);
    especificacionesDisco.splice(posicionDisco,1);
    discosCreados.splice(posicionDisco,1);
    listaIndices.splice(posicionDisco,1);

    console.log("Log discos");
    console.log(logDiscos);

    let discos = obtenerDiscosMemoria();

    return [discos,particiones];
}

function obtenerSistemaArchivoLog (particion,tipoParticion){
    if(tipoParticion=="Extendida"){
        return "";
    }
    return " Sistema de archivos: "+particion[6];
}

export function crearLogDeEditar(disco,particion){
    logDiscos[disco] += 
    "Se edita una partición con los siguientes valores; tamaño: "+particion[0]+particion[1]+particion[2]
    +" - tipo de partición: "+particion[4]+ " - nombre de partición: "+particion[5]+obtenerSistemaArchivoLog(particion,particion[4])
    +" - Etiqueta: "+particion[7]+"\n";
}

function existeParticionEnDisco(posicionDisco,nombreParticion) {
    for (let index = 0; index < particiones[posicionDisco].length; index++) {
        if(particiones[posicionDisco][index]){
            if (particiones[posicionDisco][index][5] === nombreParticion) {
                return true;
            }
        }
    }

    return false;
}

function obtenerBackGoundColorParticion(tipo){

    switch (tipo) {
        case "Fat32":
            return "#31FF03";
        case "NTFS":
            return "#48e4ad";
        case "exFAT":
            return "#31b44c";
        case "Ext2":
            return "#9db8d2";
        case "Ext3":
            return "#8294af";
        case "Ext4":
            return "#486884";
        case "HFS+":
            return "#c0a39e";
        default:
            return "#FFFFFF";
      }
}

function obtenerBackGoundColorParticionLogica(tipo){

    switch (tipo) {
        case "Fat32":
            return "#B8FFAB";
        case "NTFS":
            return "#54FFC3";
        case "exFAT":
            return "#99E8AA";
        case "Ext2":
            return "#CADAEB";
        case "Ext3":
            return "#B3BBC7";
        case "Ext4":
            return "#6B96BD";
        case "HFS+":
            return "#DBB8B2";
        default:
            return "#FFFFFF";
      }
}


function establecerFlexParticion(discos,particiones,indiceDisco,indiceParticion){
    let tamanioDisco = discos[indiceDisco][1];
    let tamanioParticion = particiones[indiceDisco][indiceParticion][1];
    let indiceRealParticion = (tamanioParticion/tamanioDisco);

    return (indiceRealParticion);
}


function establecerFlexParticionLogica(tamanioParticionExtendida,particiones,indiceDisco,indiceParticion){
    let tamanioParticion = particiones[indiceDisco][indiceParticion][1];
    let indiceRealParticion = (tamanioParticion/tamanioParticionExtendida);

    return (indiceRealParticion);
}

function contieneParticionExtentida(posicionDisco,particiones){
    for (let index = 0; index < particiones[posicionDisco].length; index++) {
        if(particiones[posicionDisco][index]!=undefined){
            if(particiones[posicionDisco][index][4]==="Extendida"){
                return [true, particiones[posicionDisco][index][1]];
            }
        }
    }

    return [false,0];
}

function obtenerParticionesLogicas(tamanioParticionExtendida,posicionDisco,particiones){
    let particionesLogicas = [];
    
    let index =0;
    for (let index_j = 0; index_j < particiones[posicionDisco].length; index_j++) {
        if(particiones[posicionDisco][index_j]!=undefined){
            if(particiones[posicionDisco][index_j][4]==="Logica"){
                particionesLogicas.push(new Array(3));
                //particionesLogicas[index][0] = particiones[0][index_j][5]+particiones[posicionDisco][index_j][4]+particiones[posicionDisco][index_j][1]+" MB";
                particionesLogicas[index][0] = particiones[posicionDisco][index_j][1]+" MB";
                particionesLogicas[index][1] = obtenerBackGoundColorParticionLogica(particiones[posicionDisco][index_j][6]);
                particionesLogicas[index][2] = establecerFlexParticionLogica(tamanioParticionExtendida,particiones,posicionDisco,index_j);
                index++;
            }
        }
    }
    return particionesLogicas;
}

export function inicializarTablaStyles(nombreDisco,discos, particiones){

    let posicionDisco = encontrarDisco(nombreDisco);
    let disco = discos[posicionDisco];

    let tablaFinal = [];
    let particionesExt = [];
    particionesExt = new Array(4);
    particionesExt[0] = new Array(1);

        tablaFinal.push();
        tablaFinal[0] = new Array(1);
        tablaFinal[0][0] = "Nombre del disco: "+disco[0]+"    Tamaño: "+ disco[1]+" MB"+ "    Tipo del disco: "+disco[2];
        tablaFinal.push([]);

        let resultado = contieneParticionExtentida(posicionDisco,particiones);
        let hayParticionExt = resultado[0];
        if(hayParticionExt){
            //particionesExt = new Array(4);
            particionesExt[1] = obtenerParticionesLogicas(resultado[1],posicionDisco,particiones);
        }

        let index = 0;
        for (let index_j = 0; index_j < particiones[posicionDisco].length; index_j++) {
            if(particiones[posicionDisco][index_j]!=undefined){
                if(particiones[posicionDisco][index_j][4]==="Primaria" || particiones[posicionDisco][index_j][4]===""){
                    tablaFinal[1].push();
                    tablaFinal[1][index] = new Array(3);
                    //tablaFinal[1][index][0] = particiones[0][index_j][5]+particiones[posicionDisco][index_j][4]+particiones[posicionDisco][index_j][1]+" MB";
                    tablaFinal[1][index][0] = particiones[posicionDisco][index_j][1]+" MB";
                    tablaFinal[1][index][1] = obtenerBackGoundColorParticion(particiones[posicionDisco][index_j][6]);
                    tablaFinal[1][index][2] = establecerFlexParticion(discos,particiones,posicionDisco,index_j);
                    index++;
                }else if(particiones[posicionDisco][index_j][4]==="Extendida"){
                    //particionesExt[0] = particiones[0][index_j][5]+particiones[posicionDisco][index_j][4]+particiones[posicionDisco][index_j][1]+" MB";
                    particionesExt[0][0] = particiones[posicionDisco][index_j][1]+" MB";
                    particionesExt[2] = obtenerBackGoundColorParticion(particiones[posicionDisco][index_j][6]);
                    particionesExt[3] = establecerFlexParticion(discos,particiones,posicionDisco,index_j);
                }
            }
        }

        let ytf = particionesExt.length;

    return [tablaFinal,particionesExt];
}

export function modificarEstadoParticionDisco(estado,index,posicionDisco){
    particiones[posicionDisco][index][8] = estado;
}

export function setParticiones(particionesNuevas){
    particiones = particionesNuevas;
}

function validarExtendida(disco,posicionDisco,particion,particionAnterior){
    // Valida si la particion es extendida
    if (particion[4] == 'Extendida') {

        if(particionAnterior[4] == 'Extendida'){
            especificacionesDisco[posicionDisco].mbrExtendidas++;
        }

        // Valida si ya se creo una particion extendida
        if (especificacionesDisco[posicionDisco].mbrExtendidas == 0 ) {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se notifica error, por que ya existe una partición extendida creada. \n`;
            return true;
            //alert('El disco MBR sólo admite una particion extendida.')
        }
        // Disminuye capacidad de particiones
        especificacionesDisco[posicionDisco].mbrExtendidas--;
    }
    return false;
}


function validarLogica(disco,posicionDisco,particion){
    // Valida si la particion es logica
    if (particion[4] == 'Logica') {
        // Valida si aun no se ha creado una particion extendida
        if (especificacionesDisco[posicionDisco].mbrExtendidas > 0 ) {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se notifica error, ya que para crear una partición lógica, primero se debe crear una extendida. \n`;
            return true;
            //alert('Para crear una partición lógica, primero debe crear una extendida.');
        }
        // Disminuye capacidad de particiones
        especificacionesDisco[posicionDisco].mbrLogicas--;
    }
    return false;
}

function validarPrimaria(disco,posicionDisco,particion){
    // Valida si la particion es primaria
    if (particion[4] == 'Primaria') {
        // Valida si se alcanzo el tope de particiones primarias
        if (especificacionesDisco[posicionDisco].mbrPrimarias == 0 ) {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se notifica error, por que se alcanzó el tope de particiones primarias en el disco. \n`;
            return true;
            //alert('Ya se alcanzó el tope (4) de particiones primarias en el disco.');
        }
        // Disminuye capacidad de particiones
        especificacionesDisco[posicionDisco].mbrPrimarias--;
    }
    return false;
}

export function modificarParticiones(disco,particion,particionAnterior,posicionDisco){

    if(validarExtendida(disco,posicionDisco,particion,particionAnterior)){
        return "El disco MBR sólo admite una particion extendida.";
    }

    if(validarLogica(disco,posicionDisco,particion)){
        return "Para crear una partición lógica, primero debe crear una extendida.";
    }
    
    if(validarPrimaria(disco,posicionDisco,particion)){
        return "Para crear una partición lógica, primero debe crear una extendida.";
    }

    if(particionAnterior[4] == 'Logica'){
        especificacionesDisco[posicionDisco].mbrLogicas++;
    }

    if(particionAnterior[4] == 'Extendida' && (particion[4] != 'Extendida') ){
        
        for (let index = 0; index < particiones[posicionDisco].length; index++) {
            if(particiones[posicionDisco][index]!=undefined){
                if(particiones[posicionDisco][index][4]=="Logica"){
                    eliminarParticion(disco,index);
                    index--;
                }
            }
        }
        
        especificacionesDisco[posicionDisco].mbrExtendidas++;
    }
   

    if(particionAnterior[4] == 'Primaria'){
        especificacionesDisco[posicionDisco].mbrPrimarias++;
    }
    
    return "";
}

function excedeEspacioEnExtendida(posicionDisco,tamanioParticionNueva){
    let tamanioLogicas = 0;
    let tamanioExtendida = 0;
    for (let index = 0; index < particiones[posicionDisco].length; index++) {
        if(particiones[posicionDisco][index]!=undefined && particiones[posicionDisco][index][4]=="Logica"){
            tamanioLogicas+= particiones[posicionDisco][index][1];
        }
        if(particiones[posicionDisco][index]!=undefined && particiones[posicionDisco][index][4]=="Extendida"){
            tamanioExtendida= particiones[posicionDisco][index][1];
        }
    }

    if( (tamanioLogicas+tamanioParticionNueva) > tamanioExtendida){
        return true;
    }
    
    return false;
}

export function deshabilitarChecks(posDisco,posicionParticion){
    for (let index = 0; index < particiones[posDisco].length; index++) {
        if(particiones[posDisco][index]!=undefined && index!=posicionParticion ){
            particiones[posDisco][index][9] = false;
        }
    }
    return particiones;
}

export function habilitarChecks(posDisco){
    for (let index = 0; index < particiones[posDisco].length; index++) {
        if(particiones[posDisco][index]!=undefined ){
            particiones[posDisco][index][9] = true;
        }
    }
    return particiones;
}

/**
 * Ingresa una particion al disco
 *
 * @param {*} disco nombre del disco
 * @param {*} particion datos de la particion
 */
export function ingresarParticion(disco, particion) {

    if(particion['espacioLibre'] == "" && particion['espacioLibreAcontinuacion'] == "" && particion['tamañoNuevo'] == ""){
        alert("Ingrese por lo menos el tamaño de una partición");
        return -1;
    }

    let sumaEspacio = 0;

    if (particion['espacioLibre'] != "") {
        //Se agrega registro en el log del disco
        logDiscos[disco] += `Se solicita crear la partición ${'LibreAntes'+Indice} de tamaño ${particion['espacioLibre']}. \n`;
        sumaEspacio += particion['espacioLibre'];
    }

    //Se agrega registro en el log del disco
    logDiscos[disco] += `Se solicita crear la partición ${particion['nombreParticion']} de tamaño ${particion['tamañoNuevo']}. \n`;

    if (particion['espacioLibreAcontinuacion'] != "") {
        //Se agrega registro en el log del disco
        logDiscos[disco] += `Se solicita crear la partición ${'LibreDespues'+Indice} de tamaño ${particion['espacioLibreAcontinuacion']}. \n`;
        sumaEspacio += particion['espacioLibreAcontinuacion'];
    }

    sumaEspacio += particion['tamañoNuevo'];
    
    // Obtiene nombre de la partcion
    let nombreParticion = particion['nombreParticion'];

    let posicionDisco = encontrarDisco(disco);
    if(posicionDisco===-1){
        alert('Debe crear un disco primero.');
        return -1;
    }

    // Valida si la partcion excede el espacio libre del disco
    if (memoriaDiscos[posicionDisco][0] < sumaEspacio) {
        //Se agrega registro en el log del disco
        logDiscos[disco] += `Se notifica error por que la partición excede el espacio disponible en el disco. \n`;
        alert('El tamaño de la partición es superior al espacio disponible en el disco.');
        return -1;
    }
   
    let esParticionRepetida = existeParticionEnDisco(posicionDisco,nombreParticion);

    if (esParticionRepetida) {
        //Se agrega registro en el log del disco
        logDiscos[disco] += `Se notifica error por que ya existe una particion con el mismo nombre en el disco. \n`;
        alert('Ya existe una particion con ese nombre en el disco.');
        return -1;
    }

    // Valida si el disco es GPT
    if (discosCreados[posicionDisco].tipo == "GPT") {
        // Valida si la particion es diferente de primaria
        if (particion['tipoParticion'] != 'Primaria') {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se notifica error, ya que los discos GPT solo admiten particiones primarias. \n`;
            alert('El disco GPT solo admite particiones primarias');
            return -1;
        }
        // Valida tope de particiones que se pueden crear
        if (especificacionesDisco[posicionDisco].gptPrimarias == 0) {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se notifica error, se alcanzó el limite de particiones (128) en el disco. \n`;
            alert('Tope de particiones (128) alcanzadas en el disco.')
            return -1;
        }

        // Valida si ya existe el espacio para las particiones del disco
        if (particion['espacioLibre'] != "") {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se crea la partición ${'LibreAntes'+Indice} en el disco. \n`;
            // Ingresa la particion
            particiones[posicionDisco][ listaIndices[posicionDisco] ] = [
                "",
                particion['espacioLibre'],
                "",
                "",
                "",
                "",
                "",
                "",
                false,
                true,
            ];
            listaIndices[posicionDisco]=listaIndices[posicionDisco]+1;

            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][1] = particion['espacioLibre'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['espacioLibre'];
        }

        //Se agrega registro en el log del disco

        if(particion['tamañoNuevo'] != ""){
            logDiscos[disco] += `Se crea la partición en el disco. \n`;
      

            particiones[posicionDisco][ listaIndices[posicionDisco] ] = [
                particion['espacioLibre'] ? particion['espacioLibre'] : "",
                particion['tamañoNuevo'] ? particion['tamañoNuevo'] : "",
                particion['espacioLibreAcontinuacion'] ? particion['espacioLibreAcontinuacion'] : "",
                particion['alinea'] ? particion['alinea'] : "",
                particion['tipoParticion'] ? particion['tipoParticion'] : "",
                particion['nombreParticion'] ? particion['nombreParticion'] : "",
                particion['tipoSistemaArchivos'] ? particion['tipoSistemaArchivos'] : "",
                particion['etiqueta'] ? particion['etiqueta'] : "", 
                false,
                true,
            ];
            listaIndices[posicionDisco]=listaIndices[posicionDisco]+1;
            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][4] = particion['tamañoNuevo'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['tamañoNuevo'];
            especificacionesDisco[posicionDisco].gptPrimarias--;
        }

        if (particion['espacioLibreAcontinuacion'] != "") {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se crea la partición ${'LibreDespues'+Indice} en el disco. \n`;
            // Ingresa la particion

            particiones[posicionDisco][ listaIndices[posicionDisco] ] = [
                "",
                particion['espacioLibreAcontinuacion'],
                "",
                "",
                "",
                "",
                "",
                "",
                false,
                true,
            ];
            listaIndices[posicionDisco]=listaIndices[posicionDisco]+1;
            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][3] = particion['espacioLibreAcontinuacion'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['espacioLibreAcontinuacion'];
        }

        if (particion['espacioLibreAcontinuacion'] != "" || particion['espacioLibre'] != "") {
            Indice++;
        }

    } else {

        if(particion['tamañoNuevo'] != ""){
            // Valida si la particion es extendida
            if (particion['tipoParticion'] == 'Extendida') {
                // Valida si ya se creo una particion extendida
                if (especificacionesDisco[posicionDisco].mbrExtendidas == 0 ) {
                    //Se agrega registro en el log del disco
                    logDiscos[disco] += `Se notifica error, por que ya existe una partición extendida creada. \n`;
                    alert('El disco MBR sólo admite una particion extendida.');
                    return -1;
                }
                // Disminuye capacidad de particiones
                especificacionesDisco[posicionDisco].mbrExtendidas--;
            }
            // Valida si la particion es logica
            if (particion['tipoParticion'] == 'Logica') {
                // Valida si aun no se ha creado una particion extendida
                if (especificacionesDisco[posicionDisco].mbrExtendidas > 0 ) {
                    //Se agrega registro en el log del disco
                    logDiscos[disco] += `Se notifica error, ya que para crear una partición lógica, primero se debe crear una extendida. \n`;
                    alert('Para crear una partición lógica, primero debe crear una extendida.');
                    return -1;
                }

                if(excedeEspacioEnExtendida(posicionDisco, parseInt(particion['tamañoNuevo']) )){
                
                    alert("El tamaño de la partición lógica excede la capacidad de la partición extendida");
                    return -1;
                }

                // Disminuye capacidad de particiones
                especificacionesDisco[posicionDisco].mbrLogicas--;
            }
        
            // Valida si la particion es primaria
            if (particion['tipoParticion'] == 'Primaria') {
                // Valida si se alcanzo el tope de particiones primarias
                if (especificacionesDisco[posicionDisco].mbrPrimarias == 0 ) {
                    //Se agrega registro en el log del disco
                    logDiscos[disco] += `Se notifica error, por que se alcanzó el tope de particiones primarias en el disco. \n`;
                    alert('Ya se alcanzó el tope (4) de particiones primarias en el disco.');
                    return -1;
                }
                // Disminuye capacidad de particiones
                especificacionesDisco[posicionDisco].mbrPrimarias--;
            }
        }

        // Valida si ya existe el espacio para las particiones del disco
       
        if (particion['espacioLibre'] != "") {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se crea la partición ${'LibreAntes'+Indice} en el disco. \n`;
            // Ingresa la particion

            particiones[posicionDisco][listaIndices[posicionDisco]] = [
                "",
                particion['espacioLibre'],
                "",
                "",
                "",
                "",
                "",
                "",
                false,
                true,
            ];
            listaIndices[posicionDisco]=listaIndices[posicionDisco]+1

            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][1] = particion['espacioLibre'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['espacioLibre'];
        }

        if(particion['tamañoNuevo'] != ""){
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se crea la partición en el disco. \n`;

            if (particion['tipoParticion'] == 'Extendida') {
                particiones[posicionDisco][ listaIndices[posicionDisco] ] = [
                    particion['espacioLibre'] ? particion['espacioLibre'] : "",
                    particion['tamañoNuevo'] ? particion['tamañoNuevo'] : "",
                    particion['espacioLibreAcontinuacion'] ? particion['espacioLibreAcontinuacion'] : "",
                    particion['alinea'] ? particion['alinea'] : "",
                    particion['tipoParticion'] ? particion['tipoParticion'] : "",
                    particion['nombreParticion'] ? particion['nombreParticion'] : "",
                    particion['tipoSistemaArchivos'] ? "" : "",
                    particion['etiqueta'] ? particion['etiqueta'] : "",
                    false,
                    true,
                ];
            }else{
                particiones[posicionDisco][ listaIndices[posicionDisco] ] = [
                    particion['espacioLibre'] ? particion['espacioLibre'] : "",
                    particion['tamañoNuevo'] ? particion['tamañoNuevo'] : "",
                    particion['espacioLibreAcontinuacion'] ? particion['espacioLibreAcontinuacion'] : "",
                    particion['alinea'] ? particion['alinea'] : "",
                    particion['tipoParticion'] ? particion['tipoParticion'] : "",
                    particion['nombreParticion'] ? particion['nombreParticion'] : "",
                    particion['tipoSistemaArchivos'] ? particion['tipoSistemaArchivos'] : "",
                    particion['etiqueta'] ? particion['etiqueta'] : "",
                    false,
                    true,
                ];
            }

            listaIndices[posicionDisco]=listaIndices[posicionDisco]+1;

            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][4] = particion['tamañoNuevo'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['tamañoNuevo'];
        }
        
        if (particion['espacioLibreAcontinuacion'] != "") {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se crea la partición ${'LibreDespues'+Indice} en el disco. \n`;
            // Ingresa la particion

            particiones[posicionDisco][listaIndices[posicionDisco]] = [
                "",
                particion['espacioLibreAcontinuacion'],
                "",
                "",
                "",
                "",
                "",
                "",
                false,
                true,
            ];
            listaIndices[posicionDisco]=listaIndices[posicionDisco]+1;
            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][3] = particion['espacioLibreAcontinuacion'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['espacioLibreAcontinuacion'];
        }

        if (particion['espacioLibreAcontinuacion'] != "" || particion['espacioLibre'] != "") {
            Indice++;
        }
    }

    let discos =  obtenerDiscosMemoria();

    return [discos,particiones];
}



/**
 * Elimina una particion de un disco
 * @param {*} disco nombre de disco
 * @param {*} nombreParticion nombre de la particion a eliminar
 */
export function eliminarParticion(disco, index) {


    let posicionDisco = encontrarDisco(disco);
    if(posicionDisco===-1){
        alert('El disco no existe !');
        return -1;
    }

    if(particiones[posicionDisco][index][4]=="Extendida"){
        for (let index = 0; index < particiones[posicionDisco].length; index++) {
            if(particiones[posicionDisco][index]!=undefined){
                if(particiones[posicionDisco][index][4]=="Logica"){
                    eliminarParticion(disco,index);
                    index--;
                }
            }
        }    
    }

    //Se agrega registro en el log del disco
    logDiscos[disco] += `Se solicita eliminar la partición ${index} del disco ${disco}. \n`;

    // Aumenta la memoria libre del disco segun el espacio liberado por la particion
    memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] + particiones[posicionDisco][ index ][1];

    // Valida si el disco es tipo GPT
    if (discosCreados[posicionDisco].tipo == 'GPT') {
        //Se agrega registro en el log del disco
        logDiscos[disco] += ` Se aumenta en el disco la cantidad de particiones primarias disponibles. \n`;
        // Aumenta el tipo de partcion liberada
        especificacionesDisco[posicionDisco]['gptPrimarias']++;
    }
    // El disco es tipo MBR
    else {
        // Valida si el tipo de particion a eliminar es primaria
        if (particiones[posicionDisco][index][4] == 'Primaria') {
            //Se agrega registro en el log del disco
            logDiscos[disco] += ` Se aumenta en el disco la cantidad de particiones primarias disponibles. \n`;
            // Aumenta el tipo de partcion liberada
            especificacionesDisco[posicionDisco]['mbrPrimarias']++;
        }
        // Valida si el tipo de particion a eliminar es logica
        else if (particiones[posicionDisco][index][4] == 'Logica') {
            //Se agrega registro en el log del disco
            logDiscos[disco] += ` Se aumenta en el disco la cantidad de particiones lógicas disponibles. \n`;
            // Aumenta el tipo de partcion liberada
            especificacionesDisco[posicionDisco]['mbrLogicas']++;
        }
        // Valida si el tipo de particion a eliminar es extendida
        else if (particiones[posicionDisco][index][4] == 'Extendida'){
            //Se agrega registro en el log del disco
            logDiscos[disco] += ` Se aumenta en el disco la cantidad de particiones extendidas disponibles. \n`;
            // Aumenta el tipo de partcion liberada
            especificacionesDisco[posicionDisco]['mbrExtendidas']++;
        }
    }

    //Se agrega registro en el log del disco
    logDiscos[disco] += `Se elimina completamente la partición del disco. \n`;
    
    // Elimina la informacion del array de particiones del disco
    particiones[posicionDisco].splice(index,1);
    // Elimina del array de memoria del disco la particion
    delete memoriaDiscos[posicionDisco][4];

    listaIndices[posicionDisco]=listaIndices[posicionDisco]-1;

    let discos = obtenerDiscosMemoria();

    return [discos,particiones];
}

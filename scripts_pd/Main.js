/**
 * Funcionalidades y variables de los algortimos de Creacion y Particiones de Discos.
 * @author Kevin David Sanchez Solis
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
var especificacionesDisco     =  new Array();
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

/**
 * Crea disco
 *
 * @param {*} tipoDisco MBR - GPT
 * @param {*} nombreDisco Nombre del disco
 * @param {*} tamaño Tamaño del disco
 */
export function crearDisco(tipoDisco, nombreDisco, tamañoDisco) {

    let posicionDisco = encontrarDisco(nombreDisco);
    if(posicionDisco===-1){
        posicionDisco = memoriaDiscos.length;
    }else{
        return alert('Ya existe un disco con este nombre.');
    }
    
    // Valida si existe el disco
    if (discosCreados[nombreDisco]) {
        return alert('Ya existe un disco con este nombre.');
    }

    //Se agrega registro en el log del disco
    logDiscos[nombreDisco] = `Se crea el disco ${nombreDisco} con tamaño ${tamañoDisco} y de tipo ${tipoDisco}. \n`;

    // Ingresa el disco creado
    discosCreados[nombreDisco] = {
        'tipo': tipoDisco,
        'nombre': nombreDisco,
        'tamaño': tamañoDisco
    };

    // Agrega espacio de memoria usada para el disco creado
    memoriaDiscos.push();
    memoriaDiscos[posicionDisco] = new Array(7);
    memoriaDiscos[posicionDisco][2] = tamañoDisco;
    memoriaDiscos[posicionDisco][5] = nombreDisco;
    memoriaDiscos[posicionDisco][6] = tipoDisco;
   

    particiones.push();
    particiones[particiones.length] = new Array(3);
    /*
    memoriaDiscos[posicionDisco] = {
        'libre': tamañoDisco
    };
    */

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
    especificacionesDisco[nombreDisco] = datos;

    console.log("Discos");
    console.log(discosCreados);
    console.log("Particiones");
    console.log(particiones);
    console.log("memoria");
    console.log(memoriaDiscos);
    console.log("Especificacion");
    console.log(especificacionesDisco);
    console.log("Log discos");
    console.log(logDiscos);

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

    /*
    // Valida si no existe el disco
    if (!memoriaDiscos[disco]) {
        return alert('Debe crear un disco primero.');
    }
    */

    if(posicionDisco===-1){
        return alert('Debe crear un disco primero.');
    }
    

    //Se agrega registro en el log del disco
    logDiscos[disco] += `Se elimina el disco. \n`;
    // Elimina la informacion del disco seleccionado
    delete discosCreados[disco];
    delete memoriaDiscos[posicionDisco];
    delete especificacionesDisco[disco];

    // console.log("Discos");
    // console.log(discosCreados);
    // console.log("memoria");
    // console.log(memoriaDiscos);
    // console.log("Especificacion");
    // console.log(especificacionesDisco);
    console.log("Log discos");
    console.log(logDiscos);

    let discos = obtenerDiscosMemoria();

    return [discos,particiones];
}

function existeParticionEnDisco(posicionDisco,nombreParticion){
    for (let index = 0; index < particiones[posicionDisco].length; index++) {
        if(particiones[posicionDisco][index] === nombreParticion){
            return true;
        }
    }

    return false;
}

export function modificarEstadoParticionDisco(estado,index,posicionDisco){
    particiones[posicionDisco][index][8] = estado;
}

export function setParticiones(particionesNuevas){
    particiones = particionesNuevas;
}

/**
 * Ingresa una particion al disco
 *
 * @param {*} disco nombre del disco
 * @param {*} particion datos de la particion
 */
export function ingresarParticion(disco, particion) {


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
        return alert('Debe crear un disco primero.');
    }

    /*
    // Valida si no existe el disco
    if (!memoriaDiscos[disco]) {
        return alert('Debe crear un disco primero.');
    }
    */

    // Valida si la partcion excede el espacio libre del disco
    if (memoriaDiscos[posicionDisco][0] < sumaEspacio) {
        //Se agrega registro en el log del disco
        logDiscos[disco] += `Se notifica error por que la partición excede el espacio disponible en el disco. \n`;
        return alert('El tamaño de la partición es superior al espacio disponible en el disco.');
    }
    /*
    // Valida si existe el disco
    if (particiones[disco]) {
        // Valida si ya existe la particion
        
    }
    */

    let esParticionRepetida = existeParticionEnDisco(posicionDisco,nombreParticion);

    if (esParticionRepetida) {
        //Se agrega registro en el log del disco
        logDiscos[disco] += `Se notifica error por que ya existe una particion con el mismo nombre en el disco. \n`;
        return alert('Ya existe una particion con ese nombre en el disco.');
    }

    /*
    particiones.push();
    particiones[particiones.length] = new Array(3);
    */

    // Valida si el disco es GPT
    if (discosCreados[disco].tipo == "GPT") {
        // Valida si la particion es diferente de primaria
        if (particion['tipoParticion'] != 'Primaria') {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se notifica error, ya que los discos GPT solo admiten particiones primarias. \n`;
            return alert('El disco GPT solo admite particiones primarias');
        }
        // Valida tope de particiones que se pueden crear
        if (especificacionesDisco[disco].gptPrimarias == 0) {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se notifica error, se alcanzó el limite de particiones (128) en el disco. \n`;
            return alert('Tope de particiones (128) alcanzadas en el disco.')
        }

        // Valida si ya existe el espacio para las particiones del disco
        /*
        if (!particiones[disco]) {
            // Inicializa posicion del array
            particiones[disco] = {};
        }
        */

        if (particion['espacioLibre'] != "") {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se crea la partición ${'LibreAntes'+Indice} en el disco. \n`;
            // Ingresa la particion
            /*
            particiones[disco]['LibreAntes'+Indice] = {
                'espacioLibre': "",
                'tamañoNuevo': particion['espacioLibre'],
                'espacioLibreAcontinuacion': "",
                'alinea': "",
                'tipoParticion': "",
                'nombreParticion': 'LibreAntes'+Indice,
                'tipoSistemaArchivos': "",
                'etiqueta': ""
            };
            */

            particiones[posicionDisco][1] = [
                "",
                particion['espacioLibre'],
                "",
                "",
                "",
                "",
                "",
                "",
                false
            ];

            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][1] = particion['espacioLibre'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['espacioLibre'];
        }

        //Se agrega registro en el log del disco
        logDiscos[disco] += `Se crea la partición en el disco. \n`;
        // Ingresa la particion
        /*
        particiones[disco][nombreParticion] = {
            'espacioLibre': particion['espacioLibre'] ? particion['espacioLibre'] : "",
            'tamañoNuevo': particion['tamañoNuevo'] ? particion['tamañoNuevo'] : "",
            'espacioLibreAcontinuacion': particion['espacioLibreAcontinuacion'] ? particion['espacioLibreAcontinuacion'] : "",
            'alinea': particion['alinea'] ? particion['alinea'] : "",
            'tipoParticion': particion['tipoParticion'] ? particion['tipoParticion'] : "",
            'nombreParticion': particion['nombreParticion'] ? particion['nombreParticion'] : "",
            'tipoSistemaArchivos': particion['tipoSistemaArchivos'] ? particion['tipoSistemaArchivos'] : "",
            'etiqueta': particion['etiqueta'] ? particion['etiqueta'] : ""
        };
        */

        particiones[posicionDisco][2] = [
            particion['espacioLibre'] ? particion['espacioLibre'] : "",
            particion['tamañoNuevo'] ? particion['tamañoNuevo'] : "",
            particion['espacioLibreAcontinuacion'] ? particion['espacioLibreAcontinuacion'] : "",
            particion['alinea'] ? particion['alinea'] : "",
            particion['tipoParticion'] ? particion['tipoParticion'] : "",
            particion['nombreParticion'] ? particion['nombreParticion'] : "",
            particion['tipoSistemaArchivos'] ? particion['tipoSistemaArchivos'] : "",
            particion['etiqueta'] ? particion['etiqueta'] : "", 
            false
        ];
        // Setea los valores de memoria en el disco
        memoriaDiscos[posicionDisco][4] = particion['tamañoNuevo'];
        memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['tamañoNuevo'];
        especificacionesDisco[disco].gptPrimarias--;

       

        if (particion['espacioLibreAcontinuacion'] != "") {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se crea la partición ${'LibreDespues'+Indice} en el disco. \n`;
            // Ingresa la particion

            /*
            particiones[disco]['LibreDespues'+Indice] = {
                'espacioLibre': "",
                'tamañoNuevo': particion['espacioLibreAcontinuacion'],
                'espacioLibreAcontinuacion': "",
                'alinea': "",
                'tipoParticion': "",
                'nombreParticion': 'LibreDespues'+Indice,
                'tipoSistemaArchivos': "",
                'etiqueta': ""
            };*/

            particiones[posicionDisco][0] = [
                "",
                particion['espacioLibreAcontinuacion'],
                "",
                "",
                "",
                "",
                "",
                "",
                false
            ];

            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][3] = particion['espacioLibreAcontinuacion'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['espacioLibreAcontinuacion'];
        }

        if (particion['espacioLibreAcontinuacion'] != "" || particion['espacioLibre'] != "") {
            Indice++;
        }

    } else {

        // Valida si la particion es extendida
        if (particion['tipoParticion'] == 'Extendida') {
            // Valida si ya se creo una particion extendida
            if (especificacionesDisco[disco].mbrExtendidas == 0 ) {
                //Se agrega registro en el log del disco
                logDiscos[disco] += `Se notifica error, por que ya existe una partición extendida creada. \n`;
                return alert('El disco MBR sólo admite una particion extendida.');
            }
            // Disminuye capacidad de particiones
            especificacionesDisco[disco].mbrExtendidas--;
        }
        // Valida si la particion es logica
        if (particion['tipoParticion'] == 'Logica') {
            // Valida si aun no se ha creado una particion extendida
            if (especificacionesDisco[disco].mbrExtendidas > 0 ) {
                //Se agrega registro en el log del disco
                logDiscos[disco] += `Se notifica error, ya que para crear una partición lógica, primero se debe crear una extendida. \n`;
                return alert('Para crear una partición lógica, primero debe crear una extendida.');
            }
            // Disminuye capacidad de particiones
            especificacionesDisco[disco].mbrLogicas--;
        }
        // Valida si la particion es primaria
        if (particion['tipoParticion'] == 'Primaria') {
            // Valida si se alcanzo el tope de particiones primarias
            if (especificacionesDisco[disco].mbrPrimarias == 0 ) {
                //Se agrega registro en el log del disco
                logDiscos[disco] += `Se notifica error, por que se alcanzó el tope de particiones primarias en el disco. \n`;
                return alert('Ya se alcanzó el tope (4) de particiones primarias en el disco.');
            }
            // Disminuye capacidad de particiones
            especificacionesDisco[disco].mbrPrimarias--;
        }

        // Valida si ya existe el espacio para las particiones del disco
        /*
        if (!particiones[disco]) {
            // Inicializa posicion del array
            particiones[disco] = {};
        }*/

        if (particion['espacioLibre'] != "") {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se crea la partición ${'LibreAntes'+Indice} en el disco. \n`;
            // Ingresa la particion

            particiones[posicionDisco][1] = [
                "",
                particion['espacioLibre'],
                "",
                "",
                "",
                "",
                "",
                "",
                false
            ];

            /*
            particiones[disco]['LibreAntes'+Indice] = {
                'espacioLibre': "",
                'tamañoNuevo': particion['espacioLibre'],
                'espacioLibreAcontinuacion': "",
                'alinea': "",
                'tipoParticion': "",
                'nombreParticion': 'LibreAntes'+Indice,
                'tipoSistemaArchivos': "",
                'etiqueta': ""
            };
            */

            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][1] = particion['espacioLibre'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['espacioLibre'];
        }

        //Se agrega registro en el log del disco
        logDiscos[disco] += `Se crea la partición en el disco. \n`;

        particiones[posicionDisco][2] = [
            particion['espacioLibre'] ? particion['espacioLibre'] : "",
            particion['tamañoNuevo'] ? particion['tamañoNuevo'] : "",
            particion['espacioLibreAcontinuacion'] ? particion['espacioLibreAcontinuacion'] : "",
            particion['alinea'] ? particion['alinea'] : "",
            particion['tipoParticion'] ? particion['tipoParticion'] : "",
            particion['nombreParticion'] ? particion['nombreParticion'] : "",
            particion['tipoSistemaArchivos'] ? particion['tipoSistemaArchivos'] : "",
            particion['etiqueta'] ? particion['etiqueta'] : "",
            false
        ];

        /*
        // Ingresa la particion
        particiones[disco][nombreParticion] = {
            'espacioLibre': ,
            'tamañoNuevo': ,
            'espacioLibreAcontinuacion': ,
            'alinea': 
            'tipoParticion': 
            'nombreParticion': 
            'tipoSistemaArchivos': 
            'etiqueta': 
        };
        */
        // Setea los valores de memoria en el disco
        memoriaDiscos[posicionDisco][4] = particion['tamañoNuevo'];
        memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['tamañoNuevo'];

        
        if (particion['espacioLibreAcontinuacion'] != "") {
            //Se agrega registro en el log del disco
            logDiscos[disco] += `Se crea la partición ${'LibreDespues'+Indice} en el disco. \n`;
            // Ingresa la particion
            /*
            particiones[disco]['LibreDespues'+Indice] = {
                'espacioLibre': "",
                'tamañoNuevo': particion['espacioLibreAcontinuacion'],
                'espacioLibreAcontinuacion': "",
                'alinea': "",
                'tipoParticion': "",
                'nombreParticion': 'LibreDespues'+Indice,
                'tipoSistemaArchivos': "",
                'etiqueta': ""
            };
            */

            particiones[posicionDisco][0] = [
                "",
                particion['espacioLibreAcontinuacion'],
                "",
                "",
                "",
                "",
                "",
                "",
                false
            ];

            // Setea los valores de memoria en el disco
            memoriaDiscos[posicionDisco][3] = particion['espacioLibreAcontinuacion'];
            memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] - particion['espacioLibreAcontinuacion'];
        }
        if (particion['espacioLibreAcontinuacion'] != "" || particion['espacioLibre'] != "") {
            Indice++;
        }
    }

    // console.log("Discos");
    // console.log(discosCreados);
    // console.log("memoria");
    // console.log(memoriaDiscos);
    // console.log("Especificacion");
    // console.log(especificacionesDisco);
    // console.log("Particiones");
    // console.log(particiones);
    console.log("Log discos");
    console.log(logDiscos);

    let discos = obtenerDiscosMemoria();

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
        return alert('El disco no existe !');
    }

    //Se agrega registro en el log del disco
    logDiscos[disco] += `Se solicita eliminar la partición ${index} del disco ${disco}. \n`;

    // Aumenta la memoria libre del disco segun el espacio liberado por la particion
    memoriaDiscos[posicionDisco][0] = memoriaDiscos[posicionDisco][0] + particiones[posicionDisco][index][1];

    // Valida si el disco es tipo GPT
    if (discosCreados[disco].tipo == 'GPT') {
        //Se agrega registro en el log del disco
        logDiscos[disco] += ` Se aumenta en el disco la cantidad de particiones primarias disponibles. \n`;
        // Aumenta el tipo de partcion liberada
        especificacionesDisco[disco]['gptPrimarias']++;
    }
    // El disco es tipo MBR
    else {
        // Valida si el tipo de particion a eliminar es primaria
        if (particiones[posicionDisco][index][4] == 'Primaria') {
            //Se agrega registro en el log del disco
            logDiscos[disco] += ` Se aumenta en el disco la cantidad de particiones primarias disponibles. \n`;
            // Aumenta el tipo de partcion liberada
            especificacionesDisco[disco]['mbrPrimarias']++;
        }
        // Valida si el tipo de particion a eliminar es logica
        else if (particiones[posicionDisco][index][4] == 'Logica') {
            //Se agrega registro en el log del disco
            logDiscos[disco] += ` Se aumenta en el disco la cantidad de particiones lógicas disponibles. \n`;
            // Aumenta el tipo de partcion liberada
            especificacionesDisco[disco]['mbrLogicas']++;
        }
        // Valida si el tipo de particion a eliminar es extendida
        else if (particiones[posicionDisco][index][4] == 'Extendida'){
            //Se agrega registro en el log del disco
            logDiscos[disco] += ` Se aumenta en el disco la cantidad de particiones extendidas disponibles. \n`;
            // Aumenta el tipo de partcion liberada
            especificacionesDisco[disco]['mbrExtendidas']++;
        }
    }

    //Se agrega registro en el log del disco
    logDiscos[disco] += `Se elimina completamente la partición del disco. \n`;
    
    // Elimina la informacion del array de particiones del disco
    delete particiones[posicionDisco][index];
    // Elimina del array de memoria del disco la particion
    delete memoriaDiscos[posicionDisco][4];

    console.log("Discos");
    console.log(discosCreados);
    console.log("memoria");
    console.log(memoriaDiscos);
    console.log("Especificacion");
    console.log(especificacionesDisco);
    console.log("Particiones");
    console.log(particiones);
    console.log("Log discos");
    console.log(logDiscos);

    let discos = obtenerDiscosMemoria();

    return [discos,particiones];
}

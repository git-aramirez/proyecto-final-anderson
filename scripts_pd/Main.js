/**
 * Funcionalidades y variables de los algortimos de Creacion y Particiones de Discos.
 * @author Kevin David Sanchez Solis
 */

//--------------------------------------Importaciones----------------------------------------------------

import React from 'react';

//--------------------------------------Variables--------------------------------------------------------

//Variable que almacena los discos creados [nombre, tamaño, tipo]
export var discosCreados =  new Array();
//Variable que almacena los discos creados [nombre, tamaño, tipo]
export var memoriaDiscos =  new Array();
//Arreglo de parametros de los discos = [[Particion primaria, Extendida, Logica, tamaño particion extendida] [] [] ...]
var especificacionesDisco     =  new Array();
//Arreglo de arreglos que almacena las particiones de los discos[[particion1, particion1][particion]...]
export var particiones    =  new Array();
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

//--------------------------------------Metodos----------------------------------------------------------

/**
 * Crea disco
 *
 * @param {*} tipoDisco MBR - GPT
 * @param {*} nombreDisco Nombre del disco
 * @param {*} tamaño Tamaño del disco
 */
export function crearDisco(tipoDisco, nombreDisco, tamañoDisco) {
    
    // Valida si existe el disco
    if (discosCreados[nombreDisco]) {
        return alert('Ya existe un disco con este nombre.');
    }

    // Ingresa el disco creado
    discosCreados[nombreDisco] = {
        'tipo': tipoDisco,
        'nombre': nombreDisco,
        'tamaño': tamañoDisco
    };

    // Agrega espacio de memoria usada para el disco creado
    memoriaDiscos[nombreDisco] = {
        'libre': tamañoDisco
    };

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
    console.log("memoria");
    console.log(memoriaDiscos);
    console.log("Especificacion");
    console.log(especificacionesDisco);
}

/**
 * Elimina informacion del disco seleccionado
 * @param {*} disco nombre del disco seleccionado
 */
export function eliminarDisco(disco) {

    // Elimina la informacion del disco seleccionado
    delete discosCreados[disco];
    delete memoriaDiscos[disco];
    delete especificacionesDisco[disco];

    console.log("Discos");
    console.log(discosCreados);
    console.log("memoria");
    console.log(memoriaDiscos);
    console.log("Especificacion");
    console.log(especificacionesDisco);
}

/**
 * Ingresa una particion al disco
 * @param {*} disco nombre del disco
 * @param {*} particion datos de la particion
 */
export function ingresarParticion(disco, particion) {
    
    // Obtiene nombre de la partcion
    let nombreParticion = particion['nombreParticion'];

    // Valida si no existe el disco
    if (!memoriaDiscos[disco]) {
        return alert('Debe crear un disco primero.');
    }
    // Valida si la partcion excede el espacio libre del disco
    if (memoriaDiscos[disco].libre < particion['tamañoNuevo']) {
        return alert('El tamaño de la partición es superior al espacio disponible en el disco.');
    }
    // Valida si existe el disco
    if (particiones[disco]) {
        // Valida si ya existe la particion
        if (particiones[disco][nombreParticion]) {
            return alert('Ya existe una particion con ese nombre en el disco.');
        }
    }

    // Valida si el disco es GPT
    if (discosCreados[disco].tipo == "GPT") {
        // Valida si la particion es diferente de primaria
        if (particion['tipoParticion'] != 'Primaria') {
            return alert('El disco GPT solo admite particiones primarias');
        }
        // Valida tope de particiones que se pueden crear
        if (especificacionesDisco[disco].gptPrimarias == 0) {
            return alert('Tope de particiones (128) alcanzadas en el disco.')
        }

        // Valida si ya existe el espacio para las particiones del disco
        if (!particiones[disco]) {
            // Inicializa posicion del array
            particiones[disco] = {};
        }

        // Ingresa la particion
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
        // Setea los valores de memoria en el disco
        memoriaDiscos[disco][nombreParticion] = particion['tamañoNuevo'];
        memoriaDiscos[disco]['libre'] = memoriaDiscos[disco]['libre'] - particion['tamañoNuevo'];
        especificacionesDisco[disco].gptPrimarias--;

    } else {

        // Valida si la particion es extendida
        if (particion['tipoParticion'] == 'Extendida') {
            // Valida si ya se creo una particion extendida
            if (especificacionesDisco[disco].mbrExtendidas == 0 ) {
                return alert('El disco MBR sólo admite una particion extendida.');
            }
            // Disminuye capacidad de particiones
            especificacionesDisco[disco].mbrExtendidas--;
        }
        // Valida si la particion es logica
        if (particion['tipoParticion'] == 'Logica') {
            // Valida si aun no se ha creado una particion extendida
            if (especificacionesDisco[disco].mbrExtendidas > 0 ) {
                return alert('Para crear una partición lógica, primero debe crear una extendida.');
            }
            // Disminuye capacidad de particiones
            especificacionesDisco[disco].mbrLogicas--;
        }
        // Valida si la particion es primaria
        if (particion['tipoParticion'] == 'Primaria') {
            // Valida si se alcanzo el tope de particiones primarias
            if (especificacionesDisco[disco].mbrPrimarias == 0 ) {
                return alert('Ya se alcanzó el tope (4) de particiones primarias en el disco.');
            }
            // Disminuye capacidad de particiones
            especificacionesDisco[disco].mbrPrimarias--;
        }

        // Valida si ya existe el espacio para las particiones del disco
        if (!particiones[disco]) {
            // Inicializa posicion del array
            particiones[disco] = {};
        }

        // Ingresa la particion
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
        // Setea los valores de memoria en el disco
        memoriaDiscos[disco][nombreParticion] = particion['tamañoNuevo'];
        memoriaDiscos[disco]['libre'] = memoriaDiscos[disco]['libre'] - particion['tamañoNuevo'];
    }

    console.log("Discos");
    console.log(discosCreados);
    console.log("memoria");
    console.log(memoriaDiscos);
    console.log("Especificacion");
    console.log(especificacionesDisco);
    console.log("Particiones");
    console.log(particiones);
}

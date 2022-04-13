/**
 * Funcionalidades y variables de los algortimos de Segmentacion
 * @author Kevin David Sanchez Solis
 * @author Anderson Ramirez Vasquez
 */

//--------------------------------------Importaciones----------------------------------------------------

import React from 'react';

//--------------------------------------Variables--------------------------------------------------------

// Cantidad de memoria fisica
let CantidadMemoria = 20;
// Indice del segmento creado
export let segmentoIndex = 0;

// Cantidad de marcos disponibles en memoria fisica
export let EspaciosDisponibles     = CantidadMemoria;
// Inicializa el array de memoria fisica
export let MemoriaFisica   = crearArrayMemoria();
// Inicializa el array de tabla de procesos
export let TablaProcesos   = new Array();
// Inicializa el array de tabla de procesos
export let TablaDatos   = new Array();
// Log de segmentacion
export let logSegmentacion = '';

//---------------------------------------Metodos---------------------------------------------------------

/**
 * Metodo que inicializa el arreglo con los campos de los procesos
 * 
 * @returns El arreglo de Procesos inicializado
 */
function crearArrayMemoria() {
    
    //arreglo de Procesos totales
    let array = new Array(CantidadMemoria);
    //recorre el arreglo
    for (let index = 0; index < array.length; index++) {
        //inicializa la posicion en el arreglo en "".
        array.push();
        array[index] = ['', ''];
    }

    return array;
}

/**
 * Metodo que crea un proceso y lo agrega a las tablas correspondientes
 * 
 * @param {*} palabra palabra que representa el proceso
 *
 * @returns Estado de la solicitud
 */
export function crearProceso(palabra) {
    // Ingresa registro al log
    logSegmentacion += `Se solicita crear el proceso: ${palabra}. \n`;

    // Ingresa registro al log
    logSegmentacion += `Se valida que exista el espacio en memoria física. \n`;
    // Valida si existe el espacio para almacenar la palabra
    let validacion = parseInt(validarEspacioMemoriaFisica(palabra.length));

    let inicio = validacion;

    // Valida si no existe el espacio
    if (validacion == -1) {
        // Ingresa registro al log
        logSegmentacion += `Se notifica que no se encontro el espacio para almacenar el proceso en memoria fisica. \n`;
        return alert('No se encontro el espacio para almacenar la palabra en memoria fisica');
    }

    // Ingresa registro al log
    logSegmentacion += `Si se encontró el espacio para almacenar el proceso. \n`;

    // Color diferenciador del proceso
    let color = generarColor();

    // Ingresa registro al log
    logSegmentacion += `Se inicia a agregar el proceso en el bloque: ${validacion+1}. \n`;

    // Bucle para asignar las letras de la palabra en memoria fisica
    for (let index = 0; index < palabra.length; index++) {
        // Asigna letra de la palabra en el espacio del segmento
        MemoriaFisica[parseInt(validacion)][0] = palabra.charAt(index);
        // Asigna el color para el proceso
        MemoriaFisica[validacion][1] = color;
        validacion++;
    }

    // Ingresa registro al log
    logSegmentacion += `Se termina de agregar el proceso en el bloque: ${validacion}. \n`;

    // Arreglo que almacena la palabra
    let array = [];
    let proceso = [];

    // Recorre cada letra de la palabra
    for (let index = 0; index < palabra.length; index++) {
        // Agrega la letra en un espacio del arreglo
        array.push(palabra.charAt(index));
        proceso.push(palabra.charAt(index));
    }

    // Ingresa registro al log
    logSegmentacion += `Agrega el proceso en tabla de procesos. \n`;
    // Ingresa registro al log
    logSegmentacion += `Se asigna en la tabla de segmentos que el proceso inicia en el bloque ${inicio+1} y tiene un tamaño de ${palabra.length}. \n`;

    // Agrega los datos del segmento a la tabla de procesos
    TablaDatos[segmentoIndex] = {
        'inicio': inicio,
        'tamaño': palabra.length,
        'indice': segmentoIndex
    };
    // Asigna la palabra en tabla de procesos
    TablaProcesos[segmentoIndex] = proceso; 

    // Aumenta el indice de segmentos
    segmentoIndex++;
}

/**
 * Valida si existe espacio contiguo para la asignacion de la palabra 
 *
 * @param {*} tamaño tamaño de la palabra a asignar
 *
 * @returns indice de inicio para asignar o estado negativo (-1)
 */
function validarEspacioMemoriaFisica(tamaño) {
    // Variable auxiliar para controlar si el espacio esta
    let aux = tamaño;

    try {
        // Bucle que recorre todo el array de memoria fisica
        for (let index = 0; index < MemoriaFisica.length; index++) {
            // Auxiliar que indica donde inicia a buscar
            let indexAux = index;
            // Bucle que busca si existe el espacio
            while (aux != 0) {
                // Valida si la posicion en la memoria fisica esta disponible
                if (MemoriaFisica[indexAux][0] == '') {
                    // Ajusta los auxiliares
                    aux--;
                    indexAux++;
                } else {
                    break;
                }
                // Valida si se cumple con el tamaño
                if (aux == 0) {
                    return parseInt(index);
                }
            }
            // Actualiza los indices
            index = indexAux;
            aux = tamaño;
        }

        return -1;
        
    } catch (error) {
        return -1;
    }
    
}

/**
 * Metodo que elimina de memoria un segmento
 * 
 * @param {*} segmento indice del segmento a eliminar de memoria
 */
export function eliminarSegmento(segmento) {
    
    // Ingresa registro al log
    logSegmentacion += `Se solicta eliminar el segmento: ${segmento}. \n`;
    // Ingresa registro al log
    logSegmentacion += `Se consulta en la tabla de segmentos los datos del proceso. \n`;

    // Indice de inicio del segmento
    let inicio = TablaDatos[segmento].inicio;
    // Tamaño del segmento
    let tope   = inicio+TablaDatos[segmento].tamaño;
    // Ingresa registro al log
    logSegmentacion += ` Se obtiene que el proceso inicia en el bloque ${inicio+1} y va hasta el bloque ${tope}. \n`;

    // Recorre los bloques de memoria usados por el proceso
    for (let index = inicio; index < tope; index++) {
        // Limpia la posicion
        MemoriaFisica[index] = ['', ''];
    }

    // Ingresa registro al log
    logSegmentacion += ` Se limpian los datos de memoria fisica, tabla de procesos y tabla de segmentos. \n`;

    // Limpia los datos del segmento eliminado en la tabla de procesos
    delete TablaProcesos[segmento];
    delete TablaDatos[segmento];
}

/**
 * Metodo que trae el item solicitado
 *
 * @param {*} segmento numero del segmento
 * @param {*} indice indice dentro del segmento
 *
 * @returns Estado de la solicitud
 */
export function solicitarItem(segmento, indice) {

    // Parsea indice como entero
    indice = parseInt(indice);

    // Ingresa registro al log
    logSegmentacion += `Se solicita el item del segmento ${segmento} en la posición ${indice}. \n`;

    // Ingresa registro al log
    logSegmentacion += ` Se obtiene de la tabla de segmentos que el proceso inicia en el bloque ${TablaDatos[segmento].inicio+1}. \n`;

    // Ingresa registro al log
    logSegmentacion += ` Se valida que la posición solictada no exceda el tamaño del proceso. \n`;

    // Valida que la posicion solictada no exceda el tamaño del proceso
    if (indice < TablaDatos[segmento].tamaño) {        
        // Calcula la posicion en la que se encuentra el item en memoria fisica
        let item = TablaDatos[segmento].inicio;
        // Obtiene el item solicitado
        item = MemoriaFisica[parseInt(item+indice)][0];

        // Ingresa registro al log
        logSegmentacion += ` Se obtiene el item: ${item}. \n`;

        // Retorna el valor solicitado
        return alert("El item que solicito es: "+ item);
    } else {
        // Ingresa registro al log
        logSegmentacion += ` Se genera un error, porque la posición solictada excede el tamaño del proceso. \n`;
        return alert("La posición solicitada excede el tamaño del proceso");
    }
}

var indiceColores = 0;

/**
 * Genera color hexadecimal aleatorio
 *
 * @returns Color aleatorio
 */
export function generarColor() {

    indiceColores++;
    if(indiceColores % 2 ===0){
        return '#FFEC00';
    }

    return '#E07FFF';
}

/**
 * Genera un numero aleatorio
 *
 * @param {*} inferior indice inferior de opciones
 * @param {*} superior indice superior de opciones
 *
 * @returns numero aleatorio generado
 */
export function aleatorio(inferior, superior) {
    // Cantidad de posibilidades
    let numPosibilidades = superior - inferior;
    // Genera un numero aleatorio
    let aleat = Math.random() * numPosibilidades;
    // Toma el entero inferior
    aleat = Math.floor(aleat);

    return parseInt(inferior) + aleat;
}
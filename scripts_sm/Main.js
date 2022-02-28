/**
 * Funcionalidades y variables de los algortimos de Segmentacion
 * 
 * @author Kevin David Sanchez Solis
 */

//--------------------------------------Importaciones----------------------------------------------------

import React from 'react';

//--------------------------------------Variables--------------------------------------------------------

// Cantidad de memoria fisica
let CantidadMemoria = 20;

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
export function crearProceso(palabra) { // Falta Tabla de segmentos
    // Ingresa registro al log
    logSegmentacion += `Se solicita crear el proceso: ${palabra}. \n`;

    // Agrega la palabra en memoria fisica
    let estado = agregarPalabraMemoriaFisica(palabra);

    // Valida si el estado es negativo
    if (estado == -1) {
        // Ingresa registro al log
        logSegmentacion += ` Se notifica que no se encontro el espacio para almacenar el proceso en memoria fisica. \n`;
        return alert('No se encontro el espacio para almacenar la palabra en memoria fisica');
    }

    // Visualizacion de datos
    console.log("Tabla de procesos");
    console.log(TablaProcesos);
    console.log("Tabla de datos");
    console.log(TablaDatos);
    console.log("Memoria fisica");
    console.log(MemoriaFisica);
    console.log("log");
    console.log(logSegmentacion);
}

/**
 * Agrega la palabra y el indice de inicio del segmento en el array de procesos
 * 
 * @param {*} palabra Palabra a guardar
 * @param {*} indice Indice de inicio del segmento
 */
function agregarPalabraTablaProcesos(palabra, indice) {

    // Arreglo que almacena la palabra
    let array = [];
    // Recorre cada letra de la palabra
    for (let index = 0; index < palabra.length; index++) {
        // Agrega la letra en un espacio del arreglo
        array.push(palabra.charAt(index));
    }
    // Ingresa registro al log
    logSegmentacion += ` agrega el proceso en tabla de procesos. \n`;
    // Ingresa registro al log
    logSegmentacion += ` Se asigna en la tabla de segmentos que el proceso inicia en el bloque ${indice+1} y tiene un tamaño de ${palabra.length}. \n`;
    // Agrega los datos del segmento a la tabla de procesos
    TablaProcesos[TablaProcesos.length] = array; 
    TablaDatos.push([indice, palabra.length]);
}

/**
 * Agrega la palabra en el array de memoria fisica
 *
 * @param {*} palabra palabra a agregar en array
 *
 * @returns estado de la solicitud
 */
function agregarPalabraMemoriaFisica(palabra) {

    // Maneja el estado de la validacion
    let estado = validarEspacioMemoriaFisica(palabra.length);

    let inicio = estado;

    // Ingresa registro al log
    logSegmentacion += ` Se valida que exista el espacio en memoria fisica. \n`;
    // Valida si la validacion de espacio es negativa
    if (estado == -1) {
        // Devuelve estado negativo de la solicitud
        return -1;
    }

    // Caso de parada de asignacion de la palabra
    let tope = 0;
    // Color diferenciador del proceso
    let color = generarColor();

    // Ingresa registro al log
    logSegmentacion += ` Se inicia a agregar el proceso en el bloque: ${inicio+1}. \n`;
    
    // Bucle para asignar las letras de la palabra en memoria fisica
    while (tope != palabra.length) {
        // Asigna letra de la palabra en el espacio del segmento
        MemoriaFisica[estado][0] = palabra.charAt(tope);
        // Asigna el color para el proceso
        MemoriaFisica[estado][1] = color;
        // Incrementa indices
        tope++;
        estado++;
    }
    // Ingresa registro al log
    logSegmentacion += ` Se termina de agregar el proceso en el bloque: ${estado}. \n`;

    // Agrega el proceso en la tabla de procesos global
    agregarPalabraTablaProcesos(palabra, inicio);

    return 0;
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
                return index;
            }
        }
        // Actualiza los indices
        index = indexAux;
        aux = tamaño;
    }

    return -1;
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
    let inicio = TablaDatos[segmento-1][0];
    // Tamaño del segmento
    let tope   = inicio+TablaDatos[segmento-1][1];
    // Ingresa registro al log
    logSegmentacion += ` Se obtiene que el proceso inicia en el bloque ${inicio+1} y va hasta el bloque ${tope}. \n`;

    // Bucle que recorre el segmento
    while (tope != 0) {
        // Limpia la posicion
        MemoriaFisica[inicio] = ['', ''];
        // Actualiza las variables
        inicio++;
        tope--;
    }

    // Ingresa registro al log
    logSegmentacion += ` Se limpian los datos de memoria fisica, tabla de procesos y tabla de segmentos. \n`;

    // Limpia los datos del segmento eliminado en la tabla de procesos
    TablaProcesos.splice(segmento-1, 1);
    TablaDatos.splice(segmento-1, 1);

    // Visualizacion de datos
    // console.log("Tabla de procesos");
    // console.log(TablaProcesos);
    // console.log("Tabla de datos");
    // console.log(TablaDatos);
    // console.log("Memoria fisica");
    // console.log(MemoriaFisica);
    console.log("Log");
    console.log(logSegmentacion);
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

    // Ingresa registro al log
    logSegmentacion += `Se solicita el item del segmento ${segmento} en la posición ${indice}. \n`;

    // Ingresa registro al log
    logSegmentacion += ` Se obtiene de la tabla de segmentos que el proceso inicia en el bloque ${TablaDatos[segmento-1][0]+1}. \n`;

    // Ingresa registro al log
    logSegmentacion += ` Se valida que la posición solictada no exceda el tamaño del proceso. \n`;

    // Valida que la posicion solictada no exceda el tamaño del proceso
    if (indice <= TablaDatos[segmento-1][1]) {        
        // Calcula la posicion en la que se encuentra el item en memoria fisica
        let item = TablaDatos[segmento-1][0] + (indice-1);
        // Obtiene el item solicitado
        item = MemoriaFisica[item][0];
        // Ingresa registro al log
        logSegmentacion += ` Se obtiene el item: ${item}. \n`;

        console.log("log");
        console.log(logSegmentacion);

        // Retorna el valor solicitado
        return alert("El item que solicito es: "+ item);
    } else {
        // Ingresa registro al log
        logSegmentacion += ` Se genera un error, porque la posición solictada excede el tamaño del proceso. \n`;
        return alert("La posición solicitada excede el tamaño del proceso");
    }
}

/**
 * Genera color hexadecimal aleatorio
 *
 * @returns Color aleatorio
 */
function generarColor() {
    // Array de opciones 
    let hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
    // Inicializa el string con el color
    let color = "#";

    // Recorre 6 posiciones que conforman el numero en hexadecimal
    for (let i = 0; i < 6; i++) {
        // Genera un indice aleatorio
       let posarray = aleatorio(0,hexadecimal.length);
        // obtiene la opcion seleccionada
        color += hexadecimal[posarray];
    }
    return color;
}

/**
 * Genera un numero aleatorio
 *
 * @param {*} inferior indice inferior de opciones
 * @param {*} superior indice superior de opciones
 *
 * @returns numero aleatorio generado
 */
function aleatorio(inferior, superior) {
    // Cantidad de posibilidades
    let numPosibilidades = superior - inferior;
    // Genera un numero aleatorio
    let aleat = Math.random() * numPosibilidades;
    // Toma el entero inferior
    aleat = Math.floor(aleat);

    return parseInt(inferior) + aleat;
}
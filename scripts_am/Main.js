/**
 * Funcionalidades y variables de los algortimos de Mapa de Bits y algoritmos de Asigancion de espacio
 * @author Kevin David Sanchez Solis
 */

//--------------------------------------Importaciones----------------------------------------------------

import React from 'react';

//--------------------------------------Variables--------------------------------------------------------
//Variable que determina el tamaño de cada bloque que almacena los datos
var tamañoBloque = 3;
export let mapaBits = inicializarMapa();
    //--------------------------------Asignacion Contigua------------------------------------------------
        //Arreglo que almacena los archivos creados
        export let archivosCreadosContigua  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        var tamañoCaracteresContigua = [];
        //Arreglo con los indices de inicio de cada archivo
        var inicioContigua = [];
        //Arreglo que funciona como mapa de bits
        export var mapaContigua = crearMapa();
        // Log para disco de memoria Contigua
        export var logContigua = '';
    //--------------------------------Asignacion Enlazada------------------------------------------------
        //Arreglo que almacena los archivos creados
        export var archivosCreadosEnlazada  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        var tamañoCaracteresEnlazada = [];
        //Arreglo con los indices de inicio de cada archivo
        var inicioEnlazada = [];
        //Arreglo que funciona como mapa de bits
        export var mapaEnlazada = crearMapa();
        // Log para disco de memoria Enlazada
        export var logEnlazada = '';
    //---------------------------Asignacion Indexada Enlazada-------------------------------------------
        //Arreglo que almacena los archivos creados
        export var archivosCreadosIndexadaEnlazada  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        var tamañoCaracteresIndexadaEnlazada = [];
        //Arreglo con los indices de inicio de cada archivo
        var inicioIndexadaEnlazada = [];
        //Arreglo con las posiciones ocupadas por cada archivo
        var posicionesIndexadaEnlazada = [];
        //Arreglo que funciona como mapa de bits
        export var mapaIndexadaEnlazada = crearMapa();
        // Log para disco de memoria Indexada-Enlazada
        export var logIndexadaEnlazada = '';
    //--------------------------Asignacion Indexada-Multinivel------------------------------------------
        //Arreglo que almacena los archivos creados
        export var archivosCreadosIndexadaMultinivel  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        var tamañoCaracteresIndexadaMultinivel = [];
        //Arreglo con los indices de inicio de cada archivo
        var inicioIndexadaMultinivel = [];
        //Arreglo con las posiciones ocupadas por cada archivo
        var posicionesIndexadaMultinivel = [];
        //Arreglo que funciona como mapa de bits
        export var mapaIndexadaMultinivel = crearMapa();
        // Log para disco de memoria Indexada-Multinivel
        export var logIndexadaMultinivel = '';
   //--------------------------Asignacion Indexada-Combinada------------------------------------------
        //Arreglo que almacena los archivos creados
        export var archivosCreadosIndexadaCombinada  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        var tamañoCaracteresIndexadaCombinada  = [];
        //Arreglo con los indices de inicio de cada archivo
        var inicioIndexadaCombinada  = [];
        //Arreglo con las posiciones ocupadas por cada archivo
        var posicionesIndexadaCombinada  = [];
        //Arreglo que funciona como mapa de bits
        export var mapaIndexadaCombinada  = crearMapa();
        // Log para disco de memoria Indexada-combinada
        export var logIndexadaCombinada = '';

//--------------------------------------Metodos----------------------------------------------------------

/**
 * Metodo que acciona los metodos de creacion de todos los algortimos
 * @param {*} nombre nombre de Archivo a crear
 * @param {*} tamaño Tamaño en caracteres del archivo a Crear
 */
export function crearArchivo(nombre, tamaño) {

    // Ingresa registro al log
    logContigua += 'Se solicita agregar en disco la palabra: '+ nombre +'. \n';
    // Ingresa registro al log
    logEnlazada += 'Se solicita agregar en disco la palabra: '+ nombre +'. \n';
    // Ingresa registro al log
    logIndexadaEnlazada += `Se solicita agregar en disco la palabra: ${nombre}. \n`;
    // Ingresa registro al log
    logIndexadaMultinivel += `Se solicita agregar en disco la palabra: ${nombre}. \n`;
    // Ingresa registro al log
    logIndexadaCombinada += `Se solicita agregar en disco la palabra: ${nombre}. \n`;
    //Llama a los metodos de creacion de archivos de los diferentes algortimos
    crearArchivoContigua(nombre, tamaño);
    crearArchivoEnlazada(nombre, tamaño);
    crearArchivoIndexadaEnlazada(nombre, tamaño);
    crearArchivoIndexadaMultinivel(nombre, tamaño);
    crearArchivoIndexadaCombinada(nombre, tamaño);
}

/**
 * Metodo que acciona los metodos de eliminacion de todos los algortimos
 * @param {*} nombre nombre de Archivo a eliminar
 * @param {*} tamaño Tamaño en caracteres del archivo a eliminar
 */
export function eliminarArchivo(nombre, tamaño) {

    // Ingresa registro al log
    logContigua += `Se solicta eliminar la palabra ${nombre}. \n`;
    // Ingresa registro al log
    logEnlazada += `Se solicta eliminar la palabra ${nombre}. \n`;
    // Ingresa registro al log
    logIndexadaEnlazada += `Se solicta eliminar la palabra ${nombre}. \n`;
    // Ingresa registro al log
    logIndexadaMultinivel += `Se solicta eliminar la palabra ${nombre}. \n`;
    // Ingresa registro al log
    logIndexadaCombinada += `Se solicta eliminar la palabra ${nombre}. \n`;
    //Llama a los metodos de eliminacion de archivos de los diferentes algortimos
    eliminarArchivoContigua(nombre, tamaño);
    eliminarArchivoEnlazada(nombre, tamaño);
    eliminarArchivoIndexadaEnlazada(nombre, tamaño);
    eliminarArchivoIndexadaMultinivel(nombre, tamaño);
    eliminarArchivoIndexadaCombinada(nombre, tamaño);
}

/**
 * Inicializa el mapa de bit con 20 posiciones y todos los datos en 0 (vacios)
 * @returns Arreglo de 20 posiciones con todos sus datos en 0
 */
 export function crearMapa() {

    //arreglo de 20 posiciones
    let mapa = new Array(20);
    //recorre el arreglo
    for (let index = 0; index < mapa.length; index++) {
        //inicializa la posicion en el arreglo en "".
        mapa.push();
        mapa[index] = ["","",""];
        
    }

    return mapa;
    
}

/**
 * Inicializa el mapa de bit con 20 posiciones y todos los datos en 0 (vacios)
 * @returns Arreglo de 20 posiciones con todos sus datos en 0
 */
 export function inicializarMapa() {

    //arreglo de 20 posiciones
    let mapa = new Array(20);
    //recorre el arreglo
    for (let index = 0; index < mapa.length; index++) {
        //inicializa la posicion en el arreglo en "".
        mapa.push();
        mapa[index] = [""];
        
    }

    return mapa;
    
}

/**
 * Crea mapa de bits a mostrar
 *
 * @returns mapa de bits
 */
export function crearMapaBits (algoritmo) {

    // mapa de bits con datos
    let mapa = mapaBits;
    // mapa de bits
    let array = [];

    // Valida si el algoritmo es contigua
    if (algoritmo == "Contigua") {
        mapa = (mapaContigua);
    }
    //Valida que el algortimo seleccionado sea Enlazada
    if (algoritmo == "Enlazada") {
        mapa = (mapaEnlazada);
    }
    //Valida que el algortimo seleccionado sea Indexada-Enlazada
    if (algoritmo == "Indexada-Enlazada") {
        mapa = (mapaIndexadaEnlazada);
    }
    //Valida que el algortimo seleccionado sea Indexada-Multinivel
    if (algoritmo == "Indexada-Multinivel") {
        mapa = (mapaIndexadaMultinivel);
    }
    //Valida que el algortimo seleccionado sea Indexada Combinada
    if (algoritmo == "Indexada-Combinada") {
        mapa = (mapaIndexadaCombinada);
    }

    // Recorre mapa de bits con datos
    for (let index = 0; index < mapa.length; index++) {
        // Valida si el mapa en la posicion tiene datos
        if (mapa[index][0] != '' || mapa[index][1] != '' || mapa[index][2] != '') {
            array[index] = '*';
        } else {
            array[index] = ' ';
        }
    }

    return array;
}

    //--------------------------------Asignacion Contigua------------------------------------------------
/**
 * Metodo que elimina un archivo de forma contigua
 * @param {*} nombre nombre del archivo
 * @param {*} tamaño No se usa por ahora
 */
function eliminarArchivoContigua(nombre, tamaño) {

    // Ingresa registro al log
    logContigua += 'Se solicita eliminar del disco la palabra: '+ nombre +'\n';

    //Variable que almacena el resultado de la validacion
    let validarArchivo = validarArchivoContigua(nombre);
    //Indica el bloque de inicio del archivo
    let indice = inicioContigua[validarArchivo];
    //Indica cuantos bloques requirio el archivo
    let tope = Math.ceil(tamañoCaracteresContigua[validarArchivo]/3);

    // Ingresa registro al log
    logContigua += ' Se obtiene posición de memoria de inicio de la palabra. \n';

    //Valida que el archivo si exista
    if (validarArchivo != -1) {
        //Bucle que recorre el mapa o array para eliminar los datos del archivo
        for (let index = indice; index < (indice+tope); index++) {
            //setea datos vacios para simular la eliminacion de datos
            mapaContigua[index] = ["","",""];
        }

        //Elimina los datos del archivo a eliminar del arreglo de archivos creados
        archivosCreadosContigua.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de tamaños de archivos creados
        tamañoCaracteresContigua.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de posicion inicial del archivo
        inicioContigua.splice(validarArchivo,1);

        // Ingresa registro al log
        logContigua += ` Se pone en mapa de bits como disponible los bloques del ${parseInt(validarArchivo+1)} al ${parseInt(indice+tope+1)}, que fuerón liberados. \n`;

    }else{
        // Ingresa registro al log
        logContigua += ' No se encontró la palabra en disco. \n';
        console.log("No existe el archivo que quiere eliminar");
    }

    // console.log("mapa (Contigua)");
    // console.log(mapaContigua);
    // console.log("Log");
    // console.log(logContigua);
}

/**
 * Metodo que valida si el archivo existe
 * @param {*} nombre Nombre del archivo a validar
 * @returns indice del archivo. -1 Si no lo encuentra
 */
function validarArchivoContigua (nombre) {

    // Ingresa registro al log
    logContigua += 'Se valida que la palabra si este en el disco. \n';

    //Bucle que recorre el arry de archivos creados
    for (let index = 0; index < archivosCreadosContigua.length; index++) {
        //Valida si el nombre coincide con el que se busca
        if (archivosCreadosContigua[index] == nombre) {
            return index;
        }
        
    }

    return -1;
    
} 
/**
 * Metodo que realiza el ingreso del archivo 
 * @param {*} nombre Nombre del archivo a crear
 * @param {*} tamaño Tamaño del archivo a crear
 */
export function crearArchivoContigua(nombre, tamaño) {

    //Varible con el calculo de cuantos bloques se necesitan para crear el archivo
    let bloquesNecesarios = Math.ceil(tamaño/tamañoBloque);
    //Variable que guarda el resultado de la validacion de espacio
    let validacion = validarEspacioContigua(tamaño, bloquesNecesarios);
    //Variable que permite saber cuantos caracteres se han asignado
    let cantidad = tamaño;

    //Valida si la validacion retorna algo diferente al indice de negacion.
    if (validacion != -1) {
        //Variable que indica hasta que bloque va a consumir el archivo
        let tope = (validacion+bloquesNecesarios);
        //Valida que no se exceda del limite maximo de bloques
        if (tope <= 20) {

            let indicador = 0;
            //Bucle que asigna en el mapa de bits los archivos
            for (let index = validacion; index < tope; index++) {
                //Bucle que recorre el bloque para asignar los datos 
                for (let index1 = 0; index1 < mapaContigua[0].length; index1++) {
                    //Valida que el tamaño no sea 0
                    if (cantidad != 0) {
                        mapaContigua[index][index1] = nombre.charAt(indicador);
                        cantidad--;
                        indicador++;
                    } else {
                        mapaContigua[index][index1] = "N/a";
                    }
                }
                
            }

            // Ingresa registro al log
            logContigua += ' Se asigna la palabra de forma contigua en disco. \n';
            // Ingresa registro al log
            logContigua += ' Se marcan como ocupados en mapa de bits los espacios ocupados en memoria \n';
            // Ingresa registro al log
            logContigua += ' Se relaciona en tabla de procesos que el proceso comienza en el bloque '+ parseInt(validacion+1) +'\n';

            //Ingresa el archivo en el arreglo de archivos creados
            archivosCreadosContigua.push(nombre);
            //Ingresa el tamaño del archivo en el arreglo de tamaños de archivos creados
            tamañoCaracteresContigua.push(tamaño);
            //Ingresa el indice del bloque para el archivo creado.
            inicioContigua.push(validacion);
            

        }else{
            // Ingresa registro al log
            logContigua += ' Se notifica que no existe la cantidad de bloques necesarios para almacenar la palabra. \n';
            console.log("El tamaño supera los bloques");
        }

    }else{
        // Ingresa registro al log
        logContigua += ' Se notifica que no existe el espacio contiguo para almacenar la palabra. \n';
        console.log("No se encontro espacio para agregar el archivo");
    }

    
    // console.log("mapa (Contigua)");
    // console.log(mapaContigua);
    // console.log("creados (Contigua)");
    console.log(archivosCreadosContigua);
    // console.log("tamaño (Contigua)");
    // console.log(tamañoCaracteresContigua);
    // console.log("inicio (Contigua)");
    // console.log(inicioContigua);
    // console.log('log');
    // console.log(logContigua);
    
    
    
}

/**
 * Valida si se puede agregar el archivo que se quiere crear
 * @param {*} tamaño tamaño de caracteres que tiene el archivo
 * @param {*} bloquesNecesarios  tamaño de bloques necesarios para almacenar el archivo
 * @returns El valor de la posicion de inicio para agregar el archivo si se puede agregar.
 *          Si no se puede agregar retorna -1
 */
function validarEspacioContigua(tamaño, bloquesNecesarios) {

    // Ingresa registro al log
    logContigua += ' Se valida con el mapa de bits si existe espacio para almacenar la palabra. \n';

    //Variable que permite saber si la cantidad de bloques que se necesita se encuentra
    let contador = 0;
    //Valor a retornan
    let centinela = -2;

    //Bucle  que recorre el mapa de bits en busca de espacio disponible
    for (let index = 0; index < mapaContigua.length; index++) {
        //Si encuentra un bloque vacio lo suma para ver si completa los necesarios
        if (mapaContigua[index][0] == "") {
            contador++;
        }
        //Apenas encuentre una posicion vacia guarda el indice
        if (contador == 1) {
            centinela = index;
        }
        //Si no se completan los bloques necesarios, se retorna -1 (false)
        if (mapaContigua[index][0] != "") {
            contador = 0;
            centinela = -1;
        }
        //Si se encuentra el espacio, se retorna el indice de inicio
        if (contador == bloquesNecesarios) {
            // Ingresa registro al log
            logContigua += ' Se notifica que existe el espacio. \n';
            return centinela;
        }
        
    }

    //Valida que no existe el espacio
    if (contador != bloquesNecesarios) {
        centinela = -1;
    }

    return centinela;
    
}

    //--------------------------------Asignacion Enlazada------------------------------------------------
/**
 * Metodo que realiza el ingreso del archivo 
 * @param {*} nombre Nombre del archivo a crear
 * @param {*} tamaño Tamaño del archivo a crear
 */
 export function crearArchivoEnlazada(nombre, tamaño) {

    //Indica cuantos bloques se requieren para almacenar el archivo
    let bloquesNecesarios = Math.ceil(tamaño/(tamañoBloque-1));
    //Valida si existe el espacio para guardar el archivo
    let validacion = validarEspacioEnlazada(tamaño, bloquesNecesarios);
    //Indica cuantos caracteres faltan por asignarse para guardar
    let cantidad = tamaño;
    //Guarda el dato para el indice del bloque siguiente. (enlace)
    let siguiente = -1;
    // Indicador para la palabra
    let indicador = 0;

    //Valida si el espacio disponible existe
    if (validacion != -1) {
        //Bucle que recorre el mapa de bits en busca de lugares para asigar datos 
        for (let index = validacion; index < mapaEnlazada.length; index++) {
            //Valida si el bloque esta vacio y existan caracteres por asignar
            if (mapaEnlazada[index][0] == "" && cantidad != 0) {
                // Ingresa registro al log
                logEnlazada += ` Asigna datos de la palabra en el bloque ${index+1}. \n`;
                //Bucle que recorre el bloque para asignar los datos 
                for (let index1 = 0; index1 < (mapaEnlazada[0].length-1); index1++) {
                    //Valida que el tamaño no sea 0
                    if (cantidad != 0) {
                        //Asiga el valor del archivo en el bloque de datos
                        mapaEnlazada[index][index1] = nombre.charAt(indicador);
                        cantidad--;
                        indicador++;
                    }
                    //Valida que no existan mas caracteres que asignar.
                    if (cantidad == 0) {
                        break;
                    }       
                }
                //Valida si el enlace no tiene valor positivo
                if (siguiente != -1) {
                    //Asigna el valor del enlace al siguiente bloque de datos
                    mapaEnlazada[siguiente][2] = index+1;
                    // Ingresa registro al log
                    logEnlazada += ` Asigna al bloque anterior en la última posición, el enlace al bloque actual. \n`;
                    //Guarda el dato del bloque anterior para poder asignar el dato de enlace
                    siguiente = index;
                }
                //Valida que sea el primer enlace que guarda
                if (siguiente == -1) {
                    //Guarda el dato del bloque anterior para poder asignar el dato de enlace
                    siguiente = index;
                }
            }
        }

        // Ingresa registro al log
        logEnlazada += ` Pone en el mapa de bits los bloques consumidos en ocupados. \n`;
        //Ingresa el archivo en el arreglo de archivos creados
        archivosCreadosEnlazada.push(nombre);
        //Ingresa el tamaño del archivo en el arreglo de tamaños de archivos creados
        tamañoCaracteresEnlazada.push(tamaño);
        //Ingresa el indice del bloque para el archivo creado.
        inicioEnlazada.push(validacion);

    }else{
        // Ingresa registro al log
        logEnlazada += ` No hay espacio disponible para almacenar la palabra. \n`;
        console.log("No hay espacio suficiente");
    }
    
    // console.log("mapa (Enlazada)");
    // console.log(mapaEnlazada);
    // console.log("creados (Enlazada)");
    // console.log(archivosCreadosEnlazada);
    // console.log("tamaño (Enlazada)");
    // console.log(tamañoCaracteresEnlazada);
    // console.log("inicio (Enlazada)");
    // console.log(inicioEnlazada);
    // console.log("Log");
    // console.log(logEnlazada);   
}

/**
* Valida si se puede agregar el archivo que se quiere crear
* @param {*} tamaño tamaño de caracteres que tiene el archivo
* @param {*} bloquesNecesarios  tamaño de bloques necesarios para almacenar el archivo
* @returns El valor de la posicion de inicio para agregar el archivo si se puede agregar.
*          Si no se puede agregar retorna -1
*/
function validarEspacioEnlazada(tamaño, bloquesNecesarios) {
    // Ingresa registro al log
    logEnlazada += ` Se valida si existe espacio para almacenar la palabar en disco. \n`;

    //Variable que permite saber si la cantidad de bloques que se necesita se encuentra
    let contador = 0;
    //Valor a retornan
    let centinela = -1;

    //Bucle  que recorre el mapa de bits en busca de espacio disponible
    for (let index = 0; index < mapaEnlazada.length; index++) {
        //Si encuentra un bloque vacio lo suma para ver si completa los necesarios
        if (mapaEnlazada[index][0] == "") {
            contador++;
        }
        //Apenas encuentre una posicion vacia guarda el indice
        if (contador == 1) {
            centinela = index;
        }
        //Si se encuentra el espacio, se retorna el indice de inicio
        if (contador == bloquesNecesarios) {
            //console.log("conta"+contador);
            return centinela;
        }
        
    }

    //Valida que no exista el espacio
    if (contador != bloquesNecesarios) {
        centinela = -1;
    }

    return centinela;
    
}

/**
 * Metodo que elimina un archivo de forma Enlazada
 * @param {*} nombre nombre del archivo
 * @param {*} tamaño No se usa por ahora
 */
 export function eliminarArchivoEnlazada(nombre, tamaño) {

    //Variable que almacena el resultado de la validacion
    let validarArchivo = validarArchivoEnlazada(nombre);
    //Indica el bloque de inicio del archivo
    let indice = inicioEnlazada[validarArchivo];
    //Indica cuantos bloques ocupa el archivo en el mapa de bits 
    let bloquesNecesarios = Math.ceil((tamañoCaracteresEnlazada[validarArchivo])/(tamañoBloque-1));
    //Indica el enlace al siguiente bloque de datos del mismo archivo
    let siguiente = -1;

    //Valida que el archivo si exista
    if (validarArchivo != -1) {
        //Bucle que recorre el mapa o array para eliminar los datos del archivo
        for (let index = 0; index <= bloquesNecesarios; index++) {
            //Valida que exista un enlace a otro bloque para guardar ese dato
            if (mapaEnlazada[indice][2] != "") {
                // Ingresa registro al log
                logEnlazada += ` En mapa de bits se pone disponible el bloque ${indice+1}. \n`;
                //Se guarda del valor del siguiente bloque con datos del archivo
                siguiente = mapaEnlazada[indice][2]-1;
                //Se setea en vacio para eliminar los datos
                mapaEnlazada[indice] = ["","",""];
                //Se asigna el indice del bloque siguiente con datos del archivo
                indice = siguiente;
                // Ingresa registro al log
                logEnlazada += ` Se obtiene el enlace al bloque ${indice + 1}, que es el siguiente. \n`;
            }
            //Valida si es el ultimo bloque con datos del archivo
            if (mapaEnlazada[indice][2] == "" && mapaEnlazada[indice][0] != "") {
                //Se setea en vacio para eliminar los datos
                mapaEnlazada[indice] = ["","",""];
            }

        }
        // Ingresa registro al log
        logEnlazada += ` En mapa de bits se pone disponible el bloque ${indice+1}. \n`;

        //Elimina los datos del archivo a eliminar del arreglo de archivos creados
        archivosCreadosEnlazada.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de tamaños de archivos creados
        tamañoCaracteresEnlazada.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de posicion inicial del archivo
        inicioEnlazada.splice(validarArchivo,1);

        // console.log("mapa (Enlazada)");
        // console.log(mapaEnlazada);
        // console.log("archivos (Enlazada)");
        // console.log(archivosCreadosEnlazada);
        // console.log("tamaño (Enlazada)");
        // console.log(tamañoCaracteresEnlazada);
        // console.log("Inicio (Enlazada)");
        // console.log(inicioEnlazada);
        // console.log("log");
        // console.log(logEnlazada);

    }else{
        // Ingresa registro al log
        logEnlazada += ` Se notifica que la palabra no existe en disco. \n`;
        console.log("No existe el archivo que quiere eliminar");
    }

    //console.log(mapaEnlazada);
    
}

/**
 * Metodo que valida si el archivo existe
 * @param {*} nombre Nombre del archivo a validar
 * @returns indice del archivo. -1 Si no lo encuentra
 */
function validarArchivoEnlazada (nombre) {
    // Ingresa registro al log
    logEnlazada += ` Se valida que exista la palabra que se quiere eliminar \n`;
    //Bucle que recorre el arry de archivos creados
    for (let index = 0; index < archivosCreadosEnlazada.length; index++) {
        //Valida si el nombre coincide con el que se busca
        if (archivosCreadosEnlazada[index] == nombre) {
            return index;
        }
        
    }

    return -1;
    
} 
   //--------------------------Asignacion Indexada- Enlazada--------------------------------------------

/**
 * Metodo que realiza el ingreso del archivo 
 * @param {*} nombre Nombre del archivo a crear
 * @param {*} tamaño Tamaño del archivo a crear
 */
export function crearArchivoIndexadaEnlazada(nombre, tamaño) {

    //Indica cuantos bloques se requieren para almacenar el archivo
    let bloquesNecesarios = Math.ceil(tamaño/(tamañoBloque));
    //Indica cuantos bloques de indices se requieren.    
    let bloquesIndices    = Math.ceil(bloquesNecesarios/(tamañoBloque-1));
    //Indica cantidad de bloques totales que consume el archivo a crear.
    let bloquesTotales    = bloquesNecesarios + bloquesIndices;
    //Indica cantidad de caracteres que faltan por asignar
    let cantidad          = tamaño;
    //Valida si hay espacio para guardar el archivo
    let validacion        = validarEspacioIndexadaEnlazada(tamaño, bloquesTotales);
    // Inidcador de la palabra
    let indicador         = 0;

    //Revisa que la validacion sea positiva
    if (validacion != -1) {
        //Devuelve las posiciones de los bloques vacios
        let posicionesDisponible = posicionesDisponiblesEnlazada(bloquesTotales);
        //Valida que el arreglo tenga posiciones. Que no tenga valor negativo
        if (posicionesDisponible != -1) {
            //Bucle que recorre los bloques para almacenar datos
            for (let index = bloquesIndices; index < posicionesDisponible.length ; index++) {
                //Bucle que recorre cada posicion del bloque para guardar datos
                for (let index1 = 0; index1 < mapaIndexadaEnlazada[0].length; index1++) {
                    //Valida que todavia existan caracteres por asignar
                    if (cantidad != 0) {
                        //Asigna el caracter en la posicion
                        mapaIndexadaEnlazada[posicionesDisponible[index]][index1] = nombre.charAt(indicador);
                        cantidad--;
                        indicador++;

                    }else{
                        break;
                    }

                }
                
            }

            // Indica bloques consumidos
            let aux = bloquesIndices;
            // Indica tope de bloques para asignar
            let tope = 1;

            // Recorre los bloques destinados para los indices
            for (let index = 0; index < bloquesIndices; index++){
                //Bucle que recorre cada posicion de los bloques
                for (let index2 = 0; index2 < mapaIndexadaEnlazada[0].length; index2++) {
                    // Valida si es la ultima posicion del bloque de memoria
                    if (index2 == mapaIndexadaEnlazada[0].length-1) {
                        // Valida que no se pase de los bloques asignados para los indices
                        if (tope < bloquesIndices) {
                            // Ingresa registro al log
                            logIndexadaEnlazada += ` Enlaza al bloque de indices ${posicionesDisponible[tope]+1}. \n`;
                            // Realiza la asignacion de los datos
                            mapaIndexadaEnlazada[posicionesDisponible[index]][index2] = posicionesDisponible[tope]+1;
                            tope++;
                        }     
                    }
                    // Valida que no sea la ultima posicion del bloque de memoria
                    if (index2 != mapaIndexadaEnlazada[0].length-1) {
                        // Valida si es el ultimo bloque de memoria
                        if (aux < posicionesDisponible.length) {
                            // Ingresa registro al log
                            logIndexadaEnlazada += ` En el bloque de memoria ${posicionesDisponible[index]+1} asigna en el espacio ${index2+1} que se consumió el bloque ${posicionesDisponible[aux]+1}. \n`;
                            // Realiza la asignacion de los datos
                            mapaIndexadaEnlazada[posicionesDisponible[index]][index2] = posicionesDisponible[aux]+1;
                            aux++;
                        }
                    }
                }
            }

            //Ingresa el archivo en el arreglo de archivos creados
            archivosCreadosIndexadaEnlazada.push(nombre);
            //Ingresa el tamaño del archivo en el arreglo de tamaños de archivos creados
            tamañoCaracteresIndexadaEnlazada.push(tamaño);
            //Ingresa el indice del bloque para el archivo creado.
            inicioIndexadaEnlazada.push(validacion);
            //Ingresa las posiciones ocupadas por el archivo
            posicionesIndexadaEnlazada.push(posicionesDisponible);

        } else {
            // Ingresa registro al log
            logIndexadaEnlazada += ` Se notifica que no se encontró espacio para guardar la palabra \n`;
            console.log("Espacio no encontrado");
        }

    } else {
        // Ingresa registro al log
        logIndexadaEnlazada += ` Se notifica que no se encontró espacio para guardar la palabra \n`;
        console.log("No hay espacio");
    }

    // console.log("mapa (IndexadaEnlazada)");
    // console.log(mapaIndexadaEnlazada);
    // console.log("archivos (IndexadaEnlazada)");
    // console.log(archivosCreadosIndexadaEnlazada);
    // console.log("tamaños (IndexadaEnlazada)");
    // console.log(tamañoCaracteresIndexadaEnlazada);
    // console.log("inicio (IndexadaEnlazada)");
    // console.log(inicioIndexadaEnlazada);
    // console.log("Posiciones (IndexadaEnlazada)");
    // console.log(posicionesIndexadaEnlazada);
    // console.log("Log");
    // console.log(logIndexadaEnlazada);
}

/**
 * Encuentra las posiciones disponibles para almacenar la palabra en disco
 *
 * @param {*} bloquesTotales Cantidad de bloques vacios que se necesitan
 *
 * @returns Retorna un array con posiciones de bloques vacios. -1 si no se encuentran.
 */
function posicionesDisponiblesEnlazada(bloquesTotales) {

    //Array que alamacena los indices de los bloques disponibles
    let posiciones = new Array();

        //Bucle  que recorre el mapa de bits en busca de espacio disponible
        for (let index = 0; index < mapaIndexadaEnlazada.length; index++) {
        //Si encuentra un bloque vacio lo agrega en el array
        if (mapaIndexadaEnlazada[index][0] == "") {
            //agrega a la array la posicion del bloque vacio
            posiciones.push(index);
        }
        //Valida si se completaron la cantidad de bloques
        if (posiciones.length == bloquesTotales) {
            break;
        }
    }

    //Valida que se cumplan los bloques necesarios
    if (posiciones.length == bloquesTotales) {
        return posiciones;
    }
    else{
        return -1;
    }
}

/**
 * Valida si se puede agregar el archivo que se quiere crear
 * @param {*} tamaño tamaño de caracteres que tiene el archivo
 * @param {*} bloquesNecesarios  tamaño de bloques necesarios para almacenar el archivo
 * @returns El valor de la posicion de inicio para agregar el archivo si se puede agregar.
 *          Si no se puede agregar retorna -1
 */
function validarEspacioIndexadaEnlazada(tamaño, bloquesNecesarios) {

    // Ingresa registro al log
    logIndexadaEnlazada += ` Se valida si hay espacio para almacenar la palabra en disco. \n`;

    //Variable que permite saber si la cantidad de bloques que se necesita se encuentra
    let contador = 0;
    //Valor a retornan
    let centinela = -1;

    //Bucle  que recorre el mapa de bits en busca de espacio disponible
    for (let index = 0; index < mapaIndexadaEnlazada.length; index++) {
        //Si encuentra un bloque vacio lo suma para ver si completa los necesarios
        if (mapaIndexadaEnlazada[index][0] == "") {
            contador++;
        }
        //Apenas encuentre una posicion vacia guarda el indice
        if (contador == 1) {
            centinela = index;
        }
        //Si se encuentra el espacio, se retorna el indice de inicio
        if (contador == bloquesNecesarios) {
            return centinela;
        }
    }

    //Valida que no exista el espacio
    if (contador != bloquesNecesarios) {
        centinela = -1;
    }

    return centinela;
}

/**
 * Metodo que elimina un archivo de forma Indexada-Enlazada
 * @param {*} nombre nombre del archivo
 * @param {*} tamaño No se usa por ahora
 */
 export function eliminarArchivoIndexadaEnlazada(nombre, tamaño) {

    //Variable que almacena el resultado de la validacion
    let validarArchivo = validarArchivoIndexadaEnlazada(nombre);
    //Arreglo con posiciones ocupadas por el archivo
    let eliminar = posicionesIndexadaEnlazada[validarArchivo];
    
    //Valida que si exista un archivo creado con ese nombre
    if (validarArchivo != -1) {
        // Ingresa registro al log
        logIndexadaEnlazada += ` Según los indices, se procede a poner en mapa de bits disponibles los bloques ocupados por la palabra. \n`;
        //Bucle que recorre las posiciones con los bloques ocupados por el archivo
        for (let index = 0; index < eliminar.length; index++) {
            //Setea en vacio el bloque
            mapaIndexadaEnlazada[eliminar[index]] = ["","",""];
            // Ingresa registro al log
            logIndexadaEnlazada += ` Se libera el bloque ${eliminar[index]+1}. \n`;
        }

        //Elimina los datos del archivo a eliminar del arreglo de archivos creados
        archivosCreadosIndexadaEnlazada.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de tamaños de archivos creados
        tamañoCaracteresIndexadaEnlazada.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de posicion inicial del archivo
        inicioIndexadaEnlazada.splice(validarArchivo,1);
        //Elimina las posiciones ocupadas por el archivo
        posicionesIndexadaEnlazada.splice(validarArchivo,1)
    }else{
        // Ingresa registro al log
        logIndexadaEnlazada += ` Se notifica que la palabra a eliminar no existe. \n`;
        console.log("No se existe el archivo que quiere eliminar.");
    }

    // console.log("mapa (IndexadaEnlazada)");
    // console.log(mapaIndexadaEnlazada);
    // console.log("archivos (IndexadaEnlazada)");
    // console.log(archivosCreadosIndexadaEnlazada);
    // console.log("tamaños (IndexadaEnlazada)");
    // console.log(tamañoCaracteresIndexadaEnlazada);
    // console.log("inicio (IndexadaEnlazada)");
    // console.log(inicioIndexadaEnlazada);
    // console.log("posiciones disponibles (IndexadaEnlazada)");
    // console.log(posicionesIndexadaEnlazada);
    // console.log("Log");
    // console.log(logIndexadaEnlazada);

}

/**
 * Metodo que valida si el archivo existe
 * @param {*} nombre Nombre del archivo a validar
 * @returns indice del archivo. -1 Si no lo encuentra
 */
function validarArchivoIndexadaEnlazada (nombre) {

    // Ingresa registro al log
    logIndexadaEnlazada += ` Se valida que la palabra a eliminar exista \n`;

    //Bucle que recorre el arry de archivos creados
    for (let index = 0; index < archivosCreadosIndexadaEnlazada.length; index++) {
        //Valida si el nombre coincide con el que se busca
        if (archivosCreadosIndexadaEnlazada[index] == nombre) {
            return index;
        }
        
    }

    return -1;
    
} 

   //--------------------------Asignacion Indexada-Multinivel--------------------------------------------

/**
 * Metodo que realiza el ingreso del archivo 
 * @param {*} nombre Nombre del archivo a crear
 * @param {*} tamaño Tamaño del archivo a crear
 */
export function crearArchivoIndexadaMultinivel(nombre, tamaño) {

    //Valida si existe el espacio para almacenar el archivo
    let validacion = validarEspacioIndexadaMultinivel(tamaño);
    //Indica la cantidad de datos que faltan por asignar
    let cantidadFaltante = tamaño;
    // Indicador de la palabra
    let indicador = 0;

    // Ingresa registro al log
    logIndexadaMultinivel += ` Se valida que exista espacio para almacenar la palabra. \n`;

    //Valida si se cumple con el espacio necesario
    if (validacion != -1) {
        //Bucle que recorre las posiciones del arreglo con posiciones disponibles
        for (let index = 0; index < validacion.length; index++) {
            // Ingresa registro al log
            logIndexadaMultinivel += ` Se toma como primer super i nodo el bloque ${validacion[index]+1}. \n`;
            //Verifica si es la primera posicion
            if (index == 0) {
                //Asigna el puntero al nodo o bloque siguiente
                mapaIndexadaMultinivel[validacion[index]][0] = validacion[index+1]+1;
                // Ingresa registro al log
                logIndexadaMultinivel += ` En la posición ${index+1} se ingresa enlace al bloque de datos ${validacion[index+1]+1}. \n`;
                // Ingresa registro al log
                logIndexadaMultinivel += ` Se ingresan datos en el bloque ${validacion[index+1]+1} \n`;
                //Bucle que recorre las tres posiciones del bloque para asignar los indices de los bloques con datos
                for (let index1 = 0; index1 < mapaIndexadaMultinivel[0].length; index1++) {
                    //Verifica que no se requiera asignar mas datos
                    if (cantidadFaltante == 0) {
                        break;
                    }
                    //Continua con el flujo del algoritmo
                    else{
                        //Asigna el dato en la posicion del bloque
                        mapaIndexadaMultinivel[validacion[index+1]][index1] = nombre.charAt(indicador);
                        //Disminuye el indicador 
                        cantidadFaltante--;
                        indicador++;
                    }
                    
                }
                //Posicion siguiente
                index++;
            }
            //Verifica que este en la posicion 2
            if (index == 2) {
                // Ingresa registro al log
                logIndexadaMultinivel += ` En el super i nodo ${validacion[0]+1} se ingresa enlace al i nodo ${validacion[index]+1}. \n`;
                //Asigna le puntero al bloque de indices siguiente
                mapaIndexadaMultinivel[validacion[0]][1] = validacion[index]+1;
                //Variable que controla la cantidad de ciclos necesarios
                let tope = 0;

                // Ingresa registro al log
                logIndexadaMultinivel += ` Se ingresan datos en el bloque de datos ${validacion[index+1]+1}. \n`;
                //Valida que se cumplan los ciclos que se requieren
                while (tope != 3) {
                    //Bucle que recorre cada posicion del bloque de datos
                    for (let index1 = 0; index1 < mapaIndexadaMultinivel[0].length; index1++) {
                        //Verifica si ya se cumplio la asignacion total de datos
                        if (cantidadFaltante == 0) {
                            break;
                        }
                        //Continua con la asignacion de datos
                        else{
                            //Asigna el dato en la posicion del bloque de datos
                            mapaIndexadaMultinivel[validacion[index+1]][index1] = nombre.charAt(indicador);
                            //Disminuye el contador de datos faltantes por asignar
                            cantidadFaltante--;
                            indicador++;
                        }
                    }
                    //Se asigna el puntero al indice siguiente
                    mapaIndexadaMultinivel[validacion[2]][tope] = validacion[index+1]+1;
                    //Aumenta la variable de los ciclos necesarios
                    tope++;
                    //Valida si ya se cumplio la asignacion total de datos
                    if (cantidadFaltante == 0) {
                        //Pone la condicion del ciclo en positivo para que salga
                        tope = 3;
                    }
                    //Posicion siguiente
                    index++;
                }
            }

            //Valida que este en la posicion 6
            if (index == 6) {
                // Ingresa registro al log
                logIndexadaMultinivel += ` En el super i nodo ${validacion[0]+1} se enlaza la posición del siguiente super i nodo ${validacion[index]+1}. \n`;
                //Asigna el puntero al nodo de indices siguiente
                mapaIndexadaMultinivel[validacion[0]][2] = validacion[index]+1;
                //Posicion siguiente
                index++
                //Variable que controla la cantidad de ciclos necesarios
                let tope = 0;
                //Valida que se cumplan los ciclos que se requieren
                while (tope != 3) {
                    // Ingresa registro al log
                    logIndexadaMultinivel += ` Se enlaza en el super i nodo el bloque de indices ${validacion[index]+1}. \n`;
                    //Asigna al nodo de indice el indice actual
                    mapaIndexadaMultinivel[validacion[6]][tope] = validacion[index]+1;
                    //Mantiene el inidice del nodo de indices
                    let bloque = validacion[index];
                    //Bucle que recorre la cantidad de ciclos para nodos de datos necesarios
                    for (let index1 = 0; index1 < mapaIndexadaMultinivel[0].length; index1++) {
                        // Ingresa registro al log
                        logIndexadaMultinivel += ` Se enlaza en el i nodo ${bloque+1} el bloque de datos ${validacion[index+1]+1}. \n`;
                        //Asigna la posicion del nodo de datos en el nodo de indices
                        mapaIndexadaMultinivel[bloque][index1] = validacion[index+1]+1;
                        // Ingresa registro al log
                        logIndexadaMultinivel += ` Se ingresan datos en el bloque: ${validacion[index+1]+1}. \n`;
                        //Bucle que recorre el bloque de datos para asignarlos
                        for (let index2 = 0; index2 < mapaIndexadaMultinivel[0].length; index2++) {
                            //Valida si ya se cumplio la cantidad total de asignaciones
                            if (cantidadFaltante == 0) {
                                break;
                            }
                            //Continua con el flujo de asignacion de datos
                            else{
                                //Asigna en el dato en la posicion en el bloque de datos
                                mapaIndexadaMultinivel[validacion[index+1]][index2] = nombre.charAt(indicador);
                                //Disminuye el indice de datos que faltan por asinar
                                cantidadFaltante--;
                                indicador++;
                            }
                        }
                        //Valida si ya se cumplio la cantidad total de asignaciones
                        if (cantidadFaltante == 0) {
                            break;
                        }
                        //Posicion siguiente
                        index++;
                    }
                    //Posicion siguiente
                    index++;
                    //Indice de ciclos necesarios aumenta
                    tope++;
                    //Valida si ya se cumplio la cantidad total de asignaciones
                    if (cantidadFaltante == 0) {
                        //Pone la condicion del ciclo en positivo para que salga
                        tope = 3;
                    }
                }
            }
        }
        
        //Ingresa el archivo en el arreglo de archivos creados
        archivosCreadosIndexadaMultinivel.push(nombre);
        //Ingresa el tamaño del archivo en el arreglo de tamaños de archivos creados
        tamañoCaracteresIndexadaMultinivel.push(tamaño);
        //Ingresa el indice del bloque para el archivo creado.
        inicioIndexadaMultinivel.push(validacion[0]);
        //Ingresa las posiciones utilizadas por el archivo
        posicionesIndexadaMultinivel.push(validacion);
        
    }else{
        // Ingresa registro al log
        logIndexadaMultinivel += ` Se notifica que no se encontró espacio para almacenar la palabra en disco \n`;
        console.log("No hay espacio suficiente para almacenar el archivo (Indexada-Multinivel)");
    }

    // console.log("mapa (Indexada-Multinivel)");
    // console.log(mapaIndexadaMultinivel);
    // console.log("archivos (Indexada-Multinivel)");
    // console.log(archivosCreadosIndexadaMultinivel);
    // console.log("tamaños (Indexada-Multinivel)");
    // console.log(tamañoCaracteresIndexadaMultinivel);
    // console.log("inicio (Indexada-Multinivel)");
    // console.log(inicioIndexadaMultinivel);
    // console.log("Posiciones (Indexada-Multinivel)");
    // console.log(posicionesIndexadaMultinivel);
    // console.log("Log");
    // console.log(logIndexadaMultinivel);

}

 /**
  * Metodo que valida si hay espacio para almacenar el archivo
  * @param {*} tamaño tamaño de caracteres del archivo
  * @returns array con las posiciones vacias, -1 si no se encuentra el espacio
  */
function validarEspacioIndexadaMultinivel(tamaño) {
    
    //Indica cuantos bloques se requieren para almacenar el archivo
    let bloquesNecesariosDatos = Math.ceil(tamaño/(tamañoBloque));
    //Indica la cantidad de bloques indices que se requieren para los bloques de datos
    let cantidadBloquesindices = 0;
    //Indica la cantidad de bloques totales que se van a usar para el archivo
    let bloquesTotales = 0;
    //Array que va contener las posiciones de los bloques disponibles
    let array = new Array();

    //Valida si la cantidad de bloques de datos es igual a 1
    if (bloquesNecesariosDatos == 1) {
        cantidadBloquesindices++;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 1 y menor que 5
    if (bloquesNecesariosDatos > 1 && bloquesNecesariosDatos < 5) {
        cantidadBloquesindices = cantidadBloquesindices+2;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 4 y menor que 8
    if (bloquesNecesariosDatos > 4 && bloquesNecesariosDatos < 8) {
        cantidadBloquesindices = cantidadBloquesindices+4;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 7 y menor que 11
    if (bloquesNecesariosDatos > 7 && bloquesNecesariosDatos < 11) {
        cantidadBloquesindices = cantidadBloquesindices+5;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 10 y menor que 14
    if (bloquesNecesariosDatos > 10 && bloquesNecesariosDatos < 14) {
        cantidadBloquesindices = cantidadBloquesindices+6;
    }

    //Calculo para determinar la cantidad de bloques totales
    bloquesTotales = bloquesNecesariosDatos + cantidadBloquesindices;

    //Bucle que recorre el mapa buscando posiciones de bloques disponibles
    for (let index = 0; index < mapaIndexadaMultinivel.length; index++) {
        //Valida si el bloque esta disponible o libre
        if (mapaIndexadaMultinivel[index][0] == "") {
            //Agrega la posicion al array
            array.push(index);
            bloquesTotales--;
        }
        //Valida si ya se encontraron los bloques necesarios
        if (bloquesTotales == 0) {
            break;
        }
        
    }
    //Valida si se encontraron todos los bloques necesarios
    if (bloquesTotales == 0) {
        //retorna el array con las posiciones disponibles
        return array;
    }else{
        //Retorna el -1 que indica que no hay espacio
        return -1;
    }
}

/**
 * Metodo que elimina un archivo indicado en el algortimos Indexada-Multinivel
 * @param {*} nombre Nombre del archivo
 * @param {*} tamaño Tamaño del archivo
 */
function eliminarArchivoIndexadaMultinivel (nombre, tamaño) {

    // Ingresa registro al log
    logIndexadaMultinivel += ` Se valida que exista el mensaje a eliminar. \n`;
    //Variable que almacena el resultado de la validacion
    let validarArchivo = validarArchivoIndexadaMultinivel(nombre);
    //Arreglo con posiciones ocupadas por el archivo
    let eliminar = posicionesIndexadaMultinivel[validarArchivo];

    //Valida que si exista un archivo creado con ese nombre
    if (validarArchivo != -1) {
        // Ingresa registro al log
        logIndexadaMultinivel += ` Se recorren los indices y se pone en disponible en mapa de bits las posiciones liberadas. \n`;
        //Bucle que recorre las posiciones con los bloques ocupados por el archivo
        for (let index = 0; index < eliminar.length; index++) {
            //Setea en vacio el bloque
            mapaIndexadaMultinivel[eliminar[index]] = ["","",""];
            
        }

        //Elimina los datos del archivo a eliminar del arreglo de archivos creados
        archivosCreadosIndexadaMultinivel.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de tamaños de archivos creados
        tamañoCaracteresIndexadaMultinivel.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de posicion inicial del archivo
        inicioIndexadaMultinivel.splice(validarArchivo,1);
        //Elimina las posiciones ocupadas por el archivo
        posicionesIndexadaMultinivel.splice(validarArchivo,1)
    }else{
        // Ingresa registro al log
        logIndexadaMultinivel += ` Se notifica que el mensaje a eliminar no existe en memoria. \n`;
        console.log("No se existe el archivo que quiere eliminar (indexada-multinivel)");
    }

    // console.log("mapa (Indexada-Multinivel)");
    // console.log(mapaIndexadaMultinivel);
    // console.log("archivos (Indexada-Multinivel)");
    // console.log(archivosCreadosIndexadaMultinivel);
    // console.log("tamaños (Indexada-Multinivel)");
    // console.log(tamañoCaracteresIndexadaMultinivel);
    // console.log("inicio (Indexada-Multinivel)");
    // console.log(inicioIndexadaMultinivel);
    // console.log("Posiciones (Indexada-Multinivel)");
    // console.log(posicionesIndexadaMultinivel);
    // console.log("Log");
    // console.log(logIndexadaMultinivel);

}

 /**
 * Metodo que valida si el archivo existe
 * @param {*} nombre Nombre del archivo a validar
 * @returns indice del archivo. -1 Si no lo encuentra
 */
function validarArchivoIndexadaMultinivel (nombre) {
    //Bucle que recorre el arry de archivos creados
    for (let index = 0; index < archivosCreadosIndexadaMultinivel.length; index++) {
        //Valida si el nombre coincide con el que se busca
        if (archivosCreadosIndexadaMultinivel[index] == nombre) {
            return index;
        }
        
    }
    return -1;
} 

   //--------------------------Asignacion Indexada-Combinada----------------------------------------------

 /**
 * Metodo que realiza el ingreso del archivo 
 * @param {*} nombre Nombre del archivo a crear
 * @param {*} tamaño Tamaño del archivo a crear
 */
export function crearArchivoIndexadaCombinada(nombre, tamaño) {

    // Ingresa registro al log
    logIndexadaCombinada += ` Se valida que exista espacio para almacenar el mensaje. \n`;
    //Valida si existe el espacio para almacenar el archivo
    let validacion = validarEspacioIndexadaCombinada(tamaño);
    //Indica la cantidad de datos que faltan por asignar
    let cantidadFaltante = tamaño;
    // Indicador de la palabra
    let indicador = 0;

    //Valida si se cumple con el espacio necesario
    if (validacion != -1) {

        // Llama al metodo que ejecuta el algortimo en su primer campo de dato
        tipo1(nombre, 0, validacion, cantidadFaltante, indicador);

        //Ingresa el archivo en el arreglo de archivos creados
        archivosCreadosIndexadaCombinada.push(nombre);
        //Ingresa el tamaño del archivo en el arreglo de tamaños de archivos creados
        tamañoCaracteresIndexadaCombinada.push(tamaño);
        //Ingresa el indice del bloque para el archivo creado.
        inicioIndexadaCombinada.push(validacion[0]);
        //Ingresa las posiciones utilizadas por el archivo
        posicionesIndexadaCombinada.push(validacion);
        
    }else{
        // Ingresa registro al log
        logIndexadaCombinada += ` Se notifica que no existe espacio suficiente para ingresar el mensaje. \n`;
        console.log("No hay espacio suficiente para almacenar el archivo (Indexada-Multinivel)");
    }

    // console.log("mapa (Indexada-Combinada)");
    // console.log(mapaIndexadaMultinivel);
    // console.log("archivos (Indexada-Combinada)");
    // console.log(archivosCreadosIndexadaMultinivel);
    // console.log("tamaños (Indexada-Combinada)");
    // console.log(tamañoCaracteresIndexadaMultinivel);
    // console.log("inicio (Indexada-Combinada)");
    // console.log(inicioIndexadaMultinivel);
    // console.log("Posiciones (Indexada-Combinada)");
    // console.log(posicionesIndexadaMultinivel);
    console.log("Log");
    console.log(logIndexadaCombinada);

}

/**
 * Metodo que realiza eñ ingreso de datos en su primera parte
 *
 * @param {*} nombre Nombre del archivo a crear
 * @param {*} indice Indice actual del array de posciones
 * @param {*} array Array de posiciones disponibles
 * @param {*} faltantes Cantidad de datos faltantes por asignar
 */
function tipo1(nombre, indice, array, faltantes, indicador) {

    // Ingresa registro al log
    logIndexadaCombinada += ` Se toma el bloque ${array[indice]+1} como super i nodo. \n`;
    // Nodo de indices
    let inodo = array[indice];
    // Asignacion al puntero siguiente
    mapaIndexadaCombinada[array[indice]][0] = array[indice+1]+1;
    // Aumento del indice
    indice++;

    // Ingresa registro al log
    logIndexadaCombinada += ` Se enlaza en el super i nodo el bloque de datos ${array[indice+1]}. \n`;
    // Ingresa registro al log
    logIndexadaCombinada += ` Se ingresan datos en el bloque ${array[indice+1]}. \n`;
    
    // Bucle que recorre el bloque de datos para el ingreso del mensaje
    for (let index1 = 0; index1 < mapaIndexadaCombinada[0].length; index1++) {
        // Valida si ya se ingreso todo el archivo
        if (faltantes == 0) {
            break;
        } else {
            mapaIndexadaCombinada[array[indice]][index1] = nombre.charAt(indicador);
            faltantes--;
            indicador++;
        }
    }
    // Valida si faltan campos para completar la palabra
    if (faltantes != 0) {
        indice++;
        // Sigue con el recorrido 2
        tipo2(nombre, indice, array, faltantes, inodo, indicador);
    }
}

/**
 * Recorre en forma 2 el algoritmo
 */
function tipo2(nombre, indice, array, faltantes, inodo, indicador) {

    // Ingresa registro al log
    logIndexadaCombinada += ` Se enlaza en el super i nodo el bloque de indices ${array[indice]+1}. \n`;
    // Incializa inodo
    mapaIndexadaCombinada[inodo][1] = array[indice]+1;
    // Iniciliza el tope
    let tope = 0;
    // Guarda el nodo indice
    let nodoIndice = array[indice];
    indice++;
    // Recorre los bloques de memoria
    while (tope != 3) {
        // Ingresa registro al log
        logIndexadaCombinada += ` Se enlaza en el bloque de indices el bloque de datos ${array[indice]+1}. \n`;
        // Se asigna en bloque de indice el indice que se va a consumir
        mapaIndexadaCombinada[nodoIndice][tope] = array[indice]+1;

        // Ingresa registro al log
        logIndexadaCombinada += ` Se asignan datos en el bloque de datos ${array[indice]+1}. \n`;
        // Recorre el bloque de datos para asignar
        for (let index = 0; index < mapaIndexadaCombinada[0].length; index++) {
            // Valida si se completo la insercion del mensaje
            if (faltantes == 0) {
                break;
            }else{
                mapaIndexadaCombinada[array[indice]][index] = nombre.charAt(indicador);
                faltantes--;
                indicador++;
            }
        }
        // Valida si ingreso la palabra completa
        if (faltantes == 0) {
            break;
        }else{
            indice++;
            tope++
        }
    }

    // Valida si faltan datos por ingresar
    if (faltantes != 0) {
        // Pasa al recorrido 3
        tipo3(nombre, indice, array, faltantes, inodo, indicador);
    }

}

/**
 * Forma 3 de recorrer el algoritmo
 */
function tipo3(nombre, indice, array, faltantes, inodo, indicador) {
    // Ingresa registro al log
    logIndexadaCombinada += ` Se enlaza en el super inodo ${inodo+1} el siguiente super inodo ${array[indice]+1}. \n`;
    // Asigna dato
    mapaIndexadaCombinada[inodo][2] = array[indice]+1;
    //indice++;
    // Pasa al recorrido 1
    tipo1(nombre, indice, array, faltantes, indicador);
}

/**
 * Metodo que valida si hay espacio para almacenar el archivo
 * @param {*} tamaño tamaño de caracteres del archivo
 * @returns array con las posiciones vacias, -1 si no se encuentra el espacio
 */
function validarEspacioIndexadaCombinada(tamaño) {
    
    //Indica cuantos bloques se requieren para almacenar el archivo
    let bloquesNecesariosDatos = Math.ceil(tamaño/(tamañoBloque));
    //Indica la cantidad de bloques indices que se requieren para los bloques de datos
    let cantidadBloquesindices = 0;
    //Indica la cantidad de bloques totales que se van a usar para el archivo
    let bloquesTotales = 0;
    //Array que va contener las posiciones de los bloques disponibles
    let array = new Array();

    //Valida si la cantidad de bloques de datos es igual a 1
    if (bloquesNecesariosDatos == 1) {
        cantidadBloquesindices++;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 1 y menor que 5
    if (bloquesNecesariosDatos > 1 && bloquesNecesariosDatos < 5) {
        cantidadBloquesindices = cantidadBloquesindices+2;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 4 y menor que 8
    if (bloquesNecesariosDatos > 4 && bloquesNecesariosDatos < 6) {
        cantidadBloquesindices = cantidadBloquesindices+3;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 7 y menor que 11
    if (bloquesNecesariosDatos > 5 && bloquesNecesariosDatos < 9) {
        cantidadBloquesindices = cantidadBloquesindices+4;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 10 y menor que 14
    if (bloquesNecesariosDatos > 8 && bloquesNecesariosDatos < 10) {
        cantidadBloquesindices = cantidadBloquesindices+5;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 10 y menor que 14
    if (bloquesNecesariosDatos > 9 && bloquesNecesariosDatos < 13) {
        cantidadBloquesindices = cantidadBloquesindices+6;
    }
    //Valida si la cantidad de bloques de datos esta en el rango mayor a 10 y menor que 14
    if (bloquesNecesariosDatos > 12 && bloquesNecesariosDatos < 14) {
        cantidadBloquesindices = cantidadBloquesindices+7;
    }

    //Calculo para determinar la cantidad de bloques totales
    bloquesTotales = bloquesNecesariosDatos + cantidadBloquesindices;

    //Bucle que recorre el mapa buscando posiciones de bloques disponibles
    for (let index = 0; index < mapaIndexadaCombinada.length; index++) {
        //Valida si el bloque esta disponible o libre
        if (mapaIndexadaCombinada[index][0] == "") {
            //Agrega la posicion al array
            array.push(index);
            bloquesTotales--;
        }
        //Valida si ya se encontraron los bloques necesarios
        if (bloquesTotales == 0) {
            break;
        }
        
    }
    //Valida si se encontraron todos los bloques necesarios
    if (bloquesTotales == 0) {
        //retorna el array con las posiciones disponibles
        return array;
    }else{
        //Retorna el -1 que indica que no hay espacio
        return -1;
    }
}

/**
 * Metodo que elimina un archivo indicado en el algortimos Indexada-Multinivel
 * @param {*} nombre Nombre del archivo
 * @param {*} tamaño Tamaño del archivo
 */
function eliminarArchivoIndexadaCombinada (nombre, tamaño) {

    // Ingresa registro al log
    logIndexadaCombinada += ` Se valida que el mensaje a eliminar este en memoria. \n`;

    //Variable que almacena el resultado de la validacion
    let validarArchivo = validarArchivoIndexadaCombinada(nombre);
    //Arreglo con posiciones ocupadas por el archivo
    let eliminar = posicionesIndexadaCombinada[validarArchivo];

    // Ingresa registro al log
    logIndexadaCombinada += ` Se recorren los indices utilizados para almacenar el mensaje, y se ponen en mapa de bits como disponibles. \n`;

    //Valida que si exista un archivo creado con ese nombre
    if (validarArchivo != -1) {
        //Bucle que recorre las posiciones con los bloques ocupados por el archivo
        for (let index = 0; index < eliminar.length; index++) {
            //Setea en vacio el bloque
            mapaIndexadaCombinada[eliminar[index]] = ["","",""];
            
        }

        //Elimina los datos del archivo a eliminar del arreglo de archivos creados
        archivosCreadosIndexadaCombinada.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de tamaños de archivos creados
        tamañoCaracteresIndexadaCombinada.splice(validarArchivo,1);
        //Elimina los datos del archivo a eliminar del arreglo de posicion inicial del archivo
        inicioIndexadaCombinada.splice(validarArchivo,1);
        //Elimina las posiciones ocupadas por el archivo
        posicionesIndexadaCombinada.splice(validarArchivo,1)
    }else{
        // Ingresa registro al log
        logIndexadaCombinada += ` Se nortifica que no existe el mensaje a eliminar en disco. \n`;

        console.log("No se existe el archivo que quiere eliminar (indexada-Combinada)");
    }

    // console.log("mapa (Indexada-Combinada)");
    // console.log(mapaIndexadaCombinada);
    // console.log("archivos (Indexada-Combinada)");
    // console.log(archivosCreadosIndexadaCombinada);
    // console.log("tamaños (Indexada-Combinada)");
    // console.log(tamañoCaracteresIndexadaCombinada);
    // console.log("inicio (Indexada-Combinada)");
    // console.log(inicioIndexadaCombinada);
    // console.log("Posiciones (Indexada-Combinada)");
    // console.log(posicionesIndexadaCombinada);
    console.log("Log");
    console.log(logIndexadaCombinada);
 
}

 /**
 * Metodo que valida si el archivo existe
 * @param {*} nombre Nombre del archivo a validar
 * @returns indice del archivo. -1 Si no lo encuentra
 */
function validarArchivoIndexadaCombinada (nombre) {
    //Bucle que recorre el arry de archivos creados
    for (let index = 0; index < archivosCreadosIndexadaCombinada.length; index++) {
        //Valida si el nombre coincide con el que se busca
        if (archivosCreadosIndexadaCombinada[index] == nombre) {
            return index;
        }
    }
    return -1;
} 

//--------------------------------- Metodos generales----------------------------------------------

/**
 * Limpia los discos
 */
export function limpiarDiscos() {

    //--------------------------------Asignacion Contigua------------------------------------------------
        //Arreglo que almacena los archivos creados
        archivosCreadosContigua  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        tamañoCaracteresContigua = [];
        //Arreglo que funciona como mapa de bits
        mapaContigua = crearMapa();
        //Arreglo con los indices de inicio de cada archivo
        inicioContigua = [];
    //--------------------------------Asignacion Enlazada------------------------------------------------
        //Arreglo que almacena los archivos creados
        archivosCreadosEnlazada  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        tamañoCaracteresEnlazada = [];
        //Arreglo que funciona como mapa de bits
        mapaEnlazada = crearMapa();
        //Arreglo con los indices de inicio de cada archivo
        inicioEnlazada = [];
    //---------------------------Asignacion Indexada Enlazada-------------------------------------------
        //Arreglo que almacena los archivos creados
        archivosCreadosIndexadaEnlazada  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        tamañoCaracteresIndexadaEnlazada = [];
        //Arreglo que funciona como mapa de bits
        mapaIndexadaEnlazada = crearMapa();
        //Arreglo con los indices de inicio de cada archivo
        inicioIndexadaEnlazada = [];
        //Arreglo con las posiciones ocupadas por cada archivo
        posicionesIndexadaEnlazada = [];
    //--------------------------Asignacion Indexada-Multinivel------------------------------------------
        //Arreglo que almacena los archivos creados
        archivosCreadosIndexadaMultinivel  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        tamañoCaracteresIndexadaMultinivel = [];
        //Arreglo que funciona como mapa de bits
        mapaIndexadaMultinivel = crearMapa();
        //Arreglo con los indices de inicio de cada archivo
        inicioIndexadaMultinivel = [];
        //Arreglo con las posiciones ocupadas por cada archivo
        posicionesIndexadaMultinivel = [];
   //--------------------------Asignacion Indexada-Combinada------------------------------------------
        //Arreglo que almacena los archivos creados
        archivosCreadosIndexadaCombinada  = [];
        //Arreglo que almacena el tamaño de caracteres de los archivos creados
        tamañoCaracteresIndexadaCombinada  = [];
        //Arreglo que funciona como mapa de bits
        mapaIndexadaCombinada  = crearMapa();
        //Arreglo con los indices de inicio de cada archivo
        inicioIndexadaCombinada  = [];
        //Arreglo con las posiciones ocupadas por cada archivo
        posicionesIndexadaCombinada  = [];
    
    //Limpia log de discos
    logContigua = '';
    logEnlazada = '';
    logIndexadaCombinada = '';
    logIndexadaEnlazada = '';
    logIndexadaMultinivel = '';
}

/**
 * Muestra la informacion del disco seleccionado
 */
export function informacionDisco(disco) {
    
}
/**
 * Funcionalidades y variables de los algortimos de Creacion y Particiones de Discos.
 * @author Kevin David Sanchez Solis
 */

//--------------------------------------Importaciones----------------------------------------------------

import React from 'react';

//--------------------------------------Variables--------------------------------------------------------

//Variable que almacena los discos creados [nombre, tamaño, tipo]
export var discosC = [];
//Arreglo de parametros de los discos = [[Particion primaria, Extendida, Logica, tamaño particion extendida] [] [] ...]
var parametros     = [];
//Arreglo de arreglos que almacena las particiones de los discos[[particion1, particion1][particion]...]
var particiones    = [];
//Tamaño maximo del disco MBR
var tmaxMBR        = 2000;
//Cantidad maxima de particiones primarias en un disco MBR
var pPrimariaMBR   = 4;
//Cantidad maxima de particiones Extendidas en en disco MBR
var pExtendida     = 1;
//Cantidad maxima de particiones logicas en un disco MBR
var pLogica        = 20;
//Cantidad maxima de particiones primarias en un disco Gpt
var pPrimariaGPT   = 128;

//--------------------------------------Metodos----------------------------------------------------------
/**
 * Funcion de pruebas
 * @returns resultado de las pruebas
 */
export function datos () {

    console.log(discosC);

    return discosC;

}

/**
 * Metodo que elimina un disco especificado en el picker
 * @param {*} nombre nombre del disco a eliminar
 */
export function EliminarDisco(nombre) {
    
    //Obtiene la posicion del disco dentro del array de discos creados
    let indice = posicionDisco(nombre);

    //Elimina los datos en la posicion en la que se encuentra el disco especificado
    discosC.splice(indice, 1);

}

/**
 * Metodo que valida si existe un disco con un nombre en especifico.
 * @param {*} nombre Nombre del disco a validar si existe o no
 * @returns Centinela, variable que indica si existe o no un disco con el nombre
 */
function validarNombreDisco(nombre) {

    //Centinela permanece en falso mientras que no exista un disco con el nombre
    let centinela = false;
    
    //bucle que itera el arreglo global de Discos creados
    for (let index = 0; index < discosC.length; index++) {
        //Valida si ya existe un disco con el nombre
        if (discosC[index][0] == nombre) {
            //Si ya existe un disco con ese nombre centinela es verdadero
            centinela = true;
        } 
    }

    return centinela;

}

/**
 * Metodo que crea un disco
 * @param {*} array Arreglo con los datos del disco a crear [nombre, tamaño, tipo]
 */
export function crearDisco(array) {

    //Valida que si el disco es mbr no exceda el limite de 2TiB de tamaño
    if (array[2] == "MBR" && array[1] > tmaxMBR) {
        
        //Alerta de que el limite se paso
        alert("No se puede, supera el limite");
    }
    //Valida si ya existe un disco con ese nombre
    else if (validarNombreDisco(array[0])) {
         
        //Alerta de que existe un disco con ese nombre
         alert("Disco ya creado");
    }
    //Caso optimo en el que cumple con las validaciones y se puede crear el disco.
    else{

        //Valida si el disco es MBR, si lo es agrega a un arreglo los limites del disco como son:
        //Cantidad particiones primarias, cantidad particiones extendidas y logicas.
        if (array[2] == "MBR") {

            //Arreglo que almacena los parametros del disco
            let aux = [];

            //Tamaño parcial del disco
            aux.push(array[1]);
            //Numero maximo de particiones primarias
            aux.push(pPrimariaMBR);
            //Numero maximo de particiones extendidas
            aux.push(pExtendida);
            //Numero maximo de particiones logicas
            aux.push(pLogica);

            //Ingreso del arreglo con los parametros al arreglo global
            parametros.push(aux);
            
        }
        //De lo contrario se considera que es un disco GPT
        else {

            //Arreglo que almacena los parametros del disco
            let aux = [];

            //Tamaño parcial del disco
            aux.push(array[1]);
            //Numero maximo de particiones primarias
            aux.push(pPrimariaGPT);

            //Ingreso del arreglo con los parametros al arreglo global
            parametros.push(aux);

        }

        //Ingreso del arreglo con los datos del disco en el arreglo global de Discos.
        discosC.push(array);

        console.log(parametros);
        console.log(discosC);
    }
}

/**
 * Metodo que devuelve el numero indice del disco dentro del arreglo de discos
 * @param {*} nombre Nombre del disco que el usuario selecciona
 * @returns indice del disco dentro del arreglo de discos
 */
export function posicionDisco (nombre){

    //Variable que captura el indice del disco dentro del arreglo de discos
    let numero;

    //bucle que busca la posicion del disco en el arreglo de discos
    for (let index = 0; index < discosC.length; index++) {
        //decision para validar que el disco escogido este en el arreglo
        if (discosC[index][0] == nombre) {
            numero = index;
        } 
    }

    //Valida que el tipo de dato no sea indefinido, esto pasa cuando es igual a 0.
    if (typeof numero === 'undefined'){

        //Se le asigna el valor de 0
        numero = 0;

    }

    return numero;
}

/**
 * Metodo que ingresa los datos de una particion en el arreglo que corresponde con la posicion del disco creado
 * @param {*} nombre Nombre del disco a que corresponde la particion
 * @param {*} array Arreglo con los datos de la particion
 * @Anotacion El valor de indice 0 se toma como undefined
 */
export function ingresarParticion(nombre, array) {

    //Falta Validaciones bandera que valide si se cumple para que agregue a particiones.

    //console.log(array);

    //Indice que indica en que posicion se encuentra el disco creado en el array de disco
    let indice = posicionDisco(nombre);
    //Variable que cambia a true cuando se pueda crear la particion.
    let centinela = false;

    //Valida si el tipo de dato es undefined, esto sucede cuando devuelve cero, asi que se le asigna ese valor
    /** 
    if (typeof indice === 'undefined'){

        indice = 0;

    }*/

    //Valida si el disco es mbr o gpt para continuar con las validaciones correspondientes
    if (discosC[indice][2] == "MBR") {

        //Valida si el espacio que queda en el disco es suficiente para crear la particion.
        if (array[1] <= parametros[indice][0] || array[4] == 'Logica') {

            //Valida si el tipo de particion es Primaria
            if (array[4] == 'Primaria') {
                
                //Valida que no se exceda el limite de particiones primarias que se pueden crear
                if (parametros[indice][1] > 0) {
                    
                    console.log("Permite primaria");
                    //A la capacidad maxima de particiones del disco se le resta la que se usa
                    parametros[indice][1]--;
                    centinela = true;

                }else{
                    console.log("Limite de particiones primarias alcanzado");
                
                }

            }
            //Valida si el tipo de particion es Extendida
            else if (array[4] == 'Extendida') {

                //Valida que no exista una particion extendida ya creada
                if ((parametros[indice][2] > 0)) {
                    //Valida que no exceda el limite de particiones primarias
                    if (parametros[indice][1] > 0) {
                    
                        console.log("Permite extendida");
                        //A la capacidad maxima de particiones del disco se le resta la que se usa
                        parametros[indice][1]--;
                        //A la capacidad maxima de particiones del disco se le resta la que se usa
                        parametros[indice][2]--;
                        //Se agrega a los parametros el tamaño de la particion extendida
                        parametros[indice].push(array[1]);
                        centinela = true;

                    }else{
                        console.log("Excede el limite de particiones primarias que puede crear");
                    }
                    
                }else{
                    console.log("Ya existe una particion extendida creada");
                }
                
            }
            //Valida si el tipo de particion es Logica
            else if (array[4] == 'Logica') {
                //Valida que: Exista particion extendida
                if (parametros[indice][2] == 0) {
                    //Valida que No exceda el limite de particiones logicas
                    if (parametros[indice][3] > 0) {
                        //Valida que Tamaño disponible de la particion extendida sea la adecuada
                        if (parametros[indice][4] >= array[1]) {

                            console.log("Permite Logica");
                            //Al limite de particiones logicas se le resta la que se crea
                            parametros[indice][3]--;
                            //Al tamaño parcial de la particion extendida se le resta el tamaño de la particion creada
                            parametros[indice][4] = parametros[indice][4] - array[1];
                            centinela = true;

                        }else{
                            console.log("Tamaño de la particion extendida insuficiente");
                            centinela = false;
                        }
                    }else{
                        console.log("Limite de Particiones logicas alcanzada");
                        centinela = false;
                    }
                }else{
                    console.log("No existe particion extendida creada");
                }
            }

            //Se le resta al tamaño parcial libre, el espacio que utiliza la particion
            parametros[indice][0]= (parametros[indice][0]-array[1]);

        }else{
            console.log("excede el tamaño del disco");
        }
        
    }
    //De lo contrario se asume que es una particion GPT
    else{
        //Valida que sea una particion primaria - GPT solo tiene primarias
        if (array[4] == 'Primaria') {
            //Valida que no exceda el tamaño disponible del disco
            if (array[1] <= parametros[indice][0]){
                //Valida que no exceda el limite de particiones que puede tener el disco
                if (parametros[indice][1] > 0) {

                    console.log("Se crea Particion Primaria GPT");
                    //Al espacio parcial del disco se le resta el de la particion creada
                    parametros[indice][0] = parametros[indice][0] - array[1];
                    //Al limite de particiones del disco se le resta la creada
                    parametros[indice][1]--;
                    centinela = true;
                    
                }else{
                    console.log("Limite de particiones alcanzado");
                }
            }else{
                console.log("Espacio Insuficiente en el disco");
            }
        }else{
            console.log("GPT solo Admite Particiones Primarias");
        }
    }

    if (centinela === true) {

        //Valida si ya existe un objeto en la posicion y agrega el nuevo array en la posicion siguiente
        if (particiones[indice] != null) {
            
            //Agrega segun la posicion del disco, el arreglo con los datos de la particion.
            particiones[indice].push(array);

        }
        //Si no hay un objeto creado, instancia la posicion como un arreglo y agrega los datos
        else{

            //Inicializa un arreglo en la posicion
            particiones[indice] = new Array();
            //Agrega el arreglo con la particion en la posicion indicada segun el disco
            particiones[indice].push(array);
        }   

        //console.log("Particiones");
        //console.log(particiones);
    }
        
    //console.log(particiones);
}

/**
 * Metodo que busca por disco seleccionado, el arreglo con los arreglos de particiones que corresponde al disco
 * @param {} nombreDisco Nombre del disco seleccionado en la interfaz
 * @returns Retorna el arreglo de arreglos con la informacion de las particiones del disco.
 */
export async function datosPorDisco(nombreDisco) {

    //Indice que indica en que posicion se encuentra el disco creado en el array de disco
    let indice = await posicionDisco(nombreDisco);

    return particiones[indice];

}

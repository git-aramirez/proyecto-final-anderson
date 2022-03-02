import { styles } from "../styles/styles";

var matrizDeSalida;
var matrizDeDatos;
var matrizIntermedia;

export function ejecutarAlgoritmo(item_algoritmo,tablaEntrada,nucleos,quantum){
    switch (item_algoritmo) {
        case "FCFS":
           return [FCFS(tablaEntrada,nucleos),cantidadColumnas];
        case "SJF":
            return [SJF(tablaEntrada,nucleos),cantidadColumnas];
        case "SRTF":
            return [SRTF(tablaEntrada,nucleos),cantidadColumnas];
        case "externoExpulsivo":
            return [externoExpulsivo(tablaEntrada,nucleos),cantidadColumnas];
        case "externoNoExpulsivo":
            return [externoNoExpulsivo(tablaEntrada,nucleos),cantidadColumnas];
        case "HRN":
                return [HRN(tablaEntrada,nucleos),cantidadColumnas];
        case "HRN_PRIMA":
                return [HRN_PRIMA(tablaEntrada,nucleos),cantidadColumnas];
        case "RR":
                return [RR(tablaEntrada,nucleos,quantum),cantidadColumnas];
        default:
          break;
      }
}

export function inicializarTablaEntradaNumerosAleatorios(tablaEntrada){
    let min_llegada =0;
    let min_ejecucion_prioridad =1;
    let max =10; 
   
    for (let index_i = 0; index_i < tablaEntrada.length; index_i++) {

        if(index_i>0){
            tablaEntrada[index_i].t_llegada = tablaEntrada[index_i-1].t_llegada+1;
        }else{
            tablaEntrada[index_i].t_llegada = parseInt(Math.random() * (max - min_llegada) + min_llegada);
        }
        tablaEntrada[index_i].t_ejecucion = parseInt(Math.random() * (max - min_ejecucion_prioridad) + min_ejecucion_prioridad);
        tablaEntrada[index_i].prioridad = parseInt(Math.random() * (max - min_ejecucion_prioridad) + min_ejecucion_prioridad);


    }
    //return tablaEntrada;
}

var cantidadColumnas;

export function crearTablaDeEstilos(){
    let tablaStyles = [];
    cantidadColumnas = buscarTiempoFinalMasLejano()+1;

    //crear tabla
    for (let index = 0; index < matrizDeDatos.length+1; index++) {
        tablaStyles.push();
        tablaStyles[index]=new Array(cantidadColumnas);
    }

    inicializarStyles(tablaStyles);

    for (let index_i = 0; index_i < matrizIntermedia.length; index_i++) {
        let tiempoInicial =parseInt(matrizIntermedia[index_i][1]);
        let tiempoFinal =parseInt(matrizIntermedia[index_i][2]);
        let index_k= parseInt(matrizIntermedia[index_i][0]-1);
        for (let index_j = tiempoInicial; index_j < tiempoFinal; index_j++) {
            if(matrizIntermedia[index_i][3]===0){
                tablaStyles[index_k][index_j]='#ED391E';
                continue;
            }
            tablaStyles[index_k][index_j]='#0DC114';
        }
    }

    return tablaStyles;
}

function buscarTiempoFinalMasLejano(){
    let tiempoFinalLejano=0;
    for (let index = 0; index < matrizIntermedia.length; index++) {
       if(parseInt(matrizIntermedia[index][2]) >tiempoFinalLejano){
            tiempoFinalLejano=parseInt(matrizIntermedia[index][2]);
       }
    }
    return tiempoFinalLejano;
}

function inicializarStyles(tablaStyles){
    for (let index_i = 0; index_i < tablaStyles.length; index_i++) {
        for (let index_j = 0; index_j < tablaStyles[0].length; index_j++) {
            if(index_i===tablaStyles.length-1){
                tablaStyles[index_i][index_j]=index_j;
                continue;
            }
            tablaStyles[index_i][index_j]='#FFFFFF';
        }
    }
}

function asignarValoresMatrizIntermedia(pid,tiempo_llegada,tiempo_fin,tipoTiempo,i){
    matrizIntermedia[i][0] = pid;
    matrizIntermedia[i][1] = tiempo_llegada;
    matrizIntermedia[i][2] = tiempo_fin;
    matrizIntermedia[i][3] = tipoTiempo;
    matrizIntermedia[i][4] = tiempo_fin - tiempo_llegada;
}

function guardarDatos(tabla) {
    matrizDeDatos = new Array(tabla.length);
    for (let i = 0; i < tabla.length; i++) {
        matrizDeDatos[i] = new Array(4);
        matrizDeDatos[i][0] = tabla[i].pid;
        matrizDeDatos[i][1] = parseInt(tabla[i].t_llegada);
        matrizDeDatos[i][2] = parseInt(tabla[i].t_ejecucion);
        matrizDeDatos[i][3] = parseInt(tabla[i].prioridad);
    }

    for (let k = 1; k < matrizDeDatos.length; k++) {
        for (let i = 0; i < (matrizDeDatos.length - k); i++) {
            if (matrizDeDatos[i][1] > matrizDeDatos[i + 1][1]) {
                let aux = matrizDeDatos[i];
                matrizDeDatos[i] = matrizDeDatos[i + 1];
                matrizDeDatos[i + 1] = aux;
            }
        }
    }

    matrizDeSalida = new Array(tabla.length+1);
    for (let i = 0; i < matrizDeSalida.length; i++) {
        matrizDeSalida[i] = new Array(5);
    }
}

function verificarIntercepcionDeProcesos(tiempo_llegada) {
    let cantidadIntercepciones = 0;
    for (let i = 0; i < matrizIntermedia.length; i++) {
        let tiempo_fin_eje = parseInt(matrizIntermedia[i][2]);
        let tipo = parseInt(matrizIntermedia[i][3]);
        if (tipo == 1) {
            if (tiempo_fin_eje > tiempo_llegada) {
                cantidadIntercepciones++;
            }
        }
    }
    return cantidadIntercepciones;
}

 function editarTablaSalida() {
    let suma = 0;
    for (let i = 0; i < (matrizDeSalida.length-1); i++) {
        var tiempo_espera_total = 0;
        var tiempo_ejecucion_total = 0;
        for (let j = 0; j < matrizIntermedia.length; j++) {
            if (parseInt(matrizIntermedia[j][0]) == (i + 1)) {
                if (parseInt(matrizIntermedia[j][3]) == 1) {
                    tiempo_ejecucion_total += parseInt(matrizIntermedia[j][4]);
                } else {
                    tiempo_espera_total += parseInt(matrizIntermedia[j][4]);
                }
            }
        }
        suma += tiempo_espera_total;
        var pid = matrizDeDatos[i][0];
        var tiempo_servicio = tiempo_ejecucion_total + tiempo_espera_total;
        var tiempo_salida = tiempo_servicio + parseInt(matrizDeDatos[i][1]);
        matrizDeSalida[i][0]=pid;
        matrizDeSalida[i][1]=tiempo_salida;
        matrizDeSalida[i][2]=tiempo_servicio;
        matrizDeSalida[i][3]=tiempo_espera_total;
        matrizDeSalida[i][4]=(tiempo_ejecucion_total / tiempo_servicio);
        matrizDeSalida[i][4]=Math.round(matrizDeSalida[i][4] * 100) / 100;
    }

    matrizDeSalida[matrizDeSalida.length-1][0]="Promedio"  
    matrizDeSalida[matrizDeSalida.length-1][3]= suma/(matrizDeSalida.length-1);
    matrizDeSalida[matrizDeSalida.length-1][3]= Math.round( matrizDeSalida[matrizDeSalida.length-1][3] * 100) / 100;
}


//------------------- ALGORITMOS -------------------

function FCFS(tabla,nucleos) {
    guardarDatos(tabla);
    matrizIntermedia = new Array();
    let i = 0;
    while (matrizDeDatos.length != 0) {
        let tiempo_llegada = parseInt(matrizDeDatos[0][1]);
        let pid = parseInt(matrizDeDatos[0][0]);
        let tiempo_fin;
        matrizIntermedia.push();
        if (verificarIntercepcionDeProcesos(tiempo_llegada) < nucleos) 
        {
            matrizIntermedia[i] = new Array(5);
            tiempo_fin = parseInt(matrizDeDatos[0][1]) + parseInt(matrizDeDatos[0][2]);
            asignarValoresMatrizIntermedia(pid,tiempo_llegada,tiempo_fin,1,i);
            matrizDeDatos.splice(0, 1);
        } else {
            tiempo_llegada= parseInt(matrizDeDatos[0][1]);
            i = matrizIntermedia.length;
            matrizIntermedia[i] = new Array(5);
            tiempo_fin= tiempo_llegada + 1;
            asignarValoresMatrizIntermedia(pid,tiempo_llegada,tiempo_fin,0,i);
            matrizDeDatos[0][1] = tiempo_fin;
        }
        i++;
       
    }
    guardarDatos(tabla);
    editarTablaSalida();
    return matrizDeSalida;
}

//--------------------------------------------------------------------------------------

function SJF(tabla,nucleos) {
    guardarDatos(tabla);
    matrizIntermedia = new Array();
    var i = 0;
    var pids_habilitados = new Array();
    while (matrizDeDatos.length != 0) {
        var tiempo_llegada_eje = parseInt(matrizDeDatos[0][1]);
        let pospidMenor = parseInt(obetenerPosPIDConMenorTiempoEje_SJF(tiempo_llegada_eje, pids_habilitados));
        tiempo_llegada_eje = parseInt(matrizDeDatos[pospidMenor][1]);
        var pid = matrizDeDatos[pospidMenor][0];
        pids_habilitados = new Array();
        if (verificarIntercepcionDeProcesos(tiempo_llegada_eje) < nucleos) {
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            let tiempo_fin_eje = parseInt(matrizDeDatos[pospidMenor][1]) + parseInt(matrizDeDatos[pospidMenor][2]);
           
            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_eje;
            matrizIntermedia[i][2] = tiempo_fin_eje;
            matrizIntermedia[i][3] = 1;
            matrizIntermedia[i][4] = tiempo_fin_eje - tiempo_llegada_eje;
            matrizDeDatos.splice(pospidMenor, 1);
            i++;
        } else {
            let tiempo_llegada_esp = parseInt(matrizDeDatos[pospidMenor][1]);
            i = matrizIntermedia.length;
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            let tiempo_fin_esp = tiempo_llegada_esp + 1;
            pids_habilitados.push();
            pids_habilitados[(pids_habilitados.length) - 1] = pid;

            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_esp;
            matrizIntermedia[i][2] = tiempo_fin_esp;
            matrizIntermedia[i][3] = 0;
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;
            matrizDeDatos[pospidMenor][1] = tiempo_fin_esp;
            i++;
        }
    }

    guardarDatos(tabla);
    //graficarTiempos();
    //graficarLlegadas();
    editarTablaSalida();
    return matrizDeSalida;
}

function obetenerPosPIDConMenorTiempoEje_SJF(tiempo_llegada, pids_habilitados) {
    let menor = 9999999999;
    let pospid = 0;
    for (let j = 0; j < matrizDeDatos.length; j++) {
        if (parseInt(matrizDeDatos[j][1]) == tiempo_llegada) {
            if (parseInt(matrizDeDatos[j][2]) < menor) {
                menor = matrizDeDatos[j][2];
                pospid = j;
            }
        }
        for (let i = 0; i < pids_habilitados.length; i++) {
            if (parseInt(pids_habilitados[i]) == parseInt(matrizDeDatos[j][0])) {
                if (parseInt(matrizDeDatos[j][2]) < menor) {
                    menor = matrizDeDatos[j][2];
                    pospid = j;
                }
            }
        }
    }

    return pospid;
}

//--------------------------------------------------------------------------------------

function SRTF(tabla,nucleos) {
    //canvas = document.getElementById("canvas-srtf");
    //dibujarGrafica();
    guardarDatos(tabla);
    matrizIntermedia = new Array();
    var i = 0;
    while (matrizDeDatos.length != 0) {
        let tiempo_llegada_eje = parseInt(matrizDeDatos[0][1]);
        let pospidMayor = parseInt(obetenerPosPIDConMenorTiempoEje_SRTF(tiempo_llegada_eje));
        tiempo_llegada_eje = parseInt(matrizDeDatos[pospidMayor][1]);
        var pid = matrizDeDatos[pospidMayor][0];
        if (verificarIntercepcionDeProcesos(tiempo_llegada_eje) < nucleos) {
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            let tiempo_ejecucion = parseInt(matrizDeDatos[pospidMayor][2]);
            let tiempo_fin_eje = obtenerTiempoFinEje_SRTF(tiempo_llegada_eje, tiempo_ejecucion);

            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_eje;
            matrizIntermedia[i][2] = tiempo_fin_eje;
            matrizIntermedia[i][3] = 1;
            matrizIntermedia[i][4] = tiempo_fin_eje - tiempo_llegada_eje;
            matrizDeDatos[pospidMayor][1] = tiempo_fin_eje;
            matrizDeDatos[pospidMayor][2] = matrizDeDatos[pospidMayor][2] - (tiempo_fin_eje - tiempo_llegada_eje);
            if (matrizDeDatos[pospidMayor][2] == 0) {
                matrizDeDatos.splice(pospidMayor, 1);
            }
            i++;
        } else {
            let tiempo_llegada_esp = parseInt(matrizDeDatos[pospidMayor][1]);
            i = matrizIntermedia.length;
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            let tiempo_fin_esp = tiempo_llegada_esp + 1;

            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_esp;
            matrizIntermedia[i][2] = tiempo_fin_esp;
            matrizIntermedia[i][3] = 0;
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;
            matrizDeDatos[pospidMayor][1] = tiempo_fin_esp;
            i++;
        }
    }

    guardarDatos(tabla);
    //graficarTiempos();
    //graficarLlegadas();
    editarTablaSalida();
    return matrizDeSalida;
}

function obtenerTiempoFinEje_SRTF(tiempo_llegada_eje, tiempo_ejecucion) {
    var bandera = true;
    let tiempo_acumulado = tiempo_llegada_eje;
    while (tiempo_ejecucion != 0 && bandera) {
        tiempo_acumulado += 1;
        for (let i = 0; i < matrizDeDatos.length && bandera; i++) {
            if (tiempo_acumulado == parseInt(matrizDeDatos[i][1])) {
                bandera = false;
            }
        }
        tiempo_ejecucion--;
    }

    return tiempo_acumulado;
}

function obetenerPosPIDConMenorTiempoEje_SRTF(tiempo_llegada) {
    let menor = 999999999999999;
    let pospid = 0;
    for (let j = 0; j < matrizDeDatos.length; j++) {
        if (matrizDeDatos[j][1] == tiempo_llegada) {
            let tiempo_ejecucion_total = obtenerTiempoEjecucion_SRFT(parseInt(matrizDeDatos[j][0])) + parseInt(matrizDeDatos[j][2]);
            if (tiempo_ejecucion_total < menor) {
                menor = matrizDeDatos[j][2];
                pospid = j;
            }
        }
    }

    return pospid;
}

function obtenerTiempoEjecucion_SRFT(pid) {
    let tiempo_ejecucion = 0;
    for (let i = 0; i < matrizIntermedia.length; i++) {
        if (parseInt(matrizIntermedia[i][0] == pid)) {
            if (parseInt(matrizIntermedia[i][3]) == 1) {
                tiempo_ejecucion += matrizIntermedia[i][4];
            }
        }
    }

    return tiempo_ejecucion;
}

//--------------------------------------------------------------------------------------

function externoExpulsivo(tabla,nucleos) {
    //canvas = document.getElementById("canvas-pee");
    //dibujarGrafica();
    guardarDatos(tabla);
    matrizIntermedia = new Array();
    var i = 0;

    while (matrizDeDatos.length != 0) {
        let tiempo_llegada_eje = parseInt(matrizDeDatos[0][1]);
        let pospidMayor = parseInt(obetenerPosPIDConMayorPrioridad_EXT_EXP(tiempo_llegada_eje));
        tiempo_llegada_eje = parseInt(matrizDeDatos[pospidMayor][1]);
        var pid = matrizDeDatos[pospidMayor][0];
        if (verificarIntercepcionDeProcesos(tiempo_llegada_eje) < nucleos) {
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            let tiempo_ejecucion = parseInt(matrizDeDatos[pospidMayor][2]);
            let tiempo_fin_eje = obtenerTiempoFinEje_EXT_EXP(tiempo_llegada_eje, tiempo_ejecucion);
            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_eje;
            matrizIntermedia[i][2] = tiempo_fin_eje;
            matrizIntermedia[i][3] = 1;
            matrizIntermedia[i][4] = tiempo_fin_eje - tiempo_llegada_eje;
            matrizDeDatos[pospidMayor][1] = tiempo_fin_eje;
            matrizDeDatos[pospidMayor][2] = matrizDeDatos[pospidMayor][2] - (tiempo_fin_eje - tiempo_llegada_eje);
            if (matrizDeDatos[pospidMayor][2] == 0) {
                matrizDeDatos.splice(pospidMayor, 1);
            }
            i++;
        } else {
            let tiempo_llegada_esp = parseInt(matrizDeDatos[pospidMayor][1]);
            i = matrizIntermedia.length;
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            pid = parseInt(matrizDeDatos[pospidMayor][0]);
            let tiempo_fin_esp = tiempo_llegada_esp + 1;;

            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_esp;
            matrizIntermedia[i][2] = tiempo_fin_esp;
            matrizIntermedia[i][3] = 0;
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;
            matrizDeDatos[pospidMayor][1] = tiempo_fin_esp;
            i++;
        }
    }

    guardarDatos(tabla);
    editarTablaSalida();
    return matrizDeSalida;
}

function obtenerTiempoFinEje_EXT_EXP(tiempo_llegada_eje, tiempo_ejecucion) {
    var bandera = true;
    let tiempo_acumulado = tiempo_llegada_eje;
    while (tiempo_ejecucion != 0 && bandera) {

        tiempo_acumulado += 1;
        for (let i = 0; i < matrizDeDatos.length && bandera; i++) {
            if (tiempo_acumulado == parseInt(matrizDeDatos[i][1])) {
                bandera = false;
            }
        }
        tiempo_ejecucion--;
    }

    return tiempo_acumulado;
}

function obetenerPosPIDConMayorPrioridad_EXT_EXP(tiempo_llegada) {
    let mayor = 0.0;
    let pospid = 0;
    for (let j = 0; j < matrizDeDatos.length; j++) {

        if (matrizDeDatos[j][1] == tiempo_llegada) {
            if (parseFloat(matrizDeDatos[j][3]) > mayor) {
                mayor = matrizDeDatos[j][3];
                pospid = j;
            }
        }
    }

    return pospid;
}

//--------------------------------------------------------------------------------------

function externoNoExpulsivo(tabla,nucleos) {
    guardarDatos(tabla);
    matrizIntermedia = new Array();
    var i = 0;
    var pids_habilitados = new Array();
    while (matrizDeDatos.length != 0) {

        let tiempo_llegada_eje = parseInt(matrizDeDatos[0][1]);
        let pospidMayor = parseInt(obetenerPosPIDConMayorPrioridad_EXT_NO_EXP(tiempo_llegada_eje, pids_habilitados));
        tiempo_llegada_eje = parseInt(matrizDeDatos[pospidMayor][1]);
        var pid = matrizDeDatos[pospidMayor][0];
        pids_habilitados = new Array();
        if (verificarIntercepcionDeProcesos(tiempo_llegada_eje) < nucleos) {

            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            let tiempo_fin_eje = parseInt(matrizDeDatos[pospidMayor][1]) + parseInt(matrizDeDatos[pospidMayor][2]);
            matrizIntermedia[i][0] = pid
            matrizIntermedia[i][1] = tiempo_llegada_eje;
            matrizIntermedia[i][2] = tiempo_fin_eje;
            matrizIntermedia[i][3] = 1;
            matrizIntermedia[i][4] = tiempo_fin_eje - tiempo_llegada_eje;
            matrizDeDatos.splice(pospidMayor, 1);
            i++;
        } else {

            let tiempo_llegada_esp = parseInt(matrizDeDatos[pospidMayor][1]);
            i = matrizIntermedia.length;
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            pid = parseInt(matrizDeDatos[pospidMayor][0]);
            let tiempo_fin_esp = tiempo_llegada_esp + 1;;
            pids_habilitados.push();
            pids_habilitados[(pids_habilitados.length) - 1] = pid;
            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_esp;
            matrizIntermedia[i][2] = tiempo_fin_esp;
            matrizIntermedia[i][3] = 0;
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;
            matrizDeDatos[pospidMayor][1] = tiempo_fin_esp;
            i++;
        }
    }

    guardarDatos(tabla);
    editarTablaSalida();
    return matrizDeSalida;
}

function obetenerPosPIDConMayorPrioridad_EXT_NO_EXP(tiempo_llegada, pids_habilitados) {
    let mayor = 0.0;
    let pospid = 0;
    for (let j = 0; j < matrizDeDatos.length; j++) {
        if (matrizDeDatos[j][1] == tiempo_llegada) {
            if (parseFloat(matrizDeDatos[j][3]) > mayor) {
                mayor = matrizDeDatos[j][3];
                pospid = j;
            }
        }
        for (let i = 0; i < pids_habilitados.length; i++) {
            if (pids_habilitados[i] == matrizDeDatos[j][0]) {
                if (parseFloat(matrizDeDatos[j][3]) > mayor) {
                    mayor = matrizDeDatos[j][3];
                    pospid = j;
                }
            }
        }
    }

    return pospid;
}

//--------------------------------------------------------------------------------------

 function HRN(tabla,nucleos) {
    guardarDatos(tabla);
    var ejecutados = new Array();
    matrizIntermedia = new Array();
    var cant_nucleos;
    var i = 0;
    while (matrizDeDatos.length != 0) {

        cant_nucleos = nucleos;
        matrizIntermedia.push();
        matrizIntermedia[i] = new Array(5);
        asignarPrioridad();

        let pospidMayor = parseInt(obetenerPosPIDConMayorPrioridad_HRN());
        let tiempo_llegada_eje = parseInt(matrizDeDatos[pospidMayor][1]);
        let tiempo_fin_eje = parseInt(matrizDeDatos[pospidMayor][1]) + 1;
        matrizIntermedia[i][0] = matrizDeDatos[pospidMayor][0];
        matrizIntermedia[i][1] = tiempo_llegada_eje;
        matrizIntermedia[i][2] = tiempo_fin_eje;
        matrizIntermedia[i][3] = 1;
        matrizIntermedia[i][4] = tiempo_fin_eje - tiempo_llegada_eje;
        matrizDeDatos[pospidMayor][2] = matrizDeDatos[pospidMayor][2] - 1;
        matrizDeDatos[pospidMayor][1] = tiempo_fin_eje;
        cant_nucleos--;
        if (matrizDeDatos[pospidMayor][2] == 0) {

            ejecutados.push(pospidMayor);
        }
        i++;
        var pid_ignorado = pospidMayor;
        while (cant_nucleos != 0) {
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            asignarPrioridad();
            let pospidMayor = parseInt(obetenerPosPIDConMayorPrioridad_HRN(pid_ignorado));
            let tiempo_llegada_eje = parseInt(matrizDeDatos[pospidMayor][1]);
            if (verificarIntercepcionDeProcesos(tiempo_llegada_eje) < nucleos) {

                let tiempo_fin_eje = parseInt(matrizDeDatos[pospidMayor][1]) + 1;
                console.log("inicio " + tiempo_llegada_eje + "   fin " + tiempo_fin_eje);
                matrizIntermedia[i][0] = matrizDeDatos[pospidMayor][0];
                matrizIntermedia[i][1] = tiempo_llegada_eje;
                matrizIntermedia[i][2] = tiempo_fin_eje;
                matrizIntermedia[i][3] = 1;
                matrizIntermedia[i][4] = tiempo_fin_eje - tiempo_llegada_eje;
                matrizDeDatos[pospidMayor][2] = matrizDeDatos[pospidMayor][2] - 1;
                matrizDeDatos[pospidMayor][1] = tiempo_fin_eje;
                if (matrizDeDatos[pospidMayor][2] == 0) {
                    ejecutados.push(pospidMayor);
                }
                i++;
                pid_ignorado = pospidMayor;
            }
            cant_nucleos--;
        }

        for (let i = 0; i < ejecutados.length; i++) {
            let pos = parseInt(ejecutados[i]);
            matrizDeDatos.splice(pos, 1);
        }
        ejecutados = new Array();
        for (let j = 0; j < matrizDeDatos.length; j++) {
            let tiempo_llegada_esp = parseInt(matrizDeDatos[j][1]);
            if (tiempo_fin_eje > tiempo_llegada_esp) {
                i = matrizIntermedia.length;
                matrizIntermedia.push();
                matrizIntermedia[i] = new Array(5);
                let pid = parseInt(matrizDeDatos[j][0]);
                let tiempo_fin_esp = tiempo_fin_eje;
                matrizIntermedia[i][0] = pid;
                matrizIntermedia[i][1] = tiempo_llegada_esp;
                matrizIntermedia[i][2] = tiempo_fin_esp;
                matrizIntermedia[i][3] = 0;
                matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;
                matrizDeDatos[j][1] = tiempo_fin_esp;
                i++;
            }
        }
    }

    guardarDatos(tabla);
    editarTablaSalida();

    return matrizDeSalida;
}


 function HRN_PRIMA(tabla,nucleos) {
    guardarDatos(tabla);
    matrizIntermedia = new Array();
    var i = 0;
    while (matrizDeDatos.length != 0) {
        asignarPrioridad();
        let pospidMayor = parseInt(obetenerPosPIDConMayorPrioridad_HRN());
        let tiempo_llegada_eje = parseInt(matrizDeDatos[pospidMayor][1]);
        if (verificarIntercepcionDeProcesos(tiempo_llegada_eje) < nucleos) {

            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);
            let tiempo_fin_eje = parseInt(matrizDeDatos[pospidMayor][1]) + parseInt(matrizDeDatos[pospidMayor][2]);
            matrizIntermedia[i][0] = matrizDeDatos[pospidMayor][0];
            matrizIntermedia[i][1] = tiempo_llegada_eje;
            matrizIntermedia[i][2] = tiempo_fin_eje;
            matrizIntermedia[i][3] = 1;
            matrizIntermedia[i][4] = tiempo_fin_eje - tiempo_llegada_eje;
            matrizDeDatos.splice(pospidMayor, 1);
            i++;

        } else {

            for (let j = 0; j < matrizDeDatos.length; j++) {
                let tiempo_llegada_esp = parseInt(matrizDeDatos[j][1]);

                if (tiempo_llegada_eje == tiempo_llegada_esp) {
                    i = matrizIntermedia.length;
                    matrizIntermedia.push();
                    matrizIntermedia[i] = new Array(5);
                    let pid = parseInt(matrizDeDatos[j][0]);
                    let tiempo_fin_esp = tiempo_llegada_esp + 1;
                    matrizIntermedia[i][0] = pid;
                    matrizIntermedia[i][1] = tiempo_llegada_esp;
                    matrizIntermedia[i][2] = tiempo_fin_esp;
                    matrizIntermedia[i][3] = 0;
                    matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;
                    matrizDeDatos[j][1] = tiempo_fin_esp;
                    i++;
                }
            }
        }
    }
    guardarDatos(tabla);
    editarTablaSalida();

    return matrizDeSalida;
}

//---------------------------------------------------------------------------------------
//-------------------        FUNCIONES EN COMÚN ---------------------------------------
//---------------------------------------------------------------------------------------

function asignarPrioridad() {
    for (let i = 0; i < matrizDeDatos.length; i++) {
        let pid = parseInt(matrizDeDatos[i][0]);
        let tiempoDeEspera = obtenerTiempoDeEspera(pid);
        let tiempoDeEjecucion = obtnerTiempoEjecucion(pid) + parseInt(matrizDeDatos[i][2]);
        var prioridad = (parseInt(tiempoDeEspera) + parseInt(tiempoDeEjecucion)) / tiempoDeEjecucion;
        matrizDeDatos[i][3] = prioridad;
    }
}

function obtnerTiempoEjecucion(pid) {
    var tiempoDeEjecucion = 0;
    for (let i = 0; i < matrizIntermedia.length; i++) {
        if (parseInt(matrizIntermedia[i][0]) == pid) {
            if (parseInt(matrizIntermedia[i][3]) == 1) {
                tiempoDeEjecucion += parseInt(matrizIntermedia[i][4]);
            }
        }
    }

    return tiempoDeEjecucion;
}

function obtenerTiempoDeEspera(pid) {
    let tiempoDeEspera = 0;
    for (let i = 0; i < matrizIntermedia.length; i++) {
        if (parseInt(matrizIntermedia[i][0]) == pid) {
            if (parseInt(matrizIntermedia[i][3]) == 0) {
                tiempoDeEspera += parseInt(matrizIntermedia[i][4]);
            }
        }
    }

    return tiempoDeEspera;
}

function obetenerPosPIDConMayorPrioridad_HRN() {
    let mayor = 0.0;
    let pospid = 0;
    for (let i = 0; i < matrizDeDatos.length; i++) {
            if (parseFloat(matrizDeDatos[i][3]) > mayor) {
                mayor = matrizDeDatos[i][3];
                pospid = i;
            }
    }
    return pospid;
}

//------------------------------------------------------------------------

function RR(tabla,nucleos,quantum) {

    guardarDatos(tabla);

    matrizIntermedia = new Array();

    var cola = new Array();

    var i = 0;

    var ejecutados = new Array();

    while (matrizDeDatos.length != 0) {

        let posPID = obtenerPosPID_RR(cola);
        let tiempo_llegada_eje = parseInt(matrizDeDatos[posPID][1]);

        ejecutados = new Array();

        if (verificarIntercepcionDeProcesos(tiempo_llegada_eje) < nucleos) {

            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);

            if (existePID_Cola_RR(parseInt(matrizDeDatos[0][0]), cola) == false) {
                cola.push(parseInt(matrizDeDatos[0][0]));
            }

            tiempo_llegada_eje = obtenerTiempollegadaReal_RR(parseInt(matrizDeDatos[posPID][1]), posPID);
            let tiempo_ejecucion = parseInt(matrizDeDatos[posPID][2]);

            for (let i = 0; i < matrizDeDatos.length; i++) {

                let pid = parseInt(matrizDeDatos[i][0]);

                if (existePID_Cola_RR(pid, cola) == false) {

                    let tiempo_llegada_tem = obtenerTiempollegadaReal_RR(parseInt(matrizDeDatos[i][1]), parseInt(matrizDeDatos[i][0]));

                    if (tiempo_llegada_eje == tiempo_llegada_tem) {

                        cola.push(parseInt(matrizDeDatos[i][0]));
                    }
                }
            }
            tiempo_llegada_eje = parseInt(matrizDeDatos[posPID][1]);

            let tiempo_fin_eje = tiempo_llegada_eje;
            let quantumTem = quantum;

            while (quantumTem != 0 && tiempo_ejecucion != 0) {

                quantumTem--;
                tiempo_ejecucion--;
                tiempo_fin_eje++;

                for (let i = 0; i < matrizDeDatos.length; i++) {

                    let tiempo_llegada_tem = obtenerTiempollegadaReal_RR(parseInt(matrizDeDatos[i][1]), parseInt(matrizDeDatos[i][0]));

                    if (tiempo_fin_eje == tiempo_llegada_tem) {
                        cola.push(parseInt(matrizDeDatos[i][0]));
                    }
                }
            }

            if (tiempo_ejecucion == 0) {
                cola.splice(0, 1);
            }

            if (cola.length != 0 && tiempo_ejecucion != 0) {
                let pid = parseInt(cola[0]);
                cola.splice(0, 1);
                cola.push(pid);
            }

            matrizIntermedia[i][0] = matrizDeDatos[posPID][0];
            matrizIntermedia[i][1] = tiempo_llegada_eje;
            matrizIntermedia[i][2] = tiempo_fin_eje;
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 1;
            // se almacena el tiempo de ejecucion del proceso
            matrizIntermedia[i][4] = tiempo_fin_eje - tiempo_llegada_eje;
            matrizDeDatos[posPID][1] = tiempo_fin_eje;
            matrizDeDatos[posPID][2] = matrizDeDatos[posPID][2] - (tiempo_fin_eje - tiempo_llegada_eje);

            if (matrizDeDatos[posPID][2] == 0) {
                ejecutados.push(posPID);
            }
            i++;

        } else {

            let tiempo_llegada_esp = parseInt(matrizDeDatos[posPID][1]);

            i = matrizIntermedia.length;
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);

            let pid = parseInt(matrizDeDatos[posPID][0]);
            let tiempo_fin_esp = tiempo_llegada_esp + 1;;

            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_esp;
            matrizIntermedia[i][2] = tiempo_fin_esp;
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 0;
            // se almacena el tiempo de espera del proceso
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;
            matrizDeDatos[posPID][1] = tiempo_fin_esp;
            i++;

        }

        for (let i = 0; i < ejecutados.length; i++) {
            let pos = ejecutados[i];
            matrizDeDatos.splice(pos, 1);
        }
    }
    guardarDatos(tabla);
    editarTablaSalida();
    return matrizDeSalida;
}

function obtenerTiempollegadaReal_RR(tiempo_llegada, posPID) {
    let tiempo_acumulado = 0;
    for (let i = 0; i < matrizIntermedia.length; i++) {
        if (parseInt(matrizIntermedia[i][0]) == posPID) {
            tiempo_acumulado += matrizIntermedia[i][4];
        }

    }
    return tiempo_llegada - tiempo_acumulado;
}

function existePID_Cola_RR(pid, cola) {
    for (let i = 0; i < cola.length; i++) {
        if (parseInt(cola[i]) == pid) {
            return true;
        }
    }
    return false;
}

function obtenerPosPID_RR(cola) {
    var posPID = 0;
    if (cola.length != 0) {
        let pid = parseInt(cola[0]);
        for (let i = 0; i < matrizDeDatos.length; i++) {
            if (pid == parseInt(matrizDeDatos[i][0])) {
                posPID = i;
                break;
            }
        }
    }
    return posPID;
}


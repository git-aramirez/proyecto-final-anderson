var grid_size = 20;
var x_axis_distance_grid_lines = 20;
var y_axis_distance_grid_lines = 2;
var x_axis_starting_point = { number: 1, suffix: '' };
var y_axis_starting_point = { number: 1, suffix: '' };

// matriz para guardar datos de las iteraciones
var matrizIteraciones = new Array();
//numero de cpus
var cpus;
// matriz de datos
var matrizDeDatos;
//matriz intermedia de datos
var matrizIntermedia;
//nucleos 
var nucleos;
//Quantum
var quantum;
//cantidad de iteraciones
var iteraciones;
//modelo canvas
var canvas = document.getElementById("my-canvas");

function dibujarGrafica() 
{

    canvas.width += 0;
    ctx = canvas.getContext("2d");
    
    canvas.width=1700

    var canvas_width = canvas.width;
    var canvas_height = canvas.height;

    var num_lines_x = Math.floor(canvas_height / grid_size);
    var num_lines_y = Math.floor(canvas_width / grid_size);

    // Draw grid lines along X-axis
    for (var i = 0; i <= num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents X-axis draw in different color
       if (i == x_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_x) {
            ctx.moveTo(0, grid_size * i);
            ctx.lineTo(canvas_width, grid_size * i);
        } else {
            ctx.moveTo(0, grid_size * i + 0.5);
            ctx.lineTo(canvas_width, grid_size * i + 0.5);
        }
        ctx.stroke();
    }

    // Draw grid lines along Y-axis
    for (i = 0; i <= num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents X-axis draw in different color
        if (i == y_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_y) {
            ctx.moveTo(grid_size * i, 0);
            ctx.lineTo(grid_size * i, canvas_height);
        } else {
            ctx.moveTo(grid_size * i + 0.5, 0);
            ctx.lineTo(grid_size * i + 0.5, canvas_height);
        }
        ctx.stroke();
    }

    // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
    ctx.translate(y_axis_distance_grid_lines * grid_size, x_axis_distance_grid_lines * grid_size);

    // Ticks marks along the positive X-axis
    for (i = 1; i < (num_lines_y - y_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(grid_size * i + 0.5, -3);
        ctx.lineTo(grid_size * i + 0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(x_axis_starting_point.number * i + x_axis_starting_point.suffix, grid_size * i - 2, 15);

    }

    // Ticks marks along the negative X-axis
    for (i = 1; i < y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-grid_size * i + 0.5, -3);
        ctx.lineTo(-grid_size * i + 0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -grid_size * i + 3, 15);

    }

    // Ticks marks along the positive Y-axis
    // Positive Y-axis of graph is negative Y-axis of the canvas
    for (i = 1; i < (num_lines_x - x_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, grid_size * i + 0.5);
        ctx.lineTo(3, grid_size * i + 0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(-y_axis_starting_point.number * i + y_axis_starting_point.suffix, -15, grid_size * i + 3);
    }

    // Ticks marks along the negative Y-axis
    // Negative Y-axis of graph is positive Y-axis of the canvas
    for (i = 1; i < x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, -grid_size * i + 0.5);
        ctx.lineTo(3, -grid_size * i + 0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(y_axis_starting_point.number * i + y_axis_starting_point.suffix, -15, -grid_size * i + 3);
    }

}

/**
 * ----------------
 * --- Atributos --
 * ----------------
 */

// matriz de datos
var matrizDeDatos;
//matriz intermedia de datos
var matrizIntermedia;


//----------------------------------------------------------------------
//------------------- SECCION FCFS -------------------------------------
//----------------------------------------------------------------------


/**
 * Esta funcion permite ejecutar los procesos 
 * según los criterios de algoritmo de planificacion FCFS
 */
function fcfs() {

    canvas = document.getElementById("my-canvas");

    dibujarGrafica();
    guardarDatos();

    matrizIntermedia = new Array();

    var i = 0;

    while (matrizDeDatos.length != 0) {

        var tiempo_llegada_eje = parseInt(matrizDeDatos[0][1]);
        var pid = parseInt(matrizDeDatos[0][0]);

        if (verificarIntercepcionDeProcesos(tiempo_llegada_eje) < nucleos) 
        {


            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);

            let tiempo_fin_eje = parseInt(matrizDeDatos[0][1]) + parseInt(matrizDeDatos[0][2]);


            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_eje;
            matrizIntermedia[i][2] = tiempo_fin_eje;
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 1;
            // se almacena el tiempo de ejecucion del proceso
            matrizIntermedia[i][4] = tiempo_fin_eje - tiempo_llegada_eje;

            matrizDeDatos.splice(0, 1);

            i++;
        } else {


            tiempo_llegada_esp = parseInt(matrizDeDatos[0][1]);

            i = matrizIntermedia.length;
            matrizIntermedia.push();
            matrizIntermedia[i] = new Array(5);

            let tiempo_fin_esp = tiempo_llegada_esp + 1;


            matrizIntermedia[i][0] = pid;
            matrizIntermedia[i][1] = tiempo_llegada_esp;
            matrizIntermedia[i][2] = tiempo_fin_esp;
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 0;
            // se almacena el tiempo de espera del proceso
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;

            i++;

            matrizDeDatos[0][1] = tiempo_fin_esp;

        }

    }


    guardarDatos();
    graficarTiempos();
    graficarLlegadas();
    editarTablaSalida("table_salida");



}




//-----------------------------------------------------------------------

//----------------------------------------------------------------------
//-------------------  SJF---------------------------------------
//----------------------------------------------------------------------
/**
 * Esta funcion permite ejecutar los procesos 
 * según los criterios de algoritmo de planificacion SJF
 */
function SJF() {

    canvas = document.getElementById("canvas-sjf");


    dibujarGrafica();
    guardarDatos();

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
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 1;
            // se almacena el tiempo de ejecucion del proceso
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
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 0;
            // se almacena el tiempo de espera del proceso
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;

            matrizDeDatos[pospidMenor][1] = tiempo_fin_esp;

            i++;


        }
    }

    guardarDatos();
    graficarTiempos();
    graficarLlegadas();
    editarTablaSalida("table_sjf");
}


/**
 * Esta funcion se encarga se obtener la posiscion del menor tiempo de ejecucion del algoritmo de planificacion SJF
 * 
 * 
 * @param {int} tiempo_llegada ,el tiempo de llegada del proceso
 * @param {Array} pids_habilitados, arreglo de pids habilitados para obtener la posiscion del menor tiempo de ejecucion 
 */
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


//----------------------------------------------------------------------


//----------------------------------------------------------------------
//------------------- SECCION SRTF -------------------------------------
//----------------------------------------------------------------------



/**
 * Esta funcion permite ejecutar los procesos 
 * según los criterios de algoritmo de planificacion SRTF
 */
function SRTF() {

    canvas = document.getElementById("canvas-srtf");


    dibujarGrafica();
    guardarDatos();

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
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 1;
            // se almacena el tiempo de ejecucion del proceso
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
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 0;
            // se almacena el tiempo de espera del proceso
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;

            matrizDeDatos[pospidMayor][1] = tiempo_fin_esp;

            i++;

        }

    }

    guardarDatos();
    graficarTiempos();
    graficarLlegadas();
    editarTablaSalida("table_srtf");
}




/**
 * 
 * Esta funcion permite obtener el tiempo fin de ejecucion del algoritmo de ejeucion SRTF
 * 
 * @param {int} tiempo_llegada_eje , tiempo de llegada de ejecucion del proceso
 * @param {int} tiempo_ejecucion ,tiempo de ejecucion del proceso
 */
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

/**
 * Esta funcion permite obtener la posicion con el menor tiempo de ejecucion de los procesos para el algoritmo de planificacion SRTF
 * @param {int} tiempo_llegada, tiempo de llegada del proceso 
 */
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

/**
 * Esta funcion permite obtener el tiempo de ejecucion de un proceso específico para el algoritmo de planificacion SRTF
 * @param {int} pid , pid del proceso
 */
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




//----------------------------------------------------------------------


//----------------------------------------------------------------------
//------------------- SECCION EXTERNO EXPULSIVO Y NO EXPULSIVO ----------
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//------------------------- EXTERNO EXPULSIVO -------------------
//----------------------------------------------------------------------

/**
 * Esta funcion permite ejecutar los procesos 
 * según los criterios de algoritmo de planificacion externo expulsivo
 */
function externoExpulsivo() {

    canvas = document.getElementById("canvas-pee");

    dibujarGrafica();
    guardarDatos();

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
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 1;
            // se almacena el tiempo de ejecucion del proceso
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
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 0;
            // se almacena el tiempo de espera del proceso
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;

            matrizDeDatos[pospidMayor][1] = tiempo_fin_esp;

            i++;

        }
    }

    guardarDatos();
    graficarTiempos();
    graficarLlegadas();
    editarTablaSalida("table_pee");
}

/**
 * 
 * Esta funcion permite obtener el tiempo final de ejecucino del algoritmo de planificacion externo expulsivo
 * 
 * @param {int} tiempo_llegada_eje , es el tiempo de llegada de ejecucion del proceso
 * @param {int} tiempo_ejecucion , es el tiempo de ejecucion del proceso
 */
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

/**
 * Esta funcion permite obtener la posicion del proceso con mayor prioridad del algoritmo de planificacion externo expulsivo
 * @param {int} tiempo_llegada , este es el tiempo de llegada del proceso
 */
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



//------------------------------------------------------------------------




//----------------------------------------------------------------------
//-------------------      EXTERNO NO EXPULSIVO --------------------
//----------------------------------------------------------------------

/**
 * Esta funcion permite ejecutar los procesos 
 * según los criterios de algoritmo de planificacion externo no expulsivo
 */
function externoNoExpulsivo() {

    canvas = document.getElementById("canvas-pene");

    dibujarGrafica();
    guardarDatos();

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
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 1;
            // se almacena el tiempo de ejecucion del proceso
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
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 0;
            // se almacena el tiempo de espera del proceso
            matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;

            matrizDeDatos[pospidMayor][1] = tiempo_fin_esp;

            i++;

        }
    }

    guardarDatos();
    graficarTiempos();
    graficarLlegadas();
    editarTablaSalida("table_pene");
}

/**
 * 
 * Esta funcion permite obtener la posicion del proceso con mayor prioridad del algoritmo de planificacion externo no expulsivo
 * 
 * @param {int} tiempo_llegada , timepo de llegada del proceso
 * @param {Array} pids_habilitados , lista de identificaciones de los procesos habilitados
 */
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

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//------------------- SECCION HRN Y HRN_PRIMA---------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//------------------- --------  HRN ------------------------------------
//----------------------------------------------------------------------

/**
 * Esta funcion permite ejecutar los procesos 
 * según los criterios de algoritmo de planificacion interno expulsivo
 */
function HRN() {

    canvas = document.getElementById("canvas-hrn");

    dibujarGrafica();
    guardarDatos();

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
        //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
        matrizIntermedia[i][3] = 1;
        // se almacena el tiempo de ejecucion del proceso
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
                //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
                matrizIntermedia[i][3] = 1;
                // se almacena el tiempo de ejecucion del proceso
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

                pid = parseInt(matrizDeDatos[j][0]);
                let tiempo_fin_esp = tiempo_fin_eje;

                matrizIntermedia[i][0] = pid;
                matrizIntermedia[i][1] = tiempo_llegada_esp;
                matrizIntermedia[i][2] = tiempo_fin_esp;
                //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
                matrizIntermedia[i][3] = 0;
                // se almacena el tiempo de espera del proceso
                matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;

                matrizDeDatos[j][1] = tiempo_fin_esp;

                i++;

            }

        }
    }

    guardarDatos();
    graficarTiempos();
    graficarLlegadas();
    editarTablaSalida("table_hrn");

}

//----------------------------------------------------------------------
//-------------------        HRN_PRIMA---------------------------------
//----------------------------------------------------------------------


/**
 * Esta funcion permite ejecutar los procesos 
 * según los criterios de algoritmo de planificacion interno no expulsivo
 */
function HRN_PRIMA() {

    canvas = document.getElementById("canvas-hrn_prima");

    dibujarGrafica();
    guardarDatos();

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
            //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
            matrizIntermedia[i][3] = 1;
            // se almacena el tiempo de ejecucion del proceso
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

                    pid = parseInt(matrizDeDatos[j][0]);
                    let tiempo_fin_esp = tiempo_llegada_esp + 1;

                    matrizIntermedia[i][0] = pid;
                    matrizIntermedia[i][1] = tiempo_llegada_esp;
                    matrizIntermedia[i][2] = tiempo_fin_esp;
                    //si es tiempo de ejecucion se alamacena un 1 , si es de espera se almacena un 0
                    matrizIntermedia[i][3] = 0;
                    // se almacena el tiempo de espera del proceso
                    matrizIntermedia[i][4] = tiempo_fin_esp - tiempo_llegada_esp;

                    matrizDeDatos[j][1] = tiempo_fin_esp;

                    i++;

                }


            }


        }
    }

    guardarDatos();
    graficarTiempos();
    graficarLlegadas();
    editarTablaSalida("table_hrn-prima");

}

//---------------------------------------------------------------------------------------
//-------------------        FUNCIONES EN COMÚN ---------------------------------------
//---------------------------------------------------------------------------------------

/**
 * Esta funcion permite asignar la prioridad para los algoritmos de planificacion interno expulsivo e interno no expulsivo
 */
function asignarPrioridad() {

    for (let i = 0; i < matrizDeDatos.length; i++) {

        let pid = parseInt(matrizDeDatos[i][0]);
        let tiempoDeEspera = obtenerTiempoDeEspera(pid);
        let tiempoDeEjecucion = obtnerTiempoEjecucion(pid) + parseInt(matrizDeDatos[i][2]);

        var prioridad = (parseInt(tiempoDeEspera) + parseInt(tiempoDeEjecucion)) / tiempoDeEjecucion;
        matrizDeDatos[i][3] = prioridad;

    }
}

/**
  * Esta funcion permite obtener el tiempo de ejecucion para los algoritmos de planificacion interno expulsivo e interno no expulsivo
  * @param {*} pid , identificacion del proceso
  */

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

/**
 * Esta funcion permite  el tiempo de espera para los algoritmos de planificacion interno expulsivo e interno no expulsivo
  * @param {int} pid , identificacion del proceso
  */
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

/**
 * Esta funcion permite obtener la posicion del proceso con mayor prioridad para el algoritmos de planificacion interno expulsivo 
 */
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



/**
 * Esta funcion permite obtener la posicion del proceso con mayor prioridad para el algoritmos de planificacion interno expulsivo 
  * @param {int} pos_ignorada, posicion ingnorada del proceso
  */
function obetenerPosPIDConMayorPrioridad_HRN(pos_ignorada) {

    let mayor = 0.0;
    let pospid = 0;

    for (let i = 0; i < matrizDeDatos.length; i++) {

        if (i != pos_ignorada) {

            if (parseFloat(matrizDeDatos[i][3]) > mayor) {

                mayor = matrizDeDatos[i][3];
                pospid = i;
            }
        }

    }

    return pospid;
}


//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

/**
 * Esta funcion permite ejecutar los procesos 
 * según los criterios de algoritmo de planificacion RR
 */
function RR() {

    canvas = document.getElementById("canvas-rr");

    dibujarGrafica();
    guardarDatos();

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
            quantum = document.getElementById("Quantum").value;

            while (quantum != 0 && tiempo_ejecucion != 0) {

                quantum--;
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

            pid = parseInt(matrizDeDatos[posPID][0]);
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

    guardarDatos();
    graficarTiempos();
    graficarLlegadas();
    editarTablaSalida("table_rr");
}

/**
 * Esa funcion permite obtener el tiempo de llegada exacto de el algoritmo de planificacion del RR
 * @param {int} tiempo_llegada 
 * @param {int} posPID 
 */
function obtenerTiempollegadaReal_RR(tiempo_llegada, posPID) {

    tiempo_acumulado = 0;

    for (let i = 0; i < matrizIntermedia.length; i++) {

        if (parseInt(matrizIntermedia[i][0]) == posPID) {
            tiempo_acumulado += matrizIntermedia[i][4];
        }

    }
    return tiempo_llegada - tiempo_acumulado;
}

/**
 * Esta funcion permite verificar si existe o no un proceso en la cola de algoritmo de planificacion RR
 * @param {int} pid , identificacion del proceso
 * @param {Array} cola , lista de colas
 */
function existePID_Cola_RR(pid, cola) {

    for (let i = 0; i < cola.length; i++) {

        if (parseInt(cola[i]) == pid) {
            return true;
        }
    }
    return false;
}

/**
 * Esta funcion permite obtener la poscion del proceso del algortirmo de planificacion RR
 * @param {Array} cola , lista de procesos
 */
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

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------
//-------------------       FUNCIONES GENERALES PARA TODOS LOS ALGORITMOS --------------
//----------------------------------------------------------------------------------------






//Esta funcion permite almacernar los datos de la tabla de entrada en una matriz
function guardarDatos() {

    //se obtiene la tabla
    var table = document.getElementById("table");
    // se inicializa la matriz con el numero de filas
    matrizDeDatos = new Array(table.rows.length - 1);

    for (let i = 0; i < matrizDeDatos.length; i++) {
        //se crean las columnas de la matriz de datos
        matrizDeDatos[i] = new Array(table.rows[i + 1].getElementsByTagName('input').length);
    }

    // se guardan los datos de la tabla en la matriz de datos
    for (let i = 0; i < matrizDeDatos.length; i++) {
        var elementos = table.rows[i + 1].getElementsByTagName('input');
        for (let j = 0; j < matrizDeDatos[i].length; j++) {
            matrizDeDatos[i][j] = elementos[j].value;
        }
    }

    //Se crea la tabla de salida
    matrizDeSalida = new Array(table.rows.length - 1);
    for (let i = 0; i < matrizDeSalida.length; i++) {
        matrizDeSalida[i] = new Array(5);
    }
}


/**
 * Esta funcion permite editar la tabla de salida de todos los algoritmos de plaficiacion
 * @param {Srting} nombre_tabla,nombre de la tabla de salida
 */
function editarTablaSalida(nombre_tabla) {


    let suma = 0;

    for (let i = 0; i < matrizDeSalida.length; i++) {

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

        var pid_HTML = ' <td><input type="text" name="numeroPid" id="nroPid" value="' + pid + '" disabled="true"></td>';
        var tiempo_salida_HTML = ' <td><input type="text" name="numeroPid" id="nroPid" value="' + tiempo_salida + '" disabled="true"></td>';
        var tiempo_servicio_HTML = ' <td><input type="text" name="numeroPid" id="nroPid" value="' + tiempo_servicio + '" disabled="true"></td>';
        var tiempo_espera_HTML = ' <td><input type="text" name="numeroPid" id="nroPid" value="' + tiempo_espera_total + '" disabled="true"></td>';
        var indice_servicio_HTML = ' <td><input type="text" name="numeroPid" id="nroPid" value="' + (tiempo_ejecucion_total / tiempo_servicio) + '" disabled="true"></td>';


        document.getElementById(nombre_tabla).rows[i + 1].cells[0].innerHTML = pid_HTML;
        document.getElementById(nombre_tabla).rows[i + 1].cells[1].innerHTML = tiempo_salida_HTML;
        document.getElementById(nombre_tabla).rows[i + 1].cells[2].innerHTML = tiempo_servicio_HTML;
        document.getElementById(nombre_tabla).rows[i + 1].cells[3].innerHTML = tiempo_espera_HTML;
        document.getElementById(nombre_tabla).rows[i + 1].cells[4].innerHTML = indice_servicio_HTML;

    }

    let promedio = parseFloat(suma / (matrizDeSalida.length));

    var promedio_HTML = ' <td><input type="text" name="numeroPid" id="nroPid" value="' + promedio + '" disabled="true"></td>';
    document.getElementById(nombre_tabla).rows[matrizDeSalida.length + 1].cells[3].innerHTML = promedio_HTML;

}
/**
 * Esta funcion permite graficar los tiempo de llegada de los procesos
 */
function graficarLlegadas() {

    for (let i = 0; i < matrizDeDatos.length; i++) {

        ctx.beginPath();
        ctx.lineWidth = 2;

        var x = 20 * matrizDeDatos[i][1];
        var y = -20 * matrizDeDatos[i][0];
        var r = 3;
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#AAAAAA";

        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

    }

}

/**
 * Esta funcion permite graficar los tiempos de ejecucion o de espera de cada proceso
 */

function graficarTiempos() {

    for (let i = 0; i < matrizIntermedia.length; i++) {

        ctx.beginPath();
        ctx.lineWidth = 2;

        if (matrizIntermedia[i][3] == 0) {
            ctx.setLineDash([3, 7]);
            ctx.strokeStyle = "#F30D0D";
        } else {
            ctx.setLineDash([]);
            ctx.strokeStyle = "#0000FF";
        }


        let ini_x = 20 * matrizIntermedia[i][1];
        let fin_x = 20 * matrizIntermedia[i][2];
        var y = -20 * matrizIntermedia[i][0];

        ctx.moveTo(ini_x, y);
        ctx.lineTo(fin_x, y);
        ctx.stroke();

    }
}

/**
 * Esta funcion permite verificar si existe una intercepcion entre un tiempo especificos comparado con los demas procesos
 * @param {int} tiempo_llegada, tiempo específico 
 */

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

var t= 0;

/**
 * Esta funcion permite obtener los tiempos promedio de cada algoritmo y ordenarlos forma ascendente
 */
function editarTablaTiemposPromedio() {

    var elementos = new Array();

    var table = document.getElementById("table_salida");
    var elemento = table.rows[table.rows.length - 1].cells[3].getElementsByTagName('input');

    elementos.push();
    elementos[0] = new Array(2);
    elementos[0][0] = parseFloat(elemento[0].value);
    elementos[0][1] = "FCFS";

    table = document.getElementById("table_sjf");
    elemento = table.rows[table.rows.length - 1].cells[3].getElementsByTagName('input');

    elementos.push();
    elementos[1] = new Array(2);
    elementos[1][0] = parseFloat(elemento[0].value);
    elementos[1][1] = "SJF";


    table = document.getElementById("table_srtf");
    elemento = table.rows[table.rows.length - 1].cells[3].getElementsByTagName('input');

    elementos.push();
    elementos[2] = new Array(2);
    elementos[2][0] = parseFloat(elemento[0].value);
    elementos[2][1] = "SRTF";

    table = document.getElementById("table_pee");
    elemento = table.rows[table.rows.length - 1].cells[3].getElementsByTagName('input');

    elementos.push();
    elementos[3] = new Array(2);
    elementos[3][0] = parseFloat(elemento[0].value);
    elementos[3][1] = "EXTERNO EXPULSIVO";


    table = document.getElementById("table_pene");
    elemento = table.rows[table.rows.length - 1].cells[3].getElementsByTagName('input');
    elementos.push(parseFloat(elemento[0].value));

    elementos.push();

    elementos[4] = new Array(2);
    elementos[4][0] = parseFloat(elemento[0].value);
    elementos[4][1] = "EXTERNO NO EXPULSIVO";


    table = document.getElementById("table_hrn");
    elemento = table.rows[table.rows.length - 1].cells[3].getElementsByTagName('input');


    elementos.push();
    elementos[5] = new Array(2);
    elementos[5][0] = parseFloat(elemento[0].value);
    elementos[5][1] = "HRN";


    table = document.getElementById("table_hrn-prima");
    elemento = table.rows[table.rows.length - 1].cells[3].getElementsByTagName('input');

    elementos.push();
    elementos[6] = new Array(2);
    elementos[6][0] = parseFloat(elemento[0].value);
    elementos[6][1] = "HRN_PRIMA";



    table = document.getElementById("table_rr");
    elemento = table.rows[table.rows.length - 1].cells[3].getElementsByTagName('input');


    elementos.push();
    elementos[7] = new Array(2);
    elementos[7][0] = parseFloat(elemento[0].value);
    elementos[7][1] = "RR";

    let menor = 99999.0;
    let elementos_menores = new Array(8);
    let i = 0;
    let pos=0;
    let j = 0;
    for (j = 0; j < elementos_menores.length; j++) {
        for (i = 0; i < elementos.length; i++) {
            if (elementos[i][0] <= menor) {
                menor = parseFloat(elementos[i][0]);
                pos = i;
            }
        }
        
        elementos_menores[j] = new Array(3);

        elementos_menores[j][0] = parseInt(j+1);
        elementos_menores[j][1] = menor;
        elementos_menores[j][2] = elementos[pos][1];
        elementos.splice(pos, 1);
        menor = 99999.0;
    }

    var tabla_prom = document.getElementById("table_tiempos_prom");
    var salida = '<td class="b">Puesto</td><td class="b">Tiempo de Espera en promedio</td><td class="b">Algoritmo</td>';

    for (let i = 0; i < elementos_menores.length; i++) {
        salida += '<tr><td><input type="text name="puesto" id="puesto" disabled="true" value="' + elementos_menores[i][0] + '" ></td>';
        salida += '<td><input type="text" name="numeroPid" id="nroPid" disabled="true" value="' + parseFloat(elementos_menores[i][1]) + '"></td>';
        salida += '<td><input type="text" name="numeroPid" id="nroPid" disabled="true" value="' + elementos_menores[i][2] + '" ></td></tr>';
    }
    tabla_prom.innerHTML = salida;


    matrizIteraciones.push();
    for ( let h = 0; h < elementos_menores.length ; h++)
    {
        matrizIteraciones[t] = elementos_menores[h];
        t+=1;
    }
    
    
    
}

/**
 * Esta funcion permite ejeccutar los algoritmos de planificacion
 */
function ejecutarAlgoritmos() {
    cpus =  parseInt(Math.ceil (document.getElementById("numeroCpus").value));
    nucleos = cpus*parseInt(Math.ceil (document.getElementById("numeroNucleos").value));
    quantum = parseInt(Math.ceil(document.getElementById("Quantum").value));

    if ( nucleos > 0 && quantum > 0)
    {
        this.fcfs();
        this.SJF();
        this.SRTF();
        this.externoExpulsivo();
        this.externoNoExpulsivo();
        this.HRN();
        this.HRN_PRIMA();
        this.RR();
    
        editarTablaTiemposPromedio();            
    }
    else{
        alerta(" indique número de nucleos y el quantum necesario para hacer el algoritmo RR");
    }
}


/**
 * Esta funcion permite general una tabla aleatoria
 */
function generarTablaAleatoria() {

    var numeroProcesos = document.getElementById('numeroProcesos').value;


    if ( parseInt(numeroProcesos) > 0 && parseInt(numeroProcesos) <= 10)
    {
        let matrizAleatoria = new Array();

        for (let i = 0; i < numeroProcesos; i++) {

            matrizAleatoria.push();
            matrizAleatoria[i] = new Array(3);

            matrizAleatoria[i][0] = parseInt(getRandomArbitrary(0, 11));
            matrizAleatoria[i][1] = parseInt(getRandomArbitrary(1, 11));
            matrizAleatoria[i][2] = parseInt(getRandomArbitrary(0, 11));

        }

        let menor = 999;
        let pos = 0;

    

        for (let i = 0; i < numeroProcesos; i++) {

            for (let j = 0; j < matrizAleatoria.length; j++) {

                if (parseInt(matrizAleatoria[j][0]) < menor) {
                    menor = parseInt(matrizAleatoria[j][0]);
                    pos = j;
                }
            }

       
            var llegada_HTML = ' <td><input type="text" name="numeroPid" id="nroPid" value="' + menor + '" ></td>';
            var ejecucion_HTML = ' <td><input type="text" name="numeroPid" id="nroPid" value="' + matrizAleatoria[pos][1] + '" ></td>';
            var prioridad_HTML = ' <td><input type="text" name="numeroPid" id="nroPid" value="' + matrizAleatoria[pos][2] + '" ></td>';
    
        document.getElementById("table").rows[i + 1].cells[1].innerHTML = llegada_HTML;
        document.getElementById("table").rows[i + 1].cells[2].innerHTML = ejecucion_HTML;
        document.getElementById("table").rows[i + 1].cells[3].innerHTML = prioridad_HTML;

        
        matrizAleatoria.splice(pos, 1);
        menor = 999;
    }   

    }
    else{
        alerta("debe ingresar un numero de procesos mayor a 1 y menor a 10");
    }

}

function alerta(mensaje)
{
    alertify.alert(mensaje);
}

/**
 * 
 * Esta funcion permite obtener un numero aleatorio ente un rango deseado
 * @param {int} min , minimo
 * @param {int} max, maximo 
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Ejecutar las iteraciones deseadas por el usuario y mostrando una tabla con el numero de posiciones en que quedo siendo el 1 el más rápido
 */
function ejecutarIteraciones()
{

    dibujarTablas();
    iteraciones = document.getElementById("Iteraciones").value;

    if (iteraciones> 0 ) 
    {
        for ( let i = 0; i < iteraciones;i++)
        {
            generarTablaAleatoria();
            ejecutarAlgoritmos();
        }

        llenartablaIteraciones();
    }
    else{
        alerta(" numero de iteraciones mayor a 0");
    }

    
}
var tableIteraciones;
/**
 * funcion para llenar la tabla con los datos de todas las iteraciones
 */
function llenartablaIteraciones()
{
    var salidaT = "";
     tableIteraciones = document.getElementById("tbtableIteraciones");
    
    salidaT += crearFilaTablaIteraciones("FCFS");
    salidaT += crearFilaTablaIteraciones("SJF");
    salidaT += crearFilaTablaIteraciones("SRTF") ;
    salidaT += crearFilaTablaIteraciones("EXTERNO EXPULSIVO");
    salidaT += crearFilaTablaIteraciones("EXTERNO NO EXPULSIVO");
    salidaT += crearFilaTablaIteraciones("HRN");
    salidaT += crearFilaTablaIteraciones("HRN_PRIMA");
    salidaT += crearFilaTablaIteraciones("RR");

    tableIteraciones.innerHTML = salidaT;

}
/**
 * funcion para crear las diferentes filas de la tabla de iteraciones
 */
function crearFilaTablaIteraciones(nombre_algoritmo)
{

    var salida="";
    var contador = 0, contador2= 0, contador3= 0 , contador4= 0 , contador5= 0 , contador6= 0 , contador7= 0, contador8= 0;
   
    for (let i = 0; i < matrizIteraciones.length; i++)
    {
        if ( matrizIteraciones[i][2] === nombre_algoritmo)
        {
            if ( matrizIteraciones[i][0] == 1)
            {
                contador++;
            }
            else if ( matrizIteraciones[i][0] == 2)
            {
                contador2++;
            }
            else if ( matrizIteraciones[i][0] == 3)
            {
                contador3++;
            } else if ( matrizIteraciones[i][0] == 4)
            {
                contador4++;
            } else if ( matrizIteraciones[i][0] == 5)
            {
                contador5++;
            } else if ( matrizIteraciones[i][0] == 6)
            {
                contador6++;
            } else if ( matrizIteraciones[i][0] == 7)
            {
                contador7++;
            } else if ( matrizIteraciones[i][0] == 8)
            {
                contador8++;
            }
        }
    }    

    salida += '<tr><td><input type="text" name="nombreAlgoritmo" id="nombreAlgoritmo" disabled="true"  value="' + nombre_algoritmo + '"></td>';
    salida += '<td><input type="text name="apariciones1" id"apariciones1" disabled="true" value="' + contador + '"></td>';
    salida += '<td><input type="text name="apariciones2" id"apariciones2" disabled="true" value="' + contador2 + '"></td>';
    salida += '<td><input type="text name="apariciones3" id"apariciones3" disabled="true" value="' + contador3 + '"></td>';
    salida += '<td><input type="text name="apariciones4" id"apariciones4" disabled="true" value="' + contador4 + '"></td>';
    salida += '<td><input type="text name="apariciones5" id"apariciones5" disabled="true" value="' + contador5 + '"></td>';
    salida += '<td><input type="text name="apariciones6" id"apariciones6" disabled="true" value="' + contador6 + '"></td>';
    salida += '<td><input type="text name="apariciones7" id"apariciones7" disabled="true" value="' + contador7 + '"></td>';
    salida += '<td><input type="text name="apariciones8" id"apariciones8" disabled="true" value="' + contador8 + '"></td></tr>';  

    
    
    return salida;


}

/**
 * funcion para ocultar componentes que no se necesitan
 */
function ocultar()
{

    
    document.getElementById("principalNormal").style.display = 'none';
    document.getElementById("menu").style.display = 'none';
    document.getElementById("promedioTiempos").style.display = 'none';

    document.getElementById("labels").style.display = 'block';

    document.getElementById("principalIteraciones").style.display = 'block';
}

/**
 * funcion para mostrar componentes necesarios
 */
function desocultar()
{
    document.getElementById("principalNormal").style.display = 'block';
    document.getElementById("menu").style.display = 'block';
    document.getElementById("promedioTiempos").style.display = 'block';

    document.getElementById("labels").style.display = 'block';

    document.getElementById("principalIteraciones").style.display = 'none';
}
 


//----------------------------------------------------------------------------------------
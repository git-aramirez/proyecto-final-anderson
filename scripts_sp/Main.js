/**
 * @author Kevin David Sanchez Solis
 * @author Anderson Ramirez Vasquez
 */

 var variables = [];
 var valoresVariables = [];
 var listaSemaforos;
 var valores = [];
 var matrizEntrada;
 var posiciones;
 var salida;
 var sema;
 var hilosDormidos;
 var hilosTerminados;
 const CANTIDAD_COLUMNAS = 5;
 const CANTIDAD_FILAS_DAFAULT = 13;
 
 /*---------------------------------------------------------
  --- Algoritmos para Generar valores y semáforos aleatorios
  ----------------------------------------------------------
 */
 
 export function generarSemaforosAleatorios(textSemaforos){
     
     listaSemaforos = textSemaforos.split("]");
 
    return aleatorios();
 
 }
 
 export function validarVariablesEntrada(textVariables){
     let ascii;
     let cantidadLetras =0;
     let cantidadIguales=0;
     let cantidadNumeros=0;
     let cantidadComas =0;
     for (let index = 0; index < textVariables.length; index++) {
         ascii = textVariables[index].toUpperCase().charCodeAt(0);
         if(ascii > 64 && ascii < 91){
             cantidadLetras++;
         }
 
         if(textVariables[index]==="="){
             cantidadIguales++;
         }
 
         if(/^-?\d+$/.test(textVariables[index])){
             cantidadNumeros++;
         }
 
         if(textVariables[index]===","){
             cantidadComas++;
         }
     }
 
     if(cantidadNumeros!=cantidadLetras){
         return false;
     }
 
     if(cantidadLetras!=cantidadIguales){
         return false;
     }
 
     if((cantidadLetras-1)!=cantidadComas){
         return false;
     }
 
     return true;
 }
 
 export function validarTextHilos(arrayTextHilos){
     let cantidad =0;
     
         if(arrayTextHilos.Hilo_1===""){
             cantidad++;
         }
         if(arrayTextHilos.Hilo_2===""){
             cantidad++;
         }
         if(arrayTextHilos.Hilo_3===""){
             cantidad++;
         }
         if(arrayTextHilos.Hilo_4===""){
             cantidad++;
         }
         if(arrayTextHilos.Hilo_5===""){
             cantidad++;
         }
 
         if(cantidad===5){
             return false;
         }
         
         return true;
     }
 
 export function validarTextSemaforos(textSemaforos){
     let cantidadCorchetesDerecha = 0;
     let cantidadCorchetesIzquierda = 0;
     let cantidadIguales = 0;
     let cantidadValor = 0;
     let cantidadEspacio=0;
     let cantidadDigitos=0;
     let cantidadSemaforos=0;
 
     for (let index = 0; index < textSemaforos.length; index++) {
         if (textSemaforos[index] === "s"){
             cantidadSemaforos++;
         }
 
         if (/^-?\d+$/.test(textSemaforos[index])){
             cantidadDigitos++;
         }
 
         if (textSemaforos[index] === "["){
             cantidadCorchetesIzquierda++;
         }
 
         if (textSemaforos[index] === "]"){
             cantidadCorchetesDerecha++;
         }
 
         if (textSemaforos[index] === "="){
             cantidadIguales++;
         }
         
         if (textSemaforos[index] === " "){
             cantidadEspacio++;
         }
 
         if (textSemaforos[index] === "v" || textSemaforos[index] === "a" 
         || textSemaforos[index] === "l"  || textSemaforos[index] === "o" 
         ||  textSemaforos[index] === "r"  ){
             cantidadValor++;
         }
 
     }
 
     if(cantidadCorchetesDerecha!=cantidadCorchetesIzquierda){
         return false;
     }
 
     if(cantidadCorchetesDerecha!=cantidadIguales){
         return false;
     }
 
     if(cantidadCorchetesDerecha!=((cantidadValor)/5)){
         return false;
     }
 
     if(cantidadCorchetesDerecha!=cantidadSemaforos){
         return false;
     }
 
     if( cantidadCorchetesDerecha*2 > (cantidadDigitos)){
         return false;
     }
 
     if(cantidadCorchetesDerecha!=cantidadEspacio){
         return false;
     }
 
     return true;
 
 }
 
 function obtenerSemaforos(textSemaforos){
     var lista = textSemaforos.split(/(\d)/);
 
     for (let index = 0; index < lista.length; index++) {
 
         if(!isNaN(lista[index]) && lista[index-1]==" valor="){
             valores.push(parseInt(lista[index]));
         }
     } 
 }
 
 
 function inicializarMatrizEntrada(){
 
     matrizEntrada = null;
     matrizEntrada = new Array(CANTIDAD_FILAS_DAFAULT);
 
     for (let i = 0; i < matrizEntrada.length; i++) {
         matrizEntrada[i] = new Array(CANTIDAD_COLUMNAS);
     }
 }
 
 
 
 function aleatorios(){
 
     
     inicializarMatrizEntrada();
     let index_j = 1;
 
     for (let index = 0; index < (listaSemaforos.length-1)*2; index++) {
      
        var hiloAleatorio =  Math.floor(Math.random() * CANTIDAD_COLUMNAS);
        var filaAleatoria =  Math.floor(Math.random() * CANTIDAD_FILAS_DAFAULT);
        var isPositionInvalid = matrizEntrada[filaAleatoria][hiloAleatorio]!="" && matrizEntrada[filaAleatoria][hiloAleatorio]!=null;
        
        while(isPositionInvalid){
         filaAleatoria = Math.floor(Math.random() * CANTIDAD_FILAS_DAFAULT);
         isPositionInvalid = matrizEntrada[filaAleatoria][hiloAleatorio]!="" && matrizEntrada[filaAleatoria][hiloAleatorio]!=null;
        }
 
        if(index < (listaSemaforos.length-1)){
          matrizEntrada[filaAleatoria][hiloAleatorio] = "s"+(index+1)+".acquire()";
          continue;
        }
        matrizEntrada[filaAleatoria][hiloAleatorio] = "s"+(index_j)+".release()";
        index_j++;
     }
 
     for (let index = 0; index < matrizEntrada.length; index++) {
 
         for (let index_j = 0; index_j < matrizEntrada[0].length; index_j++) {
 
             var isPositionInvalid = matrizEntrada[index][index_j]!="" && matrizEntrada[index][index_j]!=null;
 
             if(!isPositionInvalid){
                 var ranNum = Math.ceil(Math.random() * 25);
                 matrizEntrada[index][index_j] = String.fromCharCode(65+ranNum);
             }            
         }
     }
 
     return fijarAleatorios(matrizEntrada);
 }
 
 function fijarAleatorios(matrizEntrada){
 
     let salida = new Array(CANTIDAD_COLUMNAS);
 
     for (let index = 0; index < matrizEntrada[0].length; index++) {
         let hilo = "";
 
         for (let index_j = 0; index_j < matrizEntrada.length; index_j++) {
            hilo+=matrizEntrada[index_j][index]+"\n";
         }
 
         salida[index] = hilo;
         salida[index] = salida[index].substring(0,salida[index].length-1);
     }
     
     return salida;
 }
 
 export function editarTextoSalida(salida,hilosBloqueados,semaforos,variables){
     let text = "Se ejecutá la sincronización de procesos haciendo uso de las siguientes variables: "+
     variables+".\n\n"+
     "Con las siguientes semaforos establecidos: "+semaforos+".\n\n"+
     "Obteniendo como resultado las siguientes caracteres impresos: "+salida+".\n\n"+
     "Acompañado de los siguientes HIlos bloqueados: "+hilosBloqueados;
     
     return text;
 }
 
 
 /*----------------------------------------------------------------------------
 --- Algoritmos para realizar la Sincrinizacion de procesos
 ------------------------------------------------------------------------------
 */
 
 /*
 Este algoritmo permite la ejecución del 
 */
 export function ejecutarAlgoritmo(textSemaforos,tablaEntrada,textVariables){
     valores = [];
     obtenerSemaforos(textSemaforos);
     let textHilosBloqueados = "";
 
     tablaEntrada = inicializarVariablesGlobales(textSemaforos,tablaEntrada);
     almacenarVariablesYvalores(textVariables);
 
     while(!IsStop(tablaEntrada)){
 
         let hiloAleatorio = definirHiloAleatorio();
         let cuerpo = String(tablaEntrada[hiloAleatorio]);
         let elemento = cuerpo.split('\n')[posiciones[hiloAleatorio]];
         elemento = elemento.replace(/ /g, "");
 
         if(elemento == "" || elemento=="}"){
             posiciones[hiloAleatorio]+=1;
             continue;
         }
 
        let esSentencia = esSuma(elemento.toLocaleLowerCase(),hiloAleatorio) 
        || esResta(elemento.toLocaleLowerCase(),hiloAleatorio) 
        || esCondicional(elemento.toLocaleLowerCase(),hiloAleatorio,cuerpo);
        if(esSentencia){
            continue;
        }
         
         let esAcquire = elemento.toLowerCase().includes(".acquire()");
         let esRelease = elemento.toLowerCase() .includes(".release()");
     
         let semaforo = elemento.split(".");
         let posSemaforo = parseInt(semaforo[0].toLowerCase().split("s")[1])-1;
 
         textHilosBloqueados = definirComportamiento(posSemaforo,hiloAleatorio,elemento,esAcquire,esRelease,textHilosBloqueados);
 
         posiciones[hiloAleatorio]+=1;
     }
 
     let estaElSistemaBloqueado = estaBloqueadoElSistema();
     textHilosBloqueados = encontrarHilosBloqueados();
     textVariables = redefinirVariables();
 
     return [salida,estaElSistemaBloqueado,textHilosBloqueados,textVariables];
 }
 
 
 
 function esCondicional(elemento,hiloAleatorio,cuerpo){
    
     if(elemento.includes("if(") && elemento.includes("){")){
         let resultado1 = elemento.split("(");
         let resultado2 = resultado1[1].split(")");
         let comparacion = resultado2[0];
 
         if(!comparacion.includes("==")){
             return false;
         }
 
         return esComparacionValida(comparacion,hiloAleatorio,cuerpo);        
 
     }
 
     return false;
 }
 
 function esComparacionValida(comparacion,hiloAleatorio,cuerpo){
    
     let resultadoComparacion = comparacion.split(/(\d)/);
     let valor = parseInt(resultadoComparacion[1]);
     let variable = resultadoComparacion[0].split("=")[0];
     let posicion = variables.indexOf(variable);
 
     if(posicion===-1){
         return false;
     }
 
     if(valoresVariables[posicion]!=valor){
         let salida = encontrarSalidaCondicional(cuerpo,posiciones[hiloAleatorio]);
         posiciones[hiloAleatorio]=salida+1;
 
         return true;
     }
 
     posiciones[hiloAleatorio]+=1;
         
     return true;
 }
 
 function esResta(elemento,hiloAleatorio){
     
     if(elemento.includes("--;")){
         let listIncremento = elemento.split("-");
         let variable = listIncremento [0];
         let posicion = variables.indexOf(variable);
         if(posicion!=-1){
             valoresVariables[posicion]-=1;
             posiciones[hiloAleatorio]+=1;
 
             return true;
         }
     }
 
     return false;
 }
 
 
 function esSuma(elemento,hiloAleatorio){
     
     if(elemento.includes("++;")){
         let listIncremento = elemento.split("+");
         let variable = listIncremento [0];
         let posicion = variables.indexOf(variable);
 
         if(posicion!=-1){
             valoresVariables[posicion]+=1;
             posiciones[hiloAleatorio]+=1;
             return true;
         }
     }
 
     return false;
 }
 
 function redefinirVariables(){
     let textVariables = "";
     for (let index = 0; index < variables.length; index++) {
         const element = variables[index];
         textVariables+=element+"="+valoresVariables[index]+ ",";        
     }
     textVariables = textVariables.substring(0,textVariables.length-1);
     return textVariables;
 }
 
 function encontrarHilosBloqueados(){
     let textHilosBloqueados = "";
     let cantidadSemaforos=0;
     for (let index = 0; index < sema.length; index++) {
 
         if(sema[index].length!=0){
             textHilosBloqueados+="s"+(index+1)+" : [";
         }
         
         for (let index_j = 0; index_j < sema[index].length; index_j++) {
             const element = sema[index][index_j];
             textHilosBloqueados+="Hilo "+(element+1)+" , "
             cantidadSemaforos++;
         }
         
         if(sema[index].length!=0){
             textHilosBloqueados = textHilosBloqueados.substring(0,textHilosBloqueados.length-2);
             textHilosBloqueados+=" ] , "
         }
     }
     if(cantidadSemaforos>0){
         textHilosBloqueados = textHilosBloqueados.substring(0,textHilosBloqueados.length-2);
     }else{
         textHilosBloqueados = textHilosBloqueados.substring(0,textHilosBloqueados.length-1);
     }
     
     return textHilosBloqueados;
 }
 
 function encontrarSalidaCondicional(cuerpo,indiceDesde){
    let lista = cuerpo.split('\n');
    let posicionSalida = lista.indexOf("}",indiceDesde);
    if(posicionSalida!=-1){
        return posicionSalida;
    }else{
        alert("La llave de salida '}' no existe");
    }
 }
 
 function almacenarVariablesYvalores(textVariables){
     let listaResultados = textVariables.replace(/,/g,"=");
     let listaVariablesYValores = listaResultados.split("=");
 
     for (let index = 0; index < listaVariablesYValores.length; index++) {
         const element = listaVariablesYValores[index].replace(/ /g, "");
         let ascii = element.toUpperCase().charCodeAt(0);
         let esLetra = ascii > 64 && ascii < 91;
 
         if(element === "="){
             continue;
         }
 
         if(esLetra){
             variables.push(element);
         }else if(!isNaN(element)){
             valoresVariables.push(parseInt(element,10));
         }else{
             alert("Se presentó un error en ingresando las variables")
         }
     }
 }
 
 function inicializarVariablesGlobales (textSemaforos,tablaEntrada){
     variables = [];
     valoresVariables = [];
     posiciones = [0,0,0,0,0];
     salida = new Array();
     hilosDormidos = new Array();
     hilosTerminados = new Array();
     sema = obtenerSemaforosV2(textSemaforos);
     tablaEntrada = [tablaEntrada.Hilo_1,tablaEntrada.Hilo_2,tablaEntrada.Hilo_3,tablaEntrada.Hilo_4,tablaEntrada.Hilo_5];
 
     return tablaEntrada;
 }
 
 function definirComportamiento(posSemaforo,hiloAleatorio,elemento,esAcquire,esRelease,textHilosBloqueados){
     if(esAcquire){
         let valor = 0;
         let valorSemaforo = valores[posSemaforo];
 
         if(valorSemaforo===0){
             sema[posSemaforo].push(hiloAleatorio);
             
         }else{
             valores[posSemaforo]-=1;
         }
     }else if (esRelease){
 
         let cantidadHilosDormidos = sema[posSemaforo].length;
 
         if(cantidadHilosDormidos===0){
             valores[posSemaforo]+=1;
         }else{
             sema[posSemaforo].shift();
         }
     }else{
         salida.push(elemento+" ");
     }
     
     return textHilosBloqueados;
 }
 
 function estaIncluidoElHilo(hiloAleatorio){
     let esHiloDormido = false;
 
     for (let index = 0; index < sema.length && !esHiloDormido; index++) {
         const element = sema[index];
         if(element.includes(hiloAleatorio)){
             esHiloDormido = true;
         }
     }
 
     return esHiloDormido;
 }
 
 
 function definirHiloAleatorio (){
 
     let hiloAleatorio = Math.floor(Math.random() * CANTIDAD_COLUMNAS);
     let esHiloDormido = estaIncluidoElHilo(hiloAleatorio);
     
     while(esHiloDormido || hilosTerminados.includes(hiloAleatorio)){
          hiloAleatorio = Math.floor(Math.random() * CANTIDAD_COLUMNAS);
          esHiloDormido = estaIncluidoElHilo(hiloAleatorio);
     }
 
     return hiloAleatorio;
 }
 
 function estaBloqueadoElSistema(){
     
     let contador = obtenerCantidadDeDormidos();
 
     return contador===CANTIDAD_COLUMNAS ? true : false;
 }
 
 function IsStop(tablaEntrada){
 
     let cantidadDeHilosDormidos= obtenerCantidadDeDormidos();
     let cantidadDeHilosTerminados = obtenerCantidadDeTerminado(tablaEntrada);
 
     return (cantidadDeHilosDormidos+cantidadDeHilosTerminados===CANTIDAD_COLUMNAS) ? true : false;
 }
 
 function obtenerCantidadDeDormidos(){
 
     let cantidadHilosDormidos = 0;
     for (let index = 0; index < sema.length; index++) {
         cantidadHilosDormidos+=sema[index].length;
     }
     
     return cantidadHilosDormidos;
 }
 
 function obtenerCantidadDeTerminado(tablaEntrada){
 
     let cantidadDeHilosterminados = 0;
 
     for (let index = 0; index < CANTIDAD_COLUMNAS; index++) {
         let cuerpo = String(tablaEntrada[index]);
 
         if(cuerpo.split('\n').length===posiciones[index]){
 
             if(!hilosTerminados.includes(index)){
                 hilosTerminados.push(index);
             }
             cantidadDeHilosterminados++;
         }
     }
 
     return cantidadDeHilosterminados;
 }
 
 function obtenerSemaforosV2(textSemaforos){
 
     listaSemaforos = textSemaforos.split("]");
     var lista = textSemaforos.split(/(\d)/);
     var sema = new Array();
 
     for (let index = 0; index < valores.length; index++) {
         sema.push(new Array());
     } 
 
     return sema;
 }
 
 
 

export function inicializarTablaEntradaNumerosAleatorios(tablaEntrada){
    let minimo =1;
    let max_solicita =4; 
    let max_libera;
   
    for (let index_i = 0; index_i < tablaEntrada.length; index_i++) {

        if(index_i>0 && index_i %2 ==0){
            max_libera = tablaEntrada[index_i].solicita;
            tablaEntrada[index_i].libera = parseInt(Math.random() * (max_libera - minimo) + minimo);
            tablaEntrada[index_i].proceso = tablaEntrada[index_i-1].proceso;
        }else{
            tablaEntrada[index_i].solicita = parseInt(Math.random() * (max_solicita - minimo) + minimo);
            tablaEntrada[index_i].proceso = parseInt(Math.random() * (max_solicita - minimo) + minimo);
        }
    }
    //return tablaEntrada;
}
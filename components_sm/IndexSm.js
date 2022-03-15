/**
 * View de los algoritmos de Segmentacion
 * @author Kevin David Sanchez Solis
 */

import React from 'react';
import { View , ScrollView, Button, TextInput, TouchableOpacity, Text} from 'react-native';
import * as funciones from '../scripts_sm/Main';
import ProcessList from './ProcessListComponent';
import PhysicalMemory from './PhysicalMemoryComponent';
import SegmentList from './SegmentListComponent';
import { styles } from './styles';
import NumberFormat from 'react-number-format';
import Speaker from '../components_drawer/Speaker';

function segmentation() {

    //Variable que almacena el indice de la pagina a eliminar
    const [eliminarItem,   setEliminarItem]                 = React.useState("");
    //Variable que almacena la palabra que corresponde al proceso creado
    const [palabra,   setPalabra]                           = React.useState("");
    //Variable que almacena el numero de segmento que se solicita
    const [segmentoSolicitado,   setSegmentoSolicitado]     = React.useState("");
    //Variable que almacena la posicion del item solicitado
    const [posicionSolicitada,   setPosicionSolicitada]     = React.useState("");
    //Variable que acciona el refresco de la tabla
    const [refreshing, setRefreshing]                       = React.useState(false);

    /**
     * Metodo que realiza las operaciones para el refresco de la tabla
     */
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    /**
     * Metodo que realiza la espera mientras se ejecuta una accion
     * @param {*} timeout Tiempo de espera que se quiere
     * @returns El tiempo de espera
     */
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    /**
     * Crear un Proceso representado por una palabra ingresada
     */
    function crearProceso() {
        // Variable auxiliar 
        let palabraClone = palabra.trim();  
        
        // Valida que la palabra no este vacia
        if (palabraClone == "") {          
            return alert("No se admiten Palabras vacÍas");
        }
        // Valida que la palabra no exceda el tamaño disponible
        if (palabra.length <= funciones.EspaciosDisponibles) {
            // Invoca al metodo crear proceso
            funciones.crearProceso(palabra);

            // Limpia campo de texto
            setPalabra("");

            //Refresco de la tabla del algortimo de asignacion
            return onRefresh();
        }
        return alert("No hay espacio suficiente para guardar el proceso");
    }

    /**
     * Permite traer de la memoria fisica el dato solicitado
     */
    function solictarItem() {

        // Variable auxiliar 
        let palabraClone = segmentoSolicitado.trim();  

        // Valida que la palabra no este vacia
        if (palabraClone == "") {          
            return alert("Ingrese un índice de segmento.");
        }
        palabraClone = posicionSolicitada.trim();  

        // Valida que la palabra no este vacia
        if (palabraClone == "") {          
            return alert("Ingrese el índice de la posición dentro del segmento a solicitar.");
        }

        // Valida si el segmento existe
        if (!funciones.TablaProcesos[segmentoSolicitado]) {
            return alert("No existe el segmento");
        }

        // Valida que la posicion sea mayor a 0
        if(posicionSolicitada <= 0) {
            return alert("Las posiciones inician en 1.");
        }

        // Valida si el indice solicitado esta en el rango del segmento
        else if (funciones.TablaDatos[segmentoSolicitado].tamaño >= posicionSolicitada) {
            // Invoca el metodo que trae el item solicitado
            funciones.solicitarItem(segmentoSolicitado, posicionSolicitada);

            //Limpia campos de texto
            setSegmentoSolicitado("");
            setPosicionSolicitada("");

            return onRefresh();
        }
        return alert("El índice excede el tamaño del segmento");
    }

    /**
     * Permite eliminar un proceso o segmento
     */
    function eliminarSegmento() {
        // Variable auxiliar 
        let palabraClone = eliminarItem.trim();  

        // Valida que la palabra no este vacia
        if (palabraClone == "") {          
            return alert("Ingrese el índice del segmento a eliminar.");
        }

        // Valida si el segmento existe
        if (!funciones.TablaProcesos[eliminarItem]) {
            return alert("No existe el segmento índicado.");
        }

        // Invoca el metodo que elimina de los array la palabra indicada
        funciones.eliminarSegmento(eliminarItem);

        // Limpia campos de texto
        setEliminarItem("");

        //Refresco de la tabla del algortimo de asignacion
        return onRefresh();
    }
      

    /**
     * Retorna la vista con los componentes
     */
    return(

        // View Global
        <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
            {/**View de los Input proceso - palabra */}
            
            <View style={{top:50 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
                <TextInput onChangeText={(val) => setPalabra(val)} value={palabra} style={styles.input} placeholder="Palabra" keyboardType='default' />
                {/**View del boton crear proceso*/}
                <TouchableOpacity style={{width: 160, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>crearProceso() }>
                    <Text style={{color:'white', fontSize: 17}}>Crear Proceso</Text>
                </TouchableOpacity>
                {/**View de los Input pagina y posicion solicitada*/}
                <NumberFormat value={segmentoSolicitado} displayType={'text'} renderText={ (segmentoSolicitado) => (
                    <TextInput underlineColorAndroid="transparent" onChangeText={(val) => setSegmentoSolicitado(val)} value={segmentoSolicitado} placeholder="Ingrese índice del segmento" style={styles.input} keyboardType="numeric"/>)}/>
                <NumberFormat value={posicionSolicitada} displayType={'text'} renderText={ (posicionSolicitada) => (
                    <TextInput underlineColorAndroid="transparent" onChangeText={(val) => setPosicionSolicitada(val)} value={posicionSolicitada} placeholder="Ingrese índice del segmento" style={styles.input} keyboardType="numeric"/>)}/>
                {/**View del boton realizar solicitud */}
                <TouchableOpacity style={{width: 160, height: 40, backgroundColor: 'green',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>solictarItem() }>
                    <Text style={{color:'white', fontSize: 17}}>Realizar Solicitud</Text>
                </TouchableOpacity>
            </View>
            
             {/**View del input eliminar proceso - palabra con el indice*/}
            <View style={{top:130 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
                <NumberFormat value={eliminarItem} displayType={'text'} renderText={ (eliminarItem) => (
                    <TextInput underlineColorAndroid="transparent" onChangeText={(val) => setEliminarItem(val)} value={eliminarItem} placeholder="Ingrese índice del segmento a eliminar" style={styles.input} keyboardType="numeric" />)}/>
                    <TouchableOpacity style={{ width: 160, height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>eliminarSegmento() }>
                        <Text style={{color:'white', fontSize: 17}}>Eliminar segmento</Text>
                    </TouchableOpacity>
            </View>
           
            {/**View tabla de procesos */}
            <View style={{top:150, flexDirection: 'row',width: "100%", alignContent: "center", justifyContent: "center"}}>
                <ProcessList procesos = {funciones.TablaProcesos}/>
                <SegmentList procesos = {funciones.TablaDatos}/>
                <PhysicalMemory procesos = {funciones.MemoriaFisica}/>
            </View>

            <View style={{top: 230, backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
                <TextInput style={styles.item_resultado} multiline={true} numberOfLines={8} value={funciones.logSegmentacion}/>
                <TouchableOpacity style={{marginTop:20,width: 160, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=> Speaker(funciones.logSegmentacion)}>
                    <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    
}
export default segmentation;
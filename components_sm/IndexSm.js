/**
 * View de los algoritmos de Segmentacion
 * @author Kevin David Sanchez Solis
 */

import React from 'react';
import { View , ScrollView,Button,TextInput} from 'react-native';
import * as funciones from '../scripts_sm/Main';
import ProcessList from './ProcessListComponent';
import PhysicalMemory from './PhysicalMemoryComponent';

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
            //Refresco de la tabla del algortimo de asignacion
            return onRefresh();
        }
        return alert("NO HAY ESPACIO SUFICIENTE PARA GUARDAR LA PALABRA");
    }

    /**
     * Permite traer de la memoria fisica el dato solicitado
     */
    function solictarItem() {

        // Valida si el segmento existe
        if (!funciones.TablaProcesos[segmentoSolicitado-1] || funciones.TablaProcesos[segmentoSolicitado-1][0] == '' ) {
            return alert("No existe el segmento");
        }
        // Valida si el indice solicitado esta en el rango del segmento
        else if (funciones.TablaProcesos[segmentoSolicitado-1][2] >= posicionSolicitada) {
            // Invoca el metodo que trae el item solicitado
            funciones.solicitarItem(segmentoSolicitado, posicionSolicitada);
            return onRefresh();
        }

        return alert("El índice excede el tamaño del segmento");
    }

    /**
     * Permite eliminar un proceso o segmento
     */
    function eliminarSegmento() {
        // Invoca el metodo que elimina de los array la palabra indicada
        funciones.eliminarSegmento(eliminarItem);
        //Refresco de la tabla del algortimo de asignacion
        return onRefresh();
    }
      

    /**
     * Retorna la vista con los componentes
     */
    return(

        // View Global
        <ScrollView>
            {/**View de los Input proceso - palabra */}
            <View >
                <TextInput
                    onChangeText={(val) => setPalabra(val)}
                    value={palabra}
                    placeholder="Palabra"
                    keyboardType='default' 
                />
            </View>
            {/**View del boton crear proceso*/}
            <View>
                <Button 
                    title   = "Crear Proceso"
                    onPress= { ()=>crearProceso() }
                />
            </View>
            {/**View de los Input pagina y posicion solicitada*/}
            <View>
                <TextInput
                    onChangeText={(val) => setSegmentoSolicitado(val)}
                    value={segmentoSolicitado}
                    placeholder="Índice de segmento"
                    keyboardType='default' 
                />
                <TextInput
                    onChangeText={(val) => setPosicionSolicitada(val)}
                    value={posicionSolicitada}
                    placeholder="Posicion"
                    keyboardType='default' 
                />
            </View>
            {/**View del boton realizar solicitud */}
            <View>
                <Button 
                    title   = "Realizar Solicitud"
                    onPress= { ()=>solictarItem() }
                />
            </View>
            {/**View del input eliminar proceso - palabra con el indice*/}
            <View>
                <TextInput
                    onChangeText={(val) => setEliminarItem(val)}
                    value={eliminarItem}
                    placeholder="Índice del segmento a eliminar"
                    keyboardType='default' 
                />
            </View>
            {/**View del boton eliminar proceso - palabra */}
            <View>
                <Button 
                    title   = "Eliminar segmento"
                    onPress= { ()=>eliminarSegmento() }
                />
            </View>
            {/**View tabla de procesos */}
            <View
                style={{ flexDirection: 'row'}}>
                <ProcessList
                    procesos = {funciones.TablaProcesos}
                />
                <PhysicalMemory
                    procesos = {funciones.MemoriaFisica}
                />
            </View>
        </ScrollView>
    )
    
}
export default segmentation;
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
        if (!funciones.TablaProcesos[segmentoSolicitado-1] || funciones.TablaProcesos[segmentoSolicitado-1][0] == '' ) {
            return alert("No existe el segmento");
        }
        // Valida si el indice solicitado esta en el rango del segmento
        else if (funciones.TablaDatos[segmentoSolicitado-1][1] >= posicionSolicitada) {
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
        if (!funciones.TablaProcesos[eliminarItem-1]) {
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
        <ScrollView>
            {/**View de los Input proceso - palabra */}
            <View >
                <TextInput
                    onChangeText={(val) => setPalabra(val)}
                    value={palabra}
                    style={styles.input}
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
                <NumberFormat
                    value={segmentoSolicitado}
                    displayType={'text'}
                    renderText={ (segmentoSolicitado) => (
                        <TextInput
                            underlineColorAndroid="transparent"
                            onChangeText={(val) => setSegmentoSolicitado(val)}
                            value={segmentoSolicitado}
                            placeholder="Ingrese índice del segmento"
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    )}
                />
                <NumberFormat
                    value={posicionSolicitada}
                    displayType={'text'}
                    renderText={ (posicionSolicitada) => (
                        <TextInput
                            underlineColorAndroid="transparent"
                            onChangeText={(val) => setPosicionSolicitada(val)}
                            value={posicionSolicitada}
                            placeholder="Ingrese índice del segmento"
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    )}
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
                <NumberFormat
                    value={eliminarItem}
                    displayType={'text'}
                    renderText={ (eliminarItem) => (
                        <TextInput
                            underlineColorAndroid="transparent"
                            onChangeText={(val) => setEliminarItem(val)}
                            value={eliminarItem}
                            placeholder="Ingrese índice del segmento a eliminar"
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    )}
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
                style={{ flexDirection: 'row',width: "100%", alignContent: "center", justifyContent: "center"}}>
                <ProcessList
                    procesos = {funciones.TablaProcesos}
                />
                <SegmentList
                    procesos = {funciones.TablaDatos}
                />
                <PhysicalMemory
                    procesos = {funciones.MemoriaFisica}
                />
            </View>
            <View style={{top: 30, backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
                <TextInput
                    style={styles.item_resultado}
                    multiline={true}
                    numberOfLines={8}
                    value={funciones.logSegmentacion}
                />
                <TouchableOpacity style={{marginTop:15, width: 160, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=> Speaker(funciones.logSegmentacion)}>
                    <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
    
}
export default segmentation;
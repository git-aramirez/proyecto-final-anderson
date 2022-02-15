/**
 * View de los algoritmos de Paginacion y Memoria virtual
 * @author Kevin David Sanchez Solis
 */

import React from 'react';
import { View , ScrollView,Button,TextInput} from 'react-native';
//import { Button } from 'react-native-paper';
import * as funciones from '../scripts_pm/Main';
import ProcessList from './ProcessListComponent';

function paginacion() {

    //Variable que almacena el indice de la pagina a eliminar
    const [eliminarItem,   setEliminarItem]             = React.useState("");
    //Variable que almacena la palabra que corresponde al proceso creado
    const [palabra,   setPalabra]                       = React.useState("");
    //Variable que almacena la el numero de pagina que se solicita
    const [paginaSolicitada,   setPaginaSolicitada]     = React.useState("");
    //Variable que almacena la posicion del item solicitado
    const [posicionSolicitada,   setPosicionSolicitada] = React.useState("");
    //Variable que acciona el refresco de la tabla
    const [refreshing, setRefreshing]                   = React.useState(false);

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
            return alert("No se admiten Palabras vacias");
        }
        // Valida que la palabra sea maximo del tamaño del bloque
        if (palabra.length <= funciones.TamañoBloque) {
            // Invoca al metodo crear proceso
            funciones.crearProceso(palabra);
            //Refresco de la tabla del algortimo de asignacion
            return onRefresh();
        }
        return alert("EL TAMAÑO DEL PROCESO ES DE MAXIMO 3 CARACTERES");
    }

    /**
     * Permite traer de la memoria fisica el dato solicitado
     */
    function solictarItem() {
        // Invoca el metodo que trae el item solicitado
        funciones.solicitarItem(paginaSolicitada, posicionSolicitada);
        return onRefresh();
    }

    /**
     * Permite eliminar o vaciar el bloque que contiene una palabra que se especifica por un indice
     */
    function eliminarPalabra() {
        // Invoca el metodo que elimina de los array la palabra indicada
        funciones.eliminarPalabra(eliminarItem);
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
                    onChangeText={(val) => setPaginaSolicitada(val)}
                    value={paginaSolicitada}
                    placeholder="Pagina"
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
                    placeholder="Indice de palabra a eliminar"
                    keyboardType='default' 
                />
            </View>
            {/**View del boton eliminar proceso - palabra */}
            <View>
                <Button 
                    title   = "Eliminar palabra"
                    onPress= { ()=>eliminarPalabra() }
                />
            </View>

            <View
                style={{ flexDirection: 'row'}}>
                    <ProcessList
                        procesos = {funciones.TablaUsuario}
                    />
                    <ProcessList
                        procesos = {funciones.TablaPaginas}
                    />
                    <View
                    style={{ flexDirection: 'column', marginTop: 50, alignItems: "center"}}>
                        <ProcessList
                            procesos = {funciones.MemoriaFisica}
                        />
                        <ProcessList
                            procesos = {funciones.MemoriaVirtual}
                        />
                    </View>

            </View>

        </ScrollView>

    )
    
}
export default paginacion;
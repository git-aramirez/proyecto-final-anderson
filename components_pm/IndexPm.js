/**
 * View de los algoritmos de Paginacion y Memoria virtual
 * @author Kevin David Sanchez Solis
 */

import React from 'react';
import { View , ScrollView, Button, TextInput, TouchableOpacity, Text} from 'react-native';
import * as funciones from '../scripts_pm/Main';
import ProcessList from './ProcessListComponent';
import TableData from './TableDataComponent';
import TableUser from './TableUserComponent';
import { styles } from './styles';
import NumberFormat from 'react-number-format';
import Speaker from '../components_drawer/Speaker';

/**
 * Genera la vista para los algoritmos de paginación de memoria
 *
 * @returns Vista de páginacion de memoria
 */
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

            // Limpia campo de texto
            setPalabra("");

            //Refresco de la tabla del algortimo de asignacion
            return onRefresh();
        }
        return alert("El tamaño del proceso es de máximo 3 caracteres.");
    }

    /**
     * Permite traer de la memoria fisica el dato solicitado
     */
    function solictarItem() {
        // Variable auxiliar 
        let palabraClone = paginaSolicitada.trim();  

        // Valida que la palabra no este vacia
        if (palabraClone == "") {          
            return alert("Ingrese índice de página a solicitar.");
        }

        // Variable auxiliar 
        palabraClone = posicionSolicitada.trim();  

        // Valida que la palabra no este vacia
        if (palabraClone == "") {          
            return alert("Ingrese índice de la posición a solicitar.");
        }

        // Invoca el metodo que trae el item solicitado
        funciones.solicitarItem(paginaSolicitada, posicionSolicitada);

        //Limpia campos de texto
        setPaginaSolicitada("");
        setPosicionSolicitada("");

        return onRefresh();
    }

    /**
     * Permite eliminar o vaciar el bloque que contiene una palabra que se especifica por un indice
     */
    function eliminarPalabra() {

        // Variable auxiliar 
        let palabraClone = eliminarItem.trim();  

        // Valida que la palabra no este vacia
        if (palabraClone == "") {          
            return alert("Indique índice de palabra a eliminar.");
        }
        // Valida que el indice digitado exista
        if (funciones.TablaProcesos.length < eliminarItem) {
            return alert("No existe índice de palabra.");
        }

        // Invoca el metodo que elimina de los array la palabra indicada
        funciones.eliminarPalabra(eliminarItem);
        
        // Limpia campo de texto
        setEliminarItem("");

        return onRefresh();
    }
      

    /**
     * Retorna la vista con los componentes
     */
    return(

        // View Global
        <View style={{ width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center' }}>

            <View style={{top:90 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
                <TextInput
                    onChangeText={(val) => setPalabra(val)}
                    value={palabra}
                    style={styles.input}
                    placeholder="Palabra"
                    keyboardType='default' 
                />

                <Button 
                    title   = "Crear Proceso"
                    onPress= { ()=>crearProceso() }
                />
            </View>
            <View style={{top:140 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>

                <NumberFormat
                    value={paginaSolicitada}
                    displayType={'text'}
                    renderText={ (paginaSolicitada) => (
                        <TextInput
                            underlineColorAndroid="transparent"
                            onChangeText={(val) => setPaginaSolicitada(val)}
                            value={paginaSolicitada}
                            placeholder="Ingrese índice de la página"
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
                            placeholder="Ingrese índice de la posición"
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    )}
                />

                <Button
                    title   = "Realizar Solicitud"
                    onPress= { ()=>solictarItem() }
                />
            </View>
            <View style={{top:190 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
                <NumberFormat
                    value={eliminarItem}
                    displayType={'text'}
                    renderText={ (eliminarItem) => (
                        <TextInput
                            underlineColorAndroid="transparent"
                            onChangeText={(val) => setEliminarItem(val)}
                            value={eliminarItem}
                            placeholder="Ingrese índice de palabra a eliminar"
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    )}
                />

                <Button 
                    title   = "Eliminar palabra"
                    onPress= { ()=>eliminarPalabra() }
                />
            </View>

            <View
                style={{ top: 190, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
                    <TableUser
                        procesos = {funciones.TablaUsuario}
                    />
                    <TableData
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

            <View style={{top: 200, backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
                <TextInput
                    style={styles.item_resultado}
                    multiline={true}
                    numberOfLines={8}
                    value={funciones.paginationLog}
                />
                <TouchableOpacity style={{marginTop:15, width: 160, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=> Speaker(funciones.paginationLog)}>
                    <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
                </TouchableOpacity>
            </View>
            

        </View>
    )
    
}
export default paginacion;
/**
 * View de los algoritmos de mapa de bits y algortimos de asigancion de espacio
 * @author Kevin David Sanchez Solis
 */

 import React from 'react';
 import { Text, View, SectionList, Picker, TextInput, Button,TouchableOpacity} from 'react-native';
 import * as funciones from '../scripts_am/Main';
 import ProcessList from './ProcessListComponent';
 import BitsMap from './BitsMap';
 import { styles } from './styles';
 import NumberFormat from 'react-number-format';
 import Speaker from '../components_drawer/Speaker';
 
 /**
  * Metodo principal que gestiona la vista del mapa de bits y los algortimos de asignacion de espacio
  * @returns La vista del mapa de bits y los algoritmos de asiganacion de espacio
  */
 const mapaBits = () => {
 
    //Variable que almacena el nombre del archivo a crear o eliminar
    const [nombreArchivo,   setnombreArchivo]       = React.useState("");
    //Variable que almacena el tamaño de caracteres del archivo a crear
    const [tamañoCaracteres,   settamañoCaracteres] = React.useState("");
    //Variable que identifica el Tipo de algortimo a proyectar
    const [algoritmo, setAlgoritmo]                 = React.useState("Indexada-Combinada");
    //Variable que acciona el refresco de la tabla
    const [refreshing, setRefreshing]               = React.useState(false);
    //Lista de los algortimos de asignacion de espacio
    const listaAlgoritmos = ["Contigua", "Enlazada", "Indexada-Enlazada", "Indexada-Multinivel", "Indexada-Combinada"];

    //llena el combo box de los algortimos
    let listaPicker = listaAlgoritmos.map( data=> {
        return (
            <Picker.Item label={data}  value={data}/>
    )});
 
    /**
     * Metodo que realiza la espera mientras se ejecuta una accion
     * @param {*} timeout Tiempo de espera que se quiere
     * @returns El tiempo de espera
     */
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    } 

    /**
     * Metodo que realiza las operaciones para el refresco de la tabla
     */
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    /**
     * Metodo que llama al metodo de la logica que crea un archivo
     */
    const crearArchivo = () => {

        // Variable auxiliar 
        let nombreArchivoClone = nombreArchivo.trim();  

        // Valida que la palabra no este vacia
        if (nombreArchivoClone == "") {          
            return alert("No se admiten Palabras vacias");
        }
        //Llamado al metodo de la logica que crea un archivo
        funciones.crearArchivo(nombreArchivo, nombreArchivo.length);

        // Limpia campo de texto
        setnombreArchivo("");

        //Refresco de la tabla del algortimo de asignacion
        onRefresh();
    }

    /**
     * Metodo que llama al metodo de la logica que elimina un archivo
     */
    const eliminarArchivo = () => {
        // Variable auxiliar 
        let nombreArchivoClone = nombreArchivo.trim();  

        // Valida que la palabra no este vacia
        if (nombreArchivoClone == "") {          
            return alert("Ingrese palabra a eliminar");
        }
        //Llamado al metodo de la logica que elimina un archivo
        funciones.eliminarArchivo(nombreArchivo, tamañoCaracteres);

        // Limpia campo de texto
        setnombreArchivo("");

        //Refresco de la tabla del algortimo de asignacion
        onRefresh();
    }

    
    /**
     * Funcion que visualiza el mapa de bits
     */
    function diskLog() {
        // Tabla de procesos a mostrar
        let log = '';

        // Valida si el algortimo seleccionado es contigua
        if (algoritmo == "Contigua") {
            log = funciones.logContigua ;
        }
        //Valida que el algortimo seleccionado sea Enlazada
        if (algoritmo == "Enlazada") {
            log = funciones.logEnlazada ;
        }
        //Valida que el algortimo seleccionado sea Indexada-Enlazada
        if (algoritmo == "Indexada-Enlazada") {
            log = funciones.logIndexadaEnlazada ;
        }
        //Valida que el algortimo seleccionado sea Indexada-Multinivel
        if (algoritmo == "Indexada-Multinivel") {
            log = funciones.logIndexadaMultinivel;
        }
        //Valida que el algortimo seleccionado sea Indexada Combinada
        if (algoritmo == "Indexada-Combinada") {
            log = funciones.logIndexadaCombinada ;
        }

        return (
            <View>
                <TextInput
                    multiline={true}
                    numberOfLines={8}
                    value={log}
                />
                <Button
                    title   = "Reproducir"
                    onPress={ ()=> Speaker(log)}
                />
            </View>
        )
    }

    /**
     * Funcion que visualiza el mapa de bits
     */
    function mapaBits() {
        // Tabla de procesos a mostrar
        let mapaBits = [];

        // Valida si el algortimo seleccionado es contigua
        if (algoritmo == "Contigua") {
            mapaBits = funciones.crearMapaBits("Contigua");
        }
        //Valida que el algortimo seleccionado sea Enlazada
        if (algoritmo == "Enlazada") {
            mapaBits = funciones.crearMapaBits("Enlazada");
        }
        //Valida que el algortimo seleccionado sea Indexada-Enlazada
        if (algoritmo == "Indexada-Enlazada") {
            mapaBits = funciones.crearMapaBits("Indexada-Enlazada");
        }
        //Valida que el algortimo seleccionado sea Indexada-Multinivel
        if (algoritmo == "Indexada-Multinivel") {
            mapaBits = funciones.crearMapaBits("Indexada-Multinivel");
        }
        //Valida que el algortimo seleccionado sea Indexada Combinada
        if (algoritmo == "Indexada-Combinada") {
            mapaBits = funciones.crearMapaBits("Indexada-Combinada");
        }

        return (
            <View>
                <BitsMap
                    map = {mapaBits}
                />
            </View>
        )
    }

    /**
     * Funcion que visualiza tabla de procesos segun disco que se usa
     */
    function processTable() {
        // Tabla de procesos a mostrar
        let tablaProcesos = [];

        // Valida si el algortimo seleccionado es contigua
        if (algoritmo == "Contigua") {
            tablaProcesos = (funciones.archivosCreadosContigua);
        }
        //Valida que el algortimo seleccionado sea Enlazada
        if (algoritmo == "Enlazada") {
            tablaProcesos = (funciones.archivosCreadosEnlazada);
        }
        //Valida que el algortimo seleccionado sea Indexada-Enlazada
        if (algoritmo == "Indexada-Enlazada") {
            tablaProcesos = (funciones.archivosCreadosIndexadaEnlazada);
        }
        //Valida que el algortimo seleccionado sea Indexada-Multinivel
        if (algoritmo == "Indexada-Multinivel") {
            tablaProcesos = (funciones.archivosCreadosIndexadaMultinivel);
        }
        //Valida que el algortimo seleccionado sea Indexada Combinada
        if (algoritmo == "Indexada-Combinada") {
            tablaProcesos = (funciones.archivosCreadosIndexadaCombinada);
        }

        return (
            <View>
                <ProcessList
                    procesos = {tablaProcesos}
                />
            </View>
        )
    }

    /**
     * Metodo que llama al metodo de la logica que elimina un archivo
     */
    const limpiarDisco = () => {
        //Llamado al metodo de la logica que elimina un archivo
        funciones.limpiarDiscos();
        //Refresco de la tabla del algortimo de asignacion
        onRefresh();
    }

    /**
     * Metodo que retorna el mapa segun el algoritmo seleccionado
     * @returns Mapa con los datos segun algortimo seleccionado
     */
    const mapas = () => {

        //Arreglo que toma el valor del mapa segun el algortimo seleccionado
        let array = [];
        //Valida que el algortimo seleccionado sea Contigua
        if (algoritmo == "Contigua") {
            //Se asigna el valor del mapa
            array = funciones.mapaContigua;
        }
        //Valida que el algortimo seleccionado sea Enlazada
        if (algoritmo == "Enlazada") {
            //Se asigna el valor del mapa
            array = funciones.mapaEnlazada;
        }
        //Valida que el algortimo seleccionado sea Indexada-Enlazada
        if (algoritmo == "Indexada-Enlazada") {
            //Se asigna el valor del mapa
            array = funciones.mapaIndexadaEnlazada;
        }
        //Valida que el algortimo seleccionado sea Indexada-Multinivel
        if (algoritmo == "Indexada-Multinivel") {
            //Se asigna el valor del mapa
            array = funciones.mapaIndexadaMultinivel;
        }
        //Valida que el algortimo seleccionado sea Indexada Combinada
        if (algoritmo == "Indexada-Combinada") {
            //Se asigna el valor del mapa
            array = funciones.mapaIndexadaCombinada;
        }
 
        //Retorna las SectionList con los datos
        return(
            <View style={{
            flexDirection: 'row',
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
            }}>
                <SectionList 
                    sections={[
                        {title: 'Bloque 1', data: array[0]},
                        {title: 'Bloque 5', data: array[4]},
                        {title: 'Bloque 9', data: array[8]},
                        {title: 'Bloque 13', data: array[12]},
                        {title: 'Bloque 17', data: array[16]}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                <SectionList 
                    sections={[
                        {title: 'Bloque 2', data: array[1]},
                        {title: 'Bloque 6', data: array[5]},
                        {title: 'Bloque 10', data: array[9]},
                        {title: 'Bloque 14', data: array[13]},
                        {title: 'Bloque 18', data: array[17]}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                <SectionList  
                    sections={[
                        {title: 'Bloque 3', data: array[2]},
                        {title: 'Bloque 7', data: array[6]},
                        {title: 'Bloque 11', data: array[10]},
                        {title: 'Bloque 15', data: array[14]},
                        {title: 'Bloque 19', data: array[18]}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                <SectionList 
                    sections={[
                        {title: 'Bloque 4', data: array[3]},
                        {title: 'Bloque 8', data: array[7]},
                        {title: 'Bloque 12', data: array[11]},
                        {title: 'Bloque 16', data: array[15]},
                        {title: 'Bloque 20', data: array[19]}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
 
    //Retorna la view de los algortimos de asignacion de espacio y mapa de bits
    return(
        <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
            
            <View style={{top: 50,flex: 1,flexDirection: 'row',alignContent: "center",alignItems: "center",justifyContent: "center"}}>
                
                <TextInput onChangeText={(val) => setnombreArchivo(val)} value={nombreArchivo} placeholder="Nombre del Archivo" style={styles.input} keyboardType='default' clearButtonMode="always"/>
                <TextInput onChangeText={(val) => settamañoCaracteres(val)} value={tamañoCaracteres} placeholder="Tamaño de caracteres del Archivo" style={styles.input} keyboardType='numeric' />
                
                <TouchableOpacity style={{marginLeft:15, width: 130, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>limpiarDisco()}>
                    <Text style={{color:'white', fontSize: 17}}>Limpiar Discos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft:15, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>informacionDisco()}>
                    <Text style={{color:'white', fontSize: 17}}>Informacion del Disco</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft:15, width: 130, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>crearArchivo()}>
                    <Text style={{color:'white', fontSize: 17}}>Crear Archivo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft:15, width: 160, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>eliminarArchivo()}>
                    <Text style={{color:'white', fontSize: 17}}>Eliminar Archivo</Text>
                </TouchableOpacity>
                
                <Picker style={{marginLeft:20}} key="uniqueId1" selectedValue={algoritmo} onValueChange={(itemValue, itemIndex) => setAlgoritmo(itemValue)}>
                    {listaPicker}
                </Picker>

            </View>
            
            <View style={{top: 100}}>
                {processTable()}
                {mapaBits()}
            </View>

            {mapas()}
            {diskLog()}
        </View>
    )
 }
 export default mapaBits;




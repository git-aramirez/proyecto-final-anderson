/**
 * View de los algoritmos de mapa de bits y algortimos de asigancion de espacio
 * @author Kevin David Sanchez Solis
 */

 import React from 'react';
 import { Text, View, SectionList, Picker, TextInput, Button} from 'react-native';
 import * as funciones from '../scripts_am/Main';
 
 
 
 /**
  * Metodo principal que gestiona la vista del mapa de bits y los algortimos de asignacion de espacio
  * @returns La vista del mapa de bits y los algoritmos de asiganacion de espacio
  */
 const mapaBits = () => {
 
    //Variable que almacena el nombre del archivo a crear o eliminar
    const [nombreArchivo,   setnombreArchivo]       = React.useState("");
    //Variable que almacena el tamaño de caracteres del archivo a crear
    const [tamañoCaracteres,   settamañoCaracteres] = React.useState(5);
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
        //Refresco de la tabla del algortimo de asignacion
        onRefresh();
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
                    renderItem={({item}) => <Text >{item}</Text>}
                    renderSectionHeader={({section}) => <Text >{section.title}</Text>}
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
                    renderItem={({item}) => <Text >{item}</Text>}
                    renderSectionHeader={({section}) => <Text >{section.title}</Text>}
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
                    renderItem={({item}) => <Text >{item}</Text>}
                    renderSectionHeader={({section}) => <Text >{section.title}</Text>}
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
                    renderItem={({item}) => <Text >{item}</Text>}
                    renderSectionHeader={({section}) => <Text >{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
 
    //Retorna la view de los algortimos de asignacion de espacio y mapa de bits
    return(
        <View style={{

            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30

        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Button 
                title   = "Limpiar Discos"
                onPress= { ()=>limpiarDisco()}
                />
                <Button
                title   = "Informacion del Disco"
                onPress= { ()=>informacionDisco()}
                />
            </View>

            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <TextInput
                    onChangeText={(val) => setnombreArchivo(val)}
                    value={nombreArchivo}
                    placeholder="Nombre del Archivo"
                    
                    keyboardType='default'
                    clearButtonMode="always"
                />
                <TextInput
                    onChangeText={(val) => settamañoCaracteres(val)}
                    value={tamañoCaracteres}
                    placeholder="Tamaño de caracteres del Archivo"
                    
                    keyboardType='numeric' 
                />
            </View>

            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Button 
                title   = "Crear Archivo"
                onPress= { ()=>crearArchivo() }
                />
                <Button
                title   = "Eliminar Archivo"
                onPress= { ()=>eliminarArchivo()}
                />
            </View>

            <Picker
            key="uniqueId1"
            selectedValue={algoritmo}
            onValueChange={(itemValue, itemIndex) => setAlgoritmo(itemValue)}
            >
                {listaPicker}
            </Picker>

            {mapas()}
        </View>
    )
 }
 export default mapaBits;




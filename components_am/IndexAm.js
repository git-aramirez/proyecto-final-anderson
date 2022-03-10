/**
 * View de los algoritmos de mapa de bits y algortimos de asigancion de espacio
 * @author Kevin David Sanchez Solis
 */

 import React from 'react';
 import { Text, View, SectionList, Picker, TextInput, Button,TouchableOpacity,ScrollView} from 'react-native';
 import * as funciones from '../scripts_am/Main';
 import ProcessList from './ProcessListComponent';
 import BitsMap from './BitsMap';
 import { styles } from './styles';
 import NumberFormat from 'react-number-format';
 import {Speaker, Pause} from '../components_drawer/Speaker';
 import { DataTable } from 'react-native-paper';
 
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
            <View style={{top:500,width: `100%`,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
                <TextInput style={styles.item_resultado} multiline={true} numberOfLines={8} value={log}/>
                <TouchableOpacity style={{marginTop:15, width: 160, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=> Speaker(log)}>
                    <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:15, width: 160, height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=> Pause()}>
                    <Text style={{color:'white', fontSize: 17}}>Parar</Text>
                </TouchableOpacity>
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
            <View style={{top: 0,marginLeft:20}}>
                <Text>Mapa de bits</Text>
                <TextInput style={styles.item_input} multiline={true} numberOfLines={5} value={mapaBits}/>
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
            <ScrollView vertical={true} style={{ top: 100 ,width: 100 ,height: 600}}> 
                <ProcessList procesos = {tablaProcesos}/>
            </ScrollView>
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
            
            <View style={{top:150, marginRight:0, marginLeft: 20, width: 400 ,height: 500,flexDirection: 'column',alignContent: "center",alignItems: "center",justifyContent: "center",padding: 1}}>

                <DataTable id="tabla_salida" style={{flexDirection: 'column'}}>
                    <DataTable.Header >
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 1</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 2</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 3</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 4</Text></DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row > 
                        <DataTable.Cell style={{width:75, height: 90, borderBottomWidth: 0}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[0].map((row, index1) =>(
                                    <Text style={styles.item}>{array[0][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[1].map((row, index1) =>(
                                    <Text style={styles.item}>{array[1][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[2].map((row, index1) =>(
                                    <Text style={styles.item}>{array[2][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[3].map((row, index1) =>(
                                    <Text style={styles.item}>{array[3][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable >
                <DataTable id="tabla_salida" style={{flexDirection: 'column'}}>
                    <DataTable.Header >
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 5</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 6</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 7</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 8</Text></DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row > 
                        <DataTable.Cell style={{width:75, height: 90, borderBottomWidth: 0}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[4].map((row, index1) =>(
                                    <Text style={styles.item}>{array[4][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[5].map((row, index1) =>(
                                    <Text style={styles.item}>{array[5][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[6].map((row, index1) =>(
                                    <Text style={styles.item}>{array[6][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[7].map((row, index1) =>(
                                    <Text style={styles.item}>{array[7][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable >
                <DataTable id="tabla_salida" style={{flexDirection: 'column'}}>
                    <DataTable.Header >
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 9</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 10</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 11</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 12</Text></DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row > 
                        <DataTable.Cell style={{width:75, height: 90, borderBottomWidth: 0}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[8].map((row, index1) =>(
                                    <Text style={styles.item}>{array[8][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[9].map((row, index1) =>(
                                    <Text style={styles.item}>{array[9][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[10].map((row, index1) =>(
                                    <Text style={styles.item}>{array[10][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[11].map((row, index1) =>(
                                    <Text style={styles.item}>{array[11][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable >
                <DataTable id="tabla_salida" style={{flexDirection: 'column'}}>
                    <DataTable.Header >
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 13</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 14</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 15</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 16</Text></DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row > 
                        <DataTable.Cell style={{width:75, height: 90, borderBottomWidth: 0}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[12].map((row, index1) =>(
                                    <Text style={styles.item}>{array[12][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[13].map((row, index1) =>(
                                    <Text style={styles.item}>{array[13][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[14].map((row, index1) =>(
                                    <Text style={styles.item}>{array[14][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[15].map((row, index1) =>(
                                    <Text style={styles.item}>{array[15][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable >
                <DataTable id="tabla_salida" style={{flexDirection: 'column'}}>
                    <DataTable.Header >
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 17</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 18</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 19</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.item_tabla}>Bloque 20</Text></DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row > 
                        <DataTable.Cell style={{width:75, height: 90, borderBottomWidth: 0}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[16].map((row, index1) =>(
                                    <Text style={styles.item}>{array[16][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[17].map((row, index1) =>(
                                    <Text style={styles.item}>{array[17][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[18].map((row, index1) =>(
                                    <Text style={styles.item}>{array[18][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{width:75,height: 90 , flexDirection: 'column'}}>
                            <View style={{flexDirection: 'column', margin: 0}}>
                                {array[19].map((row, index1) =>(
                                    <Text style={styles.item}>{array[19][index1]}</Text>
                                ))}
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable >
            </View>
        )
    }
    //Retorna la view de los algortimos de asignacion de espacio y mapa de bits
    return(
        <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
            
            <View style={{top:0 ,flex: 0.5,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
                
                <TextInput onChangeText={(val) => setnombreArchivo(val)} value={nombreArchivo} placeholder="Nombre del Archivo" style={styles.input} keyboardType='default' clearButtonMode="always"/>
                <TextInput onChangeText={(val) => settamañoCaracteres(val)} value={tamañoCaracteres} placeholder="Tamaño de caracteres del Archivo" style={styles.input_tamanio_archivo} keyboardType='numeric' />
                
                <TouchableOpacity style={{marginLeft:15, width: 130, height: 40, backgroundColor: 'green',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>limpiarDisco()}>
                    <Text style={{color:'white', fontSize: 17}}>Limpiar Discos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft:15, width: 130, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>crearArchivo()}>
                    <Text style={{color:'white', fontSize: 17}}>Crear Archivo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft:15, width: 160, height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=>eliminarArchivo()}>
                    <Text style={{color:'white', fontSize: 17}}>Eliminar Archivo</Text>
                </TouchableOpacity>
                
                <Picker style={{marginLeft:20}} key="uniqueId1" selectedValue={algoritmo} onValueChange={(itemValue, itemIndex) => setAlgoritmo(itemValue)}>
                    {listaPicker}
                </Picker>

            </View>
            
            <View style={{width: '80%' ,height: 500,top: 50,flex: 1,flexDirection: 'row',alignContent: "center",alignItems: "center",justifyContent: "center"}}>
                {processTable()}
                {mapaBits()}
                {mapas()}
            </View>

            {diskLog()}
        </View>
    )
 }
 export default mapaBits;




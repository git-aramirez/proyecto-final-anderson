/**
 * Aplicativo de gestion de particiones de disco
 * @author Kevin David Sanchez Solis
 */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TextInput, View, Picker, Button,TouchableOpacity} from 'react-native';
import * as funciones from '../scripts_pd/Main';
import { DataTable } from 'react-native-paper';
import { styles } from './styles';
import NumberFormat from 'react-number-format';
import Speaker from '../components_drawer/Speaker';

/**
 * Metodo que Gestiona la vista principal del aplicativo
 * @returns La vista Principal del Programa
 */
function App () {
 
  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);

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
   * Metodo que sirve para eliminar el disco seleccionado en el picker
   */
  function EliminarDisco() {
    //Llama a la funcion de eliminar disco
    funciones.eliminarDisco(discos);

    //Set para el selector de discos
    setitemsInPicker(    
      Object.keys(funciones.discosCreados).map(function(key, index) {
        return (
          <Picker.Item label={funciones.discosCreados[key]['nombre']}  value={funciones.discosCreados[key]['nombre']}/>
        )
      })
    );

    return onRefresh();
  }

  /**
   * Metodo que recopila los datos para crear una particion en un disco en especifico
   */
  async function llenarDatosParticion() {

    //[Espacio libre, tamaño nuevo, espacio libre acontinuacion, alinear con,
    //crear Como, nombre particion, Sistema de archivos, Etiqueta]
    var array = {};
    //Espacio libre
    array['espacioLibre'] = tLibre != "" ? parseInt(tLibre, 10) : "";
    //Tamaño nuevo
    array['tamañoNuevo'] = tNuevo != "" ? parseInt(tNuevo, 10) : "";
    //Espacio libre a continuacion
    array['espacioLibreAcontinuacion'] = libreA != "" ? parseInt(libreA, 10) : "";
    //Alinear con: MiB - GiB
    array['alinea'] = alinear;
    //Crear como: Primaria, logica, extendida
    array['tipoParticion'] = tipoP;
    //Nombre de la particion
    array['nombreParticion'] = nombreP;
    //Tipo de sistema de archivos: Ext, Fat32, etc...
    array['tipoSistemaArchivos'] = sistemaA;
    //Etiqueta
    array['etiqueta'] = etiqueta;
    
    //Llamado al metodo para el ingreso de la particion.
    await funciones.ingresarParticion(discos, array);

    // Limpia campos  de texto 
    settLibre("");
    settNuevo("");
    setlibreA("");
    setnombreP("");
    setetiqueta("");

    return onRefresh();
  }
 
  /**
   * Metodo que crear un disco con la informacion proporcionada por el usuario
   * La informacion: Tamaño Disco, Nombre Disco y Tipo Disco (MBR -GPT)
   */
  function CrearDisco() {

    // Palabra sin espacios
    let palabra = nombre.trim();
    // Valida que exista un nombre para el disco
    if (palabra == '') {
      return alert("Ingrese un nombre para el disco.");
    }
    // Valida que exista tamaño para el disco
    if (tamaño == '') {
      return alert("Ingrese tamaño para el disco.");
    }
    // Valida si el disco es MBR y el limite se excede
    if (tipo == "MBR" && parseInt(tamaño, 10) > 2048) {
      return alert("El tamaño maximo para disco MBR es: 2TB.");
    }

    //Llamado al metodo que almacena los discos
    funciones.crearDisco(tipo, nombre, parseInt(tamaño, 10));

    //Set para el selector de discos
    setitemsInPicker(    
      Object.keys(funciones.discosCreados).map(function(key, index) {
        return (
          <Picker.Item label={funciones.discosCreados[key]['nombre']}  value={funciones.discosCreados[key]['nombre']}/>
        )
      })
    );

    // Valida si esta vacio
    if (discos == "")  {
      setDisco(funciones.discosCreados[nombre]['nombre']);
    }

    // Limpia campos
    setTamaño("");
    setNombre("");

    // Refresca componentes
    return onRefresh();
  }

  /**
   * Elimina partcion del disco
   *
   * @param {*} nombreParticion nombre de la particion
   */
  function EliminarParticion(nombreParticion) {
    
    // Llama la funcion de eliminar particion
    funciones.eliminarParticion(discos, nombreParticion);

    // Refresca componentes
    return onRefresh();
  }

  /**
   * Muestra tabla de particiones
   * @returns 
   */
  function tablePartitions() {
    //Arreglo que toma el valor del mapa segun el algortimo seleccionado
    let array = [];

    // Informacion de las particiones del disco seleccionado
    array = funciones.particiones[discos];

    // Valida si no existe disco
    if (discos == "") {
      array = {};
    }
    // Valida si no existen particiones en el disco
    else if (discos && !funciones.particiones[discos]) {
      array = {};
    } else {
      array = funciones.particiones[discos];
    }
    
    //Retorna la tabla de particiones
    return(
      <View style={{width: `70%` ,height: 450, top: 100}}>
        <DataTable id="tablaParticiones">
          <DataTable.Header>
            <DataTable.Title>Nombre Particion</DataTable.Title>
            <DataTable.Title>Tipo</DataTable.Title>
            <DataTable.Title>Tamaño</DataTable.Title>
            <DataTable.Title>Opciones</DataTable.Title>
          </DataTable.Header>
          {Object.values(array).map((row, index) => (
            <DataTable.Row>
              <DataTable.Cell>{row.nombreParticion}</DataTable.Cell>
              <DataTable.Cell>{row.tipoParticion}</DataTable.Cell>
              <DataTable.Cell>{row.tamañoNuevo}</DataTable.Cell>
              <DataTable.Cell>
                <Button title = "Eliminar" onPress= { ()=> EliminarParticion(row.nombreParticion)}/>
              </DataTable.Cell>
            </DataTable.Row>
            ))
          }
        </DataTable > 
      </View> 
    );
  }

  /**
   * Muestra log del disco
   * @returns 
   */
  function diskLog() {
    //Arreglo que toma el valor del mapa segun el algortimo seleccionado
    let array = '';

    // Informacion de las particiones del disco seleccionado
    array = funciones.particiones[discos];

    // Valida si existe el log del disco
    if (funciones.logDiscos[discos]) {
      array = funciones.logDiscos[discos];
    }
    
    //Retorna la tabla de particiones
    return(
      <View style={{width: 200,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
        <TextInput style={styles.item_resultado} multiline={true} numberOfLines={8} value={array}/>
        <TouchableOpacity  style={{marginTop:15, width: 160, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=> Speaker(array)}>
          <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
        </TouchableOpacity>
      </View>
    );
  }

 
  //----------------------Datos creacion de Disco nuevo ----------------------------------------------------
 
  //Tamaño del disco nuevo en MiB
  const [tamaño, setTamaño]  = React.useState("");
  //Nombre del disco nuevo
  const [nombre, setNombre]  = React.useState("");
  //Tipo de disco [MBR, GPT]
  const [tipo, setTipo]      = React.useState("MBR");
  //Picker Selector de disco a usar para crear las particiones
  const [discos, setDisco]   = React.useState("");
  //Datos del picker de discos creados
  const [itemsInPicker, setitemsInPicker]  = React.useState();

  //---------------------Datos de la tabla de creacion de particiones---------------------------------------

  //Espacio libre
  const [tLibre,     settLibre] = React.useState("");
  //Tamaño nuevo
  const [tNuevo,     settNuevo] = React.useState("");
  //Espacio libre a contuniacion
  const [libreA,     setlibreA] = React.useState("");
  //Alinear con: 
  const [alinear,   setalinear] = React.useState("MiB");
  //Crear como: [tipo de particion: primria, logica, extendida]
  const [tipoP,       settipoP] = React.useState("Primaria");
  //Nombre de la particion
  const [nombreP,   setnombreP] = React.useState("");
  //Sistema de archivos de la particion
  const [sistemaA, setsistemaA] = React.useState("Fat32");
  //Etiqueta
  const [etiqueta, setetiqueta] = React.useState("");

  //Lista de tipo de archivos que puede tener una particion.
  const archivos = ["Fat32", "NTFS", "exFAT", "Ext2", "Ext3", "Ext4", "HFS+"];
  //Lista de tipo de particion
  const listaParticionTipo = ["Primaria", "Logica", "Extendida"];
  //lista para alinear
  const metricas = ["MiB", "GiB"];
  
  //llena el combo box de sistema de archivos
  let sistemasArchivos = archivos.map( data=> {
    return (
      <Picker.Item label={data}  value={data}/>
    )
  });

  //llena el combo box de tipo de particion
  let listaTipo = listaParticionTipo.map( data=> {
    return (
      <Picker.Item label={data}  value={data}/>
    )
  });
  
  //llena el combo box de alinear
  let listaAlinear = metricas.map( data=> {
    return (
      <Picker.Item label={data}  value={data}/>
    )
  });

  return (
    <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>

        <View style={{top:30 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
            
            <NumberFormat value={tamaño} displayType={'text'} renderText={ (tamaño) => (
                <TextInput underlineColorAndroid="transparent" onChangeText={(val) => setTamaño(val)} value={tamaño} placeholder="Tamaño del disco en MB" style={styles.input} keyboardType="numeric"/>
            )}/>

            <TextInput onChangeText={(val) => setNombre(val)} placeholder="Nombre del disco" style={styles.input} keyboardType='text'/>

            <Text style={{marginLeft:20}} > Tipo de Disco</Text>

            <Picker style={{marginLeft:20}} selectedValue={tipo} onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
                <Picker.Item label={"MBR"}  value={"MBR"}/>
                <Picker.Item label={"GPT"}  value={"GPT"}/>
            </Picker>

            <TouchableOpacity style={{marginLeft:20, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>CrearDisco()} >
              <Text style={{color:'white', fontSize: 17}}>Crear Disco</Text>
            </TouchableOpacity>

        </View>

        <View style={{width: 500,height: 40, top:100, left:50 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
              
          <StatusBar style="auto" />

          <Picker selectedValue={discos} style={{ height: 40, width: 150, marginLeft:20}} onValueChange={(itemValue) => setDisco(itemValue)}>
            {itemsInPicker}
          </Picker>

          <TouchableOpacity style={{marginLeft:20, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>EliminarDisco()} >
              <Text style={{color:'white', fontSize: 17}}>Eliminar Disco</Text>
          </TouchableOpacity>

        </View>

        <View style={{width: `70%` ,height: 450, top: 140}}> 

          <DataTable id="tablaParticion">
            <DataTable.Header>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title></DataTable.Title>
            </DataTable.Header>

            <DataTable.Row >
              <DataTable.Cell>Espacio Libre precedente (Mib)</DataTable.Cell>
              <DataTable.Cell  numeric>
                <TextInput onChangeText={(val) => settLibre(val)} value={tLibre} placeholder="espacio libre" keyboardType='numeric' />
              </DataTable.Cell>
              <DataTable.Cell text>Crear Como</DataTable.Cell>
              <DataTable.Cell text>
                <Picker selectedValue={tipoP} onValueChange={(itemValue, itemIndex) => settipoP(itemValue)}>
                  {listaTipo}
                </Picker>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Tamaño nuevo (Mib)</DataTable.Cell>
              <DataTable.Cell numeric>
                <TextInput onChangeText={(val) => settNuevo(val)} value={tNuevo} placeholder="tamaño nuevo" keyboardType='numeric'/>
              </DataTable.Cell>
              <DataTable.Cell>Nombre de la particion</DataTable.Cell>
              <DataTable.Cell text>
                <TextInput onChangeText={(val) => setnombreP(val)} value={nombreP} placeholder="nombre particion" keyboardType='text'/>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Espacio Libre a continuacion (Mib)</DataTable.Cell>
              <DataTable.Cell numeric>
                <TextInput onChangeText={(val) => setlibreA(val)} value={libreA} placeholder="libre acontinuacion" keyboardType='numeric'/>
              </DataTable.Cell>
              <DataTable.Cell>Sistema de archivos</DataTable.Cell>
              <DataTable.Cell text>
                <Picker selectedValue={sistemaA} onValueChange={(itemValue, itemIndex) => setsistemaA(itemValue)}>
                  {sistemasArchivos}
                </Picker>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Alinear con: </DataTable.Cell>
              <DataTable.Cell text>
                <Picker selectedValue={alinear} onValueChange={(itemValue, itemIndex) => setalinear(itemValue)}>
                  {listaAlinear}
                </Picker>
              </DataTable.Cell>
              <DataTable.Cell>Etiqueta</DataTable.Cell>
              <DataTable.Cell text>
                <TextInput  onChangeText={(val) => setetiqueta(val)}value={etiqueta} placeholder="etiqueta" keyboardType='text'/>
              </DataTable.Cell>
            </DataTable.Row>     
          </DataTable> 

          </View>

          <View style={{top:5 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>

          <TouchableOpacity style={{marginLeft:20, width: 190, height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}} onPress={() => arreglo.datosPorDisco(discos)} >
             <Text style={{color:'white', fontSize: 17}}>Cancelar</Text>
           </TouchableOpacity>

          <TouchableOpacity style={{marginLeft:20, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>llenarDatosParticion()} >
            <Text style={{color:'white', fontSize: 17}}>Aplicar</Text>
          </TouchableOpacity>

          </View>

        {tablePartitions()}
        {diskLog()}
      </View>
  );
}
export default App;
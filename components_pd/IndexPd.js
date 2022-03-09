/**
 * Aplicativo de gestion de particiones de disco
 * @author Kevin David Sanchez Solis
 */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TextInput, View, Picker, Button,TouchableOpacity,ScrollView,CheckBox} from 'react-native';
import * as funciones from '../scripts_pd/Main';
import { DataTable } from 'react-native-paper';
import { styles } from './styles';
import NumberFormat from 'react-number-format';
import Speaker from '../components_drawer/Speaker';

import DiscoOutComponent from './DiscoOutComponent';
import { memo } from 'react/cjs/react.production.min';

/**
 * Metodo que Gestiona la vista principal del aplicativo
 * @returns La vista Principal del Programa
 */
function App () {
 
  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);


  const [discosGlobales, setDiscosGlobales] = React.useState([]);
  const [particiones, setparticiones] = React.useState([]);
  const [posDisco, setPosDisco] = React.useState(0);

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
    
    let resultado =  funciones.eliminarDisco(discos);
    setparticiones(resultado[1]);
    setDiscosGlobales(resultado[0]);


    //Set para el selector de discos
    setitemsInPicker(    
      Object.keys(funciones.discosCreados).map(function(key, index) {
        return (<Picker.Item label={funciones.discosCreados[key]['nombre']}  value={funciones.discosCreados[key]['nombre']}/>
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
  
    let resultado =  await funciones.ingresarParticion(discos, array);
    setparticiones(resultado[1]);
    setDiscosGlobales(resultado[0]);


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
    
    let resultado = funciones.crearDisco(tipo, nombre, parseInt(tamaño, 10));
    setparticiones(resultado[1]);
    /*
    let parti = funciones.particiones;
    parti.push();
    setparticiones(parti);
    */
    setDiscosGlobales(resultado[0]);
  

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
  function EliminarParticion(index) {
    
    // Llama la funcion de eliminar particion
    
    let resultado = funciones.eliminarParticion(discos, index);
    setparticiones(resultado[1]);
    setDiscosGlobales(resultado[0]);
    //let par = new Array(discosGlobales.length);
    //setparticiones(par);
    

    // Refresca componentes
    return onRefresh();
  }

  function inicializarParticiones(){

  }


var estados = [false,false,false,];

  function modificarDisplay(nombre){
    if(nombre===""){
      return '';
    }
    return 'none';
  }

function modificarEstados(estado, index){
  particiones[posDisco][index][8] = estado;
  onRefresh();
  funciones.modificarEstadoParticionDisco(estado,index,posDisco);
}

  /**
   * Muestra tabla de particiones
   * @returns 
   */
  function tablePartitions() {
    //Arreglo que toma el valor del mapa segun el algortimo seleccionado
    let array = [];

    // Informacion de las particiones del disco seleccionado

    if(discos!==""){
      let posicionDisco = funciones.encontrarDisco(discos);
      array = funciones.particiones[posicionDisco];
    }

    let part = [];
    if(particiones.length>0){
      part = particiones[posDisco];
    }

    function updateNombreParticiones (value,index){
      particiones[posDisco][index][5] = value;
      onRefresh();
      funciones.setParticiones(particiones);
    }

    function updateTipoParticiones (value,index){
      particiones[posDisco][index][4] = value;
      onRefresh();
      funciones.setParticiones(particiones);
    }
  
    
/*
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
    */

    //Retorna la tabla de particiones
    return(
      <View style={{width: `70%` ,height: ((250)+(60*array.length)), top: 100}}>
        <DataTable id="tablaParticiones">
          <DataTable.Header>
            <DataTable.Title>Nombre Particion</DataTable.Title>
            <DataTable.Title>Tipo</DataTable.Title>
            <DataTable.Title>Tamaño</DataTable.Title>
            <DataTable.Title>Opciones</DataTable.Title>
            <DataTable.Title>Editar</DataTable.Title>
          </DataTable.Header>
          {Object.values(part).map((row, index) => (
            <DataTable.Row>
              <DataTable.Cell> <TextInput style={{fontSize:15}} editable={row[8]} value={row[5]} onChangeText={(data)=>updateNombreParticiones(data,index)}/></DataTable.Cell>
              <DataTable.Cell >  
                
              <Picker style={{height: 25, fontSize:15}} value={row[4]} selectedValue={row[4]} enabled={row[8]} onValueChange={(itemValue, itemIndex) => updateTipoParticiones(itemValue,index)}>
                <Picker.Item label={""}  value={""}/>
                <Picker.Item label={"Primaria"}  value={"Primaria"}/>
                <Picker.Item label={"Logica"}  value={"Logica"}/>
                <Picker.Item label={"Extendida"}  value={"Extendida"}/>
              </Picker>
                
              </DataTable.Cell>
              <DataTable.Cell> {row[1]} </DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity style={{marginTop:15, width: 160, height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}}  onPress= { ()=> EliminarParticion(index)}>
                  <Text style={{color:'white', fontSize: 17}}>Eliminar</Text>
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell><CheckBox value={row[8]} onValueChange={(val) => modificarEstados(val,index)} style={{alignSelf: "center" }}/></DataTable.Cell>
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
      <View style={{marginTop:10,width: 200, height:200,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
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
  //Lista de tipo de particion
  const listaParticionTipoGPT = ["Primaria"];
  //lista para alinear
  const metricas = ["MiB", "GiB"];
  
  //llena el combo box de sistema de archivos
  let sistemasArchivos = archivos.map( data=> {
    return (
      <Picker.Item label={data}  value={data}/>
    )
  });

  function discoOutComponent(){
    if(particiones.length === discosGlobales.length){
      return(
        <ScrollView style={{paddingVertical: 5}}>
           {discosGlobales.map((row,i) => (
        <DiscoOutComponent top={(50+(50*discosGlobales.length))} discosGlobales={discosGlobales} particiones={particiones} posDisco={i}/>
        ))}
        </ScrollView>
      );
    }
    return(<></>);
    
  }

  /**
   * Renderiza picker con opciones de tipo de particion segun tipo de disco 
   *
   * @returns Picker de tipo de particion
   */
  function partitionPicker() {
    
    // Opciones para disco tipo MBR
    let lista = listaParticionTipo.map( data=> {
      return (
        <Picker.Item label={data}  value={data}/>
      )
    });

    // Valida si el tipo de disco seleccionado es GPT
    if (funciones.discosCreados[discos] && funciones.discosCreados[discos].tipo == 'GPT') {
      //llena el combo box de tipo de particion con opciones para GPT
      lista = listaParticionTipoGPT.map( data=> {
        return (
          <Picker.Item label={data}  value={data}/>
        )
      });
    }

    return (
      <Picker selectedValue={tipoP} onValueChange={(itemValue, itemIndex) => settipoP(itemValue)}>
        {lista}
      </Picker>
    )
  }

  function cambiarDisco(itemValue){
    setDisco(itemValue);
    setPosDisco(funciones.encontrarDisco());
  }

  //llena el combo box de alinear
  let listaAlinear = metricas.map( data=> {
    return (
      <Picker.Item label={data}  value={data}/>
    )
  });

  return (
    <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>

        <View style={{top:50 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
            
            <NumberFormat value={tamaño} displayType={'text'} renderText={ (tamaño) => (
                <TextInput underlineColorAndroid="transparent" onChangeText={(val) => setTamaño(val)} value={tamaño} placeholder="Tamaño del disco en MB" style={styles.input} keyboardType="numeric"/>
            )}/>

            <TextInput onChangeText={(val) => setNombre(val)} value={nombre} placeholder="Nombre del disco" style={styles.input} keyboardType='text'/>

            <Text style={{marginLeft:20}} > Tipo de Disco</Text>

            <Picker style={{marginLeft:20}} selectedValue={tipo} onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
                <Picker.Item label={"MBR"}  value={"MBR"}/>
                <Picker.Item label={"GPT"}  value={"GPT"}/>
            </Picker>

            <TouchableOpacity style={{marginLeft:20, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>CrearDisco()} >
              <Text style={{color:'white', fontSize: 17}}>Crear Disco</Text>
            </TouchableOpacity>

        </View>

        <View style={{width: 500,height: 40, top:110, left:50 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
              
          <StatusBar style="auto" />

          <Picker selectedValue={discos} style={{ height: 40, width: 150, marginLeft:20}} onValueChange={(itemValue) => cambiarDisco(itemValue)}>
            {itemsInPicker}
          </Picker>

          <TouchableOpacity style={{marginLeft:20, width: 190, height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>EliminarDisco()} >
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
                <NumberFormat value={tLibre} displayType={'text'} renderText={ (tLibre) => (
                  <TextInput underlineColorAndroid="transparent" onChangeText={(val) => settLibre(val)} value={tLibre} placeholder="Espacio libre" keyboardType="numeric"/>
                )}/>
              </DataTable.Cell>
              <DataTable.Cell text>Crear Como</DataTable.Cell>
              <DataTable.Cell text>
                {partitionPicker()}
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Tamaño nuevo (Mib)</DataTable.Cell>
              <DataTable.Cell numeric>
                <NumberFormat value={tNuevo} displayType={'text'} renderText={ (tNuevo) => (
                  <TextInput underlineColorAndroid="transparent" onChangeText={(val) => settNuevo(val)} value={tNuevo} placeholder="Tamaño nuevo" keyboardType="numeric"/>
                )}/>
              </DataTable.Cell>
              <DataTable.Cell>Nombre de la particion</DataTable.Cell>
              <DataTable.Cell text>
                <TextInput onChangeText={(val) => setnombreP(val)} value={nombreP} placeholder="nombre particion" keyboardType='text'/>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Espacio Libre a continuacion (Mib)</DataTable.Cell>
              <DataTable.Cell numeric>
                <NumberFormat value={libreA} displayType={'text'} renderText={ (libreA) => (
                  <TextInput underlineColorAndroid="transparent" onChangeText={(val) => setlibreA(val)} value={libreA} placeholder="Libre acontinuación" keyboardType="numeric"/>
                )}/>
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
            <Text style={{color:'white', fontSize: 17}}>Agregar</Text>
          </TouchableOpacity>

          </View>

        {tablePartitions()}
        {diskLog()}

        <View style={{width:'50%',height:250,borderWidth: 1}}>
        {discoOutComponent()}
        </View>   

        <View style={{width:'70%',height:40,end:100}}>
        </View> 
       
      </View>
  );
}
export default App;
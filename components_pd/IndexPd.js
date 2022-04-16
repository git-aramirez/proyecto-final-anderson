/**
 * Aplicativo de gestion de particiones de disco
 * @author Kevin David Sanchez Solis
 * @author Anderson Ramirez Vasquez
 */
 import React from 'react';
 import { Text, TextInput, View, Picker, Button,TouchableOpacity,ScrollView} from 'react-native';
 import * as funciones from '../scripts_pd/Main';
 import { DataTable } from 'react-native-paper';
 import { styles } from './styles';
 import NumberFormat from 'react-number-format';
 import { Speaker, Pause } from '../components_drawer/Speaker';
 
 import DiscoOutComponent from './DiscoOutComponent';
 import TableDisc from './TableDisc';
 import BouncyCheckbox from "react-native-bouncy-checkbox";
 
 
 
 /**
  * Metodo que Gestiona la vista principal del aplicativo
  * @returns La vista Principal del Programa
  */
 function App () {
  
   //Variable que acciona el refresco de la tabla
   const [refreshing, setRefreshing] = React.useState(false);
 
 
   const [discosGlobales, setDiscosGlobales] = React.useState([]);
   const [particiones, setparticiones] = React.useState([]);
   const [particionesCopy, setparticionesCopy] = React.useState([]);
 
   const [posDisco, setPosDisco] = React.useState(0);
   const [tablaStyles, setTablaStyles] = React.useState( [["disco"],[["p","#DEDEDE",0.5]]] );
   const [particionesExt, setParticionesExt] = React.useState([["disco"],[["p","#DEDEDE",0.5]],0.3]);
 
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
   function  EliminarDisco() {
    
     setDisco("");
     let resultado =  funciones.eliminarDisco(discos);
 
     if(resultado==-1){
       return;
     }
 
     setparticiones(resultado[1]);
     let fakeDeepCopy = JSON.parse(JSON.stringify(resultado[1]));
     setparticionesCopy(fakeDeepCopy);
     setDiscosGlobales(resultado[0]);
 
     let disCread = [];
     disCread.push("");
     disCread.push(funciones.obtenerNombreDiscosCreados());
    
     
       setitemsInPicker(    
        Object.keys(disCread).map(function(key, index) {
         return (
           <Picker.Item label={disCread[index]} value={disCread[index]}/>
         )
       })
     );
 
    
     onRefresh();
 
     setTablaStyles([["disco"],[["p","#DEDEDE",0.5]]]);
     setParticionesExt([["disco"],[["p","#DEDEDE",0.5]],0.3]);
     
     setVerTablaDisc(false);
     setDisco("");
 
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
 
     if(resultado==-1){
       return;
     }
 
 
     setparticiones(resultado[1]);
     let fakeDeepCopy = JSON.parse(JSON.stringify(resultado[1]));
     setparticionesCopy(fakeDeepCopy);
     setDiscosGlobales(resultado[0]);
 
     let result = funciones.inicializarTablaStyles(discos,discosGlobales,particiones);
     setTablaStyles(result[0]);
     setParticionesExt(result[1]);
 
     // Limpia campos  de texto 
     settLibre("");
     settNuevo("");
     setlibreA("");
     setnombreP("");
     setetiqueta("");
 
     setVerTablaDisc(true);
 
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
     // Valida que exista tamaño para el disco
     if (tamaño <= 0) {
       return alert("El tamaño deve ser mayor a 0.");
     }
     // Valida si el disco es MBR y el limite se excede
     if (tipo == "MBR" && parseInt(tamaño, 10) > 2048) {
       return alert("El tamaño maximo para disco MBR es: 2TB.");
     }
 
     //Llamado al metodo que almacena los discos
     
     let resultado = funciones.crearDisco(tipo, nombre, parseInt(tamaño, 10));
 
     if(resultado==-1){
       return;
     }
 
     setparticiones(resultado[1]);
     let fakeDeepCopy = JSON.parse(JSON.stringify(resultado[1]));
     setparticionesCopy(fakeDeepCopy);
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
         let pos = funciones.encontrarDisco(nombre);
         setDisco(funciones.discosCreados[pos]['nombre']);
       }
   
       // Limpia campos
       setTamaño("");
       setNombre("");
 
 
       if(resultado[0][0][2]=="MBR"){
         setIsMbr('flex');
       }else{
         setIsMbr('none');
       }
   
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
     let fakeDeepCopy = JSON.parse(JSON.stringify(resultado[1]));
     setparticionesCopy(fakeDeepCopy);
 
     let result = funciones.inicializarTablaStyles(discos,discosGlobales,particiones);
     setTablaStyles(result[0]);
     setParticionesExt(result[1]);
     //let par = new Array(discosGlobales.length);
     //setparticiones(par);
     
 
     // Valida que se reporten errores
     if (resultado != -1) {      
       setparticiones(resultado[1]);
       setDiscosGlobales(resultado[0]);
       
       let result = funciones.inicializarTablaStyles(discos,discosGlobales,particiones);
       setTablaStyles(result[0]);
       setParticionesExt(result[1]);
 
       // Refresca componentes
       return onRefresh();
     }
   }
 
 
   const [posicionChecked, setPosicionChecked] = React.useState(-1);
 
    function modificarEstados(estado, index){
   
     //let posDisco = funciones.encontrarDisco(discos);
     if(!estado){
       
       if(discosGlobales[posDisco][2]=="MBR"){
         let resultado = funciones.modificarParticiones(discos,particiones[posDisco][index],particionesCopy[posDisco][index],posDisco);
         if(resultado!=""){
           return alert(resultado);
         }
       }
 
     let fakeDeepCopy = JSON.parse(JSON.stringify(particiones));
     setparticionesCopy(fakeDeepCopy);
     }
     
     if(estado){
       setPosicionChecked(index);
       setparticiones(funciones.deshabilitarChecks(posDisco,index)) ;
     }else if(!estado && index==posicionChecked){
       funciones.crearLogDeEditar(discos,particiones[posDisco][index]);
       setPosicionChecked(-1);
       setparticiones(funciones.habilitarChecks(posDisco));
     }
 
     let result = funciones.inicializarTablaStyles(discos,discosGlobales,particiones);
     setTablaStyles(result[0]);
     setParticionesExt(result[1]);
     
     particiones[posDisco][index][8] = estado;
     funciones.modificarEstadoParticionDisco(estado,index,posDisco);
     onRefresh();
   }
 
   
 
 
   const [isMbr,setIsMbr] = React.useState('none');
 
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
 
     function updateTipoSistemaArchivosParticiones (value,index){
       particiones[posDisco][index][6] = value;
       onRefresh();
       funciones.setParticiones(particiones);
     }
 
     function updateEtiquetaParticiones (value,index){
       particiones[posDisco][index][7] = value;
       onRefresh();
       funciones.setParticiones(particiones);
     }
   
     //Retorna la tabla de particiones

     if(verTablaDisc){
      return(
       
        <View style={{erginLeft:100,width: `90%` ,height: ((50)+(60*array.length)), top: 100}}>
  
        <ScrollView horizontal={true} style={{ top: 0 ,width: '100%' ,height: 10}}  > 
          <DataTable id="tablaParticiones" style={{width:1100}}>
            <DataTable.Header>
              <DataTable.Title style={{justifyContent:'center'}}>Nombre Particion</DataTable.Title>
              <DataTable.Title style={{justifyContent:'center',display: isMbr}}>Tipo</DataTable.Title>
              <DataTable.Title style={{justifyContent:'center'}}>Sistema De Archivos</DataTable.Title>
              <DataTable.Title style={{justifyContent:'center',flex:0.7}}>Tamaño</DataTable.Title>
              <DataTable.Title style={{justifyContent:'center',}}>Etiqueta</DataTable.Title>
              <DataTable.Title style={{justifyContent:'center'}}>Opción</DataTable.Title>
              <DataTable.Title style={{justifyContent:'center'}}>Editar</DataTable.Title>
            </DataTable.Header>
            {Object.values(array).map((row, index) => (
              <DataTable.Row style={{justifyContent:'center'}}>
                <DataTable.Cell style={{justifyContent:'center'}}>
                 <View>
                  <TextInput style={{fontSize:15,width:80}} editable={row[8]} value={row[5]} onChangeText={(data)=>updateNombreParticiones(data,index)}/>
                 </View>
                </DataTable.Cell>
                <DataTable.Cell style={{justifyContent:'center',display: isMbr}} >  
                  <View>
                <Picker style={{display: isMbr,width:150,height: 25, fontSize:15}} value={row[4]} selectedValue={row[4]} enabled={row[8]} onValueChange={(itemValue, itemIndex) => updateTipoParticiones(itemValue,index)}>
                  <Picker.Item style={{fontSize:15}} label={""}  value={""}/>
                  <Picker.Item style={{fontSize:15}}label={"Primaria"}  value={"Primaria"}/>
                  <Picker.Item style={{fontSize:15}} label={"Logica"}  value={"Logica"}/>
                  <Picker.Item style={{fontSize:15}}label={"Extendida"}  value={"Extendida"}/>
                </Picker>
                 </View>
                </DataTable.Cell >
                <DataTable.Cell style={{justifyContent:'center'}} >  
                  <View>
                <Picker style={{width:110,height: 25, fontSize:15}} value={row[6]} selectedValue={row[6]} enabled={row[8] && row[4]!="Extendida"} onValueChange={(itemValue) => updateTipoSistemaArchivosParticiones(itemValue,index)}>
                    {sistemasArchivos}
                </Picker>
                 </View>
                </DataTable.Cell >
                <DataTable.Cell style={{justifyContent:'center',flex:0.7}}> {row[1]} </DataTable.Cell>
                <DataTable.Cell style={{justifyContent:'center'}}>
                  <View>
                     <TextInput style={{fontSize:15,width:55}} onChangeText={(val) => updateEtiquetaParticiones(val,index)} editable={row[8]} value={row[7]} placeholder="etiqueta" keyboardType='text'/>
                  </View>
                 </DataTable.Cell>
                <DataTable.Cell style={{justifyContent:'center'}}>
                 <View>
                  <TouchableOpacity style={{marginTop:0, width: 100, height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}}  onPress= { ()=> EliminarParticion(index)}>
                    <Text style={{color:'white', fontSize: 17}}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
                </DataTable.Cell>
                <DataTable.Cell style={{justifyContent:'center'}}>
                 <View>
                 <BouncyCheckbox
  
                    disableBuiltInState={!row[9]} 
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text=""
                    iconStyle={{ borderColor: "red" }}
                    onPress={(val) => modificarEstados(val,index) }
                  />
                 </View>
                </DataTable.Cell>
                
              </DataTable.Row>
              ))
            }
          </DataTable > 
          </ScrollView>
        </View> 
      );
     }
     
     return(<></>);
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
     if(verTablaDisc){
     return(
       <View style={{top:0,marginTop:80,width: '90%', height:400,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
         <TextInput style={styles.item_resultado} multiline={true} numberOfLines={8} value={array}/>
         
         <View style={{height:100,width:'90%',marginTop: 20,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
            <TouchableOpacity  style={{width: 160, height: 45, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=> Speaker(array)}>
              <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:20,width: 160, height: 45, backgroundColor: 'red', padding:10, alignItems: 'center', borderRadius: 5}} onPress= { ()=> Pause()}>
              <Text style={{color:'white', fontSize: 17}}>Parar</Text>
            </TouchableOpacity>
         </View>
       </View>
     );

     }

     return(<></>);
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
   const archivos = ["","Fat32", "NTFS", "exFAT", "Ext2", "Ext3", "Ext4", "HFS+"];
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
         <Picker.Item label={data}  value={data} />
       )
     });
 
     // Valida si el tipo de disco seleccionado es GPT
     if (funciones.discosCreados[posDisco] && funciones.discosCreados[posDisco].tipo == 'GPT') {
       //llena el combo box de tipo de particion con opciones para GPT
       lista = listaParticionTipoGPT.map( data=> {
         return (
           <Picker.Item label={data}  value={data}/>
         )
       });
     }
 
     return (
       <Picker style={{width:140, height: 20, fontSize:12}} selectedValue={tipoP} onValueChange={(itemValue, itemIndex) => settipoP(itemValue) }>
         {lista}
       </Picker>
     )
   }
 
   function cambiarDisco(itemValue){
     if(itemValue!=""){
       setDisco(itemValue);
       let posicion = funciones.encontrarDisco(itemValue);
       setPosDisco(posicion);
   
       if(discosGlobales[posicion][2]=="MBR"){
         setIsMbr('flex');
       }else{
         setIsMbr('none');
       }
 
       if(discosGlobales[posicion][2]=="GPT"){
         settipoP("Primaria");
       }
   
       let result = funciones.inicializarTablaStyles(itemValue,discosGlobales,particiones);
       setTablaStyles(result[0]);
       setParticionesExt(result[1]);
 
       if(result[0][1].length > 0 || result[1].length>0){
         setVerTablaDisc(true);
       }
   
       onRefresh();
     }
   }
 
   function tableDisc (){
     if(verTablaDisc){
       return(
         <View style={{marginLeft:150,width:'90%',height:200,marginTop:150}}>
           <TableDisc width={'100%'} tablaStyles={tablaStyles} particionesExt={particionesExt} />
         </View>
         );
     }
     return(<></>);
   }
 
   //llena el combo box de alinear
   let listaAlinear = metricas.map( data=> {
     return (
       <Picker.Item label={data}  value={data}/>
     )
   });
 
   const [verTablaDisc, setVerTablaDisc] = React.useState(false);
 
 
   return (
 
     <ScrollView style={{paddingVertical: 0}}>
     <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
 
         <View style={{width:'80%',top:50 ,alignItems: 'center',justifyContent: 'center',flexDirection: 'column'}}>
             
             <NumberFormat value={tamaño} displayType={'text'} renderText={ (tamaño) => (
                 <TextInput underlineColorAndroid="transparent" onChangeText={(val) => setTamaño(val)} value={tamaño} placeholder="Tamaño del disco en MB" style={styles.input} keyboardType="numeric"/>
             )}/>
 
             <TextInput onChangeText={(val) => setNombre(val)} value={nombre} placeholder="Nombre del disco" style={styles.input} keyboardType='text'/>
 
             <Text style={{marginTop:20}} > Tipo de Disco</Text>
 
             <Picker style={{marginTop:20, width:'100%'}} selectedValue={tipo} onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
                 <Picker.Item label={"MBR"}  value={"MBR"}/>
                 <Picker.Item label={"GPT"}  value={"GPT"}/>
             </Picker>
 
             <TouchableOpacity style={{marginTop:20, width: '100%', height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>CrearDisco()} >
               <Text style={{color:'white', fontSize: 15}}>Crear Disco</Text>
             </TouchableOpacity>
         </View>
 
          <View style={{width: '80%',height: 40, top:110 ,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
             <Picker selectedValue={discos} style={{ height: 40, width: 150}} onValueChange={(itemValue) => cambiarDisco(itemValue)}>
               {itemsInPicker}
             </Picker>
             <TouchableOpacity style={{marginLeft:20, width: '40%', height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>EliminarDisco()} >
                 <Text style={{color:'white', fontSize: 15}}>Eliminar Disco</Text>
             </TouchableOpacity>
         </View>
 
         <View style={{width: `90%` ,height: 450, top: 140}}> 
 
         <ScrollView horizontal={true} style={{ top: 0 ,width: '100%' ,height: 100}}  > 
           <DataTable id="tablaParticion" style={{width:1000,height:200}}>
             <DataTable.Header>
               <DataTable.Title></DataTable.Title>
               <DataTable.Title></DataTable.Title>
               <DataTable.Title></DataTable.Title>
               <DataTable.Title></DataTable.Title>
             </DataTable.Header>
 
             <DataTable.Row >
               <DataTable.Cell>Espacio Libre precedente (Mib)</DataTable.Cell>
               <DataTable.Cell style={{justifyContent: 'center'}} numeric>
                 <View>
                 <NumberFormat value={tLibre} displayType={'text'} renderText={ (tLibre) => (
                   <TextInput underlineColorAndroid="transparent" onChangeText={(val) => settLibre(val)} value={tLibre} placeholder="Espacio libre" keyboardType="numeric"/>
                 )}/>
                 </View>
               </DataTable.Cell>
               <DataTable.Cell  text>Crear Como</DataTable.Cell>
               <DataTable.Cell style={{justifyContent: 'center'}}  text >
                 <View style={{width: 140}}>
                 {partitionPicker()}
                 </View>
               </DataTable.Cell>
             </DataTable.Row>
 
             <DataTable.Row>
               <DataTable.Cell ><Text style={{fontSize: 15}}>Tamaño nuevo (Mib)</Text></DataTable.Cell>
               <DataTable.Cell style={{justifyContent: 'center'}}  numeric>
                 <View>
                 <NumberFormat value={tNuevo} displayType={'text'} renderText={ (tNuevo) => (
                   <TextInput underlineColorAndroid="transparent" onChangeText={(val) => settNuevo(val)} value={tNuevo} placeholder="Tamaño nuevo" keyboardType="numeric"/>
                 )}/>
                 </View>
               </DataTable.Cell>
               <DataTable.Cell>Nombre de la particion</DataTable.Cell>
               <DataTable.Cell style={{justifyContent: 'center'}}  text>
                 <View>
                 <TextInput onChangeText={(val) => setnombreP(val)} value={nombreP} placeholder="nombre particion" keyboardType='text'/>
                 </View>
               </DataTable.Cell>
             </DataTable.Row>
 
             <DataTable.Row>
               <DataTable.Cell>Espacio Libre a continuacion (Mib)</DataTable.Cell>
               <DataTable.Cell style={{justifyContent: 'center'}}  numeric>
                <View>
                 <NumberFormat value={libreA} displayType={'text'} renderText={ (libreA) => (
                   <TextInput underlineColorAndroid="transparent" onChangeText={(val) => setlibreA(val)} value={libreA} placeholder="Libre acontinuación" keyboardType="numeric"/>
                 )}/>
                 </View>
               </DataTable.Cell>
               <DataTable.Cell>Sistema de archivos</DataTable.Cell>
               <DataTable.Cell style={{justifyContent: 'center'}}  text>
                 <View style={{width: 120}}>
                 <Picker style={{width:120, height: 20, fontSize:12}} enabled={tipoP!="Extendida"} selectedValue={sistemaA} onValueChange={(itemValue, itemIndex) => setsistemaA(itemValue)}>
                   {sistemasArchivos}
                 </Picker>
                 </View>
               </DataTable.Cell>
             </DataTable.Row>
 
             <DataTable.Row>
               <DataTable.Cell>Alinear con: </DataTable.Cell>
               <DataTable.Cell style={{justifyContent: 'center'}}  text>
                 <View style={{width: 120}}>
                 <Picker style={{width:120, height: 20, fontSize:12}} selectedValue={alinear} onValueChange={(itemValue, itemIndex) => setalinear(itemValue)}>
                   {listaAlinear}
                 </Picker>
                 </View>
               </DataTable.Cell>
               <DataTable.Cell>Etiqueta</DataTable.Cell>
               <DataTable.Cell style={{justifyContent: 'center'}}  text>
                 <View>
                 <TextInput  onChangeText={(val) => setetiqueta(val)}value={etiqueta} placeholder="etiqueta" keyboardType='text'/>
                 </View>
               </DataTable.Cell>
             </DataTable.Row>     
           </DataTable> 
         </ScrollView>
 
           </View>
 
           <View style={{width:'90%', top:5,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
 
           <TouchableOpacity style={{marginLeft:20, width: '40%', height: 42, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>llenarDatosParticion()} >
             <Text style={{color:'white', fontSize: 17}}>Agregar</Text>
           </TouchableOpacity>
 
           </View>
 
         {tablePartitions()}
 
         {tableDisc()}    
         {diskLog()}
 
         <View style={{width:'70%',height:40,end:20}}>
         </View> 
        
       </View>
       </ScrollView>
   );
 }
 export default App;
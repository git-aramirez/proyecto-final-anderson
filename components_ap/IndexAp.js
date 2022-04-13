import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View,ScrollView,Picker,Button,TextInput,TouchableOpacity,Text} from 'react-native';
import TableInputComponent from './TableInputComponet';
import NumberFormat from 'react-number-format';
import * as main from '../scripts_ap/Main';
import TableOutComponent from './TableOutComponen';
import TableProcessComponent from './TableProcessComponent';
import { Speaker, Pause } from '../components_drawer/Speaker';

export default function IndexAp() {

  const [numeroProcesos, setNumeroProcesos] = useState("");
  const [numeroCPU, setNumeroCPU] = useState("");
  const [numeroNucleos, setNumeroNucleos] = useState("");
  const [quantum, setQuantum] = useState("");
  const [tablaEntrada, setTablaEntrada] = useState([]);
  const [tablaSalida, setTablaSalida] = useState([]);
  const [banderaEntrada,setBanderaEntrada] = useState(false);
  const [banderaSalida,setBanderaSalida] = useState(false);
  const [isQuamtum,setIsQuantum] = useState(false);
  const [item_algoritmo,setItem_algoritmo] = useState("FCFS");
  const [isPrioridad,setIsPrioridad] = useState('none');
  const [textoFinal,setTextoFinal] = useState("");
  const [textoCola,setTextoCola] = useState("");
  
  function tableInputComponent (){
    if(banderaEntrada){
      return(<TableInputComponent isPrioridad={isPrioridad} height={160+(40*numeroProcesos)} tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />);
    }
    return(<></>);
  }

  function tableOutComponent (){
    if(banderaSalida){
      return( <TableOutComponent top={60+(15*numeroProcesos)} height={40*numeroProcesos} tablaSalida={tablaSalida}/>);
    }

    return(<></>);
  }

  function buttonEjecutarAlgoritmoComponent (){
    if(banderaEntrada){
      return(
        <TouchableOpacity style={{marginLeft:20, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>iniciarAlgoritmo()} >
          <Text style={{color:'white', fontSize: 17}}>Ejecutar Algoritmo</Text>
        </TouchableOpacity>);
    }

    return(<></>);
  }

  function init(){
    setBanderaSalida(false);
    if(parseInt(numeroProcesos)>10 ){
      return alert("Por favor NO ingresa más de 10 procesos");
    }else if (parseInt(numeroProcesos)<=0){
      return alert("Por favor ingrese una cantida válida de procesos");
    }
    crearTablaEntrada();
    setBanderaEntrada(true);
    onRefresh();
  }

function crearTablaEntrada(){
  let tablaEntrada = [];
  for (let index = 0; index < numeroProcesos; index++) {
    tablaEntrada.push({pid: index+1, t_llegada: "", t_ejecucion: "", prioridad:"",rafaga_es: ""})
  }
  setTablaEntrada(tablaEntrada);
}

function inicializarTablaSalida(matrizSalida){
  let tablaSalida = [];
  for (let i = 0; i < matrizSalida.length; i++) {
    tablaSalida.push({pid:matrizSalida[i][0], t_salida:matrizSalida[i][1], t_servicio:matrizSalida[i][2], t_espera:matrizSalida[i][3] ,indice_servicio: matrizSalida[i][4]});
  }
  setTablaSalida(tablaSalida);
  setBanderaSalida(true);
  onRefresh();
}

function validaciones(){
  let aprobadosTiemposLlegada = main.validosTimeposLLegada(tablaEntrada);
  if(!aprobadosTiemposLlegada){
     alert("La tabla de entrada tiene tiempos de llegada erroneos !");
     return true;
  }
  let valoresTablaEntrada = main.validarTablaEntrada(tablaEntrada, item_algoritmo);
  if(!valoresTablaEntrada){
    alert("La tabla de entrada no es válida !");
    return true;
 }

  if(numeroProcesos==="" || parseInt(numeroProcesos)<=0){
    alert("Ingrese mínimo número de procesos válido");
    return true;
  }

  if(numeroCPU==="" || parseInt(numeroCPU)<=0){
     alert("El número de CPU´s no puede ser 0");
     return true;
  }

  if(numeroNucleos==="" || parseInt(numeroNucleos)<=0){
     alert("El número de núcleos no puede ser 0");
     return true;
  }

  if(item_algoritmo==="RR" && quantum==="" || parseInt(quantum)<=0){
     alert("Por favor ingrese un Quantum válido");
     return true;
  }
  return false;
}

const [tiempoMasLejano, setTiempoMasLejano] = useState(0);

function iniciarAlgoritmo (){
  if(validaciones()){
    return;
  }

  let nucleosTotal = parseInt(numeroNucleos)*parseInt(numeroCPU);
  let resultado = main.ejecutarAlgoritmo(item_algoritmo,tablaEntrada,nucleosTotal,parseInt(quantum));
   setTiempoMasLejano(resultado[1]);
   setTablaStyles(main.crearTablaDeEstilos());
  let texto="";
   if(item_algoritmo=="RR"){
    setTextoCola(resultado[0][1]);
    inicializarTablaSalida(resultado[0][0]);
    texto = main.crearTextoSalida(item_algoritmo,resultado[0][0]);
   }else{
    setTextoCola(resultado[0]);
    inicializarTablaSalida(resultado[0]);
    texto = main.crearTextoSalida(item_algoritmo,resultado[0]);
   }
  

  setTextoFinal(texto);
}

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

const [tablaStyles, setTablaStyles] = useState(new Array());

function inicializarTablaEntradaNumerosAleatorios(){
  main.inicializarTablaEntradaNumerosAleatorios(tablaEntrada,item_algoritmo);
  return onRefresh();
}

function bottonInicializarTablaeEntrada(){
  if(banderaEntrada){
    return(
    <TouchableOpacity style={{marginLeft:20, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>inicializarTablaEntradaNumerosAleatorios()} >
      <Text style={{color:'white', fontSize: 17}}>Generar Aleatorios</Text>
    </TouchableOpacity>);
  }

  return(<></>);
}

function tableProcessComponent (){
  if(banderaSalida){
    return(
          <TableProcessComponent top = {350+(15*numeroProcesos)} width={1000} height={60*numeroProcesos} tablaStyles={tablaStyles} />
    );
  }
  return(<></>);
}

function cambiarValorPickerAlgoritmos(itemValue){
  setItem_algoritmo(itemValue);

  if(itemValue==="Prioridad interna expulsiva (HRN_PRIMA)" || itemValue==="Prioridad interna no expulsiva (HRN)"){
    setTablaEntrada(main.cambiarPrioridad(tablaEntrada));
  }

  if(itemValue==="RR"){
    setIsQuantum(true);
  }else{
    setIsQuantum(false);
  }

  let isItemValido = itemValue==="Prioridad externa expulsiva" 
  || itemValue==="Prioridad externa no expulsiva" ||  itemValue==="Prioridad interna no expulsiva (HRN)"
  || itemValue === "Prioridad interna expulsiva (HRN_PRIMA)";

  if(isItemValido){
    setIsPrioridad('flex');
  }else{
    setIsPrioridad('none');
  }
 
}


function pickerAlgortimos(){
  if(banderaEntrada){
    return (
      <Picker style={{width: '90%',fontSize:15,height: 40 }} selectedValue={item_algoritmo} onValueChange={(itemValue, itemIndex) => cambiarValorPickerAlgoritmos(itemValue)}>
        <Picker.Item label={"FCFS"}  value={"FCFS"}/>
        <Picker.Item label={"SJF"}  value={"SJF"}/>
        <Picker.Item label={"SRTF"}  value={"SRTF"}/>
        <Picker.Item label={"Prioridad externa expulsiva"}  value={"Prioridad externa expulsiva"}/>
        <Picker.Item label={"Prioridad externa no expulsiva"}  value={"Prioridad externa no expulsiva"}/>
        <Picker.Item label={"Prioridad interna no expulsiva (HRN)"}  value={"Prioridad interna no expulsiva (HRN)"}/>
        <Picker.Item label={"Prioridad interna expulsiva (HRN')"}  value={"Prioridad interna expulsiva (HRN_PRIMA)"}/>
        <Picker.Item label={"RR"}  value={"RR"}/>
      </Picker>
    );
  }
  return(<></>);
}

function quantumComponent(){
  if(isQuamtum){
    return(
      <NumberFormat value={quantum} displayType={'text'} renderText={ (quantum) => (
        <TextInput style={styles.input} onChangeText={(val)=>setQuantum(val)} value={quantum} placeholder="Quantum" keyboardType='numeric'/>)}/>);
  }

  return(<></>);
}

function resultado(){
  if(banderaSalida){
    return(
      <View style={{marginBottom:20,marginTop:560,width: '90%', height:400,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
        <Text style={{fontSize: 15, justifyContent:'center',marginBottom:30,marginTop:30,fontWeight:'bold',fontStyle: 'italic'}}>Texto de Salida</Text>
        <TextInput style={styles.item_resultado} multiline={true} numberOfLines={8} value={textoFinal}/>
        <TouchableOpacity  style={{marginTop:15, width: '20%', height: 45, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=> Speaker(textoFinal)}>
          <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom:30,marginTop:15, width: '20%', height: 45, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=> Pause()}>
          <Text style={{color:'white', fontSize: 17}}>Parar</Text>
        </TouchableOpacity>
      </View>
      );
  }

  return(<></>);
}

function resultadoCola(){
  if(banderaSalida && item_algoritmo==="RR"){
    return(
      <View style={{width:'10%',height: 200,top:500}}>
          <Text style={{fontSize: 15, justifyContent:'center',marginBottom:30,marginTop:30,fontWeight:'bold',fontStyle: 'italic'}}>Cola de procesos</Text>
          <TextInput style={styles.item_resultado_cola} multiline={true} numberOfLines={8} value={textoCola}/>
      </View>
      );
  }

  return(<></>);
}

 return (
  <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>

    <View style={{top:15 ,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
    <NumberFormat value={numeroProcesos} displayType={'text'} renderText={ (numeroProcesos) => (
          <TextInput style={styles.input} onChangeText={(val)=>setNumeroProcesos(val)} value={numeroProcesos} placeholder="número de procesos" keyboardType="numeric"/>)}/>

          <NumberFormat value={numeroCPU} displayType={'text'} renderText={ (numeroCPU) => (
          <TextInput style={styles.input} onChangeText={(val)=>setNumeroCPU(val)} value={numeroCPU} placeholder="número de CPU´S" keyboardType="numeric"/>)}/>
         
          <NumberFormat value={numeroNucleos} displayType={'text'} renderText={ (numeroNucleos) => (
          <TextInput style={styles.input} onChangeText={(val)=>setNumeroNucleos(val)} value={numeroNucleos} placeholder="número de núcleos" keyboardType="numeric"/>)}/>
      {quantumComponent()}
      <TouchableOpacity style={{marginTop:0, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>init()} >
        <Text style={{color:'white', fontSize: 17}}>Crear Tabla</Text>
      </TouchableOpacity>
    </View>
    
    <View style={{top:25 ,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
      {pickerAlgortimos()}
      {bottonInicializarTablaeEntrada()}
      {buttonEjecutarAlgoritmoComponent()} 
    </View>
      {tableInputComponent()} 
      {tableOutComponent()}
      {tableProcessComponent()} 

      {resultadoCola()}

      {resultado()}
  </View>
  );
}
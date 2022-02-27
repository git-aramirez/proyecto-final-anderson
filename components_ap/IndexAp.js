import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View,ScrollView,Picker,Button,TextInput,TouchableOpacity,Text} from 'react-native';
import TableInputComponent from './TableInputComponet';

import * as main from '../scripts_ap/main';
import TableOutComponent from './TableOutComponen';
import TableProcessComponent from './TableProcessComponent';


export default function IndexAp() {

  const [numeroProcesos, setNumeroProcesos] = useState(0);
  const [numeroCPU, setNumeroCPU] = useState(0);
  const [numeroNucleos, setNumeroNucleos] = useState(0);
  const [quantum, setQuantum] = useState(0);
  const [tablaEntrada, setTablaEntrada] = useState([]);
  const [tablaSalida, setTablaSalida] = useState([]);
  const [banderaEntrada,setBanderaEntrada] = useState(false);
  const [banderaSalida,setBanderaSalida] = useState(false);
  const [item_algoritmo,setItem_algoritmo] = useState("FCFS");
  
  function tableInputComponent (){
    if(banderaEntrada){
      return(<TableInputComponent tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />);
    }
    return(<></>);
  }

  function tableOutComponent (){
    if(banderaSalida){
      return( <TableOutComponent tablaSalida={tablaSalida}/>);
    }

    return(<></>);
  }

  function buttonEjecutarAlgoritmoComponent (){
    if(banderaEntrada){
      return(
        <TouchableOpacity style={{marginTop:0, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>iniciarAlgoritmo()} >
         <Text style={{color:'white', fontSize: 17}}>Ejecutar Algoritmo</Text>
        </TouchableOpacity>);
    }

    return(<></>);
  }

function init(){
  crearTablaEntrada();
  setBanderaEntrada(true);
}

function crearTablaEntrada(){
  let tablaEntrada = [];
  for (let index = 0; index < numeroProcesos; index++) {
    tablaEntrada.push({pid: index+1, T_llegada: "", T_ejecucion: "", prioridad:""})
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
}

function iniciarAlgoritmo (){
  setNumeroNucleos(numeroNucleos*numeroCPU);
  let matrizSalida = main.ejecutarAlgoritmo(item_algoritmo,tablaEntrada,numeroNucleos,quantum);
  inicializarTablaSalida(matrizSalida);
  setTablaStyles(main.crearTablaDeEstilos());
}

const [tablaStyles, setTablaStyles] = useState(new Array());
function crearStyles(){
  //setTablaStyles();


 //for (let index = 0; index < 10; index++) {
 // tablaStyles.push(new Array('red','#4B53BC','#4B53BC'));
 // tablaStyles[index]=new Array(3);
  //tablaStyles[index][0] ='red';
 // tablaStyles[index][1] ='#4B53BC';
  //tablaStyles[index][2] ='#4B53BC';
 //}
 //tablaStyles.push(new Array('#4B53BC','#4B53BC'));

}

function inicializarTablaEntradaNumerosAleatorios(){
  main.inicializarTablaEntradaNumerosAleatorios(tablaEntrada);
 //setTablaEntrada(tabla);
}

function bottonInicializarTablaeEntrada(){
  if(banderaEntrada){
    return(<Button onPress={()=>inicializarTablaEntradaNumerosAleatorios()} title={"Generar Aleatorios"} />);
  }

  return(<></>);
}

function tableProcessComponent (){
  if(banderaSalida){
    return(
      <ScrollView 
      horizontal={true}
      contentContainerStyle={{ width: `${100 * 5}%` }}
      showsHorizontalScrollIndicator={true}
      scrollEventThrottle={200}
      decelerationRate="fast"
      pagingEnabled
      
      >
    <TableProcessComponent tablaStyles={tablaStyles} />
    </ScrollView>
  );}
  return(<></>);
}

function pickerAlgortimos(){
  if(banderaEntrada){
  return (
  <Picker selectedValue={item_algoritmo} onValueChange={(itemValue, itemIndex) => setItem_algoritmo(itemValue)}>
  <Picker.Item label={"FCFS"}  value={"FCFS"}/>
  <Picker.Item label={"SJF"}  value={"SJF"}/>
  <Picker.Item label={"SRTF"}  value={"SRTF"}/>
  <Picker.Item label={"externoExpulsivo"}  value={"externoExpulsivo"}/>
  <Picker.Item label={"externoNoExpulsivo"}  value={"externoNoExpulsivo"}/>
  <Picker.Item label={"HRN"}  value={"HRN"}/>
  <Picker.Item label={"HRN_PRIMA"}  value={"HRN_PRIMA"}/>
  <Picker.Item label={"RR"}  value={"RR"}/>
</Picker>);}
  return(<></>);
}


 return (
  
  <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center' }}>

      <View style={{top:20 ,flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'}}>

        <TextInput style={styles.input} onChangeText={(val)=>setNumeroProcesos(val)} placeholder="número de procesos"/>
        <TextInput style={styles.input} onChangeText={(val)=>setNumeroCPU(val)} placeholder="número de CPU´S"/>
        <TextInput style={styles.input} onChangeText={(val)=>setNumeroNucleos(val)} placeholder="número de núcleos"/>
        <TextInput style={styles.input} onChangeText={(val)=>setQuantum(val)} placeholder="Quantum"/>
    
        <View style={{margin: 10} }>
          {pickerAlgortimos()}
        </View>
       
        <View style={{margin: 10} }>
        <TouchableOpacity style={{marginTop:0, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>init()} >
                <Text style={{color:'white', fontSize: 17}}>Crear Tabla</Text>
        </TouchableOpacity>
        </View>
       
        <View style={{margin: 10} }>
        {buttonEjecutarAlgoritmoComponent()} 
        </View>

        <View style={{margin: 10} }>
        {bottonInicializarTablaeEntrada()}
        </View>

       <View style={{margin: 20} }>
       {tableInputComponent()}
       </View>

       <View style={{margin: 20} }>
       {tableOutComponent()}
       </View>

       <View style={{margin: 20}}>
           {tableProcessComponent()} 
       </View>
    
       </View>

    </View>
  );
}
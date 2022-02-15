import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View,SafeAreaView, ScrollView,Picker,TextInput, Button,TouchableOpacity,Text} from 'react-native';
import TableInputThreadsComponent from './TableInputThreadsComponent';
import * as main from '../scripts_sp/Main';

export default function IndexSp() {

  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);
  const [cantidadCeldas, setCantidadCeldas] = useState(0);
  const [cantidadSemaforos, setCantidadSemaforos] = useState(0);
  const [textSemaforos, setTextSemaforos] = useState(0);
  const [textSalida, setTextSalida] = useState("");
  const [verTablaEntrada, setVerTablaEntrada] = useState(false);
  const [verCantidadFilas, setverCantidadFilas] = useState(false);
  const [tablaEntrada, setTablaEntrada] = useState([]);

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


function tableInputThreadsComponent (){
  if(verTablaEntrada){
    return(<TableInputThreadsComponent  height={50 * cantidadCeldas} tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />);
  }

  return(<></>);
}

function initCantidadFilasComponent(){
  if(verCantidadFilas){
    return(
      <View style={{margin: 20,flex: 1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
        <TextInput style={styles.input} onChangeText={(val)=>setCantidadCeldas(val)} placeholder="Cantidad de Filas"/>
        <TouchableOpacity style={{width: 170, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>init()} >
          <Text style={{color:'white', fontSize: 17}}>Crear Tablas</Text>
        </TouchableOpacity>
    </View>);
  }

  return(<></>);
}


function  crearTablaEntrada (){
    let tablaEntrada = [];
    for (let index = 0; index < cantidadCeldas; index++) {
      tablaEntrada.push({Hilo_1 : "", Hilo_2: "", Hilo_3: "", Hilo_4: "", Hilo_5: ""})
    }
    setTablaEntrada(tablaEntrada);
  }

  function init(){
    crearTablaEntrada();
    setVerTablaEntrada(true);
  }

  function establecerSemaforos(){
    let textSemaforos = "";
    for (let index = 0; index < cantidadSemaforos; index++) {
      textSemaforos += "[ S"+(index+1)+" valor: 0 ]"
    }
    setTextSemaforos(textSemaforos);
    setverCantidadFilas(true);
  }
 
  function textInputSemaforosComponent(){
    if(verTablaEntrada){
      return(<TextInput style={styles.textInput_semaforos_sp} onChangeText={(val)=>setTextSemaforos(val)} placeholder="semaforos" value={textSemaforos}/>);
    }
  
    return(<></>);
  }

  function generarSemaforosAleatorios(){
   var matrizEntrada= main.generarSemaforosAleatorios(textSemaforos,tablaEntrada);
   inicializarTablaSalida(matrizEntrada);
  }

  function ejecutarAlgoritmo(){
    var listaSalida = main.ejecutarAlgoritmo(textSemaforos,tablaEntrada);
    setTextSalida(listaSalida);
   }


  function buttonGenerarSemaforosAleatoriosComponent(){
    if(verTablaEntrada){
      return(
        <TouchableOpacity style={{marginTop:0, width: 250, height: 40, backgroundColor: '#EDAF0A',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>generarSemaforosAleatorios()} >
          <Text style={{color:'white', fontSize: 17}}>Generar Semaforos Aleatorios</Text>
        </TouchableOpacity>
      );
    }
  
    return(<></>);
  }

  function buttonEjecutarAlgoritmo(){
    if(verTablaEntrada){
      return(
        <TouchableOpacity style={{marginLeft:20, width: 100, height: 40, backgroundColor: 'green',padding:10,alignItems: 'center',borderRadius: 5}}onPress={()=>ejecutarAlgoritmo()} >
          <Text style={{color:'white', fontSize: 17}}>Ejecutar</Text>
        </TouchableOpacity>);
    }
  
    return(<></>);
  }

  function textAreaComponent(){
    if(verTablaEntrada){
      return (
        <TextInput style={styles.textInput_salida_sp} 
        onChangeText={(text) => setTextSalida(text)} placeholder="salida" value={textSalida}/>
      );
    }

    return (<></>)
  }

  function inicializarTablaSalida(matrizEntrada){
    let tablaSalida = [];
    for (let i = 0; i < matrizEntrada.length; i++) {
      tablaSalida.push({Hilo_1:matrizEntrada[i][0], Hilo_2:matrizEntrada[i][1], Hilo_3:matrizEntrada[i][2], Hilo_4:matrizEntrada[i][3] ,Hilo_5: matrizEntrada[i][4]});
    }
    setTablaEntrada(tablaSalida);
    //setBanderaSalida(true);
  }

 return (
    <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center'}}>

        <View style={{top:20 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
              <TextInput style={styles.input} onChangeText={(val)=>setCantidadSemaforos(val)} placeholder="Cantidad de Semaforos"/>
              <TouchableOpacity style={{marginTop:0, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>establecerSemaforos()} >
                <Text style={{color:'white', fontSize: 17}}>Establecer Semaforos</Text>
              </TouchableOpacity>
          </View>
            {initCantidadFilasComponent()}
            {textInputSemaforosComponent()}
        </View>

        {tableInputThreadsComponent()}

        <View style={{top:20 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
          {buttonGenerarSemaforosAleatoriosComponent()}
          {buttonEjecutarAlgoritmo()}
          {textAreaComponent()}
        </View>
    </View>
    );

}
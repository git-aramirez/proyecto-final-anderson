import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View, ScrollView,Picker,TextInput, Button,TouchableOpacity,Text} from 'react-native';
import TableInputThreadsComponent from './TableInputThreadsComponent';
import * as main from '../scripts_sp/Main';

export default function IndexSp() {

  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);
  const [cantidadSemaforos, setCantidadSemaforos] = useState(0);
  const [textSemaforos, setTextSemaforos] = useState(0);
  const [textVariables, setTextVariables] = useState("");
  const [textSalida, setTextSalida] = useState("");
  const [textHilosBloqueados, setTextHilosBloqueados] = useState("");
  const [verTablaEntrada, setVerTablaEntrada] = useState(false);
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
    return(<TableInputThreadsComponent  height={300} tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />);
  }

  return(<></>);
}

function  crearTablaEntrada (){
    setTablaEntrada({Hilo_1 : "", Hilo_2: "", Hilo_3: "", Hilo_4: "", Hilo_5: ""});
  }

  function init(){
    crearTablaEntrada();
    setVerTablaEntrada(true);
  }

  function establecerSemaforos(){
    let textSemaforos = "";
    for (let index = 0; index < cantidadSemaforos; index++) {
      textSemaforos += "[ S"+(index+1)+" valor: 1 ]"
    }
    setTextSemaforos(textSemaforos);
    setTextVariables("c=0,s=0,t=1,x=1");
    init();
    //setverCantidadFilas(true);
  }
 
  function textInputSemaforosComponent(){
    if(verTablaEntrada){
      return(<TextInput style={styles.textInput_semaforos_sp} onChangeText={(val)=>setTextSemaforos(val)} placeholder="semaforos" value={textSemaforos}/>);
    }
  
    return(<></>);
  }

  function textInputVariablesComponent(){
    if(verTablaEntrada){
      return(<TextInput style={styles.textInput_variables_sp} onChangeText={(val)=>setTextVariables(val)} placeholder="variables" value={textVariables}/>);
    }
  
    return(<></>);
  }

  function generarSemaforosAleatorios(){
   var matrizEntrada= main.generarSemaforosAleatorios(textSemaforos,tablaEntrada);
   setTablaEntrada({Hilo_1:matrizEntrada[0], Hilo_2:matrizEntrada[1], Hilo_3:matrizEntrada[2], Hilo_4:matrizEntrada[3] ,Hilo_5: matrizEntrada[4]});
  }

  function ejecutarAlgoritmo(){
    let resultado =  main.ejecutarAlgoritmo(textSemaforos,tablaEntrada,textVariables);
    let estaBloqueadoElSistema = resultado[1];
    setTextHilosBloqueados(resultado[2]);
    setTextSalida(resultado[0]);
    setTextVariables(resultado[3]);
    if(estaBloqueadoElSistema){
      alert("Se bloqueo el sistema !");
    }
   }

   function limpiarCampos(){
    setTextHilosBloqueados("");
    setTextSalida("");
    setTextSemaforos("");
    setTextVariables("");
    crearTablaEntrada();
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

  function buttonClear(){
    if(verTablaEntrada){
      return(
        <TouchableOpacity style={{marginLeft:20, width: 100, height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}}onPress={()=>limpiarCampos()} >
          <Text style={{color:'white', fontSize: 17}}>Limpiar</Text>
        </TouchableOpacity>);
    }
  
    return(<></>);
  }

  function textAreaSalidaComponent(){
    if(verTablaEntrada){
      return (
        <TextInput style={styles.textInput_salida_sp} 
        onChangeText={(text) => setTextSalida(text)} placeholder="Salida" value={textSalida}/>
      );
    }

    return (<></>)
  }

  function textAreaHilosBloqueadosComponent(){
    if(verTablaEntrada){
      return (
        <TextInput style={styles.textInput_hilos_bloqueados_sp} 
        onChangeText={(text) => setTextHilosBloqueados(text)} placeholder="Hilos Bloqueados" value={textHilosBloqueados}/>
      );
    }

    return (<></>)
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
            {textInputVariablesComponent()}
            {textInputSemaforosComponent()}
            {buttonClear()}
        </View>
        {tableInputThreadsComponent()}
        <View style={{top:20 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
          {buttonGenerarSemaforosAleatoriosComponent()}
          {buttonEjecutarAlgoritmo()}
          {textAreaSalidaComponent()}
          {textAreaHilosBloqueadosComponent()}
        </View>
    </View>
    );

}
import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View, ScrollView,Picker,TextInput, Button,TouchableOpacity,Text} from 'react-native';
import TableInputThreadsComponent from './TableInputThreadsComponent';
import * as main from '../scripts_sp/Main';
import {Speaker,Pause} from '../components_drawer/Speaker';

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
  const [isVisible,setIsVisible] = React.useState('none');
  const [textoFinal,setTextoFinal] = useState("");
  const [banderaSalida,setBanderaSalida] = useState(false);

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
    if(parseInt(cantidadSemaforos>5)){
      return alert("Por favor no ingrese más de 5 semáforos !")
     }
 
     if(cantidadSemaforos==="" || parseInt(cantidadSemaforos)<=0 ){
       return alert("Ingrese una cantidad de semáforos válida !")
     }
 
     let textSemaforos = "";
     for (let index = 0; index < cantidadSemaforos; index++) {
       textSemaforos += "[s"+(index+1)+" valor=1]"
     }
     setIsVisible('flex');
     setTextSemaforos(textSemaforos);
     setTextVariables("c=0,s=0");
     init();
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
    let textSemaforosValido = main.validarTextSemaforos(textSemaforos);
    if(!textSemaforosValido){
      return alert("Por favor valida la sintaxis de los semaforos inicializados");
    }
    
    let textVariablesValido = main.validarVariablesEntrada(textVariables);
    if(!textVariablesValido){
      return alert("Por favor valida la sintaxis de las variables inicializadas");
    }
    
    let tablaEntradaValida = main.validarTextHilos(tablaEntrada);
    if(!tablaEntradaValida){
      return alert("Por favor ingrese un valor en por lo menos 1 hilo");
    }

    let resultado =  main.ejecutarAlgoritmo(textSemaforos,tablaEntrada,textVariables);
    let estaBloqueadoElSistema = resultado[1];
    setTextHilosBloqueados(""+resultado[2]);
    setTextSalida(""+resultado[0]);
    setTextVariables(resultado[3]);
    if(estaBloqueadoElSistema){
      alert("Se bloqueo el sistema !");
    }

    let text = main.editarTextoSalida(""+resultado[0],""+resultado[2],textSemaforos,textVariables)
    setTextoFinal(text);
    setBanderaSalida(true);
    

    onRefresh();
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

  function resultado(){
    if(banderaSalida){
      return(
        <View style={{marginBottom:50,marginTop:240,width: '90%', height:320,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
          <TextInput style={styles.item_resultado} multiline={true} numberOfLines={8} value={textoFinal}/>
                <TouchableOpacity  style={{marginTop:15, width: '20%', height: 45, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=> Speaker(textoFinal)}>
                  <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:15, width: '20%', height: 45, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=> Pause()}>
                            <Text style={{color:'white', fontSize: 17}}>Parar</Text>
                </TouchableOpacity>
          </View>
        );
    }
  
    return(<></>);
  }

 return (
    <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center'}}>

        <View style={{top:50 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
              <TextInput style={styles.input} onChangeText={(val)=>setCantidadSemaforos(val)} placeholder="Cantidad de Semaforos"/>
              <TouchableOpacity style={{marginTop:0, width: 190, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>establecerSemaforos()} >
                <Text style={{color:'white', fontSize: 17}}>Establecer Semaforos</Text>
              </TouchableOpacity>
          </View>
            <Text style={{display:isVisible ,fontSize: 15, justifyContent:'center',marginLeft:10,marginTop:10 ,fontStyle: 'italic'}}>Variables</Text>
            {textInputVariablesComponent()}
            <Text style={{display:isVisible ,fontSize: 15, justifyContent:'center',marginLeft:10,marginTop:20 ,fontStyle: 'italic'}}>Semáforos</Text>
            {textInputSemaforosComponent()}
            {buttonClear()}
        </View>
        
        {tableInputThreadsComponent()}
        <View style={{top:120 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
          {buttonGenerarSemaforosAleatoriosComponent()}
          {buttonEjecutarAlgoritmo()}
          {textAreaSalidaComponent()}
          {textAreaHilosBloqueadosComponent()}
        </View>

        {resultado()}
    </View>
    );

}
import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View, ScrollView,Picker,TextInput, Button,TouchableOpacity,Text} from 'react-native';
import TableInputThreadsComponent from './TableInputThreadsComponent';
import * as main from '../scripts_cp/Main';

export default function IndexCp() {

  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);
  const [textSalida, setTextSalida] = useState("");
  const [textHilosBloqueados, setTextHilosBloqueados] = useState("");
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
    return(<TableInputThreadsComponent  height={300} tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />);
}

function  crearTablaEntrada (){
    setTablaEntrada({Hilo_1 : "", Hilo_2: "", Hilo_3: "", Hilo_4: "", Hilo_5: ""});
  }

  function generarSemaforosAleatorios(){
   var matrizEntrada= main.generarAleatorios(tablaEntrada);
   setTablaEntrada({Hilo_1:matrizEntrada[0], Hilo_2:matrizEntrada[1], Hilo_3:matrizEntrada[2], Hilo_4:matrizEntrada[3] ,Hilo_5: matrizEntrada[4]});
  }

  function ejecutarAlgoritmo(){
    let resultado =  main.ejecutar(tablaEntrada);
    setTextSalida(resultado[0]);
    setTextHilosBloqueados(resultado[1]);
   }

   function limpiarCampos(){
    setTextHilosBloqueados("");
    setTextSalida("");
    crearTablaEntrada();
   }


  function buttonGenerarSemaforosAleatoriosComponent(){
      return(
        <TouchableOpacity style={{marginTop:0, width: 250, height: 40, backgroundColor: '#EDAF0A',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>generarSemaforosAleatorios()} >
          <Text style={{color:'white', fontSize: 17}}>Generar Aleatorios</Text>
        </TouchableOpacity>
      );
  }

  function buttonEjecutarAlgoritmo(){
      return(
        <TouchableOpacity style={{marginLeft:20, width: 100, height: 40, backgroundColor: 'green',padding:10,alignItems: 'center',borderRadius: 5}}onPress={()=>ejecutarAlgoritmo()} >
          <Text style={{color:'white', fontSize: 17}}>Ejecutar</Text>
        </TouchableOpacity>);
  }

  function buttonClear(){
      return(
        <TouchableOpacity style={{marginLeft:20, width: 100, height: 40, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}}onPress={()=>limpiarCampos()} >
          <Text style={{color:'white', fontSize: 17}}>Limpiar</Text>
        </TouchableOpacity>);
  }

  function textAreaSalidaComponent(){
      return (
        <TextInput style={styles.textInput_salida_sp} 
        onChangeText={(text) => setTextSalida(text)} placeholder="Salida" value={textSalida}/>
      );
  }

  function textAreaHilosBloqueadosComponent(){
      return (
        <TextInput style={styles.textInput_hilos_bloqueados_sp} 
        onChangeText={(text) => setTextHilosBloqueados(text)} placeholder="Hilos Bloqueados" value={textHilosBloqueados}/>
      );
  }

 return (
    <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center'}}>

        <View style={{top:20 ,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
            {buttonGenerarSemaforosAleatoriosComponent()}
            {buttonEjecutarAlgoritmo()}
            {buttonClear()}
        </View>
        
        {tableInputThreadsComponent()}

        <View style={{marginTop:170 ,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
          {textAreaSalidaComponent()}
          {textAreaHilosBloqueadosComponent()}
        </View>
    </View>
    );
}
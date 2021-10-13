import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View,SafeAreaView, ScrollView,Picker,Button,TextInput} from 'react-native';
import TableInputProccessesComponent from './TableInputProccessesComponent';
import * as main from '../scripts_ea/main';

export default function IndexEa() {

  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);
  const [tablaEntrada, setTablaEntrada] = useState([]);
  const [cantidadCeldas, setCantidadCeldas] = useState(0);
  const [banderaEntrada,setBanderaEntrada] = useState(false);

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

    function tableInputProcessesComponent (){
        if(banderaEntrada){
          return(<TableInputProccessesComponent tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />);
        }
        return(<></>);
    }

    function buttonGenerarAleatorios (){
      if(banderaEntrada){
        return(<Button onPress={()=>inicializarTablaEntradaNumerosAleatorios()} title={"Generar Aleatorios"} />);
      }
  
      return(<></>);
    }

    function inicializarTablaEntradaNumerosAleatorios(){
      main.inicializarTablaEntradaNumerosAleatorios(tablaEntrada);
      onRefresh();
     //setTablaEntrada(tabla);
    }

      function inicializarTabla(){
        crearTablaEntrada();
        setBanderaEntrada(true);
      }
      
      function crearTablaEntrada(){
        let tablaEntrada = [];
        for (let index = 0; index < cantidadCeldas; index++) {
          tablaEntrada.push({proceso: index+1, solicita: "", libera: ""})
        }
        setTablaEntrada(tablaEntrada);
      }

   
 return (
  
    <View style={{backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center' }}>
  
        <SafeAreaView style={{top:20 ,flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'}}>
  
          <TextInput style={styles.input} onChangeText={(val)=>setCantidadCeldas(val)} placeholder="Cantidad de Celdas"/>
          
        <SafeAreaView style={{margin: 10} }>
          <Button style={{marginBottom: 20}} onPress={()=>inicializarTabla()} title={"Crear Celdas"} />
        </SafeAreaView>

        <SafeAreaView style={{margin: 10} }>
            {tableInputProcessesComponent()}
        </SafeAreaView>

        <SafeAreaView style={{margin: 10} }>
            {buttonGenerarAleatorios()}
        </SafeAreaView>

         </SafeAreaView>
  
      </View>
    );

}
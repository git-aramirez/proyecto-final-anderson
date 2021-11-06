import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View,SafeAreaView, ScrollView,Picker,Button,TextInput} from 'react-native';
import TableInputProccessesComponent from './TableInputProccessesComponent';
import MemoryCellsComponent from './MemoryCellsComponent';
import * as main from '../scripts_ea/Main';

export default function IndexEa() {

  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);
  const [tablaEntrada, setTablaEntrada] = useState([]);
  const [cantidadCeldas, setCantidadCeldas] = useState(0);
  const [banderaEntrada,setBanderaEntrada] = useState(false);
  const [banderaSalida,setBanderaSalida] = useState(false);
  const [celdasMemoria, setCeldasMemoria] = useState([]);
  const [itemAjusteHuecos,setItemAjusteHuecos] = useState("Primer Ajuste");
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
          return(<TableInputProccessesComponent height={cantidadCeldas} tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />);
        }
        return(<></>);
    }

    function buttonGenerarAleatorios (){
      if(banderaEntrada){
        return(<Button onPress={()=>inicializarTablaEntradaNumerosAleatorios()} title={"Generar Aleatorios"} />);
      }
  
      return(<></>);
    }


    function buttonEjecutarAlgoritmo (){
      if(banderaEntrada){
        return(<Button onPress={()=>iniciarAlgoritmo()} title={"Ejecutar Algortimo"} />);
      }
  
      return(<></>);
    }

    function memoryCellsComponent (){
      if(banderaSalida){
        return( <MemoryCellsComponent celdasMemoria={celdasMemoria}/>);
      }
  
      return(<></>);
    }

    function pickerAjusteHuecos(){
      if(banderaEntrada){
      return (
      <Picker selectedValue={itemAjusteHuecos} onValueChange={(itemValue, itemIndex) => setItemAjusteHuecos(itemValue)}>
      <Picker.Item label={"Primer Ajuste"}  value={"Primer Ajuste"}/>
      <Picker.Item label={"Mejor Ajuste"}  value={"Mejor Ajuste"}/>
      <Picker.Item label={"Peor Ajuste"}  value={"Peor Ajuste"}/>
    </Picker>);}
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
          tablaEntrada.push({proceso: "S"+(index+1), solicita: "", libera: ""})
        }
        setTablaEntrada(tablaEntrada);
      }

      function inicializarCeldasMemoria(listaSalida){
        let celdasMemoria = [];
        for (let i = 0; i < listaSalida.length; i++) {
          celdasMemoria.push({celdas:listaSalida[i]});
        }
        setCeldasMemoria(celdasMemoria);
        setBanderaSalida(true);
      }

      function iniciarAlgoritmo (){
        alert(itemAjusteHuecos);
        let listaSalida = main.ejecutarAlgoritmo(itemAjusteHuecos,tablaEntrada);
        alert(listaSalida);
        inicializarCeldasMemoria(listaSalida);
      
      }
   
 return (
  
    <View style={{backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center' }}>
  
        <SafeAreaView style={{top:20 ,flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'}}>
  
          <TextInput style={styles.input} onChangeText={(val)=>setCantidadCeldas(val)} placeholder="Cantidad de Celdas"/>
          
        <SafeAreaView style={{margin: 10} }>
          <Button style={{marginBottom: 20}} onPress={()=>inicializarTabla()} title={"Crear Solicitudes"} />
        </SafeAreaView>

        <SafeAreaView style={{margin: 10} }>
            {tableInputProcessesComponent()}
        </SafeAreaView>

        <SafeAreaView style={{margin: 10} }>
            {buttonGenerarAleatorios()}
        </SafeAreaView>
        
        <View style={{margin: 10}}>
          {pickerAjusteHuecos()}
        </View>
        
        <SafeAreaView style={{margin: 10} }>
            {buttonEjecutarAlgoritmo()}
        </SafeAreaView>

        <SafeAreaView style={{margin: 10} }>
            {memoryCellsComponent()}
        </SafeAreaView>

         </SafeAreaView>
  
      </View>
    );

}
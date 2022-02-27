import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View, ScrollView,Picker,Button,TextInput,TouchableOpacity,Text} from 'react-native';
import TableInputProccessesComponent from './TableInputProccessesComponent';
import MemoryCellsComponent from './MemoryCellsComponent';
import * as main from '../scripts_ea/main';

export default function IndexEa() {

  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);
  const [tablaEntrada, setTablaEntrada] = useState([]);
  const [cantidadCeldas, setCantidadCeldas] = useState(0);
  const [banderaEntrada,setBanderaEntrada] = useState(false);
  const [banderaSalida,setBanderaSalida] = useState(false);
  const [celdasMemoria, setCeldasMemoria] = useState([]);
  const [itemAjustes,setItemAjustes] = useState("Primer Ajuste");
  const [itemAlgoritmoAjuste,setItemAlgoritmoAjuste] = useState("Ajuste Sobre Huecos");
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
          return(
          <ScrollView style={{paddingVertical: 5,marginRight: 50}}>
            <TableInputProccessesComponent height={cantidadCeldas} tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />
          </ScrollView>
          );
        }
        return(<></>);
    }

    function buttonGenerarAleatorios (){
      if(banderaEntrada){
        return(
        <TouchableOpacity style={{marginLeft:20, width: 200, height: 40, backgroundColor: '#EDAF0A',padding:10,alignItems: 'center',borderRadius: 5}}onPress={()=>inicializarTablaEntradaNumerosAleatorios()} >
          <Text style={{color:'white', fontSize: 17}}>Generar Aleatorios</Text>
        </TouchableOpacity>);  
      }
  
      return(<></>);
    }


    function buttonEjecutarAlgoritmo (){
      if(banderaEntrada){
        return(
        <TouchableOpacity style={{marginLeft:20, width: 200, height: 40, backgroundColor: 'green',padding:10,alignItems: 'center',borderRadius: 5}}onPress={()=>iniciarAlgoritmo(false)} >
          <Text style={{color:'white', fontSize: 17}}>Ejecutar Algortimo</Text>
        </TouchableOpacity>);
      }
  
      return(<></>);
    }

    function buttonEjecutarAlgoritmoPasoAPaso (){
      if(banderaEntrada){
        return(
        <TouchableOpacity style={{marginLeft:20, width: 200, height: 40, backgroundColor: 'green',padding:10,alignItems: 'center',borderRadius: 5}}onPress={()=>iniciarAlgoritmo(true)} >
          <Text style={{color:'white', fontSize: 17}}>Ejecutar x Pasos</Text>
        </TouchableOpacity>);
      }
  
      return(<></>);
    }

    function memoryCellsComponent (){
      if(banderaSalida){
        return( 
        <ScrollView style={{paddingVertical: 20, marginLeft: 100}}>
          <MemoryCellsComponent celdasMemoria={celdasMemoria}/>
        </ScrollView>
        
        );
      }
  
      return(<></>);
    }

    function pickerAjustes(){
      if(banderaEntrada){
      return (
      <Picker style={{marginLeft:20}} selectedValue={itemAjustes} onValueChange={(itemValue, itemIndex) => setItemAjustes(itemValue)}>
      <Picker.Item label={"Primer Ajuste"}  value={"Primer Ajuste"}/>
      <Picker.Item label={"Mejor Ajuste"}  value={"Mejor Ajuste"}/>
      <Picker.Item label={"Peor Ajuste"}  value={"Peor Ajuste"}/>
    </Picker>);}
      return(<></>);
    }

    function pickerAlgoritmoAjuste(){
      if(banderaEntrada){
      return (
      <Picker style={{marginLeft:20}} selectedValue={itemAlgoritmoAjuste} onValueChange={(itemValue, itemIndex) => setItemAlgoritmoAjuste(itemValue)}>
      <Picker.Item label={"Ajuste Sobre Huecos"}  value={"Ajuste Sobre Huecos"}/>
      <Picker.Item label={"Ajuste Sobre Solicitudes"}  value={"Ajuste Sobre Solicitudes"}/>
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
          let colums = [];
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

      function iniciarAlgoritmo (isPasoAPaso){
        let listaSalida;
        if(itemAlgoritmoAjuste === "Ajuste Sobre Solicitudes"){
           listaSalida = main.ejecutarAlgoritmoAjusteSolicitudes(tablaEntrada);
        }else{
           listaSalida = main.ejecutarAlgoritmo(itemAlgoritmoAjuste,tablaEntrada,isPasoAPaso);
        }
        inicializarCeldasMemoria(listaSalida);
      }
   
 return (
    <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center' }}>


          <View style={{end:5 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
            <TextInput style={styles.input} onChangeText={(val)=>setCantidadCeldas(val)} placeholder="Cantidad de Celdas"/>
              <TouchableOpacity style={{marginLeft:20, width: 200, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>inicializarTabla()} >
                <Text style={{color:'white', fontSize: 17}}>Crear Solicitudes</Text>
              </TouchableOpacity>
          </View>

         <View style={{end:20 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
              {pickerAjustes()}
              {pickerAlgoritmoAjuste()}
              {buttonGenerarAleatorios()}
              {buttonEjecutarAlgoritmo()}
              {buttonEjecutarAlgoritmoPasoAPaso()}
          </View>

          <View  style={{top:20 ,flex: 2,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
             {tableInputProcessesComponent()}
             {memoryCellsComponent()}
          </View>

      </View>
    );
}
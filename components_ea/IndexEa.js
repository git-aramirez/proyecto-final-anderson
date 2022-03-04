import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View, ScrollView,Picker,Button,TextInput,TouchableOpacity,Text} from 'react-native';
import TableInputProccessesComponent from './TableInputProccessesComponent';
import MemoryCellsComponent from './MemoryCellsComponent';
import * as main from '../scripts_ea/main';
import Speaker from '../components_drawer/Speaker';

export default function IndexEa(props) {

  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);
  const [tablaEntrada, setTablaEntrada] = useState([]);
  const [cantidadCeldas, setCantidadCeldas] = useState(0);
  const [banderaEntrada,setBanderaEntrada] = useState(false);
  const [banderaSalida,setBanderaSalida] = useState(false);
  const [celdasMemoria, setCeldasMemoria] = useState([]);
  const [itemAjustes,setItemAjustes] = useState("Primer Ajuste");
  const [itemAlgoritmoAjuste,setItemAlgoritmoAjuste] = useState("Ajuste Sobre Huecos");

  const [listaProcesos, setListaProcesos] = useState("");
  const [listaRequerimientos, setListaRequerimientos] = useState([]);

  const [parrafoActivo, setParrafoActivo] = React.useState(true);
  const [bottonReproducirActivo, setBottonReproducirActivo] = React.useState(true);
  const [resultadoComponentActivo, setResultadoComponentActivo] = React.useState(true);
  const [parrafoResultado, setparrafoResultado] = useState("");

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
          <ScrollView style={{paddingVertical: 5,top: 100,marginRight: 50}}>
            <TableInputProccessesComponent  listaProcesos={listaProcesos}  listaRequerimientos={listaRequerimientos} setListaProcesos={setListaProcesos} setListaRequerimientos={setListaRequerimientos}/>
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
        <ScrollView style={{paddingVertical: 20, marginLeft: 100, top: 70}}>
          <MemoryCellsComponent celdasMemoria={celdasMemoria}/>
        </ScrollView>
        
        );
      }
  
      return(<></>);
    }

    function parrafoResultadoComponent(){
      if(parrafoActivo){
        return(<TextInput style={styles.item_resultado} multiline={true} numberOfLines={8} value={parrafoResultado}/>);
      } 

    return(<></>);
    }

    function bottonReproducirComponent(){
      if(bottonReproducirActivo){
        return(
        <TouchableOpacity  style={{marginTop:15, width: 160, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=> Speaker(array)}>
          <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
        </TouchableOpacity>);
      }   

    return(<></>);
    }

    function resultadoComponent(){
        if(resultadoComponentActivo && banderaSalida){
          return( 
          <View style={{top:270,width: '70%',height:200,alignItems: 'center',flexDirection: 'column'}}>
            {parrafoResultadoComponent()}
            {bottonReproducirComponent()}
          </View>
        );
      }
  
      return(<></>);
    }
    

    function pickerAjustes(){
      if(banderaEntrada){
      return (
      <Picker style={{marginLeft:20, height: 40, fontSize:20}} selectedValue={itemAjustes} onValueChange={(itemValue, itemIndex) => setItemAjustes(itemValue)}>
      <Picker.Item label={"Primer Ajuste"}  value={"Primer Ajuste"}/>
      <Picker.Item label={"Mejor Ajuste"}  value={"Mejor Ajuste"}/>
      <Picker.Item label={"Peor Ajuste"}  value={"Peor Ajuste"}/>
    </Picker>);}
      return(<></>);
    }

    function cambiarItemAlgoritmosAjustes(itemValue){
      setItemAlgoritmoAjuste(itemValue);
      main.inicializarVariables();
      setCeldasMemoria([]);
    }

    function pickerAlgoritmoAjuste(){
      if(banderaEntrada){
      return (
      <Picker style={{marginLeft:20 , height: 40, fontSize:20}} selectedValue={itemAlgoritmoAjuste} onValueChange={(itemValue, itemIndex) => cambiarItemAlgoritmosAjustes(itemValue)}>
        <Picker.Item label={"Ajuste Sobre Huecos"}  value={"Ajuste Sobre Huecos"}/>
        <Picker.Item label={"Ajuste Sobre Solicitudes"}  value={"Ajuste Sobre Solicitudes"}/>
      </Picker>);}
      return(<></>);
    }

    function inicializarTablaEntradaNumerosAleatorios(){
      let procesos = "";
      main.inicializarTablaEntradaNumerosAleatorios(tablaEntrada);
      procesos = main.inicializarListasAleatorias(listaProcesos,listaRequerimientos,tablaEntrada);
      setListaProcesos(procesos);
      onRefresh();
    }

      function inicializarTabla(){
        if(cantidadCeldas>15){
          alert("Por favor NO ingreses más de 15 solicitudes")
        }else{
          crearTablaEntrada();
          setBanderaEntrada(true);
        }
        
      }
      
      function crearTablaEntrada(){
        let listaProcesos ="";
        let listaRequerimientos = [];
        let tablaEntrada = [];
        for (let index = 0; index < cantidadCeldas; index++) {

          if(index==cantidadCeldas-1){
            listaProcesos+=("S"+(index+1));
          }else{
            listaProcesos+=("S"+(index+1)+"\n");
          }
          listaRequerimientos.push("Solicitar 1");
          tablaEntrada.push({proceso: "S"+(index+1), solicita: "", libera: ""});
        }
        setListaProcesos(listaProcesos);
        setListaRequerimientos(listaRequerimientos);
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
        main.inicializarTablaEntrada(listaProcesos,listaRequerimientos,tablaEntrada);

        if(itemAlgoritmoAjuste === "Ajuste Sobre Solicitudes"){
           listaSalida = main.ejecutarAlgoritmoAjusteSolicitudes(itemAjustes,tablaEntrada,isPasoAPaso);
           setparrafoResultado(listaSalida[1]);
        }else{
           listaSalida = main.ejecutarAlgoritmoAjusteHuecos(itemAjustes,tablaEntrada,isPasoAPaso);
           setparrafoResultado(listaSalida[1]);
        }

        if(listaSalida[1]===""){
          setResultadoComponentActivo(false);
        }else{
          setResultadoComponentActivo(true);
        }

        inicializarCeldasMemoria(listaSalida[0]);
      }
   
 return (
    <View style={{width: `100%` ,height: `100%`,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',flexDirection: 'column'}}>

          <View style={{top:10, alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
            <TextInput style={styles.input} onChangeText={(val)=>setCantidadCeldas(val)} placeholder="Cantidad de Celdas"/>
              <TouchableOpacity style={{marginLeft:20, width: 200, height: 40, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=>inicializarTabla()} >
                <Text style={{color:'white', fontSize: 17}}>Crear Solicitudes</Text>
              </TouchableOpacity>
          </View>

         <View style={{top:20 ,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
              {pickerAjustes()}
              {pickerAlgoritmoAjuste()}
              {buttonGenerarAleatorios()}
              {buttonEjecutarAlgoritmo()}
              {buttonEjecutarAlgoritmoPasoAPaso()}
          </View>

          <View  style={{top:50 ,flex:1, alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
             {tableInputProcessesComponent()}
             {memoryCellsComponent()}
          </View>

         {resultadoComponent()}
      </View>
    );
}
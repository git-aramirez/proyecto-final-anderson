import React , {useState} from 'react';
import {styles} from '../styles/styles';
import {View, ScrollView,Picker,TextInput, Button,TouchableOpacity,Text} from 'react-native';
import TableInputThreadsComponent from './TableInputThreadsComponent';
import * as main from '../scripts_cp/Main';
import {Speaker,Pause} from '../components_drawer/Speaker';

export default function IndexCp() {

  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing] = React.useState(false);
  const [textSalida, setTextSalida] = useState("");
  const [textHilosBloqueados, setTextHilosBloqueados] = useState("");
  const [tablaEntrada, setTablaEntrada] = useState([]);
  const [textoFinal,setTextoFinal] = useState("");

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
    return(<TableInputThreadsComponent  height={220} tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />);
}

function  crearTablaEntrada (){
    setTablaEntrada({Hilo_1 : "", Hilo_2: "", Hilo_3: "", Hilo_4: "", Hilo_5: ""});
  }

  function generarSemaforosAleatorios(){
   var matrizEntrada= main.generarAleatorios(tablaEntrada);
   setTablaEntrada({Hilo_1:matrizEntrada[0], Hilo_2:matrizEntrada[1], Hilo_3:matrizEntrada[2], Hilo_4:matrizEntrada[3] ,Hilo_5: matrizEntrada[4]});
  }

  function ejecutarAlgoritmo(){
    let tablaEntradaValida = main.validarTablaEntrada(tablaEntrada);
    if(!tablaEntradaValida){
      return alert("Ingrese al menos un valor en la tabla de entrada !")
    }

    let resultado =  main.ejecutar(tablaEntrada);
    setTextSalida(resultado[0]);
    setTextHilosBloqueados(resultado[1]);
    let salida = main.editarTextoSalida(textSalida,textHilosBloqueados);
    setTextoFinal(salida);
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
        <TextInput style={styles.textInput_salida_cp} 
        onChangeText={(text) => setTextSalida(text)} placeholder="Salida" value={textSalida}/>
      );
  }

  function textAreaHilosBloqueadosComponent(){
      return (
        <TextInput style={styles.textInput_hilos_bloqueados_sp} 
        onChangeText={(text) => setTextHilosBloqueados(text)} placeholder="Hilos Bloqueados" value={textHilosBloqueados}/>
      );
  }

  function resultado(){
    return(
      <View style={{marginTop:30,width: '90%', height:350,backgroundColor: '#fff',alignItems: 'center',flexDirection: 'column'}}>
        <TextInput style={styles.item_resultado_cp} multiline={true} numberOfLines={8} value={textoFinal}/>
        <View style={{height:100,width:'90%',marginTop: 20,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
          <TouchableOpacity  style={{ width: '20%', height: 45, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}} onPress={()=> Speaker(textoFinal)}>
            <Text style={{color:'white', fontSize: 17}}>Reproducir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:20, width: '20%', height: 45, backgroundColor: 'red',padding:10,alignItems: 'center',borderRadius: 5}} onPress= { ()=> Pause()}>
            <Text style={{color:'white', fontSize: 17}}>Parar</Text>
          </TouchableOpacity>
        </View>
      </View>
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

        {resultado()}
    </View>
    );
}
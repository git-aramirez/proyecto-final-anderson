import { View,TextInput,Text} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';
import React from 'react';

const TableInputComponent = (props) => {

  const tablaEntrada = props.tablaEntrada;

  function updateListaPrioridad (index,property,value){
    let nuevaLista = [...tablaEntrada];
    nuevaLista[index][property]=value;
    props.setTablaEntrada(nuevaLista);
  }

  function updateLista (index,property,value){
    if (/^\d+$/.test(value) || value==="" && !value.includes("-")) {
    let nuevaLista = [...tablaEntrada];
    nuevaLista[index][property]=value;
    props.setTablaEntrada(nuevaLista);
    }
  }

      return(
        <View style={{width:600,height:props.height, top:90}}>
          <Text style={{fontSize: 15, justifyContent:'center',marginBottom:30,marginTop:10,fontWeight:'bold',fontStyle: 'italic'}}>Tabla de Entrada</Text>
          <DataTable  id="tabla">
            <DataTable.Header>
              <DataTable.Title ><Text style={{fontSize: 15}}>pid</Text></DataTable.Title>
              <DataTable.Title ><Text style={{fontSize: 15}}>T-Llegada</Text></DataTable.Title>
              <DataTable.Title ><Text style={{fontSize: 15}}>T-Ejecucion</Text></DataTable.Title>
              <DataTable.Title style={{display: props.isPrioridad}} ><Text style={{fontSize: 15}}>Prioridad</Text></DataTable.Title>
              <DataTable.Title ><Text style={{fontSize: 15}}>Rafaga de E/S</Text></DataTable.Title>
            </DataTable.Header>
        
           {tablaEntrada.map((row,index) => (
            <DataTable.Row>
              <DataTable.Cell ><Text style={{fontSize: 15}}>{row.pid}</Text></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.t_llegada} onChangeText={(data)=>updateLista(index,"t_llegada",data)} style={styles.inputTable} keyboardType="numeric"/></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.t_ejecucion} onChangeText={(data)=>updateLista(index,"t_ejecucion",data)} style={styles.inputTable} keyboardType="numeric"/></DataTable.Cell>
              <DataTable.Cell style={{display: props.isPrioridad}} ><TextInput value={""+row.prioridad} onChangeText={(data)=>updateListaPrioridad(index,"prioridad",data)} style={{ textAlign: 'center',fontSize: 15,width: 30,height:20}}/></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.rafaga_es} onChangeText={(data)=>updateLista(index,"rafaga_es",data)} style={styles.inputTable} keyboardType="numeric"/></DataTable.Cell>
            </DataTable.Row>
            ))}
          </DataTable > 
        </View>   
      );   
}


export default TableInputComponent;
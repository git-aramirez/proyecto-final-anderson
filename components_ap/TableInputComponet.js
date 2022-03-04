import { View,TextInput,Text} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';
import React from 'react';

const TableInputComponent = (props) => {

  const tablaEntrada = props.tablaEntrada;

  function cellPrioridadComponent(){

  }

  function updateLista (index,property,value){
    let nuevaLista = [...tablaEntrada];
    nuevaLista[index][property]=value;
    props.setTablaEntrada(nuevaLista);
  }

      return(
        <View style={{width:600,height:props.height, top:90}}>
          <DataTable id="tabla">
            <DataTable.Header>
              <DataTable.Title ><Text style={{fontSize: 20}}>pid</Text></DataTable.Title>
              <DataTable.Title ><Text style={{fontSize: 20}}>T-Llegada</Text></DataTable.Title>
              <DataTable.Title ><Text style={{fontSize: 20}}>T-Ejecucion</Text></DataTable.Title>
              <DataTable.Title style={{display: props.isPrioridad}} ><Text style={{fontSize: 20}}>Prioridad</Text></DataTable.Title>
              <DataTable.Title ><Text style={{fontSize: 20}}>Rafaga de E/S</Text></DataTable.Title>
            </DataTable.Header>
        
           {tablaEntrada.map((row,index) => (
            <DataTable.Row>
              <DataTable.Cell ><Text style={{fontSize: 20}}>{row.pid}</Text></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.t_llegada} onChangeText={(data)=>updateLista(index,"t_llegada",data)} style={styles.inputTable}/></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.t_ejecucion} onChangeText={(data)=>updateLista(index,"t_ejecucion",data)} style={styles.inputTable}/></DataTable.Cell>
              <DataTable.Cell style={{display: props.isPrioridad}} ><TextInput value={row.prioridad} onChangeText={(data)=>updateLista(index,"prioridad",data)} style={styles.inputTable}/></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.rafaga_es} onChangeText={(data)=>updateLista(index,"rafaga_es",data)} style={styles.inputTable}/></DataTable.Cell>
            </DataTable.Row>
            ))}
          </DataTable > 
        </View>   
      );   
}


export default TableInputComponent;
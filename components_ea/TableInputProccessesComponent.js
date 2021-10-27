import React, { Component,useState } from 'react';
import { View,TextInput} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';
import ReactDOM from 'react-dom';

const TableInputProccessesComponent = (props) => {

  const tablaEntrada = props.tablaEntrada;

  function updateLista (index,property,value){
    let nuevaLista = [...tablaEntrada];
    nuevaLista[index][property]=value;
    props.setTablaEntrada(nuevaLista);
  }

      return(
        <View style={{ width:200 ,height:props.height}}>
          <DataTable id="tabla">
            <DataTable.Header>
              <DataTable.Title >proceso</DataTable.Title>
              <DataTable.Title >solicita</DataTable.Title>
              <DataTable.Title >libera</DataTable.Title>
              
            </DataTable.Header>
        
           {tablaEntrada.map((row,index) => (
            <DataTable.Row>
              <DataTable.Cell ><TextInput value={row.proceso} onChangeText={(data)=>updateLista(index,"proceso",data)} style={styles.inputTable}/></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.solicita} onChangeText={(data)=>updateLista(index,"solicita",data)} style={styles.inputTable}/></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.libera} onChangeText={(data)=>updateLista(index,"libera",data)} style={styles.inputTable}/></DataTable.Cell>
            </DataTable.Row>
            ))}
          </DataTable > 
        </View>   
      );   
}


export default TableInputProccessesComponent;
import React, { Component,useState } from 'react';
import { View,TextInput} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';
import ReactDOM from 'react-dom';
import * as main from '../scripts_sp/Main';

const TableInputThreadsComponent = (props) => {

  const tablaEntrada = props.tablaEntrada;

  function updateLista (index,property,value){
    let nuevaLista = [...tablaEntrada];
    nuevaLista[index][property]=value;
    props.setTablaEntrada(nuevaLista);
  }

      return(
        <View style={{ width:1000,height:props.height}}>
          <DataTable id="tabla">
            <DataTable.Header>
              <DataTable.Title >Hilo 1</DataTable.Title>
              <DataTable.Title >Hilo 2</DataTable.Title>
              <DataTable.Title >Hilo 3</DataTable.Title>
              <DataTable.Title >Hilo 4</DataTable.Title>
              <DataTable.Title >Hilo 5</DataTable.Title>
              
            </DataTable.Header>
        
           {tablaEntrada.map((row,index) => (
            <DataTable.Row >
              <DataTable.Cell><TextInput value={row.Hilo_1} onChangeText={(data)=>updateLista(index,"Hilo_1",data)} style={styles.textInput_table_sp}/></DataTable.Cell>
              <DataTable.Cell><TextInput value={row.Hilo_2} onChangeText={(data)=>updateLista(index,"Hilo_2",data)} style={styles.textInput_table_sp}/></DataTable.Cell>
              <DataTable.Cell><TextInput value={row.Hilo_3} onChangeText={(data)=>updateLista(index,"Hilo_3",data)} style={styles.textInput_table_sp}/></DataTable.Cell>
              <DataTable.Cell><TextInput value={row.Hilo_4} onChangeText={(data)=>updateLista(index,"Hilo_4",data)} style={styles.textInput_table_sp}/></DataTable.Cell>
              <DataTable.Cell><TextInput value={row.Hilo_5} onChangeText={(data)=>updateLista(index,"Hilo_5",data)} style={styles.textInput_table_sp}/></DataTable.Cell>
            </DataTable.Row>
            ))}
          </DataTable > 
        </View>   
      );   
}


export default TableInputThreadsComponent;
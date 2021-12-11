import React, { Component,useState } from 'react';
import { View,TextInput} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';
import ReactDOM from 'react-dom';

const MemoryCellsComponent = (props) => {

  const celdasMemoria = props.celdasMemoria;

  return(
    <View style={styles.container_table}>
      <DataTable id="celdas_memoria">
        <DataTable.Header>
          <DataTable.Title>celdas</DataTable.Title>
          
        </DataTable.Header>
    
       {celdasMemoria.map((row) => (
        <DataTable.Row>
          <DataTable.Cell>{row.celdas}</DataTable.Cell>
        </DataTable.Row>
        ))}
      </DataTable > 
    </View>   
  );  
}


export default MemoryCellsComponent
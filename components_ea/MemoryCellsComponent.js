import React, { Component,useState } from 'react';
import { View,TextInput, Text} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';
import ReactDOM from 'react-dom';

const MemoryCellsComponent = (props) => {

  const celdasMemoria = props.celdasMemoria;

  return(
    <View style={styles.container_table}>
       <Text style={{fontSize: 15, justifyContent:'center',marginLeft:40,marginBottom:20 ,fontWeight:'bold',fontStyle: 'italic'}}>Celdas de memoria</Text>
      <DataTable id="celdas_memoria">
        <DataTable.Header>
          <DataTable.Title style={{justifyContent: 'center'}}><Text style={{fontSize: 13}}>index</Text></DataTable.Title>
          <DataTable.Title style={{justifyContent: 'center'}}><Text style={{fontSize: 13}}>celdas</Text></DataTable.Title>
        </DataTable.Header>
    
       {celdasMemoria.map((row,index) => (
        <DataTable.Row>
          <DataTable.Cell style={{justifyContent: 'center'}}><Text style={{fontSize: 13}}>{index}</Text></DataTable.Cell>
          <DataTable.Cell style={{justifyContent: 'center'}}><Text style={{fontSize: 13}}>{row.celdas}</Text></DataTable.Cell>
        </DataTable.Row>
        ))}
      </DataTable > 
    </View>   
  );  
}


export default MemoryCellsComponent
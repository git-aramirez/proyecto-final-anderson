import { View,TextInput} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';
import React from 'react';

const TableOutComponent = (props) => {

  const tablaSalida = props.tablaSalida;

  return(
    <View style={{width:700,height:props.height, top:150}}>
      <DataTable id="tabla_salida">
        <DataTable.Header>
          <DataTable.Title>pid</DataTable.Title>
          <DataTable.Title>T-Salida</DataTable.Title>
          <DataTable.Title>T-Servicio</DataTable.Title>
          <DataTable.Title>T-Espera</DataTable.Title>
          <DataTable.Title>Indice de Servicio</DataTable.Title>
        </DataTable.Header>
    
       {tablaSalida.map((row) => (
        <DataTable.Row>
          <DataTable.Cell>{row.pid}</DataTable.Cell>
          <DataTable.Cell>{row.t_salida}</DataTable.Cell>
          <DataTable.Cell>{row.t_servicio}</DataTable.Cell>
          <DataTable.Cell>{row.t_espera}</DataTable.Cell>
          <DataTable.Cell>{row.indice_servicio}</DataTable.Cell>
        </DataTable.Row>
        ))}
      </DataTable > 
    </View>   
  );  
}


export default TableOutComponent;
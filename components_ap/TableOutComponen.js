import { View,TextInput,Text} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';
import React from 'react';

const TableOutComponent = (props) => {

  const tablaSalida = props.tablaSalida;

  return(
    <View style={{width:900,height:props.height, top:props.top}}>
      <Text style={{fontSize: 15, justifyContent:'center',marginBottom:30,marginTop:10,fontWeight:'bold',fontStyle: 'italic'}}>Tabla de Salida</Text>
      <DataTable id="tabla_salida">
        <DataTable.Header>
          <DataTable.Title><Text style={{fontSize: 15}}>pid</Text></DataTable.Title>
          <DataTable.Title><Text style={{fontSize: 15}}>T-Salida</Text></DataTable.Title>
          <DataTable.Title><Text style={{fontSize: 15}}>T-Servicio</Text></DataTable.Title>
          <DataTable.Title><Text style={{fontSize: 15}}>T-Espera</Text></DataTable.Title>
          <DataTable.Title><Text style={{fontSize: 15}}>Indice de Servicio</Text></DataTable.Title>
        </DataTable.Header>
    
       {tablaSalida.map((row) => (
        <DataTable.Row>
          <DataTable.Cell><Text style={{fontSize: 15}}>{row.pid}</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{fontSize: 15}}>{row.t_salida}</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{fontSize: 15}}>{row.t_servicio}</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{fontSize: 15}}>{row.t_espera}</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{fontSize: 15}}>{row.indice_servicio}</Text></DataTable.Cell>
        </DataTable.Row>
        ))}
      </DataTable > 
    </View>   
  );  
}


export default TableOutComponent;
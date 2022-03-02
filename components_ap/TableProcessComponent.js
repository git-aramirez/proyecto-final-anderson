import React from 'react';
import { View,Text,ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';

const TableProcessComponent = (props) => {

  const tablaStyles = props.tablaStyles;
  //style={{backgroundColor: '#4B53BC'}}

  function obtenerPID(i){
      return i!==tablaStyles.length? "pid "+i : "";
  }

  function obtenerDataTablaStyle(i,data){
    return i!==(tablaStyles.length-1) ? data==='#ED391E' : data;
  }

  function obtenerStyleProcess(i){
    return i!==(tablaStyles.length-1) ? '#FFFFFF' : '#000000';
  }

  return(
    <View style={{width:props.width,height:200, top: props.top}}>
        <DataTable>
        {tablaStyles.map((row,i) => (
          <DataTable.Row >
              <DataTable.Cell>{obtenerPID(i+1)}</DataTable.Cell>
              {row.map((data) => (
              <>
              <DataTable.Cell style={{ backgroundColor: data}}>
                <Text style={{color: obtenerStyleProcess(i)}}>{obtenerDataTablaStyle(i,data)}</Text>
              </DataTable.Cell>
              </>
              ))}
          </DataTable.Row>
          ))}
        </DataTable> 
    </View>   
  );  
}


export default TableProcessComponent;
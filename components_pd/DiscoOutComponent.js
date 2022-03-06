import React from 'react';
import { View,Text,ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';

const DiscoOutComponent = (props) => {

  const posicionDisco = props.posDisco;
  const discosGlobales = props.discosGlobales;
  const particiones = props.particiones;
  const items = ['Nombre del Disco: ','Tamaño del disco: ','Tipo del disco: '];
  

  return(
    <View style={{width:'100%',height:250,justifyContent: 'center',alignItems: 'center',flexDirection: 'column',borderWidth: 1 }}>

       <Text style={{fontSize:15}}> [ {items[0]} {discosGlobales[posicionDisco][0]} ]  [ {items[1]} {discosGlobales[posicionDisco][1]} ]  [ {items[2]} {discosGlobales[posicionDisco][2]} ]</Text>

        <DataTable style={{marginTop: 20}}>
          
        {particiones[posicionDisco].map((row,i) => (
         
          <DataTable.Row style={{backgroundColor: '#FEF4C9'}}>

              <DataTable.Cell>
                <Text style={{fontSize: 15}}>Nombre de la Partición {row[5]} </Text>
              </DataTable.Cell>

              <DataTable.Cell >
                <Text style={{fontSize: 15}}>Tipo de la partición: {row[4]} </Text>
              </DataTable.Cell>

              <DataTable.Cell >
                <Text style={{fontSize: 15}}>Tamaño de la partición: {row[1]}</Text>
              </DataTable.Cell>

          </DataTable.Row>
          ))}
        </DataTable> 
    </View>   
  );  
}


export default DiscoOutComponent;
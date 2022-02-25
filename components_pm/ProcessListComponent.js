
import React from "react";
import { Text, View } from 'react-native';
import { styles } from "./styles";
import { DataTable } from 'react-native-paper';

/**
 * Funcion que muestra la  una tabla de datos
 * @param {*} props array con los datos a mostrar
 * @returns Tabla con los datos visualizados
 */
function ProcessList(props) {

  // Array de datos a mostrar en la tabla
  let array = props.procesos;
        
  return(

    <View
    style={{
        flexDirection: 'row',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: 1,
        width:150 
      }}>

        <DataTable id="tabla_salida" style={{flexDirection: 'column'}}>
          <DataTable.Header style={{width:150}}>
            <DataTable.Title >Pagina</DataTable.Title>
            <DataTable.Title>Memoria</DataTable.Title>
          </DataTable.Header>
          {array.map((row, index) => (
            <DataTable.Row style={{width:150, height: 40,minHeight: '40%' }}> 
              <DataTable.Cell style={{width:75, height: 50}}>{index+1}</DataTable.Cell>
              <DataTable.Cell style={{width:75,height: 50 , flexDirection: 'column'}}>
                <View style={{flexDirection: 'column', margin: 0}}>
                  {array[0].map((row, index1) =>(
                      <Text style={styles.item}>{array[index][index1]}</Text>
                  ))}
                </View>
            </DataTable.Cell>
          </DataTable.Row>
          ))}
        </DataTable > 
    </View>

  );
    
}
export default ProcessList;
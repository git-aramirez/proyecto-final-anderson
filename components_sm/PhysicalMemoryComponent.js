
import React from "react";
import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { styles } from "./styles";

/**
 * Funcion que muestra la  una tabla de datos
 *
 * @param {*} props array con los datos a mostrar
 *
 * @returns Tabla con los datos visualizados
 */
function PhysicalMemory(props) {

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
          <DataTable.Row > 
            <DataTable.Cell>{index+1}</DataTable.Cell>
            <DataTable.Cell>
              <View style={{flexDirection: 'column', margin: 0, backgroundColor: array[index][1]}}>
                <Text >{array[index][0]}</Text>
              </View>
          </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable > 
    </View>
  );
}
export default PhysicalMemory;

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
    style={{top: 40,flexDirection: 'row',alignContent: "center",alignItems: "center",justifyContent: "center",padding: 1, right: 5 }}>
      <DataTable id="tabla_salida" style={{flexDirection: 'column'}}>
        <DataTable.Header style={{width:200}}>
          <DataTable.Title adjustsFontSizeToFit ><Text style={styles.item_tabla}>Página</Text></DataTable.Title>
          <DataTable.Title adjustsFontSizeToFit ><Text style={styles.item_tabla}>Memoria</Text></DataTable.Title>
        </DataTable.Header>
        {array.map((row, index) => (
          <DataTable.Row > 
            <DataTable.Cell>{index+1}</DataTable.Cell>
            <DataTable.Cell style={{width:100, flexDirection: 'column'}}>
              <View style={{flexDirection: 'column', margin: 0, backgroundColor: array[index][1]}}>
                <Text style={styles.item}>{array[index][0]}</Text>
              </View>
          </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable > 
    </View>
  );
}
export default PhysicalMemory;

import React from "react";
import { Text, View} from 'react-native';
import { styles } from "./styles";
import { DataTable } from 'react-native-paper';

/**
 * Funcion que muestra la  una tabla de datos
 *
 * @param {*} props array con los datos a mostrar
 *
 * @returns Tabla con los datos visualizados
 */
function ProcessList(props) {

  // Array de datos a mostrar en la tabla
    let array = props.procesos;
    let indices = props.indices;
    let tamaños = props.tamaños;
        
    return(

      <View style={{top: 40,flexDirection: 'row',alignContent: "center",alignItems: "center",justifyContent: "center",padding: 1,width:100 }}>
 
          <DataTable id="tabla_salida" style={{flexDirection: 'column'}}>
            <DataTable.Header style={{width:300}}>
              <DataTable.Title><Text style={styles.item_tabla}>Nombre</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.item_tabla}>Inicio</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.item_tabla}>Tamaño</Text></DataTable.Title>
            </DataTable.Header>
            {array.map((row, index) => (
            <DataTable.Row style={{width:300, height: array[index]*20, minHeight: '40%'}}> 
              <DataTable.Cell style={{height: array[index]*20 , flexDirection: 'column', alignContent: "center", alignItems: "center", justifyContent: "center"}}>
              <View style={{flexDirection: 'column', margin: 0}}>
                <Text style={styles.item,{height: array[index]}}>{array[index]}</Text>
              </View>
              </DataTable.Cell>
              <DataTable.Cell style={{height: 50, borderBottomWidth: 0, flexDirection: 'column', alignContent: "center", alignItems: "center", justifyContent: "center"}}>{parseInt(indices[index])}</DataTable.Cell>
              <DataTable.Cell style={{height: 50, borderBottomWidth: 0, flexDirection: 'column', alignContent: "center", alignItems: "center", justifyContent: "center"}}>{parseInt(tamaños[index])}</DataTable.Cell>
            </DataTable.Row>
            ))}
          </DataTable > 
      </View>

    );
    
}
export default ProcessList;
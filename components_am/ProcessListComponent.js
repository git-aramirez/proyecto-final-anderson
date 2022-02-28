
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
        
    return(

      <View style={{top: 40,flexDirection: 'row',alignContent: "center",alignItems: "center",justifyContent: "center",padding: 1,width:100 }}>
 
          <DataTable id="tabla_salida" style={{flexDirection: 'column'}}>
            <DataTable.Header style={{width:200}}>
              <DataTable.Title><Text style={styles.item_tabla}>Pagina</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.item_tabla}>Memoria</Text></DataTable.Title>
            </DataTable.Header>
        
            {array.map((row, index) => (
            <DataTable.Row style={{width:150, height: array[index]*20, minHeight: '40%'}}> 
              <DataTable.Cell style={{width:75, height: 50, borderBottomWidth: 0}}>{index+1}</DataTable.Cell>
              <DataTable.Cell style={{width:75,height: array[index]*20 , flexDirection: 'column'}}>
              <View style={{flexDirection: 'column', margin: 0}}>
                <Text style={styles.item}>{array[index]}</Text>
              </View>
              </DataTable.Cell>
            </DataTable.Row>
            ))}
          </DataTable > 
      </View>

    );
    
}
export default ProcessList;
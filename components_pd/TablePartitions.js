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
function TablePartitions(props) {

    // Array de datos a mostrar en la tabla
    let array = props.tabla;
        
    return(
        <View >
          <DataTable id="tabla_salida">
            <DataTable.Header>
              <DataTable.Title>Nombre Particion</DataTable.Title>
              <DataTable.Title>Tipo</DataTable.Title>
              <DataTable.Title>Tamaño</DataTable.Title>
              <DataTable.Title>Opciones</DataTable.Title>
            </DataTable.Header>
        
            {Object.keys(array).map(function(key, index) {
                console.log("map", array[key]);
                <DataTable.Row>
                    <DataTable.Cell>{array[key].nombreParticion}</DataTable.Cell>
                    <DataTable.Cell>{array[key]['tipoParticion']}</DataTable.Cell>
                    <DataTable.Cell>{array[key]['tamañoNuevo']}</DataTable.Cell>
                    <DataTable.Cell>{index}</DataTable.Cell>
                </DataTable.Row>
            })}
          </DataTable > 
        </View> 
    );
}
export default TablePartitions;
import { View,TextInput} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';

const TableInputComponent = (props) => {

  const tablaEntrada = props.tablaEntrada;

  function updateLista (index,property,value){
    let nuevaLista = [...tablaEntrada];
    nuevaLista[index][property]=value;
    props.setTablaEntrada(nuevaLista);
  }

      return(
        <View style={styles.container_table}>
          <DataTable id="tabla">
            <DataTable.Header>
              <DataTable.Title >pid</DataTable.Title>
              <DataTable.Title >T-Llegada</DataTable.Title>
              <DataTable.Title >T-Ejecucion</DataTable.Title>
              <DataTable.Title >Prioridad</DataTable.Title>
            </DataTable.Header>
        
           {tablaEntrada.map((row,index) => (
            <DataTable.Row>
              <DataTable.Cell >{row.pid}</DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.t_llegada} onChangeText={(data)=>updateLista(index,"t_llegada",data)} style={styles.inputTable}/></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.t_ejecucion} onChangeText={(data)=>updateLista(index,"t_ejecucion",data)} style={styles.inputTable}/></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.prioridad} onChangeText={(data)=>updateLista(index,"prioridad",data)} style={styles.inputTable}/></DataTable.Cell>
            </DataTable.Row>
            ))}
          </DataTable > 
        </View>   
      );   
}


export default TableInputComponent;
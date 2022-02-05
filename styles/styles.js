import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 8,
      borderWidth: 1,
      padding: 10,
      
    },
    inputTable:{
      width: 40,
      borderWidth: 1,
    },
    button_style: {
      marginBottom: 10
    },

    textInput_table_sp: {
      width: 150,
      height: 30,
      borderWidth: 1,
      textAlign: 'center'
    },

    textInput_semaforos_sp: {
      width: 400,
      height: 30,
      borderWidth: 1,
      textAlign: 'center'
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      
      },
      container_table: {
         width:350,
         height:200,
      },
      container_buttons: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        width:170,
        height:500,
      }, 
  });


import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  input: {
    width:'100%',
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    color:'black',
    fontSize: 17
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
    textAlign: 'center',
    color:'black',
    fontSize: 17
  },

  textInput_semaforos_sp: {
    width: 400,
    height: 30,
    borderWidth: 1,
    textAlign: 'center',
    color:'black',
    fontSize: 17
  },
  textInput_salida_sp: {
    width: 400,
    height: 30,
    borderWidth: 1,
    textAlign: 'center',
    marginLeft: 20,
    color:'black',
    fontSize: 17
  },
  item_resultado: {
    fontSize: 15,
    height: 200,
    width:'100%',
    borderColor: 'black',
    borderWidth: .25,
    textAlign: 'justify',
    padding: 5
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


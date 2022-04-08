import { StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';

export const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },

  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'black',
    fontSize: 17
  },

  input_tamanio_archivo: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'black',
    fontSize: 17
  },

  area: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },

  button: {
    backgroundColor: "blue",
    padding: 1,
    marginTop: 1,
    margin: 12,
    borderWidth: 1,
  },

  container_table: {
      width:600,
      height:200,
      
  },

  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 2,
    fontSize: 15,
    fontWeight: 'bold',
    width:85,
    height:25,
    marginEnd: 20,
    marginBottom: 7,
    marginTop: 10
  },

  item: {
    fontSize: 15,
    height: 30,
    width:50,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'black',
    flexDirection: 'column',
    borderWidth: .25,
    textAlign: 'center',
  },

  item_resultado: {
    fontSize: 15,
    height: 100,
    width:900,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'black',
    flexDirection: 'column',
    borderWidth: .25,
    textAlign: 'center',
    padding: 10
  },

  item_tabla: {
    fontSize: 16,
    height: 30,
    width:35,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    textAlign: 'center',
  },

  itemFatList: {
    fontSize: 30,
    height: 50,
    fontWeight: 'bold',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  item_input: {
    fontSize: 20,
    height: 170,
    width:160,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'black',
    flexDirection: 'column',
    borderWidth: .25,
    textAlign: 'center',
  },

  view: {
    flex: 1,
    flexDirection: 'row',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  }
});


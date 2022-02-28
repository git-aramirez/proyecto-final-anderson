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
    width: 150,
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
    fontSize: 9,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
    width:50,
    height:18,
  },
  item: {
    fontSize: 10,
    height: 12,
    width:30,
    fontWeight: 'bold',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'black',
    flexDirection: 'column',
    borderWidth: .25,
    textAlign: 'center',
    borderBottomWidth: 0
  },

  itemFatList: {
    fontSize: 30,
    height: 50,
    fontWeight: 'bold',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  view: {
    flex: 1,
    flexDirection: 'row',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  }
});


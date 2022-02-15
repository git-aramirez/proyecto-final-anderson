// In App.js in a new project
import * as React from 'react';
import IndexAp from '../components_ap/IndexAp';
import { View, Text , TouchableOpacity,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {styles} from '../styles/styles';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IndexEa from '../components_ea/IndexEa';
import IndexSp from '../components_sp/IndexSp';
import IndexPm from '../components_pm/IndexPm';
import IndexSm from '../components_sm/IndexSm';


function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,  backgroundColor: '#fff'}}>
      <Text style={{fontSize:20}}>Home Screen</Text>
      <TouchableOpacity 
      style={{marginTop:20, width: 200, height: 50, backgroundColor: 'blue',padding:10,alignItems: 'center',borderRadius: 5}}
      onPress={()=>props.navigation.navigate('Perfil')}>
          <Text style={{color:'white', fontSize: 20}}>Ir a perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

function AlgoritmosPlanificacionScreen() {
    return (<IndexAp/>);
}

function EstrategiaDeAjusteScreen() {
   return (<IndexEa/>);
  }

function SincronizacionDeProcesosScreen() {
 // IndexSp.crearTablaEntrada();
  return (<IndexSp/>);
}

function PaginacionDeMemoria() {
  return (<IndexPm/>);
}

function SegmentacionMemoria() {
  return (<IndexSm/>);
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
      <NavigationContainer style={{backgroundColor: '#fff'}}>
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Algoritmos de planificación" component={AlgoritmosPlanificacionScreen} />
            <Drawer.Screen name="Estrategias De Ajuste" component={EstrategiaDeAjusteScreen} />
            <Drawer.Screen name="Sincronización de Procesos" component={SincronizacionDeProcesosScreen} />
            <Drawer.Screen name="Paginación de Memoria" component={PaginacionDeMemoria} />
            <Drawer.Screen name="Segmentación de Memoria" component={SegmentacionMemoria} />
        </Drawer.Navigator>
      </NavigationContainer>      
  );
}

export default MyDrawer;
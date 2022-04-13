// In App.js in a new project
import  React , {useState} from 'react';
import { View, Text , TouchableOpacity,TextInput,CheckBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {styles} from '../styles/styles';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IndexAp from '../components_ap/IndexAp';
import IndexEa from '../components_ea/IndexEa';
import IndexSp from '../components_sp/IndexSp';
import IndexPm from '../components_pm/IndexPm';
import IndexSm from '../components_sm/IndexSm';
import IndexAm from '../components_am/IndexAm';
import IndexPd from '../components_pd/IndexPd';
import IndexCp from '../components_cp/IndexCp';
import * as Speech from 'expo-speech';

function HomeScreen(props) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,  backgroundColor: '#fff'}}>
      <Text style={{fontSize:35,textAlign: 'center'}}>Universidad del Quindío</Text>
      <Text style={{fontSize:20,marginTop:20}}>Armenia Quindío 09/03/2022</Text>
      <Text style={{fontSize:23, marginTop: 20}}>Infraestructura Computacional</Text>
      <Text style={{fontSize:22, marginTop: 40}}>Desarrolladores:</Text>
      <Text style={{fontSize:20,marginTop: 30}}>Kevin David Sanchez Solís</Text>
      <Text style={{fontSize:15}}>kdsanchezs@uqvirtual.edu.co</Text>
      <Text style={{fontSize:20}}>Anderson Ramírez Vásquez</Text>
      <Text style={{fontSize:15}}>aramirezv_1@uqvirtual.edu.co</Text>
      <Text style={{fontSize:15,marginTop: 20}}>Licencia: GNU GPL v3</Text>
    </View>
  );
}

function ComunicacionProcesos(){
  Speech.stop();
  return (<IndexCp/>);
}

function AlgoritmosPlanificacionScreen() {
    Speech.stop();
    return (<IndexAp/>);
}

function EstrategiaDeAjusteScreen() {
   Speech.stop();
   return (<IndexEa/>);
  }

function SincronizacionDeProcesosScreen() {
  Speech.stop();
  return (<IndexSp/>);
}

function PaginacionDeMemoria() {
  Speech.stop();
  return (<IndexPm/>);
}

function SegmentacionMemoria() {
  Speech.stop();
  return (<IndexSm/>);
}

function AsignacionMemoria() {
  Speech.stop();
  return (<IndexAm/>);
}

function ParticionesDisco() {
  Speech.stop();
  return (<IndexPd/>);
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
            <Drawer.Screen name="Comunicación entre procesos" component={ComunicacionProcesos} />
            <Drawer.Screen name="Paginación de Memoria" component={PaginacionDeMemoria} />
            <Drawer.Screen name="Segmentación de Memoria" component={SegmentacionMemoria} />
            <Drawer.Screen name="Asignación de Disco" component={AsignacionMemoria} />
            <Drawer.Screen name="Particiones de Disco" component={ParticionesDisco} />
        </Drawer.Navigator>
      </NavigationContainer>      
  );
}

export default MyDrawer;
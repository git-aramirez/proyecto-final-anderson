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

function HomeScreen(props) {

  const [estaParrafo, setEstaParrafo] = useState(false);
  const [estaReproducir, setEstaReproducir] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,  backgroundColor: '#fff'}}>
      <Text style={{fontSize:60}}>Infraestructura Computacional</Text>
      <Text style={{fontSize:40, marginTop: 40}}>Presentado Por :</Text>
      <Text style={{fontSize:30,marginTop: 30}}>Kevin David Sanchez Solís</Text>
      <Text style={{fontSize:20}}>kdsanchezs@uqvirtual.edu.co</Text>
      <Text style={{fontSize:30}}>Anderson Ramirez Vasquez</Text>
      <Text style={{fontSize:20}}>aramirezv_1@uqvirtual.edu.co</Text>

      <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 30}}>
        <CheckBox value={estaParrafo} onValueChange={setEstaParrafo} style={styles.checkbox}/>
        <Text style={{margin: 8}}>¿Parrafo Final Activo?</Text>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10}}>
        <CheckBox value={estaReproducir} onValueChange={setEstaReproducir} style={styles.checkbox}/>
        <Text style={{margin: 8}}>¿Botón de Reproducir Activo?</Text>
      </View>

    </View>
  );
}

function ComunicacionProcesos(){
  return (<IndexCp/>);
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

function AsignacionMemoria() {
  return (<IndexAm/>);
}

function ParticionesDisco() {
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
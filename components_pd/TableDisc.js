import React from 'react';
import { View,Text,ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../styles/styles';

const TableDisc = (props) => {

  const tablaStyles = props.tablaStyles;
  var posicionFinal = tablaStyles.length;
  //const tablaExtendida = ["disco",[["p","#DEDEDE",0.5]],0.3];
  const tablaExtendida = props.particionesExt;

  function obtenerWidthExtendida(){
    if(tablaExtendida[3]===undefined){
      return ((1000*0.3) - 20);
    }
    let indiceDeOcupación = tablaExtendida[3];
    return ((1000*indiceDeOcupación) - 20);
  }

  function obtenerHeightRow(){
    if(tablaExtendida.length>0){
      return 120;
    }

    return 60;
  }

  return(
    <View style={{width:'100%',height:'100%', top: 0}}>
      <ScrollView horizontal={true}  style={{ top: 0 ,width: '100%' ,height: '100%'}}  > 
        <DataTable style={{width:1000,height:200,borderWidth:1, justifyContent:'flex-start'}}>

      
          <DataTable.Row style={{borderBottomWidth:1,justifyContent:'flex-start'}}>
              <DataTable.Cell style={{justifyContent:'center',flex:1, backgroundColor: "#DEDEDE" ,borderWidth:0.5,flex:1}}>
                <Text style={{color: 'black',width:'100%'}}>{tablaStyles[0][0]}</Text>
              </DataTable.Cell>
          </DataTable.Row>

        
          <DataTable.Row style={{width:1000,borderBottomWidth:1,height:obtenerHeightRow()}}>
              {tablaStyles[1].map((data,j) => (
              <>
              <DataTable.Cell style={{justifyContent:'center',flex: tablaStyles[1][j][2], backgroundColor: tablaStyles[1][j][1],borderWidth:0.5}}>
                <Text style={{color: 'black',width:'100%'}}>{tablaStyles[1][j][0]}</Text>
              </DataTable.Cell>
              </>
              ))}
              
              {tablaExtendida[0].map(() => (
              <>
                <DataTable.Cell style={{flex: tablaExtendida[3],borderWidth:2}}>
                  <DataTable style={{flex:1, width: obtenerWidthExtendida(),height:110}}>

                    <DataTable.Row style={{width:'100%'}}>
                      <DataTable.Cell style={{justifyContent:'center',backgroundColor: "#DEDEDE" ,borderWidth:0.5}}>
                        <Text style={{color: 'black',width:'100%'}}>{tablaExtendida[0][0]}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={{width: '100%',borderBottomWidth:1}}>
                      {tablaExtendida[1].map((data_ec,l) => (
                      <>
                      <DataTable.Cell style={{justifyContent:'center',flex: tablaExtendida[1][l][2], backgroundColor: tablaExtendida[1][l][1],borderWidth:0.5}}>
                        <Text style={{color: 'black',width:'100%'}}>{tablaExtendida[1][l][0]}</Text>
                      </DataTable.Cell>
                      </>
                      ))}
                    </DataTable.Row>
                  </DataTable>
                </DataTable.Cell>
                
              </>
            ))}
              
          </DataTable.Row>
        </DataTable>
      </ScrollView> 
    </View>   
  );  
}


export default TableDisc;
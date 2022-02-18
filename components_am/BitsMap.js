import React from "react";
import { Text, View, SectionList } from 'react-native';
import { styles } from "./styles";

/**
 * Funcion que muestra la  una tabla de datos
 *
 * @param {*} props array con los datos a mostrar
 *
 * @returns Tabla con los datos visualizados
 */
function BitsMap(props) {

    // Array de datos a mostrar en la tabla
    let array = props.map;
        
    return(
        <View style={{
            flexDirection: 'row',
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
            }}>
                <SectionList 
                    sections={[
                        {title: 'Bloque 1', data: array[0]},
                        {title: 'Bloque 5', data: array[4]},
                        {title: 'Bloque 9', data: array[8]},
                        {title: 'Bloque 13', data: array[12]},
                        {title: 'Bloque 17', data: array[16]}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                <SectionList 
                    sections={[
                        {title: 'Bloque 2', data: array[1]},
                        {title: 'Bloque 6', data: array[5]},
                        {title: 'Bloque 10', data: array[9]},
                        {title: 'Bloque 14', data: array[13]},
                        {title: 'Bloque 18', data: array[17]}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                <SectionList  
                    sections={[
                        {title: 'Bloque 3', data: array[2]},
                        {title: 'Bloque 7', data: array[6]},
                        {title: 'Bloque 11', data: array[10]},
                        {title: 'Bloque 15', data: array[14]},
                        {title: 'Bloque 19', data: array[18]}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                <SectionList 
                    sections={[
                        {title: 'Bloque 4', data: array[3]},
                        {title: 'Bloque 8', data: array[7]},
                        {title: 'Bloque 12', data: array[11]},
                        {title: 'Bloque 16', data: array[15]},
                        {title: 'Bloque 20', data: array[19]}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
        </View>
    );
}
export default BitsMap;
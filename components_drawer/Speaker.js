import * as Speech from 'expo-speech';
import React from 'react';


/**
 * Metodo que permite pasar de texto a voz
 * @param {} texto Parametro en texto que se quiere reproducir
 */
const Speaker = (texto) =>{

    Speech.speak(texto, {
        voice: 'Microsoft Salome Online (Natural) - Spanish (Colombia)',
        language: 'es-CO',
        _voiceIndex: 81
    });

}
export default Speaker;

{/** Speaker como boton <ButtonA title="Press to hear some words" onPress={ ()=> Speaker("Texto si")}  /> */}

import React from 'react';
import {StyleSheet, Text, } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { colorPrimary, pFont600 } from '../../utils/utils';

const FormButton = ({title, onPress, contained, ...rest}) => {
    
    return (
        <TouchableOpacity style={contained ? styles.buttonContained : styles.button} onPress = {onPress} >
            <Text style={contained ? styles.buttonTextContained : styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        // color: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        borderWidth: 1,
        borderColor: colorPrimary,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: colorPrimary,
        textTransform: 'uppercase',
        fontFamily: pFont600,
    },
    buttonContained: {
        backgroundColor: '#890d0c',
        color: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    buttonTextContained: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: pFont600,
    },
})

export default FormButton;

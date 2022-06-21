
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { colorPrimary, pFont500, color3 } from '../../utils/utils';

const NavigationButton = ({title, onPress, active}) => {
    return (
        <TouchableOpacity style={styles.button} onPress = {onPress} >
            {active ? (
                <Text style={styles.buttonTextActive}>{title}</Text>
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
    buttonText: {
        fontSize: 16,
        color: color3,
        fontFamily: pFont500,
        letterSpacing: 1,
    },
    buttonTextActive: {
        fontSize: 24,
        color: colorPrimary,
        fontFamily: pFont500,
        letterSpacing: 1,
    },
})

export default NavigationButton;
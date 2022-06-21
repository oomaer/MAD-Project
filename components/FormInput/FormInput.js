
import React from 'react';
import { TextInput, StyleSheet } from "react-native";
import { color2 } from '../../utils/utils';

const FormInput = ({value, placeholder, ...rest}) => {
    return(
        <TextInput style={styles.textInput} placeholder={placeholder} value={value} {...rest} />
    )
}

const styles = StyleSheet.create({
    textInput: {
        padding: 5,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: color2,
        width: '100%',
        color: color2,
        fontFamily: 'Montserrat-Regular',
        letterSpacing: 1,
    }
})


export default FormInput;

import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { pFont500, color2, primaryFont, color5, color6 } from '../../utils/utils'
import Icon from 'react-native-vector-icons/Ionicons'

const UploadsButton = ({title, iconName, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress = {onPress}>
            <Icon name = {iconName} size = {20} color = {color2} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default UploadsButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: color6,
    },
    title: {
        fontSize: 16,
        fontFamily: primaryFont,
        color: color2,
        marginLeft: 8,
    }
})
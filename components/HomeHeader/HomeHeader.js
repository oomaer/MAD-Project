
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color2, colorPrimary, logoFont, pFont500, pFont700, pFont800, windowWidth } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const HomeHeader = ({}) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.logo}>RACK</Text>
            <TouchableOpacity style = {styles.profile} onPress = {() => {
                                                auth()
                                                .signOut()
                                                .then(() => console.log('User signed out!'))}}>
                <Icon name="ios-exit-outline" size={24} color={color2} />
            </TouchableOpacity>
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    logo: {
        fontSize: 28,
        fontFamily: logoFont,
        color: color2,
        // fontWeight: '800',
    },


})
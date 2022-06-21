
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { color2, color3, pFont500, primaryFont } from '../../utils/utils';

const UserDetailsCard = ({user}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress = {() => navigation.navigate('Profile', {user})}>

            <View style = {styles.imageContainer}>
                <Image
                    style = {styles.image}
                    source = {{uri: user.imageUrl}}
                />
            </View>
            <View style = {styles.userDetails}>
                <Text style = {styles.name}>{user.name}</Text>
                <Text style = {styles.text}>{user.email}</Text>
               
            </View>

        </TouchableOpacity>
    );
}

export default UserDetailsCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    imageContainer: {
        marginRight: 8,
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 1000,
    },
    name: {
        fontSize: 14,
        color: color2,
        fontFamily: pFont500,
        // letterSpacing: 1,
    },
    text: {
        fontSize: 14,
        color: color3,
        marginBottom: 5,
        fontFamily: primaryFont,
        // letterSpacing: 1,
    },
})
import { useNavigation } from '@react-navigation/native';
import React from 'react'; 
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colorPrimary, windowWidth } from '../../../utils/utils';


const UserCard = ({user}) => {
    
    const navigation = useNavigation();

    return(
        <TouchableOpacity style = {styles.card} onPress = {() => navigation.navigate('Profile', {user})}>
            <Image 
                style = {styles.cardImage}
                source = {{uri: user.imageUrl}}
            />
        </TouchableOpacity>
    );
}

export default UserCard;

const styles = StyleSheet.create({

    card: {
        width: windowWidth * 0.163,
        height: windowWidth * 0.163,
        marginRight: windowWidth * 0.02, 
        borderRadius: 10000,
        padding: 2,
        borderColor: colorPrimary,
        borderWidth: 2,
       
    },

    cardImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10000,
    }

})
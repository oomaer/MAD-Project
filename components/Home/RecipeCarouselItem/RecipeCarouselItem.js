

import React from 'react'; 
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { color3, color4, colorPrimary, windowHeight, windowWidth } from '../../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage'

const RecipeCarouselItem = ({item, setOnBoarding}) => {
    
    const handleOnPress = () => {
        AsyncStorage.setItem('onBoarding', 'false');
        setOnBoarding(false);
    }

    return(
            <View style = {styles.cardContainer}> 
                <TouchableOpacity onPress={handleOnPress}>
                    <Image 
                        style = {styles.cardImage}
                        source = {{uri: item.imageUrl}}
                    />
                    <View style = {styles.content}>
                        <View style = {styles.overlay}></View>
                        <Text style = {styles.text}> {item.text} </Text>
                    </View>
                </TouchableOpacity>
            </View>
    );
}

export default RecipeCarouselItem;

const styles = StyleSheet.create({

    cardContainer: {
        elevation: 5,
        backgroundColor: 'white',    
    },

    card: {
        elevation: 5,
        backgroundColor: 'white',
    },

    cardImage: {
        width: windowWidth,
        height: windowHeight,
        borderColor: colorPrimary,
        // borderWidth: 2,
    },

    content: {
        // backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 3,
        width: '100%',
        paddingVertical: 16,
    },  

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 2,
    },

    text: {
        color: 'white',
        zIndex: 3,
        fontFamily: 'Tillana-Regular',
        fontSize: 34,
        textAlign: 'center',
        letterSpacing: 1,
    },

})
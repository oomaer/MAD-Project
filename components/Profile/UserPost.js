
import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { pFont500, color2, primaryFont, color5, color6, windowWidth } from '../../utils/utils'


const UserPost = ({post, id, marginRight, onPress}) => {

    return (
        <TouchableOpacity activeOpacity = {0.7}
            style={marginRight ? {marginRight: windowWidth * 0.01, marginBottom: windowWidth * 0.01} : { marginBottom: windowWidth * 0.01}} 
            onPress = {onPress}>
            <Image 
                style = {styles.postImage}
                source = {{uri: post.image}}
            />
        </TouchableOpacity>
    )
}

export default UserPost;

const styles = StyleSheet.create({

    postImage: {
        width: windowWidth * 0.32,
        height: windowWidth * 0.32,
    }
})
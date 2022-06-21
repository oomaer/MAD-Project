

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { colorPrimary, color2, } from '../../../utils/utils';
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

const shadowStyle = {
    elevation: 33,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0
    }
    }
const ActionButtonComponent = () => {

    // const [image, setImage] = useState();
    const navigation = useNavigation();

    const uploadImage = () => {
        ImagePicker.openPicker({
          
          cropping: true
        })
        .then(image => {
          // setImage(image.path);
          navigation.navigate('AddPost', {image: image.path});
        })
        .catch(err => {
          console.log(err)
        });
    }

    const takePhoto = () => {
        ImagePicker.openCamera({
          
          cropping: true,
        }).then((image) => {
          // console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          navigation.navigate('AddPost', {image: imageUri});
          // setImage(imageUri);
        })
        .catch(err => console.log(err));
    };

    
    return(
        <ActionButton buttonColor={'white'} style = {styles.actionButton}
            shadowStyle={shadowStyle}
            position='center'
            offsetY = {0}
            spacing = {10}
            buttonTextStyle = {{color: 'black', fontSize: 38, fontWeight: '300'}}
        >
            <ActionButton.Item  buttonColor={color2} spaceBetween={0} onPress={uploadImage} style = {styles.actionButtonItem}>
            <Icon name="images-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item  buttonColor={color2} spaceBetween={0} onPress={takePhoto} style = {styles.actionButtonItem}>
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton>
    )
}

export default ActionButtonComponent;

const styles = StyleSheet.create({

    actionButton: {
      position: 'relative',
      bottom: 20,
      // left: 0,
      width: 50,
      height: 50,
      // color: 'red',
      // backgroundColor: 'red',
      zIndex: 2,
      marginBottom: 24,
    },

    actionButtonIcon: {
        fontSize: 24,
        color: 'white',
        backgroundColor: color2,
        elevation: 5,
      },

});    
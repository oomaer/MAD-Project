

import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native';
import FormButton from '../../../components/FormButton/FormButton';
import {windowWidth, bgColor, pFont500, color2, defaultImageURL } from '../../../utils/utils';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import UserContext from '../../../context/UserContext/UserContext';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import NavigationButton from '../../../components/NavigationButton/NavigationButton';
import { useNavigation } from '@react-navigation/native';

const UpdatePhoto = ({route}) => {
  
  const {changeUserImage, getUserData} = useContext(UserContext);
  const navigation = useNavigation();

  const {user} = route.params;

  const [image, setImage] = useState('image');
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);



  useEffect(() => {
    setImage(user.imageUrl);
  }, [user])


  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    })
    .then(image => {
      setImage(image.path);
    })
    .catch(err => {
      console.log(err)
    });
  }


  const onSubmitPress = () => {
    
    if(image !== undefined){

      let filename = image.split('/').pop();
      const storageRef = storage().ref(filename);
      setImageUploading(true);

      const task = storageRef.putFile(image);
      
      task.on('state_changed', taskSnapshot => {
        setUploadPercentage(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100);
      });
      
      //when the image is uploaded
      task.then(() => {
        storageRef.getDownloadURL()
        .then(response => {
          changeUserImage(response)
          .then(() => {
            setImageUploading(false);
            let updatedUser = user;
            updatedUser.imageUrl = response;
            navigation.navigate('Profile', {user: updatedUser});
            getUserData();
          })
          .catch(err => console.log(err));
          
        })  
      });

      
    }
    else{
        navigation.goBack();
    }
  }

  const onSkipPress = () => {
    navigation.goBack();
  }

  return (

    <View style = {styles.container}>
      
      <Image
          style={styles.bgImageTop}
          source={require('../../../assets/images/bgImages/bg_top.png')}
        />
      <Image
        style={styles.bgImageBottom}
        source={require('../../../assets/images/bgImages/bg_bottom.png')}
      />

      <View style = {styles.content}>
        
        <View>
          <Text style={styles.header}>Set your Profile Photo</Text>
        </View>
        <TouchableOpacity style = {styles.logoContainer} onPress = {uploadImage}>
          {image !== undefined ? (  
            <Image
              style={styles.logoImage}
              source={{uri: image}}
            />
          ):(
            <Image
              style={styles.logoImage}
              source={require('../../../assets/images/defaultuserimage.png')}
            />
          )}
          
        </TouchableOpacity>

        {imageUploading ? (
          <View style = {styles.imageUploading}>
            <LoadingSpinner />
            <View>
                <Text style={styles.uploadText}>Uploading {uploadPercentage.toString().split('.')[0]} %</Text>
            </View>
          </View>
        ):(
          <View style = {styles.buttonsContainer}>
            <View style = {styles.buttonContainer}>
              <FormButton title = 'Submit' onPress={onSubmitPress} />
            </View>
          </View>
        )}

        <View style = {styles.bottomRow}>
          <NavigationButton title='SKIP' onPress = {onSkipPress} active = {false}/>
        </View>
        

      </View>

    </View>

  );
}

export default UpdatePhoto;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    width: 90 * windowWidth / 100,
    padding: 6 * windowWidth / 100,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 8,
  },  

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
  },
  
  buttonContainer: {
    width: '100%',
    margin: 4
  },

  header: {
    fontSize: 20,
    fontFamily: pFont500,
    color: color2,
    marginBottom: 10,
    textAlign: 'center',
  },

  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width: 70 * windowWidth / 100,
    height: 70 * windowWidth / 100,
    backgroundColor: 'white',
  },


  imageUploading: {
    alignItems: 'center',
    marginTop: 16,
  },

  uploadText: {
    fontSize: pFont500,
    color: color2,
    marginTop: 8,
    fontSize: 18,
  },

  bgImageTop: {
    position:"absolute",
    width: windowWidth,
    height: 200,
    zIndex: 0,
    top: 0,
  },
  bgImageBottom: {
    position:"absolute",
    width: windowWidth,
    height: 200,
    zIndex: 0,
    bottom: -50,
  },

  bottomRow: {
    alignItems: 'flex-end',
    marginTop: 15,
    marginRight: 10,
  }

});

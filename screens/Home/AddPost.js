

import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, TextInput} from 'react-native';
import FormButton from '../../components/FormButton/FormButton';
import {windowWidth, bgColor, pFont500, color2, color4 } from '../../utils/utils';
import storage from '@react-native-firebase/storage';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PostContext from '../../context/PostContext/PostContext';
import UserContext from '../../context/UserContext/UserContext';



const AddPost = ({route, navigation}) => {
  
  const {addNewPost, updatePosts} = useContext(PostContext);
  const {userData} = useContext(UserContext);

  const {image} = route.params;
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [postText, setPostText] = useState('');
  const [error, setError] = useState(false);


  const onPostPress = () => {

    if(postText.length > 0){
        let filename = image.split('/').pop();
        const storageRef = storage().ref(filename);
        setImageUploading(true);

        //upload to firebase storage
        const task = storageRef.putFile(image);
        task.on('state_changed', taskSnapshot => {
        setUploadPercentage(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100);
        });
        
        //when the image is uploaded

        task.then(() => {
        storageRef.getDownloadURL()
        .then(response => {
            //upload image url to database
            addNewPost({post: postText, image: response, user: userData, createdAt: new Date(), likedBy: []});
            setImageUploading(false);
            navigation.navigate('Home');
        })  
        });
    }
    else{
        setError(true);
    }

  }


  const onInputTextChange = (text) => {
    setPostText(text);
    setError(false);
  }


  return (

    <View style = {styles.container}>
      
      <Image
          style={styles.bgImageTop}
          source={require('../../assets/images/bgImages/bg_top.png')}
        />
      <Image
        style={styles.bgImageBottom}
        source={require('../../assets/images/bgImages/bg_bottom.png')}
      />

      <View style = {styles.content}>
        
        <View>
          <Text style={styles.header}>Set your Profile Photo</Text>
        </View>
        <View style = {styles.logoContainer}>
            <Image
                style={styles.logoImage}
                source={{uri: image}}
            />      
        </View>

        <View>
            <TextInput style = {StyleSheet.compose(styles.textInput, error && styles.textInputError)} value = {postText} onChangeText = {onInputTextChange} placeholder = 'Whats on your Mind?' />
        </View>

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
              <FormButton title = 'Post' onPress={onPostPress} contained={false}/>
            </View>
          </View>
        )}

      </View>

    </View>

  );
}

export default AddPost;



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
    elevation: 8,
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
    borderRadius: 8,
  },

  textInput: {
    fontSize: 16,
    color: color4,
    fontFamily: pFont500,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 10,
  },

  textInputError: {
    borderColor: 'red',
    borderBottomWidth: 1,
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

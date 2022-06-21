

import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import FormInput from '../../../components/FormInput/FormInput';
import FormButton from '../../../components/FormButton/FormButton';
import {windowWidth, bgColor, color3, pFont500, pFont600, pFont700, windowHeight, colorPrimary } from '../../../utils/utils';
import NavigationButton from '../../../components/NavigationButton/NavigationButton';
import AuthContext from '../../../context/AuthContext/AuthContext';

const Login = ({navigation}) => {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {login, errorMsg, setErrorMsg} = useContext(AuthContext);

  const handleLogin = () => {

    setEmail('')
    setPassword('')
    setErrorMsg('')
    login({email, password});
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
          
          <View style = {styles.logoContainer}>
            <Image
              style={styles.logoImage}
              source={require('../../../assets/images/logos/logoNew2.jpg')}
            />
          </View>

          <View style = {styles.navigate}>
            <NavigationButton title='Login' onPress = {() => {}} active = {true}/>
            <Text style = {styles.slash}> / </Text>
            <NavigationButton title='Sign Up' onPress = {() => {navigation.navigate('SignUp')}} active = {false}/>
          </View>

          <View style = {styles.inputContainer}>
            <Text style = {styles.label}>Email: </Text>
            <FormInput value = {email} placeholder = 'Enter Email' onChangeText = {setEmail} />
          </View>

          <View style = {styles.inputContainer}>
            <Text style = {styles.label}>Password: </Text>
            <FormInput value = {password} placeholder = 'Enter Password' onChangeText = {setPassword} />
          </View>
    
          <View style = {styles.buttonsContainer}>
            <View style = {styles.buttonContainer}>
              <FormButton title = 'Login' icon="login" mode="contained" onPress={handleLogin} />
            </View>
          </View>



          <Text style= {styles.errorMsg}>{errorMsg}</Text> 

      </View>

    </View>

  );
}

export default Login;



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
  navigate: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  slash: {
    fontFamily: pFont500,
    fontSize: 24,
    color: color3,
  },
  inputContainer: {
    padding: 10,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: color3,
    fontFamily: pFont500,
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

  errorMsg: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
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
  }

});


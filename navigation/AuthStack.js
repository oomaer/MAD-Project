import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';


import Login from '../screens/Auth/Login/Login';
import Register from '../screens/Auth/Register/Register';
import UploadPhoto from '../screens/Auth/UploadPhoto/UploadPhoto';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
            <Stack.Navigator>              
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="SignUp" component={Register} options={{ headerShown: false }}/>         
            </Stack.Navigator>
    )
}

export default AuthStack;
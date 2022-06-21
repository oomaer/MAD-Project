

import React, { useContext } from 'react';
import {StyleSheet, View} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';


import UserContext from '../context/UserContext/UserContext';
import UploadPhoto from '../screens/Auth/UploadPhoto/UploadPhoto';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Root from './Root';

import LoadingComponent from '../components/LoadingComponent/LoadingComponent';


// const Drawer = createDrawerNavigator();


const AppStack = () => {

    const {userData, userDataLoading} = useContext(UserContext);

    if(userDataLoading){
        return (
            <LoadingComponent />
        )
    }
    if(userData && userData.imageUrl == null){
        return (
            <UploadPhoto />
        )
    }
    else{
        return (
            <>
                <Root />
                
                {/* <Drawer.Navigator>
                    <Drawer.Screen name="EditProfile" component={EditProfile} />
                </Drawer.Navigator> */}

            </>
        )
    }
    
}

export default AppStack;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
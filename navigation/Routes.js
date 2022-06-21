import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthStack from "./AuthStack";
import AppStack from './AppStack';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from '../context/AuthContext/AuthContext';
import UserContextProvider from '../context/UserContext/UserContextProvider';
import PostContextProvider from '../context/PostContext/PostContextProvider';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';
import OnBoardingScreen from '../screens/OnBoardingScreen/OnBoardingScreen';

const Routes = () => {

    const [initializing, setInitializing] = useState(true);
    const [onBoarding, setOnBoarding] = useState(null);

    const {user, setUser} = useContext(AuthContext);
    
    //Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        AsyncStorage.getItem('onBoarding').then(resp => {
            if(resp === null){
                setOnBoarding(true);
            }
            else{
                setOnBoarding(false);
            }
        })

        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing || onBoarding === null) return <LoadingComponent />;

    else if(onBoarding) return <OnBoardingScreen setOnBoarding = {setOnBoarding} />;
   
    else{
        return(
            <NavigationContainer>    
                {user ? (
                    <UserContextProvider>
                        <PostContextProvider>
                            <AppStack /> 
                        </PostContextProvider>
                    </UserContextProvider>
                ):(
  <                 AuthStack />                 
                )}
            </NavigationContainer>
        )

    }
   
}

export default Routes;
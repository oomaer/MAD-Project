import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import auth from '@react-native-firebase/auth';
import AuthContext from "./AuthContext";
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';


function AuthContextProvider({children}) {
  
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const createNewUser = async (user) => {
        
        firestore()
        .collection('Users')
        .doc(user.id)
        .set({
            uid: user.id,
            name: user.name,
            email: user.email,
            imageUrl: null,
        })
        .then((response) => {
            console.log(response);
            console.log('User added!');
        })
        .catch(err => console.log(err));
    }

    const register = async (user) => {
        
        auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(response => {
            console.log(response)
            setErrorMsg('');
            AsyncStorage.setItem('firstTime', 'true');
            createNewUser({...user, id: response.user.uid})
            dispatch({type: "CHANGE_NAME", payload: ''})
            dispatch({type: "CHANGE_EMAIL", payload: ''})
            dispatch({type: "CHANGE_PASSWORD", payload: ''})
        })
        .catch(err => {
            setErrorMsg(err.message.split(']')[1]);
        })

    }


    const login = async (user) => {
        try{
            await auth().signInWithEmailAndPassword(user.email, user.password);
            setErrorMsg('');
        }
        catch(err){
            setErrorMsg(err.message.split(']')[1]);
            console.log(err);
        }
    }

    const logout = async () => {
        try{
            await auth().signOut();
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                register,
                login,
                logout,
                errorMsg,
                setErrorMsg,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;


import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import firestore from '@react-native-firebase/firestore';
import AuthContext from "../AuthContext/AuthContext";
import auth from '@react-native-firebase/auth';
import { firebase } from "@react-native-firebase/firestore";


function UserContextProvider({children}) {
  
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [topUsers, setTopUsers] = useState([]);
    const [userDataLoading, setUserDataLoading] = useState(true);


    const updateUserName = async (name) => {
        return await firestore()
        .collection('Users')
        .doc(user.uid)
        .update({name: name})
    }

    const getUserData = () => {
        setUserDataLoading(true);
    
        firestore().collection('Users').doc(user.uid).get().
        then(res => {
            setUserData(res["_data"])
            setUserDataLoading(false);
        })
        .catch(err => console.log(err));
    }

    const getTopUsers = () => {
        firestore().collection('Users').limit(10).get().
        then(res => {
            setTopUsers(res.docs);
        })
        .catch(err => console.log(err));
    }


    const updateUserInPosts = (userData) => {

        //updating user data in posts
        firestore()
        .collection('Posts')
        .where('user.uid', '==', user.uid)
        .get()
        .then(posts => {
            posts.docs.forEach(post => {
                
                firestore()
                .collection('Posts')
                .doc(post.id)
                .update({user: userData})
                .then(() => console.log('User updated in posts'))
                .catch(err => console.log(err));

            })
        })
        .catch(err => console.log(err));

        //updating user data in post likes
        firestore()
        .collection('Posts')
        .get()
        .then(posts => {
            posts.docs.forEach(post => {
                
                let likedBy = post._data.likedBy;
                for(let i = 0; i < likedBy.length; i++){
                    if(likedBy[i].uid === user.uid){
                        likedBy[i] = userData;
                    }
                }
                
                firestore()
                .collection('Posts')
                .doc(post.id)
                .update({likedBy: likedBy})
                .then(() => console.log('User updated in post likes'))
                .catch(err => console.log(err));

            })
        })
    
    }



    useEffect(() => {
        getUserData();
        getTopUsers();   
        
        const subscriber = firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
            console.log(documentSnapshot.exists)
            if(documentSnapshot.exists){
                if(documentSnapshot.metadata._metadata[0] === false){
                   updateUserInPosts(documentSnapshot.data());
                }
            }
            
        });
        // Stop listening for updates when no longer required
        return () => subscriber();


    }, [user.uid])


    const updateUserImage = (newImageUrl) => {
        
        firestore()
        .collection('Users')
        .doc(user.uid)
        .update({
            imageUrl: newImageUrl
        })
        .then(() => {
            console.log('User Image updated!');
            getUserData();
        })
        .catch(err => console.log(err));

    }

    const changeUserImage = async (newImageUrl) => {
        
        return await firestore()
        .collection('Users')
        .doc(user.uid)
        .update({
            imageUrl: newImageUrl
        })

    }

    const deleteUserPosts = async (promiseArr) => {
        return await firestore()
        .collection('Posts')
        .where('user.uid', '==', user.uid)
        .get()
        .then(posts => {
            posts.docs.forEach(post => {
                promiseArr.push(
                    firestore()
                    .collection('Posts')
                    .doc(post.id)
                    .delete()
                    // .then(() => console.log('User posts deleted!'))
                    // .catch(err => console.log(err))
                )
            })
        })
        .catch(err => console.log(err))
    }

    const deleteUserLikes = async (promiseArr) => {
        firestore()
        .collection('Posts')
        .get()
        .then(posts => {

            posts.docs.forEach(post => {
                let likedBy = post._data.likedBy;
                for(let i = 0; i < likedBy.length; i++){
                    if(likedBy[i].uid === user.uid){
                        likedBy.splice(i, 1);
                    }
                }
            
                promiseArr.push(
                    firestore()
                    .collection('Posts')
                    .doc(post.id)
                    .update({likedBy: likedBy})
                )
                
            })
            
        })
        .catch(err => console.log(err))
    }

    const deleteUserData = async () => {
        return await firestore()
        .collection('Users')
        .doc(user.uid)
        .delete()
    }

    const deleteUser = async () => {
        setUserDataLoading(true)

        let promiseArr = []
        deleteUserPosts(promiseArr)
        deleteUserLikes(promiseArr)
        promiseArr.push(deleteUserData())

        Promise.all(promiseArr).then(() => {
            user.delete().then(() => {
                console.log('user Deleted');
            });

        }).catch(err => console.log(err))

    }


    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                getUserData,
                updateUserImage,
                userDataLoading,
                topUsers,
                updateUserName,
                changeUserImage,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;

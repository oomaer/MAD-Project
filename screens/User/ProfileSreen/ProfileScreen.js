
import { useNavigation, useIsFocused, } from "@react-navigation/native";
import React, { useContext, useEffect, useState, useCallback } from "react"
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, TextInput, Alert, Modal } from "react-native"
import { useSafeAreaFrame } from "react-native-safe-area-context";
import UploadsButton from "../../../components/Profile/UploadsButton";
import UserPost from "../../../components/Profile/UserPost";
import UserDetailsCard from "../../../components/UserDetailsCard/UserDetailsCard";
import PostContext from "../../../context/PostContext/PostContext";
import UserContext from "../../../context/UserContext/UserContext";
import Icon from 'react-native-vector-icons/Ionicons'
import { bgColor, color2, colorPrimary, pFont500, color3, primaryFont, windowHeight, windowWidth, color5, color6 } from "../../../utils/utils";
import ConfirmModal from "./ConfirmModal";


const accesskey = 'kgwUYdGajnAIum03RowqvVo-ZD2kxUMvshlEKXq3sTA'
const secretkey = 'WmwvXC83PG0P-znpsEIRWBf2Krc9n_d9tObkVh-sy7o'

const ProfileScreen = ({route}) => {
    const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1558689509-900d3d3cc727?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80');
    const [userPosts, setUserPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const {user} = route.params;
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const {userData, updateUserName, getUserData} = useContext(UserContext);
    const {getUserPosts} = useContext(PostContext);


    
    useEffect(() => {
        setEditing(false);
        fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=food&client_id=${accesskey}`)
        .then(response => response.json()
        .then(res => {
            res.urls && setCoverImage(res.urls.regular);
        }))
        .catch(err => console.log(err));
        if(isFocused){
            setName(userData.name)
            getUserPosts(user)
            .then(response => {
                setUserPosts(response.docs);
            })
            .catch(err => console.log(err));
        }

    }, [isFocused, user])

    const onConfirmClick = () => {
        updateUserName(name)
        .then(() => {
            getUserData();
            setEditing(false)
        })
        .catch(err => console.log(err))
    }

    const onDeleteClick = () => {
        setModalVisible(true);
    }

    return(
        <ScrollView style = {{backgroundColor: bgColor}}>
            <View style = {styles.container}>

                <View style = {styles.coverContainer}>
                    <View style={styles.overlay}/>
                    <Image 
                        style = {styles.coverImage}
                        source = {{uri: coverImage}}
                    />
                </View>

                <View style = {styles.userDetails}>
                    <View style = {styles.justifyBetween}>
                        <View style={styles.row}>
                            {!editing ? (
                                <View style = {styles.userImageContainer}>
                                    <Image
                                        style = {styles.userImage}
                                        source = {{uri: userData.imageUrl}}
                                    />
                                </View>
                            ) : (
                                <TouchableOpacity style = {styles.userImageContainer} onPress = {() => navigation.navigate('UpdatePhoto', {user})}>
                                    <Image
                                        style = {styles.userImage}
                                        source = {{uri: user.imageUrl}}
                                    />
                                    <View style = {styles.cameraIcon}>
                                        <Icon name = "camera" size = {40} color = {'white'} />
                                    </View>
                                </TouchableOpacity>
                            )}
                            <View style = {styles.userDescription}>
                                {editing ? (
                                    <>
                                    <TextInput value = {name} style = {styles.userNameInput} onChangeText = {setName}/>
                                    <Text style = {styles.userText}>{user.email}</Text>
                                    <TouchableOpacity style={{flexDirection:'row', alignItems: 'center'}} onPress={onDeleteClick}>
                                        <Icon name = 'ios-trash-bin-outline' size={24} color = {'red'} />
                                        <Text style = {styles.deleteText}>Delete</Text>
                                    </TouchableOpacity>
                                    </>
                                ):(
                                    <>
                                    <Text style = {styles.userName}>{name}</Text>
                                    <Text style = {styles.userText}>{user.email}</Text>
                                    </>
                                )}                               
                            </View>                           
                        </View>
                        {userData.uid === user.uid && !editing ? (
                            <TouchableOpacity onPress={() => setEditing(true)}>
                                <Icon name = 'pencil' size={24} color = {color2} />
                            </TouchableOpacity>
                            ):(
                            <>
                            {userData.uid === user.uid &&
                            <TouchableOpacity onPress={onConfirmClick}>
                                <Icon name = 'md-checkmark-sharp' size={24} color = {color2} />
                            </TouchableOpacity>
                            }
                            </>
                            )
                        }
                    </View>
                </View>
  

                <View style = {styles.userUploadsButtons}>
                    <UploadsButton title='Posts' iconName = 'grid-outline' />
                </View>

                <View style = {styles.userPosts}>
                    {userPosts && userPosts.map((post, index) => {
                            if((index + 1) % 3 == 0){
                                return <UserPost key = {index} post = {post._data} id = {post.id} marginRight = {false} 
                                    onPress = {() => navigation.navigate('UserPost', {post: post._data, id: post.id})} />
                            }
                            else{
                                return <UserPost key = {index} post = {post._data} id = {post.id} marginRight = {true} 
                                    onPress = {() => navigation.navigate('UserPost', {post: post._data, id: post.id})} />
                            }
                    })}
                </View>


                <ConfirmModal modalVisible = {modalVisible} setModalVisible={setModalVisible}/>

            </View>
        </ScrollView>
    )
    


}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    coverImage: {
        width: '100%',
        height: windowHeight * 0.29,
    },

    
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: color2,
        opacity: 0.2,
        zIndex: 1,
    },

    cameraIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: colorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10000,
    },

    userDetails: {
        marginVertical: 14,
        padding: windowWidth * 0.03,
    },

    row: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    userImageContainer: {
        marginRight: 16,
    },
    userImage: {
        width: windowWidth * 0.18,
        height: windowWidth * 0.18,
        borderRadius: 1000,
    },
    userName: {
        fontSize: 18,
        color: color2,
        fontFamily: pFont500,
    },
    userText: {
        fontSize: 18,
        color: color3,
        marginBottom: 5,
        fontFamily: pFont500,
    },
    userNameInput: {
        fontSize: 18,
        backgroundColor: 'white',
        color: color2,
        fontFamily: pFont500,
        borderWidth: 1,
        paddingVertical: 3,
        paddingHorizontal: 5,
        marginBottom: 5,
        borderRadius: 8,
        borderColor: color5,
    },
    userTextInput: {
        fontSize: 18,
        backgroundColor: 'white',
        color: color3,
        fontFamily: pFont500,
        borderWidth: 1,
        paddingVertical: 3,
        paddingHorizontal: 5,
        marginBottom: 5,
        borderRadius: 8,
        borderColor: color5,
    },

    userUploadsButtons:{
        width: '100%',
        marginBottom: 5,
    },
    userPosts: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: "space-between",
        padding: windowWidth * 0.01,
    },

    justifyBetween:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    deleteText: {
        color: 'red',
        fontFamily: primaryFont,
        marginLeft: 5,
        fontSize: 18,
    }
})
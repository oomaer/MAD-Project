
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from "react-native";
import { color2, color3, color4, color5, color6, colorPrimary, primaryFont } from "../../../utils/utils";
import UserContext from "../../../context/UserContext/UserContext";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { firebase } from "@react-native-firebase/auth";

const ConfirmModal = ({modalVisible, setModalVisible}) => {

    const {userData, deleteUser} = useContext(UserContext);
    const  {user} = useContext(AuthContext);

    const [password, setPassword] = useState('');
    const [errMessage, setErrorMessage] = useState('');

    const onConfirmPress = () => {
        if(password !== ''){
            user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, password))
            .then(res => {
                setErrorMessage('')
                deleteUser();
            })
            .catch(err => {
                setErrorMessage(err.message.split(']')[1]);
                console.log(err)
            })
        }
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Please Enter Your Password to Continue</Text>
                <TextInput style = {styles.modalTextInput} placeholder="Password" secureTextEntry
                    value = {password} onChangeText={setPassword} />
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onConfirmPress}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                {errMessage !== '' && <Text style={styles.errMessage}>{errMessage}</Text>}
            </View>
            </View>
        </Modal>
    )
}

export default ConfirmModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color3,
        elevation: 7,
        maxWidth: '85%',
    },

    modalText: {
        fontSize: 16,
        fontFamily: primaryFont,
        color: color2,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    buttonText: {
        fontSize: 16,
        fontFamily: primaryFont,
        color: 'white',
        letterSpacing: 1,
    },
    
    button: {
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: color3,
        backgroundColor: color2,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    modalTextInput:{
        marginVertical: 14,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: color4,
    },

    errMessage: {
        fontSize: 14,
        color: 'red',
        marginTop: 10,
    }

})
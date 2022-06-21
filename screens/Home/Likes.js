
import React from "react"
import { ScrollView, View, StyleSheet } from "react-native";
import UserDetailsCard from "../../components/UserDetailsCard/UserDetailsCard";
import { bgColor, color5, color6, windowWidth } from "../../utils/utils";

const Likes = ({route}) => {
    const {likedBy} = route.params;
    return(
        <ScrollView style={{backgroundColor: bgColor}}>
            <View style = {styles.container}>
                {likedBy.map((user, index) => {
                    return(
                        <View style = {styles.userDetails} key = {index}>
                            <UserDetailsCard user = {user} />
                        </View>
                    )

                })}
            </View>
        </ScrollView>
    )
}

export default Likes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: windowWidth * 0.04,
        paddingVertical: 20,
    },

    userDetails: {
        // marginBottom: 20,
        borderBottomColor: color5,
        borderBottomWidth: 0.7,
        padding: 14,
    }
})
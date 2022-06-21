
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { color2, color3, color4, color5, color6, colorPrimary, pFont500, secondaryFont, windowWidth } from '../../../utils/utils';
import UserDetailsCard from '../../UserDetailsCard/UserDetailsCard';
import Icon from 'react-native-vector-icons/Ionicons';
import PostContext from '../../../context/PostContext/PostContext';
import UserContext from '../../../context/UserContext/UserContext';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';



let lastPress = 0;

const PostCard = ({post, id}) => {

    const navigation = useNavigation();
    
    const [likedBy, setLikedBy] = useState(post.likedBy);
    const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);

    const {addLike, removeLike} = useContext(PostContext);
    const {userData} = useContext(UserContext);



    useEffect(() => {

        setIsAlreadyLiked(false);
        setLikedBy(post.likedBy)
        post.likedBy.map(user => {
            if(user.uid === userData.uid){
                setIsAlreadyLiked(true);
            }
        })
        
    }, [post])

    const onDoublePress = () => {
        const time = new Date().getTime();
        const delta = time - lastPress;

        const DOUBLE_PRESS_DELAY = 400;
        if (delta < DOUBLE_PRESS_DELAY) {
            if(isAlreadyLiked){
                removeLike(id, userData);
                setLikedBy(likedBy.filter(user => user.uid != userData.uid));
                setIsAlreadyLiked(false);
            }
            else{
                addLike(id, userData);
                setLikedBy([...likedBy, userData]);
                setIsAlreadyLiked(true);
            }
        }
        lastPress = time;
    };

    const onSharePress = () => {
        const options = {
            message: `Post by ${post.user.name}}: ${post.post}`,
            url: post.image,
        }
        Share.open(options)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
    }

    const onLikePress = () => {
        if(isAlreadyLiked){
            removeLike(id, userData);
            setLikedBy(likedBy.filter(user => user.uid != userData.uid));
            setIsAlreadyLiked(false);
        }
        else{
            addLike(id, userData);
            setLikedBy([...likedBy, userData]);
            setIsAlreadyLiked(true);
        }
    }

    return (
        <View style={styles.container}>
            <View style = {styles.userDetails}>
                <UserDetailsCard user = {post.user} />
                <Text style = {styles.postText}>{(new Date(post.createdAt.toMillis())).toJSON().slice(0,10).split`-`.join`/`}</Text>
            </View>
            <TouchableOpacity style={styles.imageContainer} onPress = {onDoublePress} activeOpacity = {0.9}>
                <Image style={styles.image} source={{uri: post.image}} />
            </TouchableOpacity>
            
            <View style = {styles.interactions}>
            
                <TouchableOpacity style = {styles.likebutton} onPress = {onLikePress}>
                    {!isAlreadyLiked ? (
                        <Icon name="heart-outline" size={26} color={color2} />
                    )
                    :(
                        <Icon name="heart" size={26} color={'red'} />
                    )
                    } 
                    <Text style = {styles.interactionsButtonText}>Like</Text>   
                </TouchableOpacity>
            
                <TouchableOpacity style = {styles.sharebutton} onPress={onSharePress}>
                    <Icon name="share-social-outline" size={22} color={color2} />
                    <Text style = {styles.interactionsButtonText}>Share</Text> 
                </TouchableOpacity>

            </View>

            <View style = {styles.postDetails}>

                <TouchableOpacity onPress={() => navigation.navigate('Likes', {likedBy})} style = {styles.likedBy}>
                    {likedBy.length > 0 &&
                    (
                        <Text style = {styles.postText}>Liked by 
                        <Text style={styles.highlight}> {likedBy[0].name} </Text>
                        
                        {likedBy.length > 1 && (
                            <>
                            <Text style = {styles.postText}>and</Text>
                            <Text style={styles.highlight}> {likedBy.length - 1} </Text>
                            <Text style = {styles.postText}>others</Text>
                            </>
                            )
                        }
                        </Text>
                    )}
                </TouchableOpacity>

                <View style = {styles.postDescription}>
                    <Text style = {styles.postText}>
                        <Text onPress = {() => navigation.navigate('Profile', {user: post.user})} style={styles.highlight}>{post.user.name} - </Text>
                        {post.post}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default PostCard;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },

    postDetails: {
        paddingHorizontal: windowWidth * 0.03,
    },

    userDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: windowWidth * 0.03,
        marginBottom: 10,
    },

    image: {
        width: windowWidth,
        height: windowWidth * 1.2,
    },

    interactions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        width: '100%',
    },

    likebutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderColor: color5,
        borderRightWidth: 0.8,
        borderBottomWidth: 0.8,
        paddingVertical: 5,
        
    },
    sharebutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderColor: color5,
        borderRightWidth: 0.8,
        borderBottomWidth: 0.8,
        paddingVertical: 5,
    },
    interactionsButtonText: {
        color: color6,
        fontFamily: secondaryFont,
        marginLeft: 8,
    },

    likedBy: {
        color: color3,
        // marginLeft: 8,
        fontFamily: secondaryFont,
    },

    postDescription: {
        color: color3,
        fontFamily: secondaryFont,
    },

    highlight: {
        color: color2,
        fontFamily: secondaryFont,
    },

    postText: {
        color: color6,
        fontFamily: secondaryFont,
    }

})
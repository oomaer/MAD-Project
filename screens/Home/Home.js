

import { useIsFocused } from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Button, ScrollView, LogBox} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ActionButtonComponent from '../../components/Home/ActionButtonComponent/ActionButtonComponent';
import PostCard from '../../components/Home/PostCard/PostCard';
// import Carousel from 'react-native-snap-carousel';
import RecipeCarouselItem from '../../components/Home/RecipeCarouselItem/RecipeCarouselItem';
import UserCard from '../../components/Home/UserCard/UserCard';
import PostContext from '../../context/PostContext/PostContext';

import UserContext from '../../context/UserContext/UserContext';
import {windowWidth, bgColor, color5, pFont500, pFont600, pFont700, color4, colorPrimary, color2, windowHeight, primaryFont } from '../../utils/utils';


const Home = ({}) => {
  
  const {topUsers} = useContext(UserContext);
  const {wallPosts, getWallPosts} = useContext(PostContext);

  const isFocused = useIsFocused();

  useEffect(() => {
      LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
      if(isFocused){
        getWallPosts();
      }

  }, [isFocused])


  return (

    <ScrollView style={{backgroundColor: bgColor}}>

      <View style = {styles.container}>

            <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
              <View style = {styles.topUsers}>
                {topUsers.map((user, index) => {
                  return(
                    <UserCard key = {index} user = {user["_data"]} />
                  )
                })}             
              </View>
          </ScrollView>   

          {/* <View style = {styles.carousel}>
            <Text style = {styles.header}>Browse Top Recipes this month</Text>
            <Carousel
                width={windowWidth}
                height={windowWidth * 1.2}
                data={data}
                renderItem={({ item }) => <RecipeCarouselItem item = {item}/>}
                autoPlay={true}
                autoPlayInterval={1500}
                mode="scale-fade-in-out"  
            />

            
          </View> */}

          <View style = {styles.posts}>
            {wallPosts.map((post, index) => {
              return(
                <PostCard key = {post.id} post = {post["_data"]} id = {post.id}/>
              )
            })}
          </View>

        
          
      </View>
      
    </ScrollView>

  );
}

export default Home



const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor,
    alignItems: 'center',
  },

  topUsers: {
    borderBottomWidth: 0.8,
    borderBottomColor: color5,
    paddingHorizontal: windowWidth * 0.03,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: (windowWidth * 0.12) + (windowWidth * 0.10),
    flexDirection: 'row',
    marginBottom: 16,
  },
  
  header: {
    color: color2,
    fontSize: 18,
    fontFamily: primaryFont,
    marginBottom: 5,
    paddingHorizontal: windowWidth * 0.03
  },

  carousel: {
    marginTop: 14,
    marginBottom: 20,
  }

});

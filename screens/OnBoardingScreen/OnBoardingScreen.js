

import React from "react";

import {View, StyleSheet, Text} from 'react-native';
import RecipeCarouselItem from "../../components/Home/RecipeCarouselItem/RecipeCarouselItem";
import Carousel from 'react-native-reanimated-carousel';
import { colorPrimary, windowHeight, windowWidth } from "../../utils/utils";


const data = [
    {
        text: 'delicious',
        imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
        text: 'fresh',
        imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    },
    {
        text: 'yummy',
        imageUrl: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
        text: 'hot',
        imageUrl: 'https://images.unsplash.com/photo-1530554764233-e79e16c91d08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
        text: 'find the best recipes',
        imageUrl: 'https://images.unsplash.com/photo-1618724980108-a4d3856fd8f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    }

]

const OnBoardingScreen =  ({setOnBoarding}) => {
    return(
        <View style = {styles.container}>
          <View style = {styles.carousel} >
           
            <Carousel
                width={windowWidth}
                height={windowHeight}
                data={data}
                renderItem={({ item }) => <RecipeCarouselItem item = {item} setOnBoarding={setOnBoarding}/>}
                autoPlay={true}
                autoPlayInterval={1500}
                mode="scale-fade-in-out"  
            />


            
          </View>
        </View>
    );
}

export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: colorPrimary,
        
    }
});
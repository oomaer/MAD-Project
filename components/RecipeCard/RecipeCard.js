import {StyleSheet, Text, View} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {cos} from 'react-native-reanimated';

const FoodCard = ({recipedata, navigation}) => {
  // console.log(recipedata.imageLink);
  return (
    <Card
      style={styles.foodCard}
      onPress={() => {
        navigation.navigate('View Recipe', {
          recipeData: recipedata,
        });
        // console.log('Card pressed');
      }}>
      <Card.Cover source={{uri: recipedata.imageLink}} style={styles.img} />
      <Card.Content>
        <Title style={styles.title}>{recipedata.title}</Title>
        {/* <Paragraph style={styles.ingridiernts}>
          {props.recipedata.ingredients}
        </Paragraph> */}
        <Text
          style={{
            margin: 0,
            textTransform: 'uppercase',
            fontStyle: 'italic',
            maxHeight: 40,
            maxWidth: 170,
          }}>
          {recipedata.user.name}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  foodCard: {
    width: '41%',
    maxHeight: 220,
    paddingHorizontal: 10,
    paddingTop: 7,
    margin: 10,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderColor: '#e4f5e1',
    borderWidth: 1,
  },
  star: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 137,
    height: 117,
    borderRadius: 7,
    resizeMode: 'cover',
    // paddingLeft: 6,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 15,
    maxHeight: 40,
    fontWeight: '700',
    lineHeight: 21,
    letterSpacing: -0.3199999928474426,
    width: '100%',
    paddingTop: 10,
  },
  paragraph: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: 'center',
  },
  ingridients: {
    fontFamily: 'Inter',
    fontSize: 15,
    maxWidth: '100%',
    maxHeight: 20,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: 'left',
  },
});

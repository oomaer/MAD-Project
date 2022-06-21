import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Center, Heading, NativeBaseProvider, Row} from 'native-base';
// import {ScrollView} from 'native-base';
import {Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import UserContext from '../../context/UserContext/UserContext';
import AuthContext from '../../context/AuthContext/AuthContext';

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}
function Instructions(props) {
  return (
    <View style={{backgroundColor: '#fff'}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          paddingVertical: 10,
          backgroundColor: '#ff03ab',
          color: '#fff',
        }}>
        Step by Step Instructions
      </Text>
      {props.description.map((item, index) => {
        return (
          <View key={item.recipeID}>
            <Text
              style={{
                justifyContent: 'space-around',
                // textAlign: 'center',
                fontSize: 17,
                textTransform: 'uppercase',
                paddingTop: 13,
                paddingLeft: 10,
                color: '#ff9999',
                fontWeight: '600',
              }}>
              Step {index + 1}-{item}
            </Text>
            <Text
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: '#9c9ea1',
              }}></Text>
          </View>
        );
      })}
    </View>
  );
}
function IngredientsList(props) {
  return (
    <View style={{backgroundColor: '#fff'}}>
      <Text
        style={{
          width: '100%',
          backgroundColor: '#ff03ab',
          textAlign: 'center',
          fontSize: 20,
          paddingVertical: 10,
          color: '#fff',
          fontWeight: 'bold',
        }}>
        Ingredients
      </Text>
      {props.ingredients.map((item, index) => {
        return (
          <View key = {index}>
            <Text
              style={{
                // justifyContent: 'center',
                // textAlign: 'center',
                fontSize: 17,
                textTransform: 'uppercase',
                paddingTop: 13,
                paddingLeft: 10,
                color: '#ff9999',
                fontWeight: '600',
              }}>
              {index + 1}-{item}
            </Text>
            <Text
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: '#9c9ea1',
              }}></Text>
          </View>
        );
      })}
    </View>
  );
}
export default function ViewRecipe({route, navigation}) {

  const {recipeData} = route.params;

  const {userData} = useContext(UserContext);




  const deleteData = () => {
    firestore()
      .collection('recipes')
      .doc(recipeData.recipeID)
      .delete()
      .then(() => {
        console.log('recipe Deleted!');
      })
      .catch(error => {
        console.log(error);
      });
  };

  

  return (
    <ScrollView>
      <View style={{backgroundColor: '#fff'}}>
        <View
          style={{
            padding: 10,
            backgroundColor: '#fff',
            flexWrap: 'wrap',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                maxWidth: 300,
                paddingVertical: 10,
                justifyContent: 'center',
                color: '#222221',
                fontFamily: 'sans-serif-light',
                fontSize: 30,
                fontWeight: '700',
              }}>
              {recipeData.title}
            </Text>
            {recipeData.user.uid == userData.uid ? (
              <Card.Actions>
                <Icon
                  name="create-sharp"
                  color={'#0091ff'}
                  size={20}
                  style={{padding: 3}}
                  onPress={() => {
                    // console.log(props.title);
                    // console.log('-------------');
                    // console.log(recipeData.title + ' is the title');
                    navigation.navigate('Update Recipe', {
                      //   navigation: props.navigation,

                      data: recipeData,
                    });
                  }}
                />
                <Icon
                  name="trash"
                  color={'red'}
                  size={20}
                  style={{padding: 3}}
                  onPress={() => {
                    deleteData();
                    alert('Recipe Deleted successfully');
                    navigation.navigate('Recipe Management');
                  }}
                />
              </Card.Actions>
            ) : null}
          </View>
          <Text
            style={{
              paddingBottom: 30,
              margin: 0,
              textTransform: 'uppercase',
              fontStyle: 'italic',
              //   maxHeight: 40,
              maxWidth: 170,
            }}>
            {recipeData.user.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                margin: 0,
                textTransform: 'uppercase',
                fontStyle: 'italic',
                //   maxHeight: 40,
                maxWidth: 220,
                color: '#0e056ff',
                //   paddingTop: 40,
                //   fontSize: 10,
              }}>
              {recipeData.cuisine}
            </Text>
            <Text
              style={{
                margin: 0,
                textTransform: 'uppercase',
                fontStyle: 'italic',
                //   maxHeight: 40,
                maxWidth: 220,
                color: '#00dd56ff',
                //   paddingTop: 40,
                //   fontSize: 10,
                fontWeight: '800',
              }}>
              {recipeData.catagory}
            </Text>
          </View>
        </View>
        <Card.Cover
          source={{uri: recipeData.imageLink}}
          style={{marginVertical: 18}}
        />

        {/* <Image
          style={styles.imageStyling}
          source={{uri: 'https://picsum.photos/700'}}
        /> */}
        <IngredientsList ingredients={recipeData.ingredients} />
        <Instructions description={recipeData.description} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  imageStyling: {
    width: '100%',
    height: 300,
  },
  titleStyling: {
    color: '#f51b26',
    backgroundColor: '#ffff',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter',
    fontSize: 30,
    maxHeight: 40,
    fontWeight: '700',
    lineHeight: 21,
    letterSpacing: -0.3199999928474426,
    width: '100%',
    paddingTop: 10,
  },
});

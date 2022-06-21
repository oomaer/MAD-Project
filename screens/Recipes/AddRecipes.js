import React, {useContext, useEffect, useState} from 'react';
import uuid from 'react-native-uuid';


import {TextInput} from 'react-native-paper';
// import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import UserContext from '../../context/UserContext/UserContext';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  // eslint-disable-next-line prettier/prettier
  ScrollView,
  Alert,
} from 'react-native';



function buttonCheck(
  title,
  description,
  image,
  category,
  cuisine,
  ingredients,
  recipeObj,
) {
  if (
    title !== '' &&
    description !== '' &&
    image !== '' &&
    category !== '' &&
    cuisine !== '' &&
    ingredients !== ''
  ) {
    // console.log('button enabled');
    return true; // if all fields are filled, return true
  } else {
    // console.log('disabled');
    return false;
  }
}
function backgroundColorSelection(
  title,
  description,
  imageLink,
  category,
  cuisine,
  ingredients,
  recipeObj,
) {
  if (
    buttonCheck(
      title,
      description,
      imageLink,
      category,
      cuisine,
      ingredients,
      recipeObj,
    )
  ) {
    // console.log('true color');
    return '#009688';
  } else {
    // console.log('false color');
    return '#ff0000';
  }
}



function sendData(recipeObj) {
  var today = new Date();
  const rID = uuid.v4();
  firestore()
    .collection('recipes')
    .doc(rID)
    .set({
      recipeID: rID,
      user: recipeObj.user,
      title: recipeObj.title,
      description: recipeObj.description,
      ingredients: recipeObj.ingredients,
      category: recipeObj.category,
      imageLink: recipeObj.imageLink,
      cuisine: recipeObj.cuisine,
      createdAt:
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate(),
    })
    .then(() => {
      console.log('recipe added to recipes!');
    })
    .catch(e => console.log(e));
 
}


export default function AddRecipes({route, navigation}) {

  const {userData} = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [category, setCategory] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [cuisine, setCuisine] = useState('');
  //===========================================================================================================================

  function ingridentsMaker2() {
    var finalIngredients = ingredients.split(',');
    finalIngredients = finalIngredients.filter(
      word => word.trim().length !== 0,
    );
    return finalIngredients;
  }
  function descriptionMaker() {
    var finalDescription = description.split('.');
    finalDescription = finalDescription.filter(
      word => word.trim().length !== 0,
    );
    return finalDescription;
  }
  //==================================================================================================================
  const recipeObj = {
    recipeID: uuid.v4(),
    user: userData,
    title: title,
    description: descriptionMaker(),
    ingredients: ingridentsMaker2(),
    category: category,
    imageLink: imageLink,
    cuisine: cuisine,
  };
  // console.log(recipeObj.recipeID);
  return (
    <ScrollView>
      <View style={styles.addRecipeForm}>
        <Text style={styles.labelText}>Title</Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          // style={styles.textInputBox}
          // label="Title"
          mode="outlined"
          placeholder="enter name of recipe"
        />
        <Text style={styles.labelText}>Ingredients</Text>
        <TextInput
          value={ingredients}
          mode="outlined"
          onChangeText={text => setIngredients(text)}
          multiline={true}
          numberOfLines={5}
          // style={styles.instructionInputBox}
          // label="Ingredients"
          placeholder="water, noodles, sauce"
        />
        <Text style={styles.labelText}>Category</Text>
        <TextInput
          value={category}
          onChangeText={text => setCategory(text)}
          mode="outlined"
          // label="Category"
          placeholder="enter category"
        />
        <Text style={styles.labelText}>Cuisine</Text>
        <TextInput
          value={cuisine}
          onChangeText={text => setCuisine(text)}
          mode="outlined"
          // label="Cuisine"
          placeholder="enter cuisine"
        />
        <Text style={styles.labelText}>Instructions</Text>
        <TextInput
          value={description}
          onChangeText={text => setDescription(text)}
          multiline={true}
          numberOfLines={15}
          mode="outlined"
          // label="Instructions"
          placeholder="Boil water.Add noodles.Stir for 2 mins"
        />
        <Text style={styles.labelText}>Image</Text>
        <TextInput
          value={imageLink}
          onChangeText={text => setImageLink(text)}
          mode="outlined"
          // label="Image"
          placeholder="add image link"
        />
        <TouchableOpacity
          style={{
            elevation: 8,
            backgroundColor: backgroundColorSelection(
              description,
              imageLink,
              category,
              cuisine,
              ingredients,
              recipeObj,
            ),
            borderRadius: 1,
            paddingVertical: 10,
            paddingHorizontal: 12,
            marginVertical: 20,
          }}
          // style={styles.appButtonContainer}
          onPress={() => {
            if (
              title === '' ||
              description === '' ||
              imageLink === '' ||
              category === '' ||
              cuisine === '' ||
              ingredients === ''
            ) {
              Alert.alert('please fill all fields in correct format');
            } else {
              Alert.alert('reciepe added successfully');
              // console.log(recipeObj);
              sendData(recipeObj);

              navigation.navigate('Recipe Management');
            }
          }}>
          <Text style={styles.appButtonText}>Add new recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 20,
  },
  appButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  labelText: {
    fontSize: 18,
    color: '#170202',
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold',
    // alignSelf: 'center',
    textTransform: 'uppercase',
  },
  textInputBox: {
    borderColor: '#7d7d7d',
    borderWidth: 2,
    height: 50,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: 'sans-serif-light',
  },
  instructionInputBox: {
    height: 160,
    textAlignVertical: 'top',
    borderColor: '#7d7d7d',
    borderWidth: 2,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: 'sans-serif-light',
  },
  addRecipeForm: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logo: {
    borderRadius: 100,
  },
  liststyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 1,
  },
  card: {
    width: 200,
    height: 200,
    margin: 20,
  },
});

import React, {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';

import {TextInput} from 'react-native-paper';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  // eslint-disable-next-line prettier/prettier
  ScrollView,
  Button,
  Image,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';


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



function descriptionMaker(description) {
  var desc = '';
  for (var i = 0; i < description.length; i++) {
    desc += description[i] + '.';
  }
  return desc;
}
export default function UpdateRecipeScreen({route, navigation}) {
  const {data} = route.params;

  const updateData = () => {
    // console.log(data.recipeID);
    firestore()
      .collection('recipes')
      .doc(data.recipeID)
      .update({
        title: title,
        description: description,
        imageLink: imageLink,
        category: category,
        cuisine: cuisine,
        description: descriptionMaker2(),
        ingredients: ingridentsMaker2(),
      })
      .then(() => {
        console.log('updated');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const [user, setUser] = useState('waleedahmed10200');
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(
    descriptionMaker(data.description),
  );
  const [ingredients, setIngredients] = useState(data.ingredients.toString());
  const [category, setCategory] = useState(data.category);
  const [imageLink, setImageLink] = useState(data.imageLink);
  const [cuisine, setCuisine] = useState(data.cuisine);
  const recipeObj = {
    user: user,
    title: title,
    instructions: descriptionMaker2(),
    ingredients: ingridentsMaker2(),
    category: category,
    imageLink: imageLink,
    cuisine: cuisine,
  };
  function descriptionMaker2() {
    var finalDescription = description.split('.');
    finalDescription = finalDescription.filter(
      word => word.trim().length !== 0,
    );
    return finalDescription;
  }
  function ingridentsMaker2() {
    var finalIngredients = ingredients.split(',');
    finalIngredients = finalIngredients.filter(
      word => word.trim().length !== 0,
    );
    return finalIngredients;
  }
  return (
    <ScrollView>
      <View style={styles.addRecipeForm}>
        <Text style={styles.labelText}>Title</Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          mode="outlined"
          // label="Title"
          placeholder="enter name of recipe"
        />
        <Text style={styles.labelText}>Ingredients</Text>
        <TextInput
          value={ingredients}
          onChangeText={text => setIngredients(text)}
          multiline={true}
          numberOfLines={5}
          mode="outlined"
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
          numberOfLines={10}
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
              title,
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
              Alert.alert('please fill all fields');
              // navigation.navigate('Home');

              return;
            } else {
              // Alert.alert('reciepe added successfully');
              // console.log(recipeObj);
              updateData();
              navigation.navigate('Recipe Management');
            }
          }}>
          <Text style={styles.appButtonText}>Update Recipe</Text>
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
    height: 100,
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
  instructionInputBox1: {
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

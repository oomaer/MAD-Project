import React, {useState, useEffect, useContext} from 'react';

import {Text, TouchableOpacity, View, ScrollView} from 'react-native';

import RecipeCard from '../../components/RecipeCard/RecipeCard';
import {Button} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import FormButton from '../../components/FormButton/FormButton';
import UserContext from '../../context/UserContext/UserContext';




export default function RecipeManagementScreen({navigation}) {

  const {userData} = useContext(UserContext);
  const [usersRecipesData, setUsersRecipesData] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(usersRecipesData);

  const getData = () => {
    firestore()
      .collection('recipes')
      .where('user.email', '==', userData.email)
      .get()
      .then(response => {
        // console.log(response.docs);
        setUsersRecipesData(response.docs);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  getData();
  return (
    <View>
      <View style={{}}>
        <FormButton
        title = {'Add Recipe'}
          onPress={() => {
            navigation.navigate('add Recipes');
          }}
        />
      </View>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {usersRecipesData
            ? usersRecipesData.map(recipe => {
                return (
                  <RecipeCard
                    key={recipe.recipeID}
                    recipedata={recipe._data}
                    navigation={navigation}
                  />
                );
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
}

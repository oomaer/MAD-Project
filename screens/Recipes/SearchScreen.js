import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Stack,
  Input,
  Heading,
  extendTheme,
} from 'native-base';
import {RadioButton} from 'react-native-paper';
import {Text, View, ScrollView} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import firestore from '@react-native-firebase/firestore';

// function tabnav1(){
//   return <Tabnavigator/>;
// }
// function tabnav2(){
//   return <Tabnavigator/>;
// }

export default function App(props) {
  const [usersRecipesData, setUsersRecipesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('sort by date');
  const [searchValue, setSearchValue] = useState('');
  const [heading, setHeading] = useState('Recipes');
  // console.log(usersRecipesData);

  const getData = () => {
    if (value === 'sort by date') {
      firestore()
        .collection('recipes')
        .orderBy('createdAt', 'desc')
        .get()
        .then(response => {
          // console.log(response.docs);
          // setHeading('sort by date');
          setUsersRecipesData(response.docs);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (value === 'sort by name') {
      firestore()
        .collection('recipes')
        .orderBy('title', 'desc')
        .get()
        .then(response => {
          // console.log(response.docs);
          // setHeading('sort by name');
          setUsersRecipesData(response.docs);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const searchData = () => {
    // console.log('searching');
    firestore()
      .collection('recipes')
      .where('title', '>=', searchValue)
      .where('title', '<=', searchValue + '/uf8ff')
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
    setUsersRecipesData(getData());
  }, [value]);

  // getData();
  return (
    <NativeBaseProvider>
      <View
        style={{
          marginTop: 1,
          paddingBottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <Input
          enablesReturnKeyAutomatically
          style={{
            fontFamily: 'san-serif',
            backgroundColor: '#ffff',
            fontSize: 23,
            borderColor: '#ffffff',
            borderWidth: 0,
            borderRadius: 10,
          }}
          placeholder={'Search'}
          w="90%"
          maxWidth="100%"
          onChangeText={setSearchValue}
        />
        <IonicIcon
          style={{marginVertical: 4, backgroundColor: '#ffff'}}
          onPress={() => {
            // console.log(usersRecipesData);
            searchData();
          }}
          name="search-circle-sharp"
          size={42}
          color="#de4448"
        />
      </View>
      <View
        style={{backgroundColor: '#ffff', flexDirection: 'row', width: '100%'}}>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 20, fontWeight: '500'}}>
              Sort By Date
            </Text>
            <RadioButton value="sort by date" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>Sort By Name</Text>
            <RadioButton style={{width: 40}} value="sort by name" />
          </View>
        </RadioButton.Group>
      </View>

      <ScrollView style={{backgroundColor: '#ffff'}}>
        <Heading
          style={{justifyContent: 'center', textAlign: 'center'}}
          color="blueGray.700"
          size="md"
          fontFamily="mono">
          {heading}
        </Heading>
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
                    navigation={props.navigation}
                  />
                );
              })
            : null}
          {/* <RecipeCard recipedata={recipeData1} navigation={props.navigation} />
          <RecipeCard recipedata={recipeData} navigation={props.navigation} />
          <RecipeCard recipedata={recipeData1} navigation={props.navigation} />
          <RecipeCard recipedata={recipeData} navigation={props.navigation} />
          <RecipeCard recipedata={recipeData} navigation={props.navigation} />
          <RecipeCard recipedata={recipeData} navigation={props.navigation} />
          <RecipeCard recipedata={recipeData} navigation={props.navigation} /> */}
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}

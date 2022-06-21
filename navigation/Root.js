import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserContext from '../context/UserContext/UserContext';

import Home from '../screens/Home/Home';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import AddPost from '../screens/Home/AddPost';
import Icon from 'react-native-vector-icons/Ionicons';
import { color2, color4, color5, colorPrimary } from '../utils/utils';
import ActionButtonComponent from '../components/Home/ActionButtonComponent/ActionButtonComponent';
import { TouchableOpacity, StyleSheet } from 'react-native';
import CustomTabNavigator from './CustomTabNavigator';
import Likes from '../screens/Home/Likes';
import ProfileScreen from '../screens/User/ProfileSreen/ProfileScreen';
import UserPostScreen from '../screens/User/UserPostScreen/UserPostScreen';
import UploadPhoto from '../screens/Auth/UploadPhoto/UploadPhoto';
import UpdatePhoto from '../screens/User/UpdatePhoto/UpdatePhoto';


import AddRecipes from '../screens/Recipes/AddRecipes';
import RecipeManagementScreen from '../screens/Recipes/AddRecipeManagementScreen';
import ViewRecipeScreen from '../screens/Recipes/ViewRecipeScreen';
import UpdateRecipeScreen from '../screens/Recipes/UpdateRecipeScreen';
import SearchScreen from '../screens/Recipes/SearchScreen';
import UserProfile from '../screens/Home/UserProfile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = () => {

    return(
        <Stack.Navigator
        screenOptions={{
            headerStyle: { 
                backgroundColor: 'white',
                elevation: 10,
                height: 50,
                borderBottomColor: color5,
                borderBottomWidth: 0.8,
            },
          }}
        >
            <Stack.Screen name="Home" component={Home} options={{headerTitle: (props) => <HomeHeader {...props} /> }}/>
            <Stack.Screen name="AddPost" component={AddPost} options={{headerShown: false}}/>
            <Stack.Screen name="Likes" component={Likes} options={{headerTitle: (props) => <HomeHeader {...props} />}} />
            <Stack.Screen name="Profile" component={UserProfile} options={{headerTitle: (props) => <HomeHeader {...props} />}} />
            <Stack.Screen name="UserPost" component={UserPostScreen} options={{headerTitle: (props) => <HomeHeader {...props} />}} />
            <Stack.Screen name="UpdatePhoto" component={UpdatePhoto} options={{headerShown: false}} />

        </Stack.Navigator>
    )
}

const ProfileStack = () => {
  const {userData} = useContext(UserContext);
  return(
      <Stack.Navigator
      screenOptions={{
          headerStyle: { 
              backgroundColor: 'white',
              elevation: 10,
              height: 50,
              borderBottomColor: color5,
              borderBottomWidth: 0.8,
          },
        }}
      >
  
          <Stack.Screen name="CurrentUserProfile" component={ProfileScreen} initialParams={{user: userData}} options={{headerTitle: (props) => <HomeHeader {...props} />}} />
          <Stack.Screen name="UpdatePhoto" component={UpdatePhoto} options={{headerShown: false}} />
          
      </Stack.Navigator>
  )
}


const SearchStack = () => {
  return(
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          options={{headerShown: false}}
          name="Search"
          component={SearchScreen}
        />
        <Stack.Screen name="View Recipe" component={ViewRecipeScreen} />
      </Stack.Navigator>
  )
}

const RecipeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Recipe Management">
      <Stack.Screen
        name="Recipe Management"
        component={RecipeManagementScreen}
      />
      <Stack.Screen name="add Recipes" component={AddRecipes} />
      <Stack.Screen name="View Recipe" component={ViewRecipeScreen} />
      <Stack.Screen name="Update Recipe" component={UpdateRecipeScreen} />
    </Stack.Navigator>
  );
}

const Root = () => {
    return(
        <Tab.Navigator tabBar={props => <CustomTabNavigator {...props} />}
        screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} 
                      options={{
                        tabBarIcon: ({focused}) => (
                          <Icon
                            name={focused ? "home" : "home-outline"}
                            size={26}
                            color = {'white'}
                          />
                        ),
                    }}
            />

            <Tab.Screen name="RecipeStack" component={RecipeStack} 
                      options={{
                        tabBarIcon: ({focused}) => (
                          <Icon
                            name={focused ? "fast-food" : "fast-food-outline"}
                            size={26}
                            color = {'white'}
                          />
                        ),
                    }}
            />

            <Tab.Screen name="AddPost" component={HomeStack} 
                      options={{
                        addButton: true,
                        tabBarIcon: ({focused}) => (
                          <Icon style = {styles.largeIcon}
                            name="plus-circle"
                            size={40}
                            color={focused ? colorPrimary : color2}
                          />
                        ),
                    }}
            />

            <Tab.Screen name="SearchStack" component={SearchStack} 
                      options={{
                        tabBarIcon: ({focused}) => (
                          <Icon
                            name={focused ? "search" : "search-outline"}
                            size={26}
                            color={'white'}
                          />
                        ),
                    }}
            />

            <Tab.Screen name="ProfileStack" component={ProfileStack} 
                      options={{
                        tabBarIcon: ({focused}) => (
                          <Icon
                            name={focused ? "person" : "person-outline"}
                            size={26}
                            color={'white'}
                          />
                        ),
                    }}
            />
            

        </Tab.Navigator>
    )
}

export default Root


const styles = StyleSheet.create({
   largeIcon: {
    // marginBottom: 20,
    // overflow: 'visible',
   },
})
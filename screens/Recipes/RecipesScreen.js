import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Pressable,
  Card,
} from 'react-native';
import {
  Avatar,
  Title,
  Paragraph,
  Button,
  IconButton,
  Colors,
} from 'react-native-paper';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';

import {SafeAreaView} from 'react-native-safe-area-context';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
const Stack = createNativeStackNavigator();
export default function RecipesScreen({navigation}) {
  return (
    <ScrollView>
      <Button icon="home"></Button>

      <IonicIcon name="home-outline" size={30}></IonicIcon>
      <Icon name="gear" size={30} />
      <View style={styles.liststyle}>
        {list.map((item, index) => {
          return (
            <View key = {index}
              style={{
                padding: 5,
                marginLeft: 5,
                marginBottom: 10,
                borderWidth: 2,
                borderColor: '#f3f3ffff',
                borderRadius: 10,
                backgroundColor: '#ffffffff',
              }}>
              <Image
                source={{uri: item.image}}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
              <Avatar.Icon
                size={33}
                icon="heart"
                color="red"
                backgroundColor="white"
              />
              <Text
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 10,
                  width: '100%',
                }}>
                {item.name}
              </Text>
            </View>
          );
        })}
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
  iconStyle: {
    fontSize: 40,
    marginTop: 30,
    color: 'black',
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

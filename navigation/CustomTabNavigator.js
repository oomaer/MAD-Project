import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ActionButtonComponent from '../components/Home/ActionButtonComponent/ActionButtonComponent';
import { color2, color6, colorPrimary, windowWidth } from '../utils/utils';

function CustomTabNavigator({ state, descriptors, navigation }) {
    
    return (

    <View>
        <View style={styles.topBar}>
        {state.routes.map((route, index) => {
            
            const { options } = descriptors[route.key];
        
            const isFocused = state.index === index;

            const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
            }
            };

            const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
            };

            return (
                <>
                    {options.addButton ?
                    (
                        <ActionButtonComponent />
                    ):(
                        <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.button}
                    >
                        {options.tabBarIcon({ route, focused: isFocused })}
                    </TouchableOpacity>
                    )}
            </>
            );  
        })}

        </View>

        <View style = {styles.circle}>

        </View>
    </View>
  );
}

export default CustomTabNavigator;

const styles = StyleSheet.create({
    
    topBar: {
        paddingHorizontal: windowWidth * 0.09,
        height: 45,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: color2,
        zIndex: 2,
        
    },

    button: {
        zIndex: 2,
        marginHorizontal: 5,
    },

    // largeButton: {
    //     // zIndex: 2,
    //     marginHorizontal: 20,
    //     // marginBottom: 10,
    //     // width: windowWidth * 0.2,
    //     // width: 50,
    //     height: 50,
    //     bottom: 10,  
    //     position: 'relative',
    // },

    circle: {
        width: 90,
        height: 90,
        backgroundColor: color2,
        position: 'absolute',
        bottom: -23,
        left: windowWidth * 0.5 - 45,
        borderRadius: 1000,
        zIndex: 1,
     
    }




});
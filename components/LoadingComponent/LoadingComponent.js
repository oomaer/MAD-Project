

import React from 'react';
import {View} from 'react-native';
import { bgColor, windowHeight, windowWidth } from '../../utils/utils';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


const LoadingComponent = () => {
    return(
        <View style = {
            {
            height: windowHeight, 
            width: windowWidth, 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: bgColor,
            }
        }>

        <LoadingSpinner />

        </View>
    )
}

export default LoadingComponent;
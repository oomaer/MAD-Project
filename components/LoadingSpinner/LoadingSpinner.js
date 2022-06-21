
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const LoadingSpinner = () => {
    return(
        <Image
            style={styles.loadingImage}
            source={require('../../assets/images/rolling_color1.gif')}
        />
    )
}

export default LoadingSpinner;

const styles = StyleSheet.create({
    loadingImage: {
        width: 70,
        height: 70,
    }
})

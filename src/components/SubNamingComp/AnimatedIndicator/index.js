import { View, Text } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import styles from './styles'

const AnimatedIndicator = ({change}) => {

    
  
    const indicator = useAnimatedStyle(()=>{
        return {
            backgroundColor: change.value ? "green" : "red"
        }
    })
  
    return (
        <Animated.View style={[styles.indicator,indicator]} />
    ) 
}

export default AnimatedIndicator
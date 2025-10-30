import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { AnimatedFImage } from '../FImage'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { runOnJS } from 'react-native-worklets'
import styles from './styles'

const ButtonImage = ({image, style, onSubmit, useAsImage, children}) => {
    const pressed = useSharedValue(false)

    // Create tap gesture using the new Gesture API
    const tapGesture = Gesture.Tap()
        .maxDuration(50)
        .maxDelay(50)
        .onBegin(() => {
            pressed.value = true
        })
        .onFinalize(() => {
            pressed.value = false
            runOnJS(onSubmit)()
        })

    const pop = useAnimatedStyle(() => {
        return {
            transform: [{scale: withSpring(pressed.value ? 1.3 : 1)}],
        }
    })

    return (
        <GestureDetector gesture={tapGesture}>
            {useAsImage ? (
                <AnimatedFImage source={image} style={[styles.buttonimage, pop, style]}/>
            ) : (
                <Animated.View style={[pop, style]}>
                    {children}
                </Animated.View>
            )}
        </GestureDetector>
    )
}

export default ButtonImage
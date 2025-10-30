import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, useAnimatedReaction } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
const GameButton = ({ onSubmit, style, ans, butans, children, showHint, offbutton }) => {

  const pressed = useSharedValue(false)
  const pressed1 = useSharedValue(false)

  ///// Modern Gesture API //////////
  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      'worklet'
      pressed.value = true
      pressed1.value = true
    })
    .onFinalize(() => {
      'worklet'
      pressed.value = false
      scheduleOnRN(onSubmit)
    })
    .maxDuration(50)

  // Use useAnimatedReaction instead of useEffect for shared values
  useAnimatedReaction(
    () => offbutton.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        pressed1.value = false
        showHint.value = false
      }
    }
  )

  const pop = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(pressed.value ? 1.3 : 1) }],
      backgroundColor: !pressed1.value ? "#e5e5e5" : ans === butans ? "#00ff00" : "#F60000"
    }
  })

  const pop3 = useAnimatedStyle(() => {
    return {
      backgroundColor: !showHint.value ? "#e5e5e5" : ans === butans ? "orange" : "#e5e5e5"
    }
  })

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[style, pop, pop3]}>
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

export default GameButton
import React from 'react'
import Animated, {
    SlideInRight,
    FadeIn,
    FadeOut,
    SlideOutLeft
  } from 'react-native-reanimated';

export const FadeComp = ({children,stylefade}) => {
  return (
    <Animated.View
        style={stylefade}
        entering={FadeIn.delay(100).duration(700).springify()}
        exiting={FadeOut.duration(700).springify()}
        renderToHardwareTextureAndroid={true}
    >
       {children}
    </Animated.View>
  )
}

export const MoveComp = ({children,stylemove}) => {
    return (
      <Animated.View
          style={stylemove}
          entering={SlideInRight.duration(700).springify()}
          exiting={SlideOutLeft.duration(700).springify()}
          renderToHardwareTextureAndroid={true}
  
      >
         {children}
      </Animated.View>
    )
  }
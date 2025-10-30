import { View,Animated } from 'react-native'
import React,{useEffect,useRef} from 'react'
import styles from './styles'

const Blink = ({children}) => {

   const fadeanimation  = useRef(new Animated.Value(0)).current

   useEffect(()=>{
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    fadeanimation,{
                        toValue:0,
                        duration: 300,
                        useNativeDriver:true
                    }
                ),
                Animated.timing(
                    fadeanimation,{
                        toValue:1,
                        duration: 300,
                        useNativeDriver:true
                    }
                )
            ])
        ).start()
   },[])
  return (
    <Animated.View style={[styles.blink,{opacity: fadeanimation}]}>
      {children}
    </Animated.View>
  )
}

export default Blink
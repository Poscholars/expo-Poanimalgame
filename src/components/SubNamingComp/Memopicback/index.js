import { View, Text,ImageBackground } from 'react-native'
import React,{memo} from 'react'
import styles from './styles'

const Memopicback = ({char}) => {
   
  return (
    <ImageBackground
        source={require("../../../assets/images/buttonletter.webp")} 
        style={styles.backimage}  
        resizeMode="contain"
    >
        <Text style={styles.text}>{char}</Text>
    </ImageBackground>
  )
}

export default memo(Memopicback)
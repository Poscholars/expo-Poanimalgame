import { View, Text } from 'react-native'
import React,{useRef,useCallback} from 'react'
import ButtonImage from '../../common/ButtonImage'
import ImageBackground from 'react-native/Libraries/Image/ImageBackground'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'

const isEqual = (prevProps,nextProps) => {
  const {click,char,show,styles} = nextProps
  const{click:prevClick, char:prevChar,show:prevShow,styles:preStyles} = prevProps
  const arequal = click === prevClick && char === prevChar && show === prevShow && styles&&preStyles
  return arequal 
}

const ButtonChar = ({
    style,
    click,
    char,
    show,
    ke
}) => {
  // const onSubmit = () => {
  //   click(char,ke)
  // }
   
  console.log(char)
  return (
    <ButtonImage onSubmit={click} style={style} useAsImage={false}>
        <ImageBackground
          style={styles.imagechar} 
          source={show ? require("../../../assets/images/yellow.webp")
                  : require("../../../assets/images/buttonletter.webp")} 
          resizeMode="contain"
         //imageStyle={{tintColor:show ? "orange":null}}
       //   imageStyle={show ? {tintColor:"orange"} : {}}
         >
            <Text style={styles.text}>{char}</Text>
        </ImageBackground>
    </ButtonImage>
  )
}

export default React.memo(ButtonChar)
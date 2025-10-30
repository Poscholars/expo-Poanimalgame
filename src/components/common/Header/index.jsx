import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext,useEffect } from 'react'
import FImage from '../FImage'
import styles from './styles'
import { GlobalContext } from '../../../context/Provider'
import changetheme from '../../../utils/changetheme'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useTheme } from '@react-navigation/native'
import HeaderButton from '../HeaderButton'
import changesound from '../../../utils/changesound'



// const isEqual = (prevProps,nextProps) => {
//   const {LeftButton,RightButton} = nextProps
//   const{
//     LeftButton:Left,
//     RightButton:Right
//   } = prevProps
//   const arequal = LeftButton === Left && 
//   RightButton === Right 
//   return arequal 
// }

const Header = ({LeftButton,Title,RightButton,handleback}) => {
  
  
  const {colors,dark} = useTheme()
  const database = useDatabase()
  const {authState:{isDarktheme,shouldplay,sound},authDispatch} = useContext(GlobalContext)
 
  const onchangetheme = () => {
    if(shouldplay){
      sound[0].play()
    }
    changetheme(database,authDispatch,isDarktheme)
  }

  const onchangesound = () => {
    if(shouldplay){
      sound[1].stop()
    }else{
      sound[0].play()
    }
    changesound(database,authDispatch,shouldplay)
  }
 
  const getPic = () => {
    if(dark && shouldplay){
      return require("../../../assets/images/speakerdark.webp")
    }else if(!dark && shouldplay){
      return require("../../../assets/images/speaker.webp")
    }else if(dark && !shouldplay){
      return require("../../../assets/images/dspeakerdark.webp")
    }else{
      return require("../../../assets/images/dspeakerlight.webp")
    }
  }

  return (
    <>
    <View style={[styles.header]}>
    {LeftButton ? <HeaderButton useAsBack={LeftButton} handleback={handleback} /> 
      :  <>
       <FImage source = {dark ? require("../../../assets/images/footdark.webp")
        :  require("../../../assets/images/foot.webp")
            }  style={styles.imagefoot} />
          </>}
    <Text style={[styles.gametext,{color:colors.green}]}>{Title}</Text>
    <TouchableOpacity onPress={onchangesound} activeOpacity={0.9}>
        <FImage source = {getPic()}   style={styles.image2}/>
    </TouchableOpacity>
    {RightButton ? RightButton
    : <TouchableOpacity style={styles.darkbutton} onPress={onchangetheme} activeOpacity={0.9}>
        <FImage source = {dark ? require("../../../assets/images/darkmode.webp")
        :  require("../../../assets/images/lightmode.webp")
            }    style={styles.image}/>
      </TouchableOpacity>
  } 
    </View>
    <View style={[styles.line]} />
    </>
  )
}

export default Header
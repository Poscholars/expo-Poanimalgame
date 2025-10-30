import { useNavigation, useTheme } from '@react-navigation/native'
import React,{useContext} from 'react'
import { GlobalContext } from '../../../context/Provider'
import ButtonImage from '../ButtonImage'
import styles from './styles'

const HeaderButton = ({useAsBack,handleback}) => {
    const navigation = useNavigation()
    const {authState:{sound,shouldplay}} = useContext(GlobalContext)
    const {dark} = useTheme()
    const goBack = () => {
      if(shouldplay){
        sound[0].play()
      }
      if(handleback){
        handleback()
      }else{
        navigation.pop()
      }
    }
    const onSubmit = ()  => {
      if(shouldplay){
        sound[0].play()
      }
      navigation.toggleDrawer()
    }

  return (
      <>
       {useAsBack === 'back' ? <ButtonImage image={dark ? 
          require("../../../assets/images/backdark.webp") 
        : require("../../../assets/images/backlight.webp")
        } style={styles.menubutton} onSubmit={goBack} useAsImage={true}/>
        :  <ButtonImage image={dark ? 
          require("../../../assets/images/menudark.webp") 
          : require("../../../assets/images/menulight.webp")
        } style={styles.menubutton} onSubmit={onSubmit} useAsImage={true}/> }
      </>
  )
}

export default HeaderButton


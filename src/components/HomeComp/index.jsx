import { View, Text, ImageBackground,InteractionManager, Platform ,TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../common/Header'
import styles from './styles'
import { useNavigation, useTheme } from '@react-navigation/native'
import FImage from '../common/FImage'
import { GAME_LEVELS } from '../../constants/routeNames'
import { SafeAreaView } from 'react-native-safe-area-context'
import EnhancedName from '../ReactiveEmail/ReactUser'
/////replace on submit with gotogame
const ImageHolder = ({showads,sound,image,name,shouldplay,isAdloaded,screenName}) => {

  const {colors} = useTheme()
  const {navigate} = useNavigation()
  const gotogame = () => {
    // requestAnimationFrame(()=>{
    //   navigate(GAME_LEVELS,{type:name})
    // })
    if(isAdloaded){
       screenName.current = name
       showads()
    }else{
      if(shouldplay){
        sound[0].play()
      }
      requestAnimationFrame(()=>{
        navigate(GAME_LEVELS,{type:name})
      })
    }
      
  }
 
  
  return(
    <View style={styles.box}>
      <TouchableOpacity activeOpacity={0.95} style={styles.innerbox} onPress={gotogame} >
        <FImage source={image} style={[styles.backimage]} />
      </TouchableOpacity>
      <Text style={[styles.animalname,{color:colors.textcolor}]}>{name}</Text>
    </View>
  )
}

const HomeComp = ({sound,user,totalani,shouldplay,showads,isAdloaded,screenName,email}) => {
  const {colors} = useTheme()

  return (
    <SafeAreaView style={styles.container}>
     <Header LeftButton={true} 
      Title={"Select animal class"} 
      />
     <View style={styles.container}>
        <View style={styles.textholder}>
          <Text style={[styles.welcome,{color:colors.textcolor}]}>Welcome!</Text>
          {/* <Text style={[styles.name,{color:colors.textcolor}]}>{user},</Text> */}
          {email && <EnhancedName style={[styles.name,{color:colors.textcolor}]} user={email} />}
        </View>
        <View style={styles.imagewrapper}>
          <View style={styles.imageholder}>
              <ImageHolder screenName={screenName} isAdloaded={isAdloaded} showads={showads}  shouldplay={shouldplay} sound={sound} image={totalani.mammalno >= 942 ?
               require("../../assets/images/mammalsc.webp")
              : require("../../assets/images/mammalsi.webp")
              } name="Mammals"/>
              <ImageHolder screenName={screenName} isAdloaded={isAdloaded} showads={showads} shouldplay={shouldplay} sound={sound} image={totalani.fishno >= 618 ?
               require("../../assets/images/fishc.webp")
              : require("../../assets/images/fishi.webp")
              } name="Fish/Marine"/>
          </View>
          <View style={styles.imageholder}>
              <ImageHolder screenName={screenName} isAdloaded={isAdloaded} showads={showads} shouldplay={shouldplay} sound={sound} image={totalani.birdno >= 600 ?
               require("../../assets/images/birdc.webp")
              : require("../../assets/images/birdi.webp")
              } name="Birds" />
              <ImageHolder screenName={screenName} isAdloaded={isAdloaded} showads={showads} shouldplay={shouldplay} sound={sound} image={totalani.insectno >= 288 ?
               require("../../assets/images/insectc.webp")
              : require("../../assets/images/insecti.webp")
              } name="Insects" />
          </View>
          <View style={styles.imageholder}>
              <ImageHolder screenName={screenName} isAdloaded={isAdloaded} showads={showads} shouldplay={shouldplay} sound={sound} image={totalani.dinono >= 282 ?
               require("../../assets/images/dinosaursc.webp")
              : require("../../assets/images/dinosaursi.webp")
              } name="Dinosaurs" />
              <ImageHolder screenName={screenName} isAdloaded={isAdloaded} showads={showads} shouldplay={shouldplay} sound={sound} image={totalani.herptono >= 240 ?
               require("../../assets/images/herptoc.webp")
              : require("../../assets/images/herptoi.webp")
              } name="Herptofaunas" />
          </View> 
      </View>
     </View>
    </SafeAreaView>
  )
}

export default HomeComp

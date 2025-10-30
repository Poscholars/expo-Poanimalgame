import { View, SafeAreaView,Text,ImageBackground } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from '../common/Header'
import { useTheme } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FImage from '../../components/common/FImage'
import ViewHolderwithBorder from '../../components/common/ViewHolderwithBorder'

const CheckCoinComp = ({gotopayment,isPremium,loggedData}) => {
    const {colors} = useTheme()
  return (
    <SafeAreaView style={styles.container}>
       <Header
             LeftButton={"back"}  
             Title="Premiumship"
        />
      <View style={styles.container}>
          <View style={styles.imagewrapper}>
            {!isPremium ? <FImage source={require('../../assets/images/activateimage.webp')} style={styles.image} />
            :<View style={{height:"100%",width:"100%"}}>
              <View style={[styles.premiumheader,{backgroundColor:colors.green}]}>
                <Text style={styles.premiumtext}>You are now a Premium Gamer</Text>
              </View>
              <ImageBackground source={require('../../assets/images/grasslandoverlay.webp')}
                style={styles.backimage}
                resizeMode="cover"
              >
                  <Text style={{color:"black",marginBottom:10,fontWeight:"bold",fontFamily:"NunitoSans-Regular",fontSize:24}}>Gamer {loggedData[0].user_name}</Text>
              </ImageBackground>
            </View>}
          </View>
          <View style={styles.bodywrapper}>
           {!isPremium && <View style={[styles.line,{backgroundColor:colors.green}]}/>}
              <ViewHolderwithBorder>
                <Text style={[styles.toptext,{color:colors.textcolor}]}>
                  {!isPremium ? "Get unlimited coins / Animals fact?"
                  : "Now that you are a premium user"
                }</Text>
                <Text style={[styles.body,{color:colors.textcolor}]}>{
                  !isPremium ? "A Premium Gamer is a user who activated or unlocked the game to get unlimited coins to use the hint feature, get access to animal facts, and can play the game without watching video ads."
                  :"When reinstalling the game, to continue being a premium gamer, ensure you sign in with the valid email and phone number and then click 'activate online'"
                }
                </Text>
               {!isPremium && <TouchableOpacity activeOpacity={0.85} onPress={gotopayment} style={[styles.activatebutton,{backgroundColor:colors.green}]}>
                  <Text style={styles.buttontext}>ACTIVATE</Text>
                </TouchableOpacity>}
              </ViewHolderwithBorder>
          </View>
      </View>
     
    </SafeAreaView>
  )
}

export default CheckCoinComp
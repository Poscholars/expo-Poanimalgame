import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './styles'
import { useTheme } from '@react-navigation/native'
import Header from '../common/Header'
import FImage from '../common/FImage'
import ViewHolderWithBorder from '../common/ViewHolderwithBorder'
import ButtonImage from '../common/ButtonImage'

const InitialYesComp = ({type,logIn}) => {
  const {colors,dark} = useTheme()
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
    <Header Title={"Animal Game"} />
    <View style={styles.container}>
      <Text style={[styles.toptext,{color:colors.textcolor}]}>{type == "yes" ? "Really...?" : "Worry no more!!"}</Text>
      <FImage source={ type == "yes" ? 
        require('../../assets/images/butterfly.webp')
      : dark ? require('../../assets/images/bugdark.webp')
      : require('../../assets/images/buglight.webp')
    } style={styles.image} />
      <ViewHolderWithBorder>
        <Text style={[styles.bodytext,{color:colors.textcolor}]}>
         {type == "yes" ? 
          "Let's see the number of animals you can identify correctly"
          :
          "You can start identifying animals by playing this game"
          }
          </Text>
      </ViewHolderWithBorder>
      <ButtonImage image={require('../../assets/images/playbutton.webp')} style={styles.button} onSubmit={logIn} useAsImage={true} />
     </View>
    </SafeAreaView>
  )
}

export default InitialYesComp
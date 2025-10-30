import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text,Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FImage from '../common/FImage'
import Header from '../common/Header'
import HeaderButton from '../common/HeaderButton'
import styles from './styles'

const AboutComp = () => {
    const {colors,dark} = useTheme()
    return (
        <SafeAreaView style={styles.container}>
            <Header
                LeftButton={"back"}  
                Title="About Game"
            />
            <View style={styles.container}>
                <View style={styles.top}>
                    <FImage style= {styles.logoImage} source={dark ? require('../../assets/images/footborderdark.webp')
                    :require('../../assets/images/footborder.webp')} />
                    <Text style={[styles.name,{color:colors.green}]}>ANIMAL GAME</Text>
                </View>
                <View  style={styles.bottom}>
                    <Text style={[styles.reachtext,{color:colors.textcolor}]}>Animal Game was developed to help users have a fun way of discovering animals(Mammals, Birds, Fish, Herptofaunas and dinos).</Text>
                    <Text style={[styles.text1,{color:colors.textcolor}]}>With animal game you can start identifying more than 400 animals.</Text> 
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AboutComp
 

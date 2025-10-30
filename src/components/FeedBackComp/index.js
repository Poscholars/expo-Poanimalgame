import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text,Image, TouchableOpacity,Linking} from 'react-native'
import sendEmail from 'react-native-email'
import { SafeAreaView } from 'react-native-safe-area-context'
import FImage from '../common/FImage'
import Header from '../common/Header'
import HeaderButton from '../common/HeaderButton'
import styles from './styles'

const FeedBackComp = () => {
    const {colors,dark} = useTheme()
    return (
        <SafeAreaView style={styles.container}>
            <Header
                LeftButton={"back"}  
                Title="Provide a Feedback"
            />
            <View style={styles.container}>
                <View style={styles.top}>
                    <FImage 
                        style= {styles.logoImage} 
                        source={ dark ? require('../../assets/images/footborderdark.webp')
                        :require('../../assets/images/footborder.webp')
                    } 
                        />
                    <Text style={[styles.name,{color:colors.green}]}>ANIMAL GAME</Text>
                </View>
                <View  style={styles.bottom}>
                    <View style={[styles.line,{backgroundColor:colors.green}]} />
                    <Text style={[styles.reachtext,{color:colors.textcolor}]}>You can reach us via:</Text>
                    <View style={styles.holder}>
                        {/* <TouchableOpacity onPress={()=>{
                            Linking.openURL("https://web.facebook.com/Poscholars-112966241162640").then((data) => {
                                
                            }).catch(() => {
                                
                             //   AlertComp('An Error has occured','Make sure facebook or chrome is installed on your device')
                            });
                        }}>
                        <View style={styles.socialholder}>
                            <FImage style={styles.icon} source={require('../../assets/images/fb.webp')} resizeMode="contain" />
                            <Text style={[styles.text,{color:colors.textcolor}]}>Poscholars</Text>
                        </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={()=>{
                            sendEmail("animalgamee@gmail.com",{
                                subject: "Feedback from Animal Game App user",
                                body:"Hello, write your feedback here."
                            }).catch((e)=>{
                              //  AlertComp("Error","Ensure gmail is installed on your device")
                            })
                        }}>
                        <View style={styles.socialholder}>
                            <FImage style={styles.icon} source={require('../../assets/images/gm.webp')} resizeMode="contain" />
                            <Text style={[styles.text,{color:colors.textcolor}]}>animalgamee@gmail.com</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            Linking.openURL("https://wa.me/message/R74VLOSSEEZNF1").then((data) => {
                                
                            }).catch(() => {
                               
                               // AlertComp('An Error has occured','Make sure whatsapp is installed on your device')
                            });
                        }}>
                        <View style={styles.socialholder}>
                            <FImage style={styles.icon} source={require('../../assets/images/whtsp.webp')} resizeMode="contain" />
                            <Text style={[styles.text,{color:colors.textcolor}]}>+2347013106050</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            Linking.openURL("https://wa.me/message/O4NESRRMLYUMN1").then((data) => {
                               
                            }).catch(() => {
                              //  AlertComp('An Error has occured','Make sure whatsapp is installed on your device')
                            });
                        }}>
                        <View style={styles.socialholder}>
                            <FImage style={styles.icon} source={require('../../assets/images/whtsp.webp')} resizeMode="contain" />
                            <Text  style={[styles.text,{color:colors.textcolor}]}>+2349150334879</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.line2,{backgroundColor:colors.green}]} />
                    <Text style={[styles.reachtext2,{color:colors.textcolor}]}>Follow Us:</Text>
                    <View style={styles.bottombuttonholder}>
                        <TouchableOpacity
                            onPress={()=>{
                                Linking.openURL("https://twitter.com/AnimalGamee/").then((data) => {
                                   
                                }).catch(() => {
                                  //  AlertComp('An Error has occured','Make sure whatsapp is installed on your device')
                                });
                            }}
                        >
                            <FImage style={styles.icon} source={require('../../assets/images/twitter.png')} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                Linking.openURL("https://www.instagram.com/animal_gamee/").then((data) => {
                                   
                                }).catch(() => {
                                  //  AlertComp('An Error has occured','Make sure whatsapp is installed on your device')
                                });
                            }}
                        >
                            <FImage style={styles.icon} source={require('../../assets/images/insta.png')} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                Linking.openURL("https://www.facebook.com/Animal-Game/").then((data) => {
                                   
                                }).catch(() => {
                                  //  AlertComp('An Error has occured','Make sure whatsapp is installed on your device')
                                });
                            }}
                        >
                            <FImage style={styles.icon} source={require('../../assets/images/fb.webp')} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default FeedBackComp
 
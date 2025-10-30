import React, {useContext,useEffect,useState} from 'react'
import { Linking, View, Text,ImageBackground,Image,Share, Platform, Alert,TouchableOpacity } from 'react-native'
import { GlobalContext } from '../../context/Provider'
import styles from './styles'
import { ScrollView} from 'react-native-gesture-handler'
import { useCallback } from 'react'
import {useDatabase} from '@nozbe/watermelondb/hooks'
import FImage from '../../components/common/FImage'
import EnhancedUser from '../../components/ReactiveEmail'
import { useTheme } from '@react-navigation/native'
import { ABOUT_APP, CHECK_COIN, FEED_BACK } from '../../constants/routeNames'
import Terms from '../../screens/SideMenu/Terms'
import LocalActivation from '../../screens/SideMenu/LocalActivation'
import ProductKey from '../../screens/SideMenu/ProductKey'
import AlertComp from '../../components/common/AlertComp'
import EnhancedName from '../../components/ReactiveEmail/ReactUser'

const index = ({navigation}) => {

    const {colors,dark} = useTheme()
    const [visible, setVisibility] = React.useState(false)
    const [visible2,setVisibility2] = React.useState(false)
    const [visible5,setVisibility5] = React.useState(false)
    const [email,setEmail] = useState(null)
    const [name,setName] = useState(null)
    const database = useDatabase()
    const quizData = database.collections.get('userdata')
   
    const {
        authState: {loggedData,isPremium}
      } = useContext(GlobalContext);

      const gotocoin = useCallback(()=>{
            navigation.toggleDrawer()
            navigation.navigate(CHECK_COIN)
      },[])
 
      const showkey = useCallback(()=>{
            navigation.toggleDrawer()
            setVisibility(true)
      },[])
      const showTerm = useCallback(()=>{
        navigation.toggleDrawer()
        setVisibility2(true)
  },[])
    
      const activateproduct = useCallback(()=>{
            navigation.toggleDrawer()
            setVisibility5(true)
      },[])
      const gotofeedback = () => {
        navigation.toggleDrawer()
        navigation.navigate(FEED_BACK)
      }
      const gotoabout = () => {
        navigation.toggleDrawer()
        navigation.navigate(ABOUT_APP)
      }
      const Rate = () => {
        navigation.toggleDrawer()
        Linking.openURL("https://play.google.com/store/apps/details?id=com.poanimalgame")
        .then((res)=>{

        })
        .catch((e)=>{
          AlertComp("Error","Please ensure playstore is installed on your phone")
        })

      }
      const onShare = async () => {
        navigation.toggleDrawer()
        try {
          const result = await Share.share({
           title: 'App link',
           message: 'With Animal Game App you can now identify more than 450 animals in a fun way...install now, AppLink :https://play.google.com/store/apps/details?id=com.poanimalgame', 
           url: 'https://play.google.com/store/apps/details?id=com.poanimalgame'
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
        //  alert(error.message);
        }
      };
      const getUpdatedName = async() => {
        const user = await database.collections.get('userdata').query().fetch()
        setEmail(v => user[0])
      }
      const DeleteHistory = useCallback(async () => {
        // console.log('it works')
        await database.write(async () => {
          const comment = await database.get('userdata').find("1")
          await comment.update((u) => {
            u.userName = ''
          })
        })
         if(Platform.OS === 'android'){
             ToastAndroid.show("You have successfully deleted your result history",ToastAndroid.LONG)
         }else{
             Alert.alert("You have successfully deleted your result history")
         }
        
     },[])
      const deleteacct = () => {
        Alert.alert(
          'Proceed to delete your account?',
          'Are you sure you want to delete your account? note, you cannot undo this action.',
          [
            { text: "Cancel", style: 'cancel', onPress: () => {
              navigation.toggleDrawer()
            } },
            {
              text: 'DELETE',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => { 
                navigation.toggleDrawer()
                DeleteHistory()
                              
              }
              }
          ]
        );
      }
      useEffect(()=>{
        getUpdatedName()
      },[])
    return (
        <>
        <View style={styles.Wrapper}>
        <ImageBackground 
            style= {styles.Image} 
            source={require('../../assets/images/grassland.webp')}
            resizeMode="cover"
            >
        <View style={styles.Container}>
            <View style={styles.userholder}>
            <View style={styles.nameholder}>
            <FImage source={require('../../assets/images/identity.webp')}
                  style={styles.sIcon} />
            <Text style={styles.Name}>Gamer {email && <EnhancedName style={styles.Name} user={email} />}</Text>
            {email && <EnhancedUser style={styles.email} user={email} />}
            </View>
            </View>
       </View>
       </ImageBackground>
     
       <ScrollView style={styles.scroll}>
       <View style={styles.bodyholder}>
      {/*{Platform.OS == 'android' && <View style={styles.subContainer}>
            <Text style={[styles.tText,{color:colors.textcolor}]}>Product</Text>
            <TouchableOpacity delayPressIn={0} activeOpacity={0.95} onPress={gotocoin}>
            <View style={styles.cHolder}>
            <FImage source={dark ? require('../../assets/images/activatenowdark.webp')
              : require('../../assets/images/activatenowlight.webp')}
                  style = {styles.cIcon} 
                  resizeMode="contain"
                  />
            <Text style={[styles.cText,{color:colors.textcolor}]}>Activate Now</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} activeOpacity={0.95} onPress={showkey}>
            <View style={styles.cHolder}>
            <FImage source={dark ? require('../../assets/images/keydark.webp')
            :  require('../../assets/images/keylight.webp')}
                  style = {styles.cIcon} 
                  resizeMode="contain"
                  />
                <Text style={[styles.cText,{color:colors.textcolor}]}>Purchase Id</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} activeOpacity={0.95}
            onPress={activateproduct}>
            <View style={styles.cHolder}>
            <FImage source={dark ? require('../../assets/images/productdark.webp')
            :require('../../assets/images/productlight.webp')}
                  style = {styles.cIcon} 
                  resizeMode="contain"
                  />
                <Text style={[styles.cText,{color:colors.textcolor}]}>Activate Product</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} activeOpacity={0.95} onPress={showTerm}>
            <View style={styles.cHolder}>
            <FImage source={dark ? require('../../assets/images/tandcdark.webp')
            : require('../../assets/images/tandclight.webp')}
                  style = {styles.cIcon} 
                  resizeMode="contain"
                  />
                <Text style={[styles.cText,{color:colors.textcolor}]}>Terms & Conditions</Text>
            </View>
            </TouchableOpacity>
           
       </View>}*/}
  {Platform.OS == 'android' && <View style={[styles.line,{backgroundColor:colors.green}]} />}
  <View style={styles.subContainer}>
  <Text style={[styles.tText,{color:colors.textcolor}]}>Contact</Text>
  <TouchableOpacity delayPressIn={0} activeOpacity={0.95} onPress={gotofeedback}>
  <View style={styles.cHolder}>
  <FImage source={dark ? require('../../assets/images/feedbackdark.webp')
  :require('../../assets/images/feedbacklight.webp') }
                  style = {styles.cIcon} resizeMode="contain" />
      <Text style={[styles.cText,{color:colors.textcolor}]}>Feedback</Text>
  </View>
  </TouchableOpacity>
  {Platform.OS == 'android' && <TouchableOpacity onPress={onShare}>
  <View style={styles.cHolder}>
  <FImage source={dark ? require('../../assets/images/sharedark.webp')
  :require('../../assets/images/sharelight.webp') }
                  style = {styles.cIcon} resizeMode="contain" />
      <Text style={[styles.cText,{color:colors.textcolor}]}>Share</Text>
  </View>
  </TouchableOpacity>}
  {Platform.OS === 'android' && <TouchableOpacity onPress={Rate}>
  <View style={styles.cHolder}>
  <FImage source={dark ? require('../../assets/images/stardark.webp')
  :require('../../assets/images/starlight.webp') }
                  style = {styles.cIcon} resizeMode="contain" />
      <Text style={[styles.cText,{color:colors.textcolor}]}>Rate App</Text>
  </View>
  </TouchableOpacity>}
  <TouchableOpacity delayPressIn={0} activeOpacity={0.95} onPress={gotoabout} >
  <View style={styles.cHolder}>
  <Image source={dark ? require('../../assets/images/aboutdark.webp'):
  require('../../assets/images/aboutlight.webp')}
      style = {styles.cIcon}  resizeMode="contain" />
      <Text style={[styles.cText,{color:colors.textcolor}]}>About App</Text>
  </View>
  </TouchableOpacity>
  {Platform.OS == 'ios' && <TouchableOpacity delayPressIn={0} activeOpacity={0.95} onPress={deleteacct} >
  <View style={styles.cHolder}>
  <Image source={dark ? require('../../assets/images/deletedark.webp'):
  require('../../assets/images/deletelight.webp')}
      style = {styles.cIcon}  resizeMode="contain" />
      <Text style={[styles.cText,{color:colors.textcolor}]}>Delete Account</Text>
  </View>
  </TouchableOpacity>}
</View>
</View>
</ScrollView> 
</View>
<Terms visible={visible2} setVisibility={setVisibility2} />
<LocalActivation setVisibility5={setVisibility5} visible5={visible5} />
<ProductKey visible={visible} setVisibility={setVisibility} data={loggedData} navigation={navigation} />
    </>
  
    )
   }

export default React.memo(index)

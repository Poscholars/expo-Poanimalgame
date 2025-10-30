import React, {useEffect, useContext} from 'react';
import {Platform} from 'react-native'
import InitialNavigator from './InitialNavigator'
import { NavigationContainer,DarkTheme,DefaultTheme } from '@react-navigation/native';
import { GlobalContext } from '../context/Provider';
import {useDatabase} from '@nozbe/watermelondb/hooks'
import { Q } from '@nozbe/watermelondb'
import HomeNavigator from './HomeNavigator';
import { StatusBar } from 'react-native';
import { UPDATE_THEME,LOGGED_IN, UPDATE_ANIMALSLEARNT, REGISTER_SOUND, UPDATE_SOUND,UPDATE_USER } from '../constants/actionTypes';
import { darkcolors, lightcolors } from '../assets/theme/colors';
import { writeTheme } from '../utils/updateSavedTheme';
import SpinnerComp from '../components/common/SpinnerComp';
import MyStatusBar from '../components/common/MyStatusBar'
import { writeSound } from '../utils/updateSavedSound';
import Sound from "react-native-sound"
import * as SplashScreen from 'expo-splash-screen';


const AppNavContainer = () => {
  const database = useDatabase()
  const userData = database.collections.get('userdata')
  const userCoin = database.collections.get('coin')
  const userKey = database.collections.get('userkey')
  const Link = database.collections.get('whatsapp')
  const DatabaseDarkmode = database.collections.get('darkmode')


  const {
    authState: {isLoggedIn,updateui,isDarktheme,shouldplay,updatedata},authDispatch
  } = useContext(GlobalContext);


// setting up themes ////
  const myDefaulttheme = {
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      ...lightcolors
    }
  }

  const myDarktheme = {
    ...DarkTheme,
    colors:{
      ...DarkTheme.colors,
      ...darkcolors
    }
  }

 
  const [theme, setTheme] = React.useState(myDefaulttheme)

  const getTheme = async () => {
    const usertheme = await DatabaseDarkmode.query( Q. where('idc',1)).fetch()
    if(usertheme.length != 0){
      usertheme[0].isDarkMode? setTheme(v => myDarktheme) : setTheme(v => myDefaulttheme)
      authDispatch({
        type:UPDATE_THEME,
        payload:usertheme[0]._raw.dark_mode
      })
    }else{
      writeTheme(database,isDarktheme)
    }
  }

  const updateTheme = () => {
    isDarktheme ? setTheme(v => myDarktheme) : setTheme(v => myDefaulttheme)
    // isDarktheme ? StatusBar.setBarStyle("light-content",true) : StatusBar.setBarStyle("dark-content",true)
    // if(Platform.OS === 'android'){
    //   StatusBar.setBarStyle('light-content',true)
    //   StatusBar.setBackgroundColor(isDarktheme ? "#171717" : "#006838")  
    // }
  } 

//// Getting user data///////
  const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = React.useState(false);

  const getUser =  async () => {
    const userdata = await userData.query().fetch()
    const usercoin = await userCoin.query(Q.where('idc',1)).fetch()
    const userkey = await userKey.query(Q.where('idc',1)).fetch()
    const LinkWh = await Link.query( Q. where('idc',1)).fetch()
  
    if(userkey.length != 0){
      if(userkey[0]._raw.key){
        authDispatch({
            type:UPDATE_USER,
        })
      }
    }
  
    if(userdata.length > 0){
      authDispatch({
        type: LOGGED_IN,
        payload: [userdata[0]._raw,usercoin[0]._raw,userkey,LinkWh[0]._raw]
      })
      setAuthLoaded(true);

      setIsAuthenticated(true);
    }else{
      setAuthLoaded(true);
        
      setIsAuthenticated(false);
    }
  }

  
  const getdata = async () => {
   // console.log("called")
    let mammalno = 0
    let fishno = 0
    let birdno = 0
    let insectno = 0
    let dinono = 0
    let herptono = 0
    const animal = database.collections.get("animaldata")
    try{
      const mammals = await  animal.query(Q.where('animal_class',"Mammals")).fetch()
      const fishs = await  animal.query(Q.where('animal_class',"Fish/Marine")).fetch()
      const birds = await  animal.query(Q.where('animal_class',"Birds")).fetch()
      const insects = await  animal.query(Q.where('animal_class',"Insects")).fetch()
      const dinosaurs = await  animal.query(Q.where('animal_class',"Dinosaurs")).fetch()
      const herptofaunas = await  animal.query(Q.where('animal_class',"Herptofaunas")).fetch()
      mammals.forEach((mammal)=>{
        mammalno += mammal._raw.no_animals

      })
      fishs.forEach((fish)=>{
        fishno += fish._raw.no_animals
      })
      birds.forEach((bird)=>{
        birdno += bird._raw.no_animals
      })
      insects.forEach((insect)=>{
        insectno += insect._raw.no_animals
      })
      dinosaurs.forEach((dinosaur)=>{
        dinono += dinosaur._raw.no_animals
      })
      herptofaunas.forEach((herptofauna)=>{
        herptono += herptofauna._raw.no_animals
      //  console.log(herptofauna._raw.no_animals)
      })
    }catch(err){
      console.log(err)
    }
    

    authDispatch({
      type:UPDATE_ANIMALSLEARNT,
      payload:{mammalno,fishno,birdno,insectno,dinono,herptono}
    })
    //setAniarray((v) => ani.GetToAniLearnt())

    // require("../assets/sounds/")
    let soundset = new Sound("backreal.mp3",Sound.MAIN_BUNDLE,(e)=>{
      if(e){
       console.log(e)
      }
    })

    //console.log(soundset,'sdgh')

    let sund = new Sound('btnclick.mp3',Sound.MAIN_BUNDLE,(e)=>{
      if(e){
        console.log(e)
      }
    })

   // console.log(sund,'sdoopp')
     
    authDispatch({
      type:REGISTER_SOUND,
      payload:[sund,soundset]
    })


    const Soundbase = database.collections.get("playsound")
    const soundstate = await Soundbase.query( Q. where('idc',1)).fetch()
    if(soundstate.length !== 0){
      authDispatch({
        type:UPDATE_SOUND,
        payload:soundstate[0]._raw.play_sound
      })
    }else{
      writeSound(database,shouldplay)
    }
  }

  useEffect(() => {
    getUser();
  }, [isLoggedIn,updateui]);

  useEffect(()=>{
      console.log("THEME GETTING SET")
      getTheme()
  },[])

  useEffect(()=>{
      getdata()
  },[updatedata])

  useEffect(()=>{
      updateTheme()
  },[isDarktheme])


  return (
   
<React.Fragment>
<>
<MyStatusBar />
</>
{authLoaded ? 
<NavigationContainer  onReady={()=>{
              SplashScreen.hideAsync()
             }} theme={theme}>
  { isAuthenticated  ?  <HomeNavigator />  : <InitialNavigator /> }
  </NavigationContainer>
  : < SpinnerComp />}
</React.Fragment>
  );
};

export default AppNavContainer

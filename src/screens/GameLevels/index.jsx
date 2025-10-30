import React, { useEffect, useState,useContext,useCallback, useRef } from 'react'
import GameLevelsComp from '../../components/GameLevelsComp'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import data from '../../constants/data'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { Q } from '@nozbe/watermelondb'
import SpinnerComp from '../../components/common/SpinnerComp'
import { ANIMAL_LIST } from '../../constants/routeNames'
import { GlobalContext } from '../../context/Provider'
import restartGame from '../../utils/restartGame'
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads'
import { Platform } from 'react-native'
//const adUnitId = Platform.OS === 'android' ? 'ca-app-pub-7467526896400501/8010255910' : 'ca-app-pub-7467526896400501/9383047336';

const adUnitId = Platform.OS === 'android' ? 'ca-app-pub-7467526896400501/8010255910' : 'ca-app-pub-7467526896400501/9383047336'
const GameLevels = ({navigation}) => {

  const {navigate} = useNavigation()
  const database = useDatabase()
  const goback = () => navigation.pop()
  const{params:{type}} = useRoute()
  const noanimals = data[type].length
  const animal = database.collections.get("animaldata")
  const [leveldetails, setLevel] = useState([])
  const [show,setShow] = useState([false,false,false,false,false,false])
  const [showall,setShowall] = useState(false)
  const {authState:{sound,shouldplay},authDispatch} = useContext(GlobalContext)
  const getdetails = async() =>{
   const data = await animal.query(Q.where('animal_class',type)).fetch()
   //console.log(data[0]._raw.no_animals)
   setLevel(v => data)
  }

  const [reloadAd, setReloadAd] = useState(false)
  const [isAdloaded, setAdloaded] = useState(false)
  const showmyad = useRef(null)
  //rconsole.log(params,leveldetails)
  const gotolist = () => {
    if(isAdloaded){
      showmyad.current.show()
    }else{
      if(shouldplay){
        sound[0].play()
      }
      navigate(ANIMAL_LIST,{type})
    }
   
  }

  const clearAll = useCallback(() => {
    restartGame(database,type,authDispatch)
    setShowall(false)
  },[])

  const cancelall = useCallback(() => {
    setShowall(v => false)
  },[])

  const showModal = useCallback(() => {
    if(shouldplay){
      sound[0].play()
    }
    setShowall(v => true)
  },[])
 
  useFocusEffect(
    React.useCallback(()=>{
    //  console.log('fired')
      getdetails()
    },[])
  )
  // useEffect(()=>{
  //     console.log('fired')
  //     getdetails()
  // },[])
  useEffect(() => {
    const rewarded = InterstitialAd.createForAdRequest(adUnitId, {
      // requestNonPersonalizedAdsOnly: true,
      // keywords: ['fashion', 'clothing'],
    });
    
    const unsubscribeLoaded = rewarded.addAdEventListener(AdEventType.LOADED, () => {
      setAdloaded(V => true)
    });
    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,() => {
      //  console.log('ads closed')
        setAdloaded(v => false)
        setReloadAd(v => !v)
     //   console.log(screenName)
        if(shouldplay){
          sound[0].play()
        }
        navigate(ANIMAL_LIST,{type})
      }
    )
    const unsubscribeError = rewarded.addAdEventListener(AdEventType.ERROR,()=>{
        setAdloaded(false)
        setReloadAd(v => !v)
    })


    // Start loading the rewarded ad straight away

    rewarded.load();
    
   showmyad.current = rewarded

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed()
      unsubscribeError()
      
    //  setLoaded(false)
     // rewarded = null
    };
  }, [reloadAd,shouldplay]);
// console.log(isAdloaded)
  const showads = () => {
    showmyad.current.show()
  }
  return (
    <>
    { leveldetails.length > 0 ?
      <GameLevelsComp 
      type={type}
      noanimals={noanimals} 
      goback={goback} 
      leveldetails={leveldetails} 
      gotolist={gotolist}
      navigation={navigation}
      sound={sound}
      shouldplay={shouldplay}
      show={show}
      setShow={setShow}
      database={database}
      showall={showall}
      clearAll={clearAll}
      cancelall={cancelall}
      showModal={showModal}
      authDispatch={authDispatch}
    />
     : <SpinnerComp />
    }
   
    </>
    
  )
}
export default GameLevels
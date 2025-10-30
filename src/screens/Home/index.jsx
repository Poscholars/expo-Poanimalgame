import React, { useEffect,useContext,useState, useRef } from 'react'
import { Platform } from 'react-native'
import HomeComp from '../../components/HomeComp'
import { useNavigation } from '@react-navigation/native'
import { GlobalContext } from '../../context/Provider'
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads'
import { GAME_LEVELS } from '../../constants/routeNames'
import { useDatabase } from '@nozbe/watermelondb/hooks'
const adUnitId = Platform.OS === 'android' ? 'ca-app-pub-7467526896400501/6440107655' : 'ca-app-pub-7467526896400501/2967766506';

const Home = () => {
  
  const navigation = useNavigation()
  
  const [reloadAd, setReloadAd] = useState(false)
  const [isAdloaded, setAdloaded] = useState(false)
  const showmyad = useRef(null)
  const screenName = useRef('')
  const [email,setEmail] = useState(null)
  const database = useDatabase()
  const {
    authState: {loggedData,totalAnimalsLearnt,sound,shouldplay}
  } = useContext(GlobalContext)

  const getUpdatedName = async() => {
    const user = await database.collections.get('userdata').query().fetch()
    setEmail(v => user[0])
  }

  const toggle = () => {
    navigation.toggleDrawer()
  }
  
  useEffect(()=>{
    getUpdatedName()
  },[])
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
        navigation.navigate(GAME_LEVELS,{type:screenName.current})
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
  }, [reloadAd,screenName]);
// console.log(isAdloaded)
  const showads = () => {
    showmyad.current.show()
  }
  return (
    <>
    <HomeComp screenName={screenName} toggle={toggle} user={loggedData[0].user_name} totalani={totalAnimalsLearnt} sound={sound} shouldplay={shouldplay} showads={showads} isAdloaded={isAdloaded} email={email}/>
    </>
     
  )
}

export default Home
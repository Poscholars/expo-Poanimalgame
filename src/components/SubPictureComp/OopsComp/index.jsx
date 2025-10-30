import React,{useState,useCallback,useEffect,useContext, useRef} from 'react'
import {Modal,View,Text,TouchableOpacity,ActivityIndicator,ImageBackground,Platform} from 'react-native'
import MobileAds, { useRewardedAd,AdEventType, RewardedAd, RewardedAdEventType,TestIds } from 'react-native-google-mobile-ads';
import FImage from '../../common/FImage'
import styles from './styles'
import LocalModal from '../../common/Modal'
import { GlobalContext } from '../../../context/Provider';
import { useTheme } from '@react-navigation/native';

const adUnitId = Platform.OS === 'android'? "ca-app-pub-7467526896400501/5256987494"
: "ca-app-pub-7467526896400501/8458877660"

const OopsComp = ({
    visible,
    setVisibility,
    count,
    tryAgain,
    Timed,
    tryAgainTimed,
    setLive,
    animal,
    gotoList,
    noanimals

}) => {
      
  const {
    authState: {loggedData}
  } = useContext(GlobalContext)

  const {colors} = useTheme()

  const [error,setError] = useState(false)
  const [showadsbutton, setShowadsbutton] = useState(true)
  const [visible2, setVisibility2] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [reloadAd, setReloadAd] = useState(false)
  const [adLoaded, setAdloaded] = useState(false)
  const showmyad = useRef(null)




  useEffect(() => {
    const rewarded = RewardedAd.createForAdRequest(__DEV__ ? TestIds.REWARDED : adUnitId, {
      // requestNonPersonalizedAdsOnly: true,
      // keywords: ['fashion', 'clothing'],
    });
    
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setError(false)
      setAdloaded(V => true)
    });
    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,() => {
      //  console.log('ads closed')
      //   if(reward){
      if(Platform.OS === "ios"){
        setShowReward(v => true)
        setVisibility(v => false)
        setVisibility2(v => false)
      }
        setVisibility(v => false)
        setVisibility2(v => false)
        setReloadAd(v => !v)
      }
    )
    const unsubscribeError = rewarded.addAdEventListener(
       AdEventType.ERROR,() => {
          if(visible || visible2){
                setError(v => true)
              }
       }
    )
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        if(Platform.OS === 'android'){
              setShowReward(v => true)
              setVisibility2(v => false)
              setVisibility(v => false)
          }
        setLive(v => [true,true,true])
        setAdloaded(v => false)
        
      },
    );

    // Start loading the rewarded ad straight away

    rewarded.load();
    
   showmyad.current = rewarded

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed()
      unsubscribeError();
  
    };
  }, [reloadAd]);


const showAds = () => {
  try{
    if(adLoaded){
      showmyad.current.show()
    }else{
      setReloadAd(v => !v)
    }
  }catch(e){
    console.log(JSON.stringify(e))
  }

}

const okbutton = () => {
  setReloadAd(v => !v)
  setError(v => false)
  setShowadsbutton(v => true)
  setVisibility(v => false)
  setVisibility2(v => true)
}

const notNowbutton = () => {
  setShowadsbutton(v => false)
  setVisibility(v => false)
  setVisibility2(v => true)
}
const disableRewardshow = () => {
  setShowReward(v => false)
}



  const onclick = () => {
    if(Timed){
      setError(V => false)
      setVisibility2(v => false)
      setVisibility(v => false)
      tryAgainTimed()
    }else{
      setError(V => false)
      setVisibility2(v => false)
      tryAgain()
    }
  }

  const goto = () => {
    setError(V => false)
    setVisibility2(v => false)
    setVisibility(v => false)
    gotoList()
  }

    return(
          <>
         <Modal visible={(visible && (adLoaded || Timed))||visible2} transparent>
            <View style={styles.wrapper}>
            <View style={[styles.modalcontainer,{backgroundColor:colors.background}]}>
                <FImage source={require('../../../assets/images/oops.webp')} 
                        style={styles.oopsimage} 
                        resizeMode="contain"
                />
                <Text style={[false ? styles.rname : styles.name,{color:colors.textcolor}]}>
                  {loggedData[0].user_name}
                </Text>
                <View style={styles.boardholder}>
                  <ImageBackground source={require('../../../assets/images/scoreboard.webp')} style={styles.scoreboard} resizeMode="contain">
                      <Text style={styles.score}>{count}/{noanimals}</Text>
                  </ImageBackground>
                </View>
                <TouchableOpacity activeOpacity={0.9} onPress={onclick} style={[styles.modalbutton,{borderColor:colors.green}]}>
                  <Text style={[styles.buttontext,{color:colors.green}]}>TRY AGAIN</Text>
                </TouchableOpacity>
                {(showadsbutton && !Timed)  && <TouchableOpacity onPress={showAds} disabled={!adLoaded} style={[styles.modalbutton,{borderColor:colors.green}]}>
                      {adLoaded  ?
                        <Text style={[styles.buttontext,{color:colors.green}]}>WATCH ADS TO CONTINUE</Text>
                        : <View style={styles.adbuttonholder}>
                            <Text style={[styles.buttontext,{color:colors.green}]}>{!error ? "LOADING AD..." : "ADS NOT AVAILABLE NOW"}</Text>
                            {!error && <ActivityIndicator size={"small"} color={colors.green} />}
                          </View>
                      }
                      
                    </TouchableOpacity>}
                <TouchableOpacity onPress={goto} activeOpacity={0.9} style={[styles.modalbutton,{backgroundColor:"#006838",borderWidth:0}]}>
                  <Text style={styles.buttontext}>MASTER {animal.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
            </View>
          </Modal>
           {/********* First pop up that shows when you exhuast your apple and theres no internet ******************/}
           <LocalModal
              visible={visible && !adLoaded && !Timed}
              Title="Please enable internet connection"
              BodyText="Click 'OK' if you have enabled internet connection to continue the game"
              RightText="Ok"
              RightOnpress={okbutton}
              LeftText="Not now"
              LeftOnpress={notNowbutton}
            />

          {/************ This pop us shows up when you have successfully watch the ads to get more live****************/}
           <LocalModal 
              visible={showReward}
              Title={"You have received three Apples"}
              BodyText={"Now continue with the game from where you stopped"}
              RightText="Ok"
              RightOnpress={disableRewardshow}
          
          />

          </>
    )

}

export default React.memo(OopsComp)
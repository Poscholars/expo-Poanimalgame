import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useTheme } from '@react-navigation/native'
import React,{useEffect,useCallback, useRef, useState} from 'react'
import {View,Text,TouchableOpacity,ActivityIndicator,Alert,Platform,ToastAndroid} from 'react-native'
import MobileAds, { useRewardedAd,AdEventType, RewardedAd, RewardedAdEventType,TestIds } from 'react-native-google-mobile-ads';
import LocalModal from '../../common/Modal'
import styles from './styles'



const CoinAdComp = ({
    showAdsCoin,
    adLoadedCoin,
    disableShowAdCoin,
    loading
  }) => {
    const {colors} = useTheme()
  
    return(
      <View style={styles.coinadcomp}>
        <Text style={[styles.coinadtitle,{color:colors.textcolor}]}>
          {adLoadedCoin ?
           "You have exhausted your coins" :
           "You have exhausted your coins"}
        </Text>
        <Text style={[styles.coinadbody,{color:colors.textcolor}]}>
          {adLoadedCoin ? 
          "Would you like to watch ads to get more coins to keep using the hint feature?" :
          `Your internet connection is not active for you to watch Ads to get more coins. Please ensure you have an active internet connection before you load the ads.`}
        </Text>
        <View style={[styles.coinadbutton,{color:colors.textcolor}]}>
          <TouchableOpacity style={styles.coinadleftbutton} onPress={disableShowAdCoin}>
              <Text style={[styles.coinadleftbuttontext,{color:colors.green}]}>
                {adLoadedCoin ? "Not yet" : "Cancel"}
              </Text>        
          </TouchableOpacity>
          <TouchableOpacity onPress={showAdsCoin}>
             {!loading ? <Text style={[styles.coinadleftbuttontext,{color:colors.green}]}>
                          {adLoadedCoin ? "Watch Ads":"Load ads again"}
                        </Text> : 
                        <ActivityIndicator color={colors.green} size="large" />
                        }
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
const adUnitId = Platform.OS === 'android'? "ca-app-pub-7467526896400501/9879114007"
  : "ca-app-pub-7467526896400501/4328060961"

const FirstCoinAdComp = ({showCoinAdComp,setShowCoinAdComp,loading,setLoading}) => {
    const database = useDatabase()
    const [reloadAd, setReloadAd] = useState(false)
    const [adLoadedCoin, setAdloaded] = useState(false)
    const showmyad = useRef(null)
    const [rewardCoin, setReward] = useState(0)
 
    //////admob initialization////
  //   const {  
  //     show:showCoin,
  //     load:loadCoin,
  //   } = useRewardedAd(
  //     Platform.OS === 'android'?
  //     "ca-app-pub-7467526896400501/9879114007":
  //     "ca-app-pub-3940256099942544/5224354917",{
  //       loadOnDismissed: true
  //     }
   
  // );

  ////ADMOB LOGIC FOR COIN /////
  const IncreaseCoin = async (amount) => {
    const gameuser = await database.collections.get('coin').query().fetch()
    gameuser[0].increaseCoin(amount)
  }
  


  useEffect(() => {
    const rewarded = RewardedAd.createForAdRequest(__DEV__ ? TestIds.REWARDED : adUnitId, {
      // requestNonPersonalizedAdsOnly: true,
      // keywords: ['fashion', 'clothing'],
    });
    
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
    
      setAdloaded(V => true)
      setLoading(v => false)
    });
    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,() => {
      //  console.log('ads closed')
      //   if(reward){
        if(rewardCoin){
            if(Platform.OS === 'ios'){
              setShowCoinAdComp(v => false)
              Alert.alert(
                `You have received ${rewardCoin} coins`,
                "Now you can use the hint feature in the game",
                [
                  {
                    text: "OK",
                    onPress: () => {}
                  },
                ]
              );
            }else{
              ToastAndroid.showWithGravityAndOffset(
                `You have received ${rewardCoin} coins
                Now you can use the hint feature in the game
                `,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                100
            )

            }
        }
        setShowCoinAdComp(v => false)
        setReloadAd(v => !v)
      }
    )
    const unsubscribeError = rewarded.addAdEventListener(
       AdEventType.ERROR,() => {
         setLoading(v => false)
       }
    )
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        IncreaseCoin(reward.amount)
        if(Platform.OS === 'android') setShowCoinAdComp(v => false)
        setAdloaded(v => false)
        
        setReward(reward.amount.toString())
       
      //  setLoaded(false)
      //  rewarded.load()
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
    //  setLoaded(false)
     // rewarded = null
    };
  }, [reloadAd]);

// useEffect(()=>{
//   if(rewardCoin){
//     IncreaseCoin(rewardCoin.amount)
//     if(Platform.OS === 'android') setShowCoinAdComp(v => false)
//   }
// },[rewardCoin])


// useEffect(()=>{
//   if(adLoadErrorCoin){
//     setLoading(v => false)
//   }
// },[adLoadErrorCoin])

// useEffect(()=>{
//   //setLoading(v => true)
//   if(!adLoadedCoin){
//       loadCoin()
//   }else{
//     setLoading(v => false)
//   }
// },[adLoadedCoin])

// useEffect(()=>{
// //  console.log('loading ads')
//   loadCoin()
//   if(rewardCoin){
//     if(Platform.OS === 'ios'){
//       setShowCoinAdComp(v => false)
//       Alert.alert(
//         `You have received ${rewardCoin?.amount.toString()} coins`,
//         "Now you can use the hint feature in the game",
//         [
//           {
//             text: "OK",
//             onPress: () => {}
//           },
//         ]
//       );
//     }else{
//       ToastAndroid.showWithGravityAndOffset(
//         `You have received ${rewardCoin?.amount.toString()} coins
//          Now you can use the hint feature in the game
//         `,
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM,
//         25,
//         100
//     )

//     }
//   }
//   setShowCoinAdComp(v => false)
// },[adDismissedCoin])

const showAdsCoin = () => {
  try{
    if(adLoadedCoin){
      showmyad.current.show()
    }else{
      setReloadAd(v => !v)
      setLoading(V => true)
    }
  }catch(e){
    console.log(JSON.stringify(e))
  }
}

const disableShowAdCoin = () => {
  setShowCoinAdComp(v => false)
  setLoading(v => false)
}



    return (
  
        <LocalModal
        visible={showCoinAdComp}
        bodyComponent={<CoinAdComp 
                          showAdsCoin={showAdsCoin}
                          adLoadedCoin={adLoadedCoin}
                          disableShowAdCoin={disableShowAdCoin}
                          loading={loading}
        />}
        />
    
        )

}

export default React.memo(FirstCoinAdComp)
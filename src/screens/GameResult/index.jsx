import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import React,{useState,useContext} from 'react'
import GameResultComp from '../../components/GameResultComp'
import { GlobalContext } from '../../context/Provider'
import getCoin from '../../utils/getCoin'
import updateGamedata from '../../utils/updateGamedata'
import {Alert,BackHandler,Share} from 'react-native'
import { Q } from '@nozbe/watermelondb'
import { GAME_LEVELS, NAME_LEVEL, PICTURE_LEVEL } from '../../constants/routeNames'

let anil = []
const GameResult = () => {

  const {params} = useRoute()
  const [user, setUser] = useState(null)
  const {navigate} = useNavigation()
  const database = useDatabase()
  const {
    authState: {loggedData},authDispatch
  } = useContext(GlobalContext)


  const handleBack = () => {
     
    Alert.alert(
        'Return to Home page',
        'Do you sure you want to return to the home page?',
        [
          { text: "NO", style: 'cancel', onPress: () => {} },
          {
            text: 'YES',
            style: 'cancel',
            onPress: () => { navigate("Drawer")}
            }
        ]
      );
      return true
 }
  const getdata = async () => {
    if(parseInt(params.level) < 6){
      const animal = await database.collections.get("animaldata").query(
        Q.where('animal_class',params.animalclass),
        Q.where('game_level',`level${parseInt(params.level) + 1}`)
          ).fetch()
      anil = eval(animal[0]._raw.animals_learnt)
    }
  }


  useFocusEffect(
    React.useCallback(()=>{
      getCoin(database,setUser)
      updateGamedata(database,params.animalclass,params.level,params.aniLearnt,params.noanimal,authDispatch)
      getdata()
      const sub = BackHandler.addEventListener("hardwareBackPress",handleBack)
      return () =>{
        sub.remove()
      }
    },[])
  )

  const onShare = async () => {
 
    try {
       const result = await Share.share({
       title: 'App link',
       message: `I was able to identify ${params.noanimal} ${params.animalclass} in "Animal Game App - How many can you identify?" Try it out here!, AppLink :https://play.google.com/store/apps/details?id=com.poanimalgame`, 
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
        console.log(error)
      //  alert(error.message);
      }
  };



  const next = () => {
   // navigate(GAME_LEVELS,{type:params.animalclass})
//   console.log(anil.length, params.noanimals)
    if(parseInt(params.level) < 6){
      if(anil.length == params.noanimal){
        Alert.alert(
          'Already Completed!',
          'You have completed the next level for this game. Do you still want to play?',
          [
            { text: "NO", style: 'cancel', onPress: () => {navigate("Drawer")} },
            {
              text: 'YES',
              style: 'cancel',
              onPress: () => { 
                if(params.level+1 === 5 || params.level+1 === 6){
                  navigate('NAME LEVEL'+(params.level+1),{
                    animalslearnt:"[]",
                    animalclass: params.animalclass,
                    level:params.level+1,
                    noanimals:params.noanimal,
                    timed:(params.level+1)%2 === 0 ? true : false
                  })
                }else{
                  navigate('PICTURE LEVEL'+(params.level+1),{
                    animalslearnt: anil,
                    animalclass: params.animalclass,
                    level:params.level+1,
                    noanimals:params.noanimal,
                    timed:(params.level+1)%2  === 0 ? true : false
                  })
                }
            
                }
              }
          ]
        );

      }else{
        if(params.level+1 === 5 || params.level+1 === 6){
          navigate('NAME LEVEL'+(params.level+1),{
            animalslearnt:anil,
            animalclass: params.animalclass,
            level:params.level+1,
            noanimals:params.noanimal,
            timed:(params.level+1)%2 === 0 ? true : false
          })
        }else{
          navigate('PICTURE LEVEL'+(params.level+1),{
            animalslearnt: anil,
            animalclass: params.animalclass,
            level:params.level+1,
            noanimals:params.noanimal,
            timed:(params.level+1)%2  === 0 ? true : false
          })
        }
      }
    }else{
      Alert.alert(
        'Return to Home page',
        'This is the last Level in this Animal game section?',
        [
          { text: "NO", style: 'cancel', onPress: () => {} },
          {
            text: 'YES',
            style: 'cancel',
            onPress: () => { navigate("Drawer")}
            }
        ]
      );
    }
  }

  return (
   <GameResultComp 
    user={user}
    live={params.live}
    count={params.count}
    noanimals={params.aniLearnt.length}
    loggedData={loggedData}
    handleBack={handleBack}
    onShare={onShare}
    next={next}
    totalani={params.noanimals}
   />
  )
}

export default GameResult
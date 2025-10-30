import data from '../../constants/data'
import imagedata from '../../constants/imagedata'
import React,{useState,useCallback,useRef,useMemo,useContext} from 'react'
import PictureGameComp from '../../components/PictureGameComp'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import SpinnerComp from '../../components/common/SpinnerComp'
import _ from 'lodash'
import { useSharedValue } from 'react-native-reanimated'
import shuffleArray from '../../utils/shuffleArray'
import geneQAobj from '../../utils/geneQAobj'
import { ANIMAL_LIST, GAME_LEVELS, GAME_RESULT } from '../../constants/routeNames'
import {Alert,BackHandler} from 'react-native'
import updateGamedata from '../../utils/updateGamedata'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { GlobalContext } from '../../context/Provider'

let anitolearn = []
let totalani = []
let randomAni = []
let count = 0
let aniLearnt = []

const PictureComp = ({navigation}) => {
  const database = useDatabase()
  const {authDispatch,authState:{isPremium,sound,shouldplay}} = useContext(GlobalContext)
  const showHint = useSharedValue(false)
  const{params} = useRoute()
  const {navigate} = useNavigation()
  let totalAniobj = data[params.animalclass]
  const imagestoshow = imagedata[params.animalclass]
  const animalslearnt = eval(params.animalslearnt)
 

  const pressed = useSharedValue(false)
  const pressed1 = useSharedValue(false)

  const Timed = params.timed
  const Time = Math.round(((totalAniobj.length)/40)*1.3*60)

  const timeid = useRef(null)
  /*

  The state user and setuser helps to ensure the coin is reactive
  It is consumed by the database upon intialization 
  */
 // const [user, setUser] = useState(null)

  //////This state controls the quiz it is majorly controlled by the next function
  const [questAns, setQuestAns] = useState([])

  //////This state makes it possible for the layout animation
  const [on, setOn] = useState(true)

  /////This state controls the live of the player by displaying the corresponding number of apple
  const [live, setLive] = useState([true,true,true])

  const [restart,setRestart] = useState(null)
 
  /////This state controls the oops page, the page that enables ads watching or restart
  const [visible, setVisibility] = useState(false)

//////This state displays the first components when a user clicks the hint button when coin is exhausted
  const [showCoinAdComp, setShowCoinAdComp] = useState(false)
  const [loadads, setLoadads] = useState(false)
  
  const [loading, setLoading] = useState(false)

  const picturegame = params.level === 1 || params.level === 2
  
  const stopgame = useCallback(() => {
    if(shouldplay){
      sound[1].stop()
    }
    setVisibility(v => true)
  },[shouldplay])


  const memocount = useMemo(()=>{
      return count
  },[visible])

  const handleBack = () => {
    sound[1].stop()
    Alert.alert(
        'Do you really want to leave?',
        'Are you sure you want to quit this level without completion?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {
             
          } },
          {
            text: 'Quit',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => { 
          //    navigate(GAME_LEVELS,{type:params.animalclass})
                navigation.goBack()
                            
            }
            }
        ]
      );
      return true
 }
        
      
 

  const reduceLive = () => {
    if(live[0]){
      setLive(v => [false,true,true])
    }else if(live[1]){
      setLive(v => [false,false,true])
    }else{
      setLive(v => [false,false,false])
      setVisibility(v => true)
    }
  }

  useFocusEffect(
    React.useCallback(()=>{
     timeid.current = setTimeout(()=>{
        setLoadads(v => true)
      },2000)
      let totalArr = _.map(totalAniobj,a => Object.keys(a)[0]);
     // let totalArr2 = _.filter(totalArr,item => !animalslearnt.includes(item))
      let shuffled = shuffleArray([...Array(totalArr.length).keys()])
      anitolearn = totalArr
      totalani = totalArr
      randomAni = shuffled
      setQuestAns(v => geneQAobj(anitolearn[randomAni[count]],totalani))
      const sub = BackHandler.addEventListener("hardwareBackPress",handleBack)
      if(shouldplay){
        sound[1].play()
        sound[1].setNumberOfLoops(-1)
      }
    return () => {
 
       anitolearn = []
       totalani = []
       randomAni = []
       count = 0
       aniLearnt=[]
       clearTimeout(timeid.current)
        sub.remove()
       sound[1].stop()
        }
    },[])
)
  
  const nextquest = (realans,btnans) => {
    if(realans === btnans){
      aniLearnt.push(realans)
      if(shouldplay){
        sound[1].play()
        sound[1].setNumberOfLoops(-1)
      }
      if(count === (anitolearn.length)-1){
        let dummy = aniLearnt
        showHint.value = false
        pressed.value = Math.random()
        pressed1.value = Math.random()
        setLive(v => [true,true,true])
        setLoading(v => false)
        if(shouldplay){
          sound[1].release()
        }
        navigation.push(GAME_RESULT,{
          count:count,
          live:live,
          noanimals:anitolearn.length,
          animalclass:params.animalclass,
          level:params.level,
          aniLearnt:dummy,
          noanimal:params.noanimals
        })
      }else{
        setOn(v => false)
        count++
        setQuestAns(v => geneQAobj(anitolearn[randomAni[count]],totalani))
        setOn(v => true)
      }
    }else{
      showHint.value = false
      if(shouldplay){
        sound[1].pause()
       // sound[1].setNumberOfLoops(-1)
      }
      if(!Timed){
        reduceLive()
      }

    }

  }

  const tryAgain = useCallback(() => {
    aniLearnt=[]
    pressed.value = Math.random()
    pressed1.value = Math.random()
    setLoading(v => false)
    count = 0
    let totalArr = _.map(totalAniobj,a => Object.keys(a)[0]);
  //  let totalArr2 = _.filter(totalArr,item => !animalslearnt.includes(item))
    let shuffled = shuffleArray([...Array(totalArr.length).keys()])
    anitolearn = totalArr
    totalani = totalArr
    randomAni = shuffled
    setLive(v => [true,true,true])
    setQuestAns(v => geneQAobj(anitolearn[randomAni[count]],totalani))
    setVisibility(v => false)

   
  },[pressed.value,pressed1.value])

  const tryAgainTimed = useCallback(() => {
    aniLearnt=[]
    pressed.value = Math.random()
    pressed1.value = Math.random()
    setLoading(v => false)
    count = 0
    let totalArr = _.map(totalAniobj,a => Object.keys(a)[0]);
    let totalArr2 = _.filter(totalArr,item => !animalslearnt.includes(item))
    let shuffled = shuffleArray([...Array(totalArr2.length).keys()])
    anitolearn = totalArr2
    totalani = totalArr
    randomAni = shuffled
    setQuestAns(v => geneQAobj(anitolearn[randomAni[count]],totalani))
    setRestart(v => Math.random())


  },[pressed.value,pressed1.value])

  const gotoList = useCallback(() => {
    let ani = aniLearnt
    updateGamedata(database,params.animalclass,params.level,ani,ani.length,authDispatch)
    setVisibility(v => false)
    navigate(ANIMAL_LIST,{type:params.animalclass})

  },[aniLearnt])



  return (
    <>
    {
      questAns.length == 0 
      ? <SpinnerComp />
      :  <PictureGameComp
          level={params.level}
          questAns={questAns}
          noanimals={anitolearn.length}
          imagestoshow={imagestoshow}
          count={count}
          nextquest={nextquest}
          on={on}
          showHint={showHint}
          live={live}
          visible={visible}
          setVisibility={setVisibility}
          tryAgain={tryAgain}
          showCoinAdComp={showCoinAdComp}
          setShowCoinAdComp={setShowCoinAdComp}
          loading={loading}
          picturegame={picturegame}
          Time={Time}
          Timed={Timed}
          stopgame={stopgame}
          tryAgainTimed={tryAgainTimed}
          setLive={setLive}
          loadads={loadads}
          setLoading={setLoading}
          pressed={pressed}
          pressed1={pressed1}
          restart={restart}
          memocount={memocount}
          handleBack={handleBack}
          animal={params.animalclass}
          gotoList={gotoList}
          totalani={params.noanimals}
          isPremium={isPremium}
          />
    }
    </>
   
  )
}

export default PictureComp
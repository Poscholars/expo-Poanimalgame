
import React,{useState,useCallback, useRef,useMemo,useContext} from 'react'
import NamingComp from '../../components/NamingComp'
import { useFocusEffect, useNavigation, useRoute} from '@react-navigation/native'
import { useSharedValue } from 'react-native-reanimated'
import data from '../../constants/data'
import imagedata from '../../constants/imagedata'
import _ from 'lodash'
import geneQarray from '../../utils/geneQarray'
import SpinnerComp from '../../components/common/SpinnerComp'
import { ANIMAL_LIST, GAME_LEVELS, GAME_RESULT } from '../../constants/routeNames'
import {Alert,BackHandler,InteractionManager} from 'react-native'
import { GlobalContext } from '../../context/Provider'
import updateGamedata from '../../utils/updateGamedata'
import { useDatabase } from '@nozbe/watermelondb/hooks'



let anitolearn = []
let count = 0
let inipo = ""
let iniva = ""
let aniLearnt = []
const NamingLevel = ({navigation}) => {
  const database = useDatabase()
  const [showHint,setShowHint] = useState(false)
  const change = useSharedValue(true)
  const{params} = useRoute()
  const {navigate} = useNavigation()
  let totalAniobj = data[params.animalclass]
  const imagestoshow = imagedata[params.animalclass]
  const animalslearnt = eval(params.animalslearnt)
  const [questAns, setQuestAns] = useState([])
  const {authDispatch,authState:{isPremium,sound,shouldplay}} = useContext(GlobalContext)
  console.log("naming level params:", params)
  const [on, setOn] = useState(true)
  const id = useRef(null)

  const Timed = params.timed
 // const Time = Math.ceil(((totalAniobj.length-animalslearnt.length)/40)*5.1)
 const Time = Math.round(((totalAniobj.length-animalslearnt.length)/40)*5.1*60)
  const timeid = useRef(null)
  

  /////This state controls the oops page, the page that enables ads watching or restart
  const [visible, setVisibility] = useState(false)

  const [live, setLive] = useState([true,true,true])

  const [loadads, setLoadads] = useState(false)
  //////This states controls the component that appears when there is no internet and the user apple is finished
  const [restart,setRestart] = useState(null)

  const [masterholder,setMasterholder] =  useState([[],{},0,0])
 /*
  This is a sub state of the internet state
  it controls the showing of the watch ad button
  */
  const [error,setError] = useState(false)

//////This state displays the first components when a user clicks the hint button when coin is exhausted
  const [showCoinAdComp, setShowCoinAdComp] = useState(false)
  
  
  const [loading, setLoading] = useState(false)

  


  const memocount = useMemo(()=>{
    return count
    },[visible])


  const next = () => {
    if(count === (anitolearn.length-1) ){
      change.value = true
      let dummy = aniLearnt
      setError(v => false)
      setLoading(v => false)
      setShowHint(v => false)
      if(shouldplay){
        sound[1].stop()
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
      setQuestAns(v => anitolearn[count])
      setMasterholder([anitolearn[count][2],{},0,0])
      setOn(v => true)
      inipo = ""
      iniva = ""
      clearTimeout(id)
    }
    
  }

  const handleBack = () => {
    sound[1].stop()
    Alert.alert(
        'Do you really want to leave?',
        'Are you sure you want to quit this session without completion?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Quit',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {navigation.goBack()
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

 const onChangeansoption = useCallback((value, i) => {
  console.log("pressed option:", value, "at index:", i)
  setShowHint(v => false)
  if(value !== ""){
      let name = `${masterholder[2]}${masterholder[3]}`
      const newState = [...masterholder[0]]
      if(iniva === ""){
        newState[i] = ""
      }else{
        newState[i] = ""
        newState[inipo] = iniva
      }
     const newopt = {...masterholder[1],[name]: value}
      if(value === questAns[1][masterholder[2]][masterholder[3]]){
        change.value = true
        inipo = ""
        iniva = ""
        let q = masterholder[3]+1
        let p = masterholder[2]
        setMasterholder([newState,newopt,p,q])
        if(shouldplay){
          sound[1].play()
          sound[1].setNumberOfLoops(-1)
        }
        if(q === questAns[1][p].length){
          if(p+1 === questAns[1].length){
            aniLearnt.push(questAns[0])
            id.current = setTimeout(next,10)
          }else{
            p++
            q = 0
            setMasterholder([newState,newopt,p,q])
          }
        }
      }else{
        change.value = false
        inipo = i
        iniva = value
        setMasterholder([newState,newopt,masterholder[2],masterholder[3]])
        if(shouldplay){
          sound[1].pause()
        }
        if(!Timed) reduceLive()
      }
  }
}, [masterholder, questAns, shouldplay, Timed]) // Add dependencies

  const tryAgain = useCallback(() => {
    aniLearnt=[]
    change.value = true
    setError(v => false)
    setLoading(v => false)
    setShowHint(v => false)
    count = 0
    setLive(v => [true,true,true])
    anitolearn = geneQarray(totalAniobj,animalslearnt)
    const anid = anitolearn[count]
    setQuestAns(v => anid)
    let changer = [anid[2],{},0,0]
    setMasterholder(v => changer)
    setVisibility(v => false)
   
  },[change.value])

  const tryAgainTimed = useCallback(() => {
    aniLearnt=[]
    change.value = true
    setError(v => false)
    setLoading(v => false)
    setShowHint(v => false)
    count = 0
    anitolearn = geneQarray(totalAniobj,animalslearnt)
    const anido = anitolearn[count]
    let changer = [anido[2],{},0,0]
    setMasterholder(v => changer)
    setQuestAns(v => anido)
    setVisibility(v => false)
    setRestart(v => Math.random())
   
  },[change.value])

  const stopgame = useCallback(() => {
    if(shouldplay){
      sound[1].stop()
    }
    setVisibility(v => true)
  },[])



  useFocusEffect(
    useCallback(()=>{
      anitolearn = geneQarray(totalAniobj,animalslearnt)
      const anid = anitolearn[count]
      setQuestAns(v => anid)
      let changer = [anid[2],{},0,0]
      setMasterholder(v => changer)
      // InteractionManager.runAfterInteractions(()=>{
      //   setLoadads(v => true)
      // })
      timeid.current = setTimeout(()=>{
        setLoadads(v => true)
      },200)
      const sub = BackHandler.addEventListener("hardwareBackPress",handleBack)
      if(shouldplay){
        sound[1].play()
        sound[1].setNumberOfLoops(-1)
      }
      return () => {
        anitolearn = []
      //  totalani = []
     //   randomAni = []
        count = 0
        aniLearnt=[]
        setMasterholder(v => [[],{},0,0])
        clearTimeout(id)
        clearTimeout(timeid.current)
        sub.remove()
        sound[1].stop()
         }
    },[])
  )

  const gotoList = useCallback(() => {
    let ani = aniLearnt
    updateGamedata(database,params.animalclass,params.level,ani,ani.length,authDispatch)
    setVisibility(v => false)
    navigate(ANIMAL_LIST,{type:params.animalclass})

  },[aniLearnt])


  return (
    <>{
       !loadads ?
      <SpinnerComp /> :
      <NamingComp 
        level={params.level}
        noanimals={anitolearn.length}
        imagestoshow={imagestoshow}
        count={count}
        questAns={questAns}
        onChangeansoption={onChangeansoption}
        on={on}
        masterholder={masterholder}
        change={change}
        showHint={showHint}
        setShowHint={setShowHint}
        live={live}
        visible={visible}
        tryAgain={tryAgain}
        error={error}
        loading={loading}
        Time={Time}
        Timed={Timed}
        stopgame={stopgame}
        tryAgainTimed={tryAgainTimed}
        restart={restart}
        loadads={loadads}
        setVisibility={setVisibility}
        memocount={memocount}
        setLive={setLive}
        setShowCoinAdComp={setShowCoinAdComp}
        setLoading={setLoading}
        showCoinAdComp={showCoinAdComp}
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

export default NamingLevel
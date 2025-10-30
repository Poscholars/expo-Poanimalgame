
import React,{useRef,useCallback,useState,useContext} from 'react'
import AnimalListFactsComp from '../../components/AnimalListFactsComp'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import data from '../../constants/data'
import imagedata from '../../constants/imagedata'
import Tts from 'react-native-tts'
import { GlobalContext } from '../../context/Provider'
import { PAYMENT_COMP } from '../../constants/routeNames'



let i = 0
let storedpoint = []
const AnimalListFact = () => {
    const {params} = useRoute()
    const anidata = data[params.type]
    const images = imagedata[params.type]
    const sub1 = useRef(null)
    const sub2 = useRef(null)
    const sub3 = useRef(null) 
    const [start, setStart] = useState(false)
    const {navigate} = useNavigation()
    const {authState:{isPremium,shouldplay,sound}} = useContext(GlobalContext)
    const [show, setShow] = useState(false)


    const gotopay = () => {
      setShow(v => false)
      navigate(PAYMENT_COMP)
    }
    
    const initializedTts = useCallback(() => {
      Tts.setDefaultRate(0.42)
      Tts.setDefaultPitch(1.0)
      Tts.setDucking(true)
    },[])

    const onMomentumend = () => {
      Tts.stop()
      i = 0
      storedpoint = []
      setStart(v => false)
    }

    const startReading = (points) => {
      if(isPremium){
        if(start){
          console.log(start)
          Tts.stop()
        }else{
          storedpoint = points
          Tts.speak("Did you know?")
          Tts.speak(points[i])
        }
      }else{
        Tts.speak('Did you know?. The Humpback whale produces the loudest sound of all living organisms. Activate now to unlock facts about all 500 animals')
      }
    
      
    }


    const OnTtsFinish = (e) => {
      if(!start){
        if(i < storedpoint.length-1){
          i++
          Tts.speak(storedpoint[i])
        }else{
          i = 0
          Tts.stop()
          setStart(v => false)
        }
      }else{
        Tts.stop()
      }
     
    }

    const OnTtsStart = () => {
       setStart(v => true)
    }
    const onTtsCancel = (e) => {
      Tts.stop()
      setStart(v => false)
    }

    const disableShow = () => {
      setShow(v => false)
    }
    const enableShow = () => {
      if(shouldplay){
        sound[0].play()
      }
      setShow(v => true)
    }

    useFocusEffect(
      React.useCallback(()=>{
         initializedTts()
         sub1.current = Tts.addEventListener("tts-start", OnTtsStart)
         sub2.current = Tts.addEventListener("tts-finish", OnTtsFinish)
         sub3.current = Tts.addEventListener("tts-cancel",onTtsCancel)
      return () => {
          Tts.stop()
          sub1.current.remove()
          sub2.current.remove()
          sub3.current.remove()
    
          }
      },[])
  
  )

  return (
    <AnimalListFactsComp 
        type={params.type} 
        anidata={anidata} 
        images={images} 
        index={params.id}
        onMomentumend={onMomentumend}
        startReading={startReading}
        start={start}
        isPremium={isPremium}
        gotopay={gotopay}
        show={show}
        disableShow={disableShow}
        enableShow={enableShow}
        />
  )
}

export default AnimalListFact
import { View, Text } from 'react-native'
import React, {useState,useRef, useCallback,memo} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import styles from './styles'
import FImage from '../common/FImage'
import Tts from 'react-native-tts'
import Modal from '../common/Modal'

function useInterval(callback, delay){
  
  const savedCallback = useRef()
  const id = useRef()
  useFocusEffect(
      React.useCallback(()=>{
          savedCallback.current = callback      
      return ()=> {  
      }
      },[callback]
  ))


  useFocusEffect(
      React.useCallback(()=>{
          function tick(){
             //console.log('tick')
              savedCallback.current()
          }
          if(delay !== null){
               id.current = setInterval(tick, delay)
              return () => clearInterval(id.current)
          }        
      return ()=> {  
          clearInterval(id.current)
      }
      },[delay]
  ))

}
const twoDigits = (num) => String(num).padStart(2, '0')
const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped'
}

const isEqual = (prevProps,nextProps) => {
  const {Time,colors,restart} = nextProps
  const{Time:preTime,colors:preColors,restart:preStart} = prevProps
  const arequal = Time === preTime && colors === preColors && restart === preStart
  return arequal 
}
const Timer = ({Time,stopgame,colors,restart}) => {

    const ftime = useRef(Math.round((parseInt(new Date().getTime())/1000)+((Time))))
    const speech = useRef(null)
    const [secondsRemaining, setSecondsRemaining] = useState(Time)
    const [status, setStatus] = useState(STATUS.STOPPED)

    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60
    const shouldplay = useRef(true)
  
  // console.log(secondsToDisplay)
    if(secondsRemaining == 61){
      if(shouldplay.current){
        Tts.speak("You have approximately one minute more, please hurry up")
      }
      shouldplay.current = false
    }
    const handleStart = () => {
        setStatus(STATUS.STARTED)
    }

   

    useInterval(
        ()=>{
         // console.log(status)
            if(secondsRemaining > 0){
                let now = Math.round(parseInt(new Date().getTime())/1000)
                setSecondsRemaining(ftime.current-now)
            }else{
                setStatus(STATUS.STOPPED)
                stopgame()
               // setSecondsRemaining(v => 0)
            }
        },
        status === STATUS.STARTED ? 10 : null,
    )

    const onFinsh = useCallback(() => {
      Tts.stop()
    },[])

    useFocusEffect(
        React.useCallback(()=>{
          //setSecondsRemaining(v => 600)
          handleStart()
          Tts.setDucking(true)
          Tts.setDefaultRate(0.42)
          speech.current = Tts.addEventListener('tts-finish',onFinsh)
          
          return () => {
            speech.current?.remove()
            Tts.stop()
          }
        },[]
    ))

    useFocusEffect(
      React.useCallback(()=>{
        ftime.current = Math.round((parseInt(new Date().getTime())/1000)+((Time)))
        setSecondsRemaining(v => Time)
        shouldplay.current = true
        handleStart()
      },[restart])
    )

  return (
    <>
    <View style={styles.timewrapper}>
      <FImage source={require('../../assets/images/set_time.webp')} style={styles.timeImage} />
      <Text style={[styles.time,{color:colors.textcolor}]}>{twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}</Text> 
    </View>
    </>
  )
}

export default memo(Timer,isEqual)
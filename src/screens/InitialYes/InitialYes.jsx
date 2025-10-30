import { BackHandler,ToastAndroid,Platform } from 'react-native'
import React, { useContext } from 'react'
import InitialYesComp from '../../components/InitialYesComp'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { GlobalContext } from '../../context/Provider'
import { REGISTER_SUCCESS } from '../../constants/actionTypes'
import AlertComp from '../../components/common/AlertComp'

const InitialYes = () => {
  const {params:{type}} = useRoute()
  const {authDispatch} = useContext(GlobalContext)

  const handleBack = () => {
    if(Platform.OS === 'android'){
      ToastAndroid.showWithGravityAndOffset(
          "You cannot go back from here",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          100
      )
  }else{
      AlertComp("Hello","You cannot go back from here")
  }

   
     
    
    return true
 }

  useFocusEffect(
    React.useCallback(()=>{
      const sub = BackHandler.addEventListener("hardwareBackPress",handleBack)
      return () =>{
        sub.remove()
      }

    },[])
  )

  const logIn = () => {
    authDispatch({
      type:REGISTER_SUCCESS
    })
  }

  return (
   <InitialYesComp type={type} logIn={logIn}  />
  )
}

export default InitialYes
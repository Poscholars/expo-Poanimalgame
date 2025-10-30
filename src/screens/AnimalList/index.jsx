import { BackHandler,Alert } from 'react-native'
import React from 'react'
import AnimalListComp from '../../components/AnimalListComp'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import data from '../../constants/data'

const AnimalList = () => {
    const {params} = useRoute()
    const anidata = data[params.type]
    const {navigate} = useNavigation()

    const handleBack = () => {
     
      Alert.alert(
          'Return to Home page?',
          'Are you sure you want to return to the home page?',
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
          

    useFocusEffect(
      React.useCallback(()=>{
        const sub = BackHandler.addEventListener("hardwareBackPress",handleBack)
        return () =>{
          sub.remove()
        }
      })
    )

  return (
    <AnimalListComp 
        type={params.type}
        anidata={anidata}
        navigate={navigate}
        handleBack={handleBack}
  
    />
  )
}

export default AnimalList
import React,{useCallback,useState} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import getCoin from '../../../utils/getCoin'
import FImage from '../../common/FImage'
import { TouchableOpacity } from 'react-native'
import styles from './styles'

const GetCoinComp = ({isPremium,showHint,setShowHint,setShowCoinAdComp}) => {
    const [user,setUser] = useState(null)
    const database = useDatabase()
 
    useFocusEffect(
        React.useCallback(()=>{
            getCoin(database,setUser)
        },[])
    )

    const getHint = useCallback(async () => {
      if(isPremium){
        if(setShowHint){
          setShowHint(v => true)
        }else{
          showHint.value = true
        }   
      }else{
        if(user.coinAmount >= 10){
          if(setShowHint){
            setShowHint(v => true)
            const gameuser = await database.collections.get('coin').query().fetch()
            gameuser[0].decreaseCoin(10)

          }else{
            showHint.value = true
            const gameuser = await database.collections.get('coin').query().fetch()
            gameuser[0].decreaseCoin(10)
          }    
        }else{
         setShowCoinAdComp(v => true)
        }
      }
        
      },[user])
    
  return (
    <TouchableOpacity style={styles.bottomButton} onPress={getHint}>
        <FImage source={require('../../../assets/images/hint_coin.webp')} style={styles.hintcoin} resizeMode="contain" />
    </TouchableOpacity>
  )
}

export default React.memo(GetCoinComp)
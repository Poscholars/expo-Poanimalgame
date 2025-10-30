import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import FImage from '../FImage'
import ProgressBar from '../ProgressBar'
import ReactiveCoin from '../ReactiveCoin'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import styles from './styles'
import Timer from '../../Timer'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import getCoin from '../../../utils/getCoin'

const GameHeader = ({isPremium,count,live,noanimals,style,Time,Timed,stopgame,restart}) => {
    const database = useDatabase()
    const {colors} = useTheme()
    const [user,setUser] = useState(null)

    useFocusEffect(
      React.useCallback(()=>{
        getCoin(database,setUser)
      },[])
    )
  
  return (
    <>
        <View style={[styles.viewone,style]}>
            <FImage source={require('../../../assets/images/coin.webp')} style={styles.coin} />
                {user && <ReactiveCoin user={user} isPremium={isPremium} />}
                {!Timed && <View style={styles.acontainer}>{
                          live.map((show,index)=>{
                            return  <FImage source={show ? require('../../../assets/images/red_apple.webp') 
                            :require('../../../assets/images/grey_apple.webp')} 
                                    style={styles.apple}
                                    key={index} 
                                    />
                        })
                        }
                      </View>}
                {Timed && <View style={styles.timewrapper}>
                          <Timer Time={Time} stopgame={stopgame} colors={colors} restart={restart}/>
                        </View>
                    }
        </View>
        <View style={[styles.viewtwo]}>
            <ProgressBar count={count} total={noanimals} />
            <Text style={[styles.text,{color:colors.textcolor}]}>{count+1}/{noanimals}</Text>
        </View>
    </>
  )
}

export default React.memo(GameHeader)
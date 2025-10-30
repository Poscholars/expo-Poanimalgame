import { withObservables } from '@nozbe/watermelondb/react'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Text } from 'react-native'
import styles from './styles'

const Coin = ({user,isPremium}) => {

    const {colors} = useTheme()

   return  <Text style={[styles.coin,{color:colors.textcolor}]}>{isPremium ? "Infinite" : user.coinAmount}</Text>
}
   

const enhance = withObservables(['user'],({user})=>({
    user
}))

const EnhancedCoin = enhance(Coin)

export default EnhancedCoin
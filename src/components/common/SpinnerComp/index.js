import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View,ActivityIndicator } from 'react-native'
import styles from './styles'

const SpinnerComp = () => {

    return (
        <View style={[styles.indicator,{backgroundColor:"white"}]}>
           <ActivityIndicator size="large" color={"green"} />
        </View>
    )
}

export default SpinnerComp

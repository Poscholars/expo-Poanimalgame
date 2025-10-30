import { useTheme } from "@react-navigation/native"
import React from "react"
import {View,Text,ActivityIndicator} from 'react-native'
import styles from "./styles"



const LoadingComponent = () => {

    const {colors} = useTheme()
    return(
        <View style={styles.holder}>
            <ActivityIndicator size="large" color={colors.green}/>
            <Text style={[styles.text,{color:colors.textcolor}]}>Please Wait...</Text>
        </View>
    )
} 


export default LoadingComponent
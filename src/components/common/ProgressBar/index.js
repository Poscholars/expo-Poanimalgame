import React from 'react'
import { View} from 'react-native'
import styles from './styles'


const ProgressBar = ({count,total}) => {
    
    return (
        <View style={styles.wrapper}>
            <View style={[styles.progress,{width:`${Math.round(((count+1)/total)*100)}%`}]} />
        </View>
    )
}

export default React.memo(ProgressBar)

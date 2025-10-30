import React from 'react'
import { View, Text,ActivityIndicator } from 'react-native'
import ModalComponent from '../Modal'
import styles from "./styles"
import FImage from '../FImage'
import { useTheme } from '@react-navigation/native'

export const BodyModal  = React.memo(({unlocked}) => {
    const {colors,dark} = useTheme()
    return(
         <View style={styles.unlockContainer}>{unlocked ?
            <View style={styles.unlockContainer}>
                <View style={styles.premium}>
                <Text style={styles.text}>You are now a Premium User</Text>
                <FImage 
                    source={dark ? require('../../../assets/images/unlockdark.webp')
                    : require('../../../assets/images/unlocklight.webp')}
                    style={styles.icon}
                />
                </View>
                </View>
            :<View style={styles.unlockContainer}>
                <Text style={styles.warning}>Do not close this component</Text>
                <ActivityIndicator size="large" color={colors.green} style={styles.indicate}/>
                
            </View>}

        </View> 
        
    )
})

export const UnlockModal = React.memo(({Title,visible,setVisibility,BodyModal}) => {
    return(
        <ModalComponent
                Title = {Title}
                visible={visible}
                setVisibility={setVisibility}
                bodyComponent={BodyModal}
                
            />
    )

})

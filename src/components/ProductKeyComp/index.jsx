import React from 'react'
import { View, Text, TouchableOpacity,ToastAndroid,Platform } from 'react-native'
import ModalComponent from '../common/Modal'
import styles from './styles'
import Clipboard from '@react-native-clipboard/clipboard'
import { PAYMENT_COMP } from '../../constants/routeNames'
import { useNavigation } from '@react-navigation/core'
import AlertComp from '../common/AlertComp'
import { useTheme } from '@react-navigation/native'

const BodyComp = ({phoneId,setVisibility}) => {
    const {navigate} = useNavigation()
    const {colors} = useTheme()
  
    const copy = () => {
        Clipboard.setString(phoneId)
        if(Platform.OS === 'android'){
            ToastAndroid.showWithGravityAndOffset(
                "Purchase Id successfully copied",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                60
            )
        }else{
            AlertComp("Copied","Purchase Id successfully copied")
        }
        
        setVisibility(false)
    }
    return (<>
            <View style={styles.wrapper}>
               {phoneId != null ? <Text style={[styles.text,{color:colors.textcolor}]}>{phoneId}</Text>
                : <><Text style={[styles.text,{color:colors.textcolor}]}>Your purchase Id will appear here <Text style={[styles.text,{fontWeight:"bold"}]}>
                but you are not a premium user</Text></Text>
                <Text style={[styles.text,{color:colors.textcolor}]}>Click the button below to activate the app </Text></>
               }
            </View>
            <View style={styles.footHolder}>
               { phoneId != null ? 
                    <TouchableOpacity style={styles.footButton} onPressIn = {copy}>
                        <Text style = {[styles.footText,{color:colors.green}]}>COPY TO CLIPBOARD</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.footButton} onPressIn = {() => {
                        setVisibility(false)
                        navigate(PAYMENT_COMP)
                    }}>
                        <Text style = {[styles.footText,{color:colors.green}]}>ACTIVATE</Text>
                    </TouchableOpacity>
               }
            </View>
            </>
    )
}




const ProductKeyComp = ({visible,setVisibility,phoneId}) => {
   
    return (
        <ModalComponent 
            bodyComponent={<BodyComp phoneId={phoneId} setVisibility={setVisibility} />}
            visible={visible} 
            setVisibility={setVisibility}
            Title='Purchase Id'
            style={styles.body}
        />
    )
}

export default React.memo(ProductKeyComp)

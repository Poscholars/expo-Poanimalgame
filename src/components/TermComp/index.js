import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text,Modal,TouchableOpacity } from 'react-native'
import styles from './styles'

const TermComp = ({visible,setVisibility}) => {
    const {colors} = useTheme()
    return (
        <Modal visible={visible} transparent>
        <View style={styles.modal2}>
            <View style={[styles.modalLayout,{backgroundColor:colors.modalbackground}]}>
                <View style={styles.header}>
                    <Text style={[styles.termtext,{color:colors.textcolor}]}>
                        License Terms & Conditions <Text style={{color:"red"}}>(Must read)</Text>
                    </Text>
                </View>
                <View style={styles.textview}>
                    <Text style={[styles.text,{color:colors.textcolor}]}>
                        1. This Game should be paid for to unlock all functionality.
                    </Text>
                </View>
                <View style={styles.textview}>
                    <Text  style={[styles.text,{color:colors.textcolor}]}>
                    2. A single purchase is meant for one device (phone/tablet etc).
                    You cannot transfer your purchase to another phone/tablet even if
                    you misplace your device.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                    </Text>
                </View>
                <View style={styles.textview}>
                    <Text  style={[styles.text,{color:colors.textcolor}]}>
                    3. Do not flash, root or factory reset your phone/tablet as this will disable your purchase.
                    </Text>
                </View>
                <View style={styles.textview}>
                    <Text  style={[styles.text,{color:colors.textcolor}]}>
                    4. You will need to make another purchase if you misplace, flash or factory reset your
                    device (phone/tablet).   
                    </Text>
                </View>
                <View style={styles.textview}>
                    <Text  style={[styles.text,{color:colors.textcolor}]}> 
                    5. We use your information such as your e-mail address and phone number to confirm your purchase.
                    </Text>
                </View>
                <View style={styles.textview}>
                    <Text  style={[styles.text,{color:colors.textcolor}]}> 
                    6. When reinstalling the app, to become a premium user, simply sign up with your previous email and phone number. Then, click the activate online button in the menu section.
                    </Text>
                </View>
                <View style={styles.buttonU}>
                    <TouchableOpacity onPressIn={()=>{
                        setVisibility(false)
                    }}>
                        <Text style={[styles.buttonT,{color:colors.green}]}>GOT IT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
    )
}

export default TermComp

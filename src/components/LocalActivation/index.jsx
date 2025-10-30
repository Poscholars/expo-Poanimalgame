import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity,Modal } from 'react-native'
import FImage from '../common/FImage'
import Input from '../common/Input'
import { UnlockModal,BodyModal } from '../common/UnlockModal'
import styles from './styles'

const LocalActComp = ({visible,setVisibility,visible5,setVisibility5,unlocked,onActivate}) => {
    const {colors} = useTheme()
    return (
        <>
        <Modal visible={visible5} transparent>
        <View style={styles.modal2}>
            <View style={[styles.top,{borderColor:colors.green,backgroundColor:colors.green}]}>
                <TouchableOpacity onPressIn={()=> setVisibility5(false)}>
                    <FImage  
                        source={require('../../assets/images/cancellight.webp')} 
                        style={styles.cancel}
                        tintColor={"white"}
                        />
                </TouchableOpacity>
                <Text style={styles.Toptext}>Get your purchase Id</Text>
            </View>
            <View style={[styles.bottom,{borderColor:colors.green,backgroundColor:colors.modalbackground}]}>
                <TouchableOpacity 
                    onPress={onActivate}
                    delayPressIn={0}
                    style={[styles.actButton,{backgroundColor:colors.green}]}
                >
                    <Text style={styles.Buttontext}>ACTIVATE ONLINE</Text> 
                </TouchableOpacity>
        
            </View>
        </View>
        </Modal>
        <UnlockModal
            Title = {unlocked ? "Unlock Successful" :"Unlocking App..."}
            visible={visible}
            setVisibility={setVisibility}
            BodyModal =  {<BodyModal unlocked={unlocked} />}
        />
        </>
    )
}

export default React.memo(LocalActComp)

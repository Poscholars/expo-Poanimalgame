import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Modal,View,Text,TouchableOpacity, ActivityIndicator,Platform,ToastAndroid } from 'react-native'
import AlertComp from '../AlertComp'

import FImage from '../FImage'
import styles from './styles'


const ShowNotiCoin = ({visible,notidata,onCancel,database,data}) => {
    const {colors,dark} = useTheme()
    const [loading,setLoading] = useState(false)
    const [success,setSuccess]  = useState(false)
    const updateNow = async () => {
       const updatedata = eval(data.data)
       setLoading(v => true)
       const gameuser = await database.collections.get('coin').query().fetch()
       gameuser[0].increaseCoin(parseInt(updatedata[0].coin))
       onCancel()
        if(Platform.OS === 'android'){
            ToastAndroid.showWithGravityAndOffset(
                `Congratulations you just received ${updatedata[0].coin} number of coins` ,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                50
                )  
        }else{
            AlertComp("Coins received",`Congratulations you just received ${updatedata[0].coin} number of coins`)
        }
        
        setLoading(v => false)

    }

 
    
    return (
        <Modal visible={visible} transparent>
        <View style={styles.modal}>
        {notidata && <View style={styles.modalLayout}>
                 <View>
                <Text style={styles.textT}>A new notification just arrived
                    </Text>
                        {!loading ? 
                        <>
                            <Text style={styles.textA}>{notidata.notification.title}
                            </Text>
                            <Text style={styles.textAd}>{notidata.notification.body}
                            </Text>
                        </>
                       : success ? 
                        <>
                        <View style={styles.premium}>
                            <Text style={styles.text}>You are now a Premium User</Text>
                            <FImage 
                                source={dark ? require('../../../assets/images/unlockdark.webp')
                                    : require('../../../assets/images/unlocklight.webp')}
                                style={styles.icon}
                            />
                            </View>
                        </>
                        :
                        <>
                        <Text style={styles.textA}>Please wait...
                        </Text>
                        <ActivityIndicator size="large" color="green" />
                        </>}
                </View>
                <View style={styles.bholder}>
                    <TouchableOpacity activeOpacity={0.9} delayPressIn={0} onPress={onCancel}>
                        <Text style={styles.textC}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} delayPressIn={0} onPress={updateNow}>
                        <Text style={styles.textC}>RETRIEVE COIN</Text>
                    </TouchableOpacity>
                </View>
            </View>}
        </View>
        </Modal>
    )
}

export default ShowNotiCoin

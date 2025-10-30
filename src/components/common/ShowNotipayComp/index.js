import { useNavigation, useTheme } from '@react-navigation/native'
import React from 'react'
import { Modal,View,Text,TouchableOpacity } from 'react-native'
import { PAYMENT_COMP } from '../../../constants/routeNames'
import styles from './styles'

const ShowNotipayComp = ({visible,notidata,navi,onCancel}) => {
    const {navigate} = useNavigation()
    const {colors} = useTheme()
    const nav = () => {
        navi()
        navigate(PAYMENT_COMP)
    }
    return (
        <Modal visible={visible} transparent>
        <View style={styles.modal}>
        {notidata && <View style={styles.modalLayout}>
                 <View>
                <Text style={styles.textT}>A new notification just arrived
                    </Text>
                    <Text style={styles.textA}>{notidata.notification.title}
                    </Text>
                    <Text style={styles.textAd}>{notidata.notification.body}
                   </Text>
                </View>
                <View style={styles.bholder}>
                <TouchableOpacity activeOpacity={0.9} delayPressIn={0} onPress={onCancel}>
                        <Text style={styles.textC}>GOT IT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} delayPressIn={0} onPress={nav}>
                    <Text style={styles.textC}>PAY NOW</Text>
                </TouchableOpacity>
                </View>
            </View>}
        </View>
        </Modal>
    )
}

export default ShowNotipayComp 


import React from 'react'
import { Modal,View,Text,TouchableOpacity } from 'react-native'
import styles from './styles'

const ShowNotification = ({visible,notidata,onCancel}) => {

    
    return (
        <Modal visible={visible} transparent>
        <View style={styles.modal}>
        {notidata && <View style={[styles.modalLayout,{backgroundColor:"white"}]}>
                        <View>
                            <Text style={styles.textT}>A new notification just arrived</Text>
                            <Text style={styles.textA}>{notidata.notification.title}</Text>
                            <Text style={styles.textAd}>{notidata.notification.body}</Text>
                        </View>
                        <View style={styles.bholder}>
                            <TouchableOpacity activeOpacity={0.9} delayPressIn={0} onPress={onCancel}>
                                <Text style={styles.textC}>GOT IT</Text>
                            </TouchableOpacity>
                        </View>
            </View>}
        </View>
        </Modal>
    )
}

export default ShowNotification

import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import FImage from '../FImage'
import styles from './styles'


const isEqual = (prevProps,nextProps) => {
    const {visible,bodyComponent} = nextProps
    const{visible:nextbody,bodyComponent:body} = prevProps
    const arequal = visible === nextbody && body === bodyComponent
    return arequal 
}

const ModalComponent = ({
    visible,
    Title,
    setVisibility,
    BodyText,
    RightText,
    LeftText,
    RightOnpress,
    LeftOnpress,
    bodyComponent,
    style
}) => {
    const {colors,dark} = useTheme()
  
    return (
        <Modal visible={visible} transparent >
            <View style={styles.wrapper}>
                <View style={[styles.container,{backgroundColor:colors.background},style]}>
                    {setVisibility && <View style={styles.headerwrapper}>
                        <Text style={[styles.titletexth,{color:colors.green}]}>{Title}</Text>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={()=>{
                                setVisibility(v => false)
                            }}
                        >
                        <FImage 
                            source={dark ? require('../../../assets/images/canceldark.webp')
                            : require('../../../assets/images/cancellight.webp')
                        } 
                            style={styles.cancel}
                            />
                        </TouchableOpacity>
                        </View>}
                   {bodyComponent ? 
                    bodyComponent :
                    <>
                    <View style={styles.header}>
                        <Text style={[styles.titletext,{color:colors.textcolor}]}>{Title}</Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={[styles.bodytext,{color:colors.textcolor}]}>
                            {BodyText}
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        {LeftText && <TouchableOpacity onPress={LeftOnpress} activeOpacity={0.8}>
                                <Text style={[styles.bottomtext,{color:colors.green}]}>{LeftText} </Text>
                            </TouchableOpacity>}
                        {RightText && <TouchableOpacity onPress={RightOnpress} activeOpacity={0.8} >
                                <Text style={[styles.bottomtext,{color:colors.green}]}>{RightText}</Text>
                            </TouchableOpacity>}
                    </View>
                    </>}
                </View>
            </View>
        </Modal>
    )
}

export default React.memo(ModalComponent, isEqual) 

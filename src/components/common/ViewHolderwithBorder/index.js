import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import styles from './styles'

const ViewHolderWithBorder = ({children,style}) => {
const {colors} = useTheme()
  return (
    <View  style={[styles.inputholder,{backgroundColor:colors.modalbackground,borderColor:colors.green},style]}>
      {children}
    </View>
  )
}

export default ViewHolderWithBorder
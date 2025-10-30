import { View, Text } from 'react-native'
import React from 'react'
import FImage from '../../common/FImage'
import styles from './styles'

const BackPic = ({show}) => {
    
  return (
   <FImage
     source={show ? require("../../../assets/images/yellow.webp")
     : require("../../../assets/images/buttonletter.webp")}
     style={styles.imagechar}
   />
  )
}

export default React.memo(BackPic)
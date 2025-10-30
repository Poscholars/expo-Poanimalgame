import { withObservables } from '@nozbe/watermelondb/react'
import React from 'react'
import { Text } from 'react-native'
import styles from './styles'

const Name = ({user,style}) => (
    <Text style={style}>{user.userName}</Text>
)
const enhance = withObservables(['user'],({user})=>({
    user
}))

const EnhancedName = enhance(Name)

export default EnhancedName
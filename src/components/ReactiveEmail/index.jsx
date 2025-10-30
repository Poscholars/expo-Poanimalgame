import { withObservables } from '@nozbe/watermelondb/react'
import React from 'react'
import { Text } from 'react-native'
import styles from './styles'

const Email = ({user}) => (
    <Text style={styles.email}>{user.email}</Text>
)
const enhance = withObservables(['user'],({user})=>({
    user
}))

const EnhancedUser = enhance(Email)

export default EnhancedUser
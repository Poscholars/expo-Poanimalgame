import {StyleSheet} from 'react-native'
import colors from '../../assets/theme/colors'
import { ScaledSheet } from 'react-native-size-matters/extend'

export default ScaledSheet.create({
    wrapper: {
        paddingHorizontal:'10@s',
        marginTop:"15@s"

    },
    text:{
        fontSize: '16@ms',
        paddingHorizontal:'3@s',
        marginBottom:"5@s",
        fontFamily:"NunitoSans-Regular"    
    },
    body:{
     //height:"250@s"
    },
    footHolder:{
        alignItems:"flex-end",
        paddingRight:'15@ms',
    },
    footButton:{
        paddingTop:'10@ms',
        marginBottom:"20@s"
    },
    footText:{
        fontSize: '15@ms',
        color:"#ff8500",
        fontWeight:'bold',
        paddingRight:"10@ms",
        fontFamily:"NunitoSans-Bold"
    }
})
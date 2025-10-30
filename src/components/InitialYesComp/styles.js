import { ScaledSheet} from "react-native-size-matters";

export default ScaledSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-around"
    },
    toptext:{
       fontSize:"27@ms",
       fontFamily:"NunitoSans-Bold"
    },
    image:{
        height:"120@ms",
        width:"120@ms"
    },
    bodytext:{
        paddingVertical:"30@ms",
        paddingHorizontal:"18@ms",
        fontSize:"20@ms",
        fontFamily:"NunitoSans-Regular"
    },
    button:{
        width:"148@ms",
        height:"70@ms"
    }
})
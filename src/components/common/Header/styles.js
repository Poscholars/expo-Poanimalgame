
import { ScaledSheet} from "react-native-size-matters";

export default ScaledSheet.create({
    
    header:{
        height:"48@ms",
        flexDirection:"row",
        alignItems:"center"
    },
    image:{
        height:"20@ms",
        width:"20@ms",
    },
    image2:{
        height:"20@ms",
        width:"23@ms",
        marginRight:"5@ms"
    },
    gametext:{
        fontSize:"17@ms",
        color:"#006838",
        flex:1,
        fontFamily:"NunitoSans-Bold",

    },
    line:{
        backgroundColor:"#006838",
        height:"1.7@ms",
        width:"100%",
        alignSelf:"center"
    },
    darkbutton:{
        marginHorizontal:"20@ms"
    },
     imagefoot:{
        height:"20@ms",
        width:"20@ms",
        marginHorizontal:"20@ms"

     }

})
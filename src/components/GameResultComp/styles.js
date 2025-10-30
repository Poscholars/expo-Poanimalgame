import { ScaledSheet} from "react-native-size-matters";
import {Platform} from 'react-native'
export default ScaledSheet.create({
    container:{
        flex:1
    },
    viewholder:{
        flex:18.5,
    },
    innercontainer:{
        flex:1,
        marginTop:"70@ms",
        marginHorizontal:"40@ms",
        borderRadius:5,
        marginBottom:"60@ms",
        elevation:3,
        shadowColor: "#000",
        shadowOffset: {
            width: -0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderWidth:"0.4@ms"
    },
    viewone:{
        flex:0.6,
        justifyContent:"center",
        alignItems:"center",

    },
    viewtwo:{
        flex:0.4,
        justifyContent:"center",
        alignItems:"center"

    },
    viewthree:{
        flex:1.2,
        justifyContent:"center",
        alignItems:"center",

    },
    viewfour:{
        flex:0.6,
        justifyContent:"center",
        alignItems:"center"
    },
    thumbsup:{
        width:"150%",
        height:"150%",
        position:"absolute",
        bottom:"8%"
    },
    name:{
        fontSize:"30@ms",
        fontFamily:"NunitoSans-light"
    },
    nextbutton:{
        width:"75%",
        height:"75%"
    },
    board:{
        width:"100%",
        height:"85%",
        justifyContent:"center",
        alignItems:"center"
    },
    score:{
        fontSize:"22@ms",
        marginBottom:"5%",
        color:"white",
        fontFamily:"NunitoSans-Regular"
    },
    share:{
        alignSelf:"center",
        marginBottom:"20@ms"
    },
    sharetext:{
        fontSize:"17@ms",
        fontFamily:"NunitoSans-Bold"
    }
})
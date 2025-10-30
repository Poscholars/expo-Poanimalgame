import { ScaledSheet} from "react-native-size-matters";

export default ScaledSheet.create({
    viewone:{
      //  flex:1,
        flexDirection:"row",
        alignItems:"center",
        paddingTop:"12@ms",
     },
     viewtwo:{
      //   flex:1,
         flexDirection:"row",
         alignItems:"center",
         justifyContent:"space-evenly",
         paddingBottom:"12@ms"
     },
     coin:{
        width:"20@ms",
        height:"20@ms",
        marginHorizontal:"10@ms"
    },
    apple:{
        width:"20@ms",
        height:"20@ms",
        marginHorizontal:"4@ms"
    },
    acontainer:{
        flexDirection:"row"
    },
    timewrapper:{
        marginRight:"12@ms"
    },
    text:{
        fontFamily:"NunitoSans-Regular",
        fontSize:"14@ms"
    }
})
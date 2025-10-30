import { Dimensions } from "react-native";
import { ScaledSheet} from "react-native-size-matters/extend";

export default ScaledSheet.create({
    container:{
        flex:1,
        alignItems:"center"
    },
    top:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"90%"
    },
    bottom:{
        flex:2.2,
        width:"100%",
 
    },
    reachtext:{
        marginTop:"10@ms",
        fontSize:"14@s",
        paddingHorizontal:"14@ms",
        fontFamily:"NunitoSans-Regular"
    },
    logoImage:{
        width:"100@s",
        height:"100@s",
        marginTop:"20@s"
    },
    text1:{
        fontSize:"14@s",
        paddingHorizontal:"14@ms",
        marginTop:"10@ms",
        fontFamily:"NunitoSans-Regular"
    },
    text2:{
        fontSize:"14@s",
        paddingHorizontal:"14@ms",
        color:"red",
        marginTop:"10@ms",
 
    },
    text3:{
        fontSize:"14@s",
        paddingHorizontal:"14@ms",
        color:"black",
        marginTop:"10@ms",

    },
    text4:{
        fontSize:"14@s",
        paddingHorizontal:"14@ms",
        marginTop:"10@ms",
      
    },
    text5:{
        fontSize:"12@ms",
        paddingHorizontal:"14@ms",
        marginBottom:"10@s",
        marginTop:"10@ms"
     
    },
    name:{
        fontSize:"20@ms",
        paddingTop:"10@ms",
        fontFamily:"NunitoSans-Bold"
    } 

})
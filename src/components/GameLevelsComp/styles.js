import { ScaledSheet} from "react-native-size-matters";
import {Dimensions} from 'react-native'
export default ScaledSheet.create({
    body:{
        flex:1,
    },
    buttonholder:{
        flex:10,
        justifyContent:"space-around",
        alignItems:"center"
    },
    bottom:{
        flex:1.2,
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        backgroundColor:"purple",
        height:Dimensions.get('window').height*0.11,
        width:Dimensions.get('window').width*0.95,
        marginTop:10,
        flexDirection:"row-reverse",
        justifyContent:"space-between",
        borderRadius:"10@ms",
        borderWidth:"0.7@ms",
        borderColor: 'rgba(0,0,0,0.15)',
        shadowColor: "#000",
        shadowOffset: {
            width: -0.5,
            height: -0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 3,
    },
    levelholder:{
        position:"absolute",
        backgroundColor:"#006838",
        width:"35%",
        height:"35%",
        alignItems:"center",
        justifyContent:"center",
        borderBottomLeftRadius:"10@ms",
        borderTopRightRadius:"10@ms"
    },
    level:{
        color:"white",
        fontSize:"15@ms",
        fontFamily:"NunitoSans-Regular"
    },
    textholder:{
        alignSelf:"flex-end",
        flex:1,
        marginLeft:"15@ms",
        marginBottom:"12@ms"
    },
    image:{
        height:"95%",
        width:"18%",
        alignSelf:"center",
        marginLeft:"8@ms"
    },
    noani:{
        fontSize:"15@ms",
        fontWeight:"bold",
        fontFamily:"NunitoSans-Bold"
    },
    ani:{
        fontSize:"14@ms",
        fontFamily:"NunitoSans-Regular"
    },
    flat:{
        flex:1,
        alignItems:"center",
        paddingHorizontal:4
    },
    delete:{
        width:"22@ms",
        height:"22@ms",
        marginRight:"18@ms",
        marginLeft:"20@ms"
    },
    factbutton:{
        paddingHorizontal:"20@ms",
        paddingVertical:'10@ms',
        borderRadius:'20@ms'
    },
    text:{
       fontSize:'18@ms'
    }
})
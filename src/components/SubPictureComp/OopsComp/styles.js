import { ScaledSheet} from "react-native-size-matters";
import {Dimensions} from 'react-native'


export default ScaledSheet.create({
    wrapper:{
        backgroundColor: 'rgba(0,0,0,0.9)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',  
    },
    modalcontainer:{
        width: '90%',
        backgroundColor: 'white',
        borderRadius:5,
        paddingBottom:"8@ms",
        
    },
    oopsimage:{
        height:"160@ms",
        width:"200@ms",
        alignSelf:"center",
        position:"absolute",
        top:"-19%"
    },
    name:{
        fontSize:"30@ms",
        paddingTop:"50@ms",
        alignSelf:"center",
        fontFamily:"NunitoSans-Bold"
    },
    boardholder:{
        justifyContent:"center",
        alignItems:"center",
        marginBottom:"20@ms"
    },
    scoreboard:{
        width:"150@ms",
        height:"150@ms",
        justifyContent:"center",
        alignItems:"center"
    },
    modalbutton:{
        alignSelf:"center",
        width:"90%",
        height:"35@ms",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:"15@ms",
        borderRadius:"5@ms",
        borderWidth:"2@ms",
        borderColor:"green"
    },
    score:{
        fontSize:"25@ms",
        color:"#f2f2f2",
        fontWeight:"bold",
        fontFamily:"NunitoSans-Bold"
    },
   buttontext:{
        fontSize:"14@ms",
        color:"white",
        fontFamily:"NunitoSans-Regular"
    },
    adbuttonholder:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    rcontainer:{
        width:"92%",
        height:"71%",
        borderRadius:"10@ms"
    },
    rewrapper:{
        height: "100%",
        justifyContent:"center",
        alignItems:"center",
        width:"90%",
    },
    thumbsup:{
        height:"150@ms",
        width:"200@ms",
        alignSelf:"center",
        position:"absolute",
        top:"-20%"
    },
    rname:{
        fontSize:"40@ms",
        marginTop:"25%",
        alignSelf:"center",
        fontFamily:"NunitoSans-Bold"
       // marginBottom:"15@ms"
    },
    rboard:{
        width:`${Math.round((Dimensions.get("window").width)/2.5)}@ms`,
        height:`${Math.round((Dimensions.get("window").height)/5.5)}@ms`,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        top:0
    },
    rbholder:{
        alignItems:"center",
        top:"75%",
        left:"22.5%",
        position:"absolute"
    },
    rscore:{
        fontSize:"45@ms",
        color:"#f2f2f2",
        fontWeight:"bold"
    },
    rnext:{
        width:"170@ms",
        height:"70@ms"
    }

})
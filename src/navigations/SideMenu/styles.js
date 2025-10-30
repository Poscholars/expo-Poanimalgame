import {Platform} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'



export default ScaledSheet.create({
    Wrapper:{
        flex:1,
    },
    Container:{
       flex:1,
       justifyContent:"flex-end"
    },
    bodyholder:{
        flex:3.1,
    },
    Image: {
        flex:0.32,
        width:Platform.OS === 'android' ? "100%" : "100%",
        justifyContent:"center",
        alignItems:"center"
    },
    scroll:{
        flex:3,
    },
    userholder:{
        justifyContent:"flex-end",
        alignItems:"center"
    },
    nameholder:{
        justifyContent:"flex-end",
        alignItems:"center",
        marginTop:"15@ms"
    },
    sIcon:{
        color: 'white',
        width:"50@ms",
        height:"50@ms"
    },
    email:{
        color:"#006838",
        fontSize:'13@ms',
        paddingBottom:'5@ms'
    },
    Name:{
        fontWeight: 'bold',
        fontSize: '19@s',
        color:"#002413",
        paddingLeft:'5@ms',
        paddingTop:"8@ms"
    },
    subContainer:{
        paddingVertical: "2%",
        paddingLeft: "8%",
        paddingBottom: "5%",
        //backgroundColor:"green"
        
    },
    tText:{
        fontSize: '15@ms',
        color: "#414032",
        paddingTop:"15@ms"
    },
    cHolder:{
        flexDirection: 'row',
        alignItems:'center',
        paddingTop: "7%",
    },
    cIcon:{
        width:'20@ms',
        height:'20@ms'
    },
    cText:{
        paddingLeft: "15%",
        fontSize: '13@ms',
        fontWeight:'normal',
        paddingVertical:"10@ms"
    },
    line:{
        width:"95%",
        height:"1.0@ms",
        alignSelf:"center"
    }
})
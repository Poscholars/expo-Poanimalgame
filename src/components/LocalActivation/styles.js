import {Dimensions, StyleSheet} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
export default ScaledSheet.create({
    container:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
    top:{
        //justifyContent:"space-evenly",
        alignItems:'center',
        width:"90%",
        height:'40@ms',
        backgroundColor:"green",
        borderWidth:2,
        borderColor:"green",
        borderTopLeftRadius:6,
        borderTopRightRadius:6,
        flexDirection:"row"
    },
    bottom:{
        flexDirection:"column",
        width:"90%",
       // height: '170@ms',
        borderWidth:2,
        borderBottomLeftRadius:6,
        borderBottomRightRadius:6,
        padding:'7@ms',
        paddingBottom: "20@ms",
        justifyContent:"space-around",
        alignItems:'center',
    },
    Toptext:{
        fontSize:'18@ms',
        color:"white",
        paddingLeft:"50@ms",
        fontFamily:"NunitoSans-Regular"
    },
    actButton:{
        width: '210@ms',
        backgroundColor:"green",
        height:'38@ms',
        justifyContent:"center",
        alignItems:"center",
        borderRadius:9,
        marginTop:"25@ms",
        marginBottom:"15@ms"
    },
    actButton1:{
        width: '300@ms',
        backgroundColor:"green",
        height:'38@ms',
        justifyContent:"center",
        alignItems:"center",
        borderRadius:9,
    },
    input:{
        width:Dimensions.get('window').width*0.82,
    },
    Buttontext:{
        fontSize:'14@ms',
        fontWeight:"bold",
        color:"white",
        paddingHorizontal:'10@ms',
        fontFamily:"NunitoSans-Bold"
    },
    Buttontext1:{
        fontSize:'12@ms',
        fontWeight:"bold",
        color:"white",
    },
    modal2:{
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    or:{
        marginTop:"10@ms",
        marginBottom:"10@ms"
    },
    cancel:{
        height:"25@ms",
        width:"25@ms",
        marginLeft:"15@ms"
    }
})
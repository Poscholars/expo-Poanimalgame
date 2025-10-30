import { ScaledSheet} from "react-native-size-matters";
import {Dimensions} from 'react-native'

export default ScaledSheet.create({
    container:{
        flex:1,
    },
    viewthree:{
        flex:7.8,
        justifyContent:"center",
        alignItems:"center",
     
    },
    viewthreetext:{
        flex:3,
        justifyContent:"center",
        alignItems:"center",
        
        shadowColor: "#000",
        shadowOffset: {
            width: -0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 8,
        marginHorizontal:"3%",
        marginBottom:"6@ms",
        borderWidth:"0.3@ms",
        borderRadius:3,
    },
    viewfour:{
        flex:4.9,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
        flexWrap:"wrap",
    },
    viewfourtext:{
        flex:10,
        flexDirection:"row",
        justifyContent:"center",
        flexWrap:"wrap",
    },
    viewfive:{
        flex:1.5,
        alignItems:"center",
        justifyContent:"center"
    },
    displayImage:{
        height:"100%",
        width:"92%"
    },
    bottomButton:{
        flexDirection:"row",
        alignItems:"center"
    },
    hintcoin:{
        width:"30@ms",
        height:"30@ms",
    },
    hint:{
        fontSize:"17@ms",
        marginLeft:"10@ms"
    },
    buttonclick:{
        borderRadius:'28@ms',
        height:"42%",
        backgroundColor:"#e5e5e5",
        margin:"8@ms",
        flexBasis:"41.7%",
        justifyContent:"center",
        alignItems:"center"
    },
    buttonclickI:{
        borderRadius:'28@ms',
        height:"95%",
        justifyContent:"center",
        alignItems:"center"
    },
    buttonclicktext:{
        height:"45%",
        backgroundColor:"#e5e5e5",
        margin:"8@ms",
        flexBasis:"45%",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:"15@ms",
        fontFamily:"NunitoSans-Bold",
        paddingHorizontal:"6@ms"
    },
    titletext:{
        fontSize:"25@ms",
        fontWeight:"bold",
        fontFamily:"NunitoSans-Bold"
    }
})
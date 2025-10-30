import { StyleSheet} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
export default ScaledSheet.create({
    modal2:{
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',  
    },
    modalLayout:{
        backgroundColor:'white', 
        width:"96%", 
        height:"85%",
        borderRadius:4,
        justifyContent:"space-between",
    },
    textview:{
        paddingHorizontal:"10@ms"
    },
    header:{
        marginTop:'15@ms',
        marginLeft:'15@ms'
    },
    text:{
        fontSize:"14@ms"
    },
    buttonU:{
        marginBottom:'10@ms',
        alignSelf:"flex-end",
        marginRight:'35@ms'
    },
    buttonT:{
        fontSize:'17@ms',
        fontWeight:"bold",
        color:"#ff8500"
    },
    termtext:{
        fontSize:'16@s',
        fontWeight:"bold"
    }
})
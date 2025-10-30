
import { ScaledSheet } from 'react-native-size-matters'

export default ScaledSheet.create({
    wrapper:{
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',  
    },
    container:{
        width: '90%',
        backgroundColor: 'white',
        borderRadius:5,
    },
    headerwrapper:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:"12@ms"
    },
    titletexth:{
        fontSize: '19@ms',
        paddingHorizontal:"12@ms",
        fontWeight:"bold",
        fontFamily:"NunitoSans-Bold"
    },
    cancel:{
        height:"27@ms",
        width:"27@ms",
        marginRight:"15@ms"
    },
    header:{
        marginTop:"25@ms"
    },
    titletext:{
        fontSize: '17@ms0.1',
        paddingHorizontal:"12@ms",
        fontWeight:"bold",
        fontFamily:"NunitoSans-Bold"
    },
    body:{
        marginTop:"20@ms",
        fontFamily:"NunitoSans-Regular"
    },
    bodytext:{
        paddingHorizontal:"12@ms",
        fontSize:"16@ms",
        fontFamily:"NunitoSans-Regular"
    },
    footer:{
        flexDirection:"row",
        justifyContent:"flex-end",
        marginTop:"15@ms",
        marginBottom:"16@ms"
    },
    bottomtext:{
        marginRight:"30@ms",
        fontSize:"18@ms0.1",
        fontFamily:"NunitoSans-Regular"
    },
})
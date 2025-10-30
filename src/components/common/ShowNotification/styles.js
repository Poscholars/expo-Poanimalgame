
import {ScaledSheet} from 'react-native-size-matters'

export default ScaledSheet.create({
    image:{
        height:'200@ms',
        width:'200@ms',
    },
    modal:{
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',  
    },
    modalLayout:{
        backgroundColor:'white', 
        width:"85%", 
        borderRadius:'4@ms',
        justifyContent:"space-evenly",
        //alignItems:"center",
    },
    textA:{
        fontSize:'15@ms',
        paddingBottom:'5@ms',
        paddingHorizontal:'15@ms',
        fontWeight:"bold",
        paddingTop:"10@ms"
    },
    textAd:{
        fontSize:'15@ms',
        paddingBottom:'10@ms',
        paddingHorizontal:'15@ms',
    },
    textT:{
        fontSize:'17@ms0.2',
        fontWeight:"bold",
        paddingBottom:'1@ms',
        color:"#8c5b06",
        marginTop:"18@ms",
        paddingHorizontal:'15@ms',
     
    },
    bholder:{
        flexDirection:"row",
        marginRight:'40@ms',
        marginBottom:"15@ms",
        justifyContent:"flex-end"
    },
    textC:{
       
        fontSize:'15@ms',
        fontWeight:"bold",
        marginLeft:'50@ms',
        color:"#8c5b06",
       // letterSpacing:'1@ms'
    }
})
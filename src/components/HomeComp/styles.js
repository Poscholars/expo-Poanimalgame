
import { Dimensions, Platform } from "react-native";
import { ScaledSheet} from "react-native-size-matters";


const {scale,height} = Dimensions.get("window")
export default ScaledSheet.create({
   menubutton:{
       width:"23@ms",
       height:"30@ms",
       marginHorizontal:"15@ms"
   },
   toptext:{
       flex:1,
       fontSize:"17@ms"
   },
   container:{
       flex:1
   },
   textholder:{
       flex:0.6,
       alignItems:"center",
       justifyContent:"center",
       flexDirection:"row"
   },
   imagewrapper:{
       flex:10,
       justifyContent:"space-evenly",
      // backgroundColor:"blue"
   },
   welcome:{
       fontSize:"17@ms",
       marginRight:"5@ms",
       fontFamily:"NunitoSans-Regular"
   },
   name:{
       fontSize:"18@ms",
       fontWeight:"bold",
       fontFamily:"NunitoSans-Bold"
   },
   animalname:{
       fontSize:"16@ms",
       fontFamily:"NunitoSans-Regular"
   },
   imageholder:{
     flexDirection:"row",
     justifyContent:"space-evenly",
     marginHorizontal:"5@ms"  
   },
   box:{
        width:"40%",
        height:Dimensions.get("window").height*0.24,
        justifyContent:"space-around",
        alignItems:"center",
      //  backgroundColor:'blue'
   },
   innerbox:{
    width:Dimensions.get('window').width*0.6,
    height:Dimensions.get('window').width*0.37,
    justifyContent:'center',
    alignItems:'center'
   },
   backimage:{
    width:Platform.OS === 'android' ? "100%" : Platform.isPad ? "85%" : '100%',
    height:Platform.OS === 'android' ? "106%" : Platform.isPad ? "85%" : '106%',
    justifyContent:"flex-end",
    alignItems:"center",
   },
   innertext:{
       marginBottom:`${Math.round(+height*0.03 + +scale*14.42 - 23.7)}@ms`,
       flexDirection:"row",
       alignItems:"center",
       justifyContent:"space-between",
    
       
   },
   badge:{
       height:"17@ms",
       width:"17@ms"
   },
   badgetext:{
       color:"white",
       paddingLeft:"4@ms",
       fontSize:"13@ms"
   }
})
import { ScaledSheet} from "react-native-size-matters";
import {Dimensions} from 'react-native'

export default ScaledSheet.create({
  
   container:{
       flex:1
   },
   toptext:{
       fontSize:"22@ms",
       textAlign:"center",
       marginVertical:"10@ms",
       fontWeight:"bold",
       fontFamily:"NunitoSans-Bold"
   },
   button:{
       borderTopWidth:"0.3@ms",
       width:"96%",
       height:Dimensions.get('window').height*0.042,
       alignSelf:"center",
       justifyContent:"center"
   },
   text:{
       fontSize:"16@ms",
       marginLeft:"20@ms",
       fontFamily:"NunitoSans-Regular"

   }
   
})
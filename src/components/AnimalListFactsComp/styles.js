import { ScaledSheet} from "react-native-size-matters";
import {Dimensions,Platform} from 'react-native'
export default ScaledSheet.create({
  
   container:{
       flex:1
   },
   wrapper:{
       width:Dimensions.get("window").width,
       height:Dimensions.get("window").height,
       alignItems:"center",
   },
   text:{
       marginTop:'5@ms',
       fontSize:"20@ms",
       marginBottom:"5@ms",
       fontFamily:"NunitoSans-Regular"
   },
   image:{
       height:Platform.OS === 'android'?Dimensions.get("window").height*0.42:"35%",
       width:Platform.OS === 'android' ? Dimensions.get("window").width*0.85:"95%"
   },
   listbutton:{
       marginTop:"10@ms",
       height:"50@ms",
       width:"120@ms"
   },
   line:{
       marginTop:"5@ms",
       width:"95%",
       height:"1.2@ms"
   },
   linepre:{
    marginTop:"10@ms",
    marginBottom:"10@ms",
    width:"95%",
    height:"1.2@ms"
   },
   factsholder:{
       elevation:8,
       width:"92%",
       backgroundColor:"white",
       flex:0.68,
       marginTop:"8@ms",
       borderRadius:4,
       borderColor: 'rgba(0,0,0,0.15)',
       shadowColor: "#000",
        shadowOffset: {
            width: -0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        borderWidth:"0.4@ms",
   },
   factsholdernot:{
    elevation:8,
    width:"92%",
    backgroundColor:"white",
    flex:0.5,
    marginTop:"8@ms",
    borderRadius:4,
    borderColor: 'rgba(0,0,0,0.15)',
    shadowColor: "#000",
     shadowOffset: {
         width: -0.5,
         height: 0.5,
     },
     shadowOpacity: 0.5,
     shadowRadius: 4,
     borderWidth:"0.4@ms",
},
   toptext:{
       paddingLeft:"15@ms",
       paddingTop:"15@ms",
       fontSize:"16@ms",
       fontWeight:"bold",
       fontFamily:"NunitoSans-Bold"
   },
   bodytext:{
       fontSize:"15@ms",
       paddingHorizontal:"15@ms",
       paddingTop:"10@ms",
       fontFamily:"NunitoSans-Light"
   },
   activate:{
       alignSelf:"center",
       paddingTop:"10@ms",
       color:"red",
       fontSize:"14@ms",
       fontFamily:"NunitoSans-Bold"
   },
   overallwrapper:{
        paddingRight:"12@ms",
        paddingBottom:"10@ms"
   },
   pointholder:{
       flexDirection:"row",
       alignItems:"flex-start",
       marginLeft:"12@ms",
       marginTop:"10@ms",
       marginRight:"10@ms"
    
   },
   bullet:{
       width:"20@ms",
       height:"20@ms",
       marginRight:"10@ms"
   },
   point:{
       fontSize:"14.5@ms",
       paddingRight:"10@ms",
       marginRight:"10@ms",
       fontFamily:"NunitoSans-Light"
   },
   talkview:{
       position:"absolute",
       right:0,
       zIndex:10,
       width:"25%",
       backgroundColor:"red",
       height:"32@ms",
       justifyContent:"center",
       alignItems:"center",
       borderRadius:"5@ms"
   },
   talkbutton:{
       width:'100%',
       height:"100%",
       justifyContent:"center",
       alignItems:"center"

   },
   play:{
       fontSize:"15@ms",
       paddingHorizontal:"10@ms",
       paddingVertical:"5@ms",
       color:"white",
       fontWeight:"bold",
       fontFamily:"NunitoSans-Bold"
   },
   leftarr:{
    marginTop:'5@ms',
    fontSize:"20@ms",
    marginBottom:"5@ms",
    fontFamily:"NunitoSans-Regular",
    marginRight:"30@ms"
   },
   rightarr:{
    marginTop:'5@ms',
    fontSize:"20@ms",
    marginBottom:"5@ms",
    fontFamily:"NunitoSans-Regular",
    marginLeft:"30@ms"
   },
   holdernew:{
       flexDirection:"row",
       marginTop:"10@ms",
       marginLeft:"15@ms"
   },
   anitext:{
       paddingRight:"8@ms",
       color:"red",
       fontFamily:"NunitoSans-Regular",
       fontSize:"14@ms"
   },
   comingsoon:{
       color:"red",
       fontWeight:"bold",
       fontFamily:"NunitoSans-Regular",
       fontSize:"14@ms"
   }

   
})
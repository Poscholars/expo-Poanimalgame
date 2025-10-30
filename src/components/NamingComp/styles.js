import { ScaledSheet} from "react-native-size-matters";
import {Dimensions} from 'react-native'

export default ScaledSheet.create({
    container:{
       // flex:1
    },
    viewone:{
      //  flex:9,
       // justifyContent:"center",
        alignItems:"center",
    //    backgroundColor:"yellow",
        paddingVertical:"12@ms",
    },
    viewtwo:{
     //   flex:4,
        //alignItems:"center",
     //   justifyContent:"center",
        borderBottomWidth:"1.6@ms",
        borderColor:"#006838",
        paddingVertical:"12@ms",
  //      backgroundColor:"cyan",
     //   marginBottom:"10@ms",
        width:"98%",
      //  alignSelf:"center"
    },
    viewtwothree:{
      //  flex:6.5,
        borderBottomWidth:"1.6@ms",
        borderColor:"#006838",
        paddingVertical:"12@ms",
    //    backgroundColor:"cyan",
        width:"98%",
    },
    viewthree:{
    //    flex:4.7,
       // backgroundColor:"pink", 
       // flexDirection:"row",
      //  alignItems:"center",
       // justifyContent:"center",
      //  paddingTop:"8@ms",
      //  width:"98%",
     //   alignSelf:"center",

    },
    viewthreesc:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        flexWrap:"wrap",
        alignSelf:"center",
     //   backgroundColor:"orange",
        paddingVertical:"12@ms",

    },
    viewfour:{
     //   flex:1.5,
    //    justifyContent:"center",
    //    alignItems:"center"
  //  backgroundColor:"lightgreen"
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
        fontSize:"18@ms",
        marginLeft:"10@ms"
    },
    displayImage:{
     //   height:"98%",
        height:"260@mvs",
        width:"96%"
    },
    eachrow:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:"4@ms"
    },
    char:{
        width:'13%',
        height:"35@ms",
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:"1.5@ms",
        marginTop:"2.5@ms"
    },
    choiceview:{
        height:"40@ms",
        marginHorizontal:"1@ms",
        marginVertical:"1@ms",
        flexBasis:"11%",
        justifyContent:"center",
        alignItems:"center"
    },
    choicebutton:{
        height:"100%",
        width:"100%",
        marginHorizontal:"1@ms",
        marginVertical:"1@ms",
        flexBasis:"11%",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
      
    },
    backimage:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
      //  backgroundColor:"grey"
    },
    indicator:{
        width:"80%",
        height:"1.8@ms",
        backgroundColor:"#006838",
        marginTop:"1.5@ms",
    },
    indicator2:{
        width:"80%",
        height:"1.8@ms",
        marginTop:"1.5@ms",
    },
    text:{
        fontSize:"18@ms",
        padding:"2@ms"
    }

})
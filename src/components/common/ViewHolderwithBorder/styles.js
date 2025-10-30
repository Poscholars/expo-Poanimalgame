
import { Dimensions } from "react-native";
import { ScaledSheet} from "react-native-size-matters/extend";

export default ScaledSheet.create({
    inputholder:{
        width:Dimensions.get("window").width*0.9,
        backgroundColor:"white",
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
            width: -0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        borderWidth:"0.3@ms"
    }
})
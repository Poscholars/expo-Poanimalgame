import { StatusBar } from "react-native";
import { GlobalContext } from "../../../context/Provider";
import { useContext } from "react";


const MyStatusBar = () => {
    
      const {
        authState: {isDarktheme}
      } = useContext(GlobalContext);
     console.log(isDarktheme,'statusbar theme')
    return (
            <>
            {
                isDarktheme ?  <StatusBar translucent backgroundColor={"#000"} barStyle={'light-content'} />
                :  <StatusBar translucent backgroundColor="#006838" barStyle={'dark-content'} />
            }
            </>
    )
}

export default MyStatusBar
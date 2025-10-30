import { Linking} from "react-native"
import AlertComp from "../components/common/AlertComp"


export default (email,number,id1) => {

   const link = 'https://poscholars.com/api/animalgame/activation/onlineactivation.php?txtref='+ id1 + '&email=' + email + '&number=' + number
    Linking.openURL(link).then((data) => {
        //dosomething
    }).catch(() => {
        setVisibility2(v => false)
        AlertComp('An Error has occured','Make sure you have a browser installed on your device')
    });
}

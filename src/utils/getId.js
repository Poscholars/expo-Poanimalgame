import { Platform } from 'react-native';
import genTransRef from './genTransRef';
import { adId } from '../../modules/decryptionmodule';




export default () => {
  
    if(Platform.OS=='android'){
        const advertisingId =adId() 
        if(advertisingId == "" || advertisingId.substr(0,7) == "0000000"){
            let initKey = "wet67ysguiophyejopdhvbetasnkler7"
            let keyrev = initKey.split("").reverse()
            let leng = initKey.length
            let id = `${genTransRef(23)}${keyrev.splice(0,4).join("")}${genTransRef(19)}${keyrev.splice(0,4).join("")}${genTransRef(31)}${keyrev.splice(0,4).join("")}${genTransRef(20)}${keyrev.splice(0,4).join("")}${genTransRef(25)}${keyrev.splice(0,4).join("")}${genTransRef(23)}${keyrev.splice(0,4).join("")}${genTransRef(43)}${keyrev.splice(0,leng-8).join("")}${genTransRef(52)}`
            return [initKey,id]
        }else{
            let initKey = advertisingId.split("-").join("")
            let keyrev = initKey.split("").reverse()
            let leng = initKey.length
            let id = `${genTransRef(23)}${keyrev.splice(0,4).join("")}${genTransRef(19)}${keyrev.splice(0,4).join("")}${genTransRef(31)}${keyrev.splice(0,4).join("")}${genTransRef(20)}${keyrev.splice(0,4).join("")}${genTransRef(25)}${keyrev.splice(0,4).join("")}${genTransRef(23)}${keyrev.splice(0,4).join("")}${genTransRef(43)}${keyrev.splice(0,leng-8).join("")}${genTransRef(52)}`
            return [initKey,id]
        }       
    }else{
        let initKey =adId().split("-").join("")
        if(initKey==""){
            let initKey = "wet67ysguiophyejopdhvbetasnkler7"
            let keyrev = initKey.split("").reverse()
            let leng = initKey.length
            let id = `${genTransRef(23)}${keyrev.splice(0,4).join("")}${genTransRef(19)}${keyrev.splice(0,4).join("")}${genTransRef(31)}${keyrev.splice(0,4).join("")}${genTransRef(20)}${keyrev.splice(0,4).join("")}${genTransRef(25)}${keyrev.splice(0,4).join("")}${genTransRef(23)}${keyrev.splice(0,4).join("")}${genTransRef(43)}${keyrev.splice(0,leng-8).join("")}${genTransRef(52)}`
            return [initKey,id]
        }else{
            let keyrev = initKey.split("").reverse()
            let leng = initKey.length
            let id = `${genTransRef(23)}${keyrev.splice(0,4).join("")}${genTransRef(19)}${keyrev.splice(0,4).join("")}${genTransRef(31)}${keyrev.splice(0,4).join("")}${genTransRef(20)}${keyrev.splice(0,4).join("")}${genTransRef(25)}${keyrev.splice(0,4).join("")}${genTransRef(23)}${keyrev.splice(0,4).join("")}${genTransRef(43)}${keyrev.splice(0,leng-8).join("")}${genTransRef(52)}`
        
            return [initKey,id]
        }
        
    }
 
}


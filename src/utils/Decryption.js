import envs from '../config/env'
const CryptoJS = require("crypto-js");


export const Activationdecrypt =  (word,key,vec) => {
    let encryptdata = CryptoJS.AES.decrypt(
        word,
        CryptoJS.enc.Utf8.parse(key),
        {
            iv:CryptoJS.enc.Utf8.parse(vec),
            mode: CryptoJS.mode.CBC,   // default
            padding: CryptoJS.pad.Pkcs7
        }
    )
    let decryptedB64 =  encryptdata.toString(CryptoJS.enc.Utf8); 
    let decrypted = CryptoJS.enc.Base64.parse(decryptedB64).toString(CryptoJS.enc.Utf8); // Base64 decode the decrypted data

    return decrypted;
}


const Decryption = (ciphertext) => {
    const passkey = envs.PASS_KEY
    const bytes = CryptoJS.AES.decrypt(ciphertext, passkey)
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}

export default Decryption

export const transformId = (inikey) => {
    if(inikey.length === 32){
        return inikey.substr(0,1)+inikey.substr(4,1)+inikey.substr(8,1)+inikey.substr(12,1)+inikey.substr(16,1)+inikey.substr(20,1)+inikey.substr(24,1)+inikey.substr(28,1)+inikey.substr(31,1)
    }else{
        return inikey
    }

}

export const transformMail = (mail) => {
     let m = mail.split("@")
     if(m[0].lenght < 4){
         return m[0]
     }else{
         return m[0][m[0].length-1]+m[0][0]+m[0][1]
     }

}

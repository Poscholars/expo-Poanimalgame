import React from 'react'
import {Alert} from 'react-native'


export default (Title,msg,func) => {
    Alert.alert(
        Title,
        msg,
        [
          {
            text: "OK",
            onPress: () => {
              if(func != undefined){
                func()
              }else{
                //
              }
            }
          },
        ]
      );
}



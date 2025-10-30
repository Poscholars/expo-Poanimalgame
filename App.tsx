import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import AppNavContainer from "./src/navigations";
import GlobalProvider from './src/context/Provider';
import {Database} from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {mySchema} from "./src/watermelon/Schema"
import { AnimalData,Coin,Key,Link,UserData,DarkMode,PlaySound } from './src/watermelon/Model';
import { DatabaseProvider } from '@nozbe/watermelondb/react'
import { Platform, StatusBar, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './src/components/common/styles';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads'
import { enableFreeze } from 'react-native-screens';
import { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
enableFreeze(true);
const config = {
  maxAdContentRating: "PG",
  tagForChildDirectedTreatment: true,
  tagForUnderAgeConsent: true,
};




const adapter = new SQLiteAdapter({
  dbName: 'Watermelon',
  jsi:false,
  schema:mySchema,
  onSetUpError : error => {
    console.log("Unable to open database: ", error)
  }
})

const database = new Database({
 adapter,
 modelClasses:[
   AnimalData,UserData,Coin,Key,Link,DarkMode,PlaySound
 ]
})

 
 const App = () => {
    const insets = Platform.OS === 'android' ? useSafeAreaInsets() : {top:0,bottom:0,left:0,right:0};

    
  
  
   return (
   
      <GlobalProvider>
        <DatabaseProvider database={database}>
          <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
                <AppNavContainer />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </DatabaseProvider>
     </GlobalProvider> 
    
    
   )
 };
 
 
 export default App

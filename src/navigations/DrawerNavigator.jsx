import React,{useCallback} from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import SideMenu from './SideMenu'
import Home from '../screens/Home'
import { Platform } from 'react-native'


const getDrawerContent = (navigation) => {
    return <SideMenu navigation={navigation}/>
 
}
const Drawer = createDrawerNavigator()
const screenOptions = {
    headerShown:false,
    drawerStyle:{
        width:(Platform.OS === 'ios' && Platform.isPad) ? '50%' : '76%'
    }

}
const DrawerNavigator = () => {
    
    const drawCont = useCallback(({navigation})=> getDrawerContent(navigation),[])
  
    return (
        <Drawer.Navigator drawerType='front'
            drawerContent={drawCont}
            screenOptions={screenOptions}
        >
            <Drawer.Screen name='GENERAL STUDIES APP' component={Home}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default React.memo(DrawerNavigator)

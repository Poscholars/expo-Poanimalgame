import React from 'react'
import { INITIAL_PAGE,INITIAL_YES} from '../constants/routeNames';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import InitialPage from '../screens/InitialPage';
import InitialYes from '../screens/InitialYes/InitialYes';


const InitialStack = createNativeStackNavigator();

const cardStyle = ({current,layouts})=>{
    return {
        cardStyle:{
            transform: [
                {
                    translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                    }),
                },
            ],
        },
    };
}
const horizontalAnimation = {
    gestureDirection:'horizontal',
    cardStyleInterpolator:cardStyle,
    headerShown:false,
    animation:"slide_from_right"
};


const InitialNavigator = () => {
   
    return(
        <InitialStack.Navigator initialRouteName={INITIAL_PAGE} screenOptions={horizontalAnimation}>
            <InitialStack.Screen name={INITIAL_PAGE} component={InitialPage}></InitialStack.Screen>
            <InitialStack.Screen name={INITIAL_YES} component={InitialYes}></InitialStack.Screen>
        </InitialStack.Navigator>
    )
}

export default InitialNavigator

import React,{useCallback,useMemo} from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import DrawerNavigator from './DrawerNavigator.jsx';
import { GAME_LEVELS,
    CHECK_COIN, 
    GAME_RESULT, 
    NAME_LEVEL5, 
    NAME_LEVEL6, 
    PICTURE_LEVEL1,
    PICTURE_LEVEL2,
    PICTURE_LEVEL3,
    PICTURE_LEVEL4,
    ANIMAL_LIST, 
    ANIMAL_LIST_FACT, 
    FEED_BACK, 
    ABOUT_APP, 
    PAYMENT_COMP } from '../constants/routeNames.js';
import GameLevels from '../screens/GameLevels';
import PictureComp from '../screens/PictureGame';
import GameResult from '../screens/GameResult';
import NamingLevel from '../screens/NamingLevel';
import AnimalList from '../screens/AnimalList';
import AnimalListFact from '../screens/AnimalListFact';
import CheckCoin from '../screens/SideMenu/CheckCoin';
import Feedback from '../screens/SideMenu/FeedBack';
import About from '../screens/SideMenu/About';
import PaymentComponent from '../screens/SideMenu/PaymentPage';





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


 
const HomeNavigator = () => {
    
const HomeStack = useMemo(() => createNativeStackNavigator(),[])

    return(
        <HomeStack.Navigator initialRouteName={"Drawer"} screenOptions={horizontalAnimation} >
            <HomeStack.Screen name={"Drawer"} component={DrawerNavigator} />
            <HomeStack.Screen name={GAME_LEVELS} component={GameLevels} />
            <HomeStack.Screen name={PICTURE_LEVEL1} component={PictureComp} />
            <HomeStack.Screen name={PICTURE_LEVEL2} component={PictureComp} />
            <HomeStack.Screen name={PICTURE_LEVEL3} component={PictureComp} />
            <HomeStack.Screen name={PICTURE_LEVEL4} component={PictureComp} />
            <HomeStack.Screen name={GAME_RESULT} component={GameResult} />
            <HomeStack.Screen name={NAME_LEVEL5} component={NamingLevel} />
            <HomeStack.Screen name={NAME_LEVEL6} component={NamingLevel} />
            <HomeStack.Screen name={ANIMAL_LIST} component={AnimalList} />
            <HomeStack.Screen name={ANIMAL_LIST_FACT} component={AnimalListFact} />
            <HomeStack.Screen name={CHECK_COIN} component={CheckCoin} />
            <HomeStack.Screen name={FEED_BACK} component={Feedback} />
            <HomeStack.Screen name={ABOUT_APP} component={About} />
            <HomeStack.Screen name={PAYMENT_COMP} component={PaymentComponent} />
        </HomeStack.Navigator>
    )
}

export default React.memo(HomeNavigator)


import PushNotification, { Importance } from 'react-native-push-notification';
import Tts from 'react-native-tts'
import { Platform } from 'react-native';

export const ConfigNotify = () => {
    
    PushNotification.configure({
    onRegister: function (token) {
       // console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
       // console.log("NOTIFICATION:", notification);
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
       // notification.finish(PushNotificationIOS.FetchResult.NoData);
        // Tts.setDefaultRate(0.5)
        // Tts.speak(`Hi scholar, this is a notification from Poscholars general studies app. ${notification.data.speech}`)
        // Tts.stop()
    },
    
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    //requestPermissions: Platform.OS === 'ios'
    requestPermissions: true,
    });
    createChannel()
}

const createChannel = () => {
	PushNotification.createChannel(
		{
			channelId: 'gstwdbappnotify',
			channelName: 'gstwdbappnotify',
            importance: Importance.HIGH,
		},
		
	);
};
export const LocalNotify = () => {
    PushNotification.cancelAllLocalNotifications()   
    
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        title:"Hi Gamer",
        message: "Be reminded that the Animal Game is a great learning environment for you. We noticed you haven't been using the app recently. Do you want to explore now?", // (required)
        date: new Date(Date.now() + 259200000),
       // date: new Date(Date.now() + 10000), 
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        channelId: "gstwdbappnotify",
        largeIcon:"ic_launcher",
        bigLargeIcon:"ic_launcher",
        smallIcon:"ic_notification",
        invokeApp: true, 
        autoCancel: false,
        soundName: 'default',
        visibility: "public",
        vibrate: true,
        vibration: 1000,
        playSound: true,
      });
    
}

import { registerRootComponent } from 'expo';

import App from './App';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
if (!__DEV__) {
    console.log = () => {};
  }

const Layout = () => {
    return  <SafeAreaProvider>
                 <App />
            </SafeAreaProvider>
}
registerRootComponent(Layout);

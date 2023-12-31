import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { Cart, Favorites, Login, NewRivals, Orders, ProductDetails } from './screens';
import SignUp from './screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    light: require('./assets/fonts/Poppins-Light.ttf'),
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        animation: 'slide_from_right',
      }}>
        <Stack.Screen
          name={'Bottom Navigation'}
          component={BottomTabNavigation}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={'Cart'}
          component={Cart}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={'ProductDetails'}
          component={ProductDetails}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={'ProductList'}
          component={NewRivals}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={'Orders'}
          component={Orders}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={'Favorites'}
          component={Favorites}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={'SignUp'}
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
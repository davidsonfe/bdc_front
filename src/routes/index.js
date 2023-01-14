import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import Registration from '../pages/Registration'
import Home from '../pages/HomePage'
import CreateRoom from '../pages/CreateRoom'
import Room from '../pages/Room'
import EntryRoom from '../pages/EntryRoom'
import Maps from '../pages/Maps'

const Stack = createNativeStackNavigator();


export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CreateRoom"
              component={CreateRoom}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Room"
              component={Room}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="EntryRoom"
              component={EntryRoom}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Maps"
              component={Maps}
              options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

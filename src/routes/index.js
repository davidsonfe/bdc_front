import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import Registration from '../pages/Registration'

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
        </Stack.Navigator>
    )
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AuthNavigator;

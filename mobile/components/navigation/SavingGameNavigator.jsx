import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "../Minigames/SavingGame/IntroScreen";
import GameScreen from "../Minigames/SavingGame/GameScreen";
import SummaryScreen from "../Minigames/SavingGame/SummaryScreen";

const Stack = createNativeStackNavigator();

const SavingGameNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Summary" component={SummaryScreen}options={{ headerShown: false }} /> 
  </Stack.Navigator>
);

export default SavingGameNavigator;

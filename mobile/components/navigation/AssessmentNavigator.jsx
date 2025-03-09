import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InvestmentScreen from "../Minigames/InvestingAssessment/InvestmentScreen";
import AssessmentResults from "../Minigames/InvestingAssessment/AssessmentResults";

const Stack = createNativeStackNavigator();

const AssessmentNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Investment" component={InvestmentScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Assessment_Result" component={AssessmentResults} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AssessmentNavigator;

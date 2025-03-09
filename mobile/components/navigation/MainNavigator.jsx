import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../LandingPage/LandingPage";
import GameFeatures from "../LandingPage/GameFeatures";
import About from "../LandingPage/About";
import Blog from "../LandingPage/Blog";
import BudgetingBlog from "../LandingPage/BudgetingBlog";
import InvestingBlog from "../LandingPage/InvestingBlog";
import SavingBlog from "../LandingPage/SavingBlog";
import Home from "../Homepage/Home";
import AuthNavigator from "./AuthNavigator";
import SavingGameNavigator from "./SavingGameNavigator"
import AssessmentNavigator from "./AssessmentNavigator";

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator initialRouteName="LandingPage">
    <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
    <Stack.Screen name="GameFeatures" component={GameFeatures} options={{ headerShown: false }} />
    <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
    <Stack.Screen name="Blog" component={Blog} options={{ headerShown: false }} />
    <Stack.Screen name="BudgetingBlog" component={BudgetingBlog} options={{ headerShown: false }} />
    <Stack.Screen name="InvestingBlog" component={InvestingBlog} options={{ headerShown: false }} />
    <Stack.Screen name="SavingBlog" component={SavingBlog} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="SavingGame" component={SavingGameNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="Assessment" component={AssessmentNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default MainNavigator;

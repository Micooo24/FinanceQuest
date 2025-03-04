import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Homepage/Home';
import GameFeatures from './components/LandingPage/GameFeatures';
import About from './components/LandingPage/About';
import Blog from './components/LandingPage/Blog';
import BudgetingBlog from './components/LandingPage/BudgetingBlog';
import InvestingBlog from './components/LandingPage/InvestingBlog';
import SavingBlog from './components/LandingPage/SavingBlog';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen 
          name="LandingPage" 
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ headerShown: true, title: 'Login' }}
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="GameFeatures" 
          component={GameFeatures}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="About" 
          component={About}
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="Blog" 
          component={Blog}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="BudgetingBlog" 
          component={BudgetingBlog}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="InvestingBlog" 
          component={InvestingBlog}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SavingBlog" 
          component={SavingBlog}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
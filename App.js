import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DiceRollerScreen from './screens/DiceRollerScreen';
import TimerScreen from './screens/TimerScreen';
import CounterScreen from './screens/CounterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Dice Roller" 
          component={DiceRollerScreen} 
        />
        <Stack.Screen 
          name="Timer" 
          component={TimerScreen} 
          options={{ title: 'Timer' }} 
        />
        <Stack.Screen
          name="Counters"
          component={CounterScreen}
          options={{ title: 'Counters' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

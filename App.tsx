import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from './src/screen/homepage';
import SplashScreen from './src/screen/splashscreen';
import Transaction from './src/screen/transaction';
import AddTransaction from './src/screen/add_transation';
import ProfilePage from './src/screen/profilepage';
import colors from './src/theme/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Text, View } from 'react-native';
import { RootStackParamList, TabParamList } from './src/types'; // Ganti dengan path yang sesuai

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const getTransactions = async () => {
  try {
    const transactions = await AsyncStorage.getItem('@transactions');
    if (transactions !== null) {
      return JSON.parse(transactions);
    }
    return [];
  } catch (e) {
    console.error("Error fetching transactions:", e);
    return [];
  }
};

const addTransaction = async (newTransaction: any) => {
  try {
    const storedTransactions = await AsyncStorage.getItem('@transactions');
    const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

    transactions.push(newTransaction);
    await AsyncStorage.setItem('@transactions', JSON.stringify(transactions));
  } catch (e) {
    console.error("Error adding transaction:", e);
  }
};

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Transaction') {
            iconName = 'swap-horizontal-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.violet100,
        tabBarInactiveTintColor: colors.dark25,
      })}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const transactions = await getTransactions();
        if (transactions.length === 0) {
          await addTransaction({
            id: '1',
            type: 'income',
            amount: 1000,
            description: 'Initial Deposit',
            date: new Date().toISOString(),
          });
        }
        setDbLoaded(true);
      } catch (e) {
        console.error("Error loading data:", e);
      }
    };

    loadData();
  }, []);

  if (!dbLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading Data...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <React.Suspense fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text>Loading App...</Text>
        </View>
      }>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomePage" component={BottomTabNavigator} />
          <Stack.Screen name="AddTransaction" component={AddTransaction} />
        </Stack.Navigator>
      </React.Suspense>
    </NavigationContainer>
  );
}

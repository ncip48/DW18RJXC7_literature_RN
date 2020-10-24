import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import * as React from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Landing, Login, Register, Home } from "./src/screens";
import color from "./src/utils/color";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function bottomTabs() {
  return (
    <Tab.Navigator
      activeColor={color.white}
      inactiveColor={color.secondary}
      barStyle={{ backgroundColor: "#252525" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="md-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Icon name="md-search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Home}
        options={{
          tabBarLabel: "Add Literature",
          tabBarIcon: ({ color }) => (
            <Icon name="md-add-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Collection"
        component={Home}
        options={{
          tabBarLabel: "My Collection",
          tabBarIcon: ({ color }) => (
            <Icon name="md-bookmark" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="md-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoaded] = useFonts({
    "Metropolis-Light": require("./assets/fonts/Metropolis/Metropolis-Light.ttf"),
    "Metropolis-Regular": require("./assets/fonts/Metropolis/Metropolis-Regular.ttf"),
    "Metropolis-Bold": require("./assets/fonts/Metropolis/Metropolis-Bold.ttf"),
    "Times-Regular": require("./assets/fonts/TimesNewRoman/TimesNewRoman.ttf"),
    "Times-Bold": require("./assets/fonts/TimesNewRoman/Times-Bold.ttf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={bottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

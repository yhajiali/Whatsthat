import { Feather, MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import Colours from "../components/Reusable/colours";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Contacts from "../screens/Contacts";
import Search from "../screens/Search";
import Chats from "../screens/Chats";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colours.blue,
        },
        tabBarInactiveTintColor: "#F2E8E8E8",
        tabBarActiveTintColor: "white",
        headerStyle: { backgroundColor: Colours.blue },
        headerTitleStyle: {
          color: "white",
          textTransform: "uppercase",
          letterSpacing: 2,
        },
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="contacts" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="chat-bubble-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

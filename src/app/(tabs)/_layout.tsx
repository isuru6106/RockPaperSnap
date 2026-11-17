import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#20D6C0",
        tabBarInactiveTintColor: "#71819C",
        tabBarStyle: {
          backgroundColor: "#080D1B",
          borderTopColor: "#263650",
          borderTopWidth: 1,
          height: 75,
          paddingTop: 10,
          paddingBottom: 12,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "PLAY GAME",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "game-controller" : "game-controller-outline"}
              size={25}
              color={typeof color === "string" ? color : "#20D6C0"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="rules"
        options={{
          title: "GAME RULES",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color={typeof color === "string" ? color : "#20D6C0"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

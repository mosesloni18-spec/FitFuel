import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#11A9D8",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => "🏠" as any,
        }}
      />

      <Tabs.Screen
        name="routines"
        options={{
          title: "Routines",
          tabBarIcon: () => "📋" as any,
        }}
      />

      <Tabs.Screen
        name="fuel"
        options={{
          title: "Fuel",
          tabBarIcon: () => "🔥" as any,
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: () => "👤" as any,
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: () => "⚙️" as any,
        }}
      />
    </Tabs>
  );
}

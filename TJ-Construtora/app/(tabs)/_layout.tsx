import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      {/* Aba 1: Cadastro de Obras */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (

            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cadastroObras/index"
        options={{
          title: "Obras",
          tabBarIcon: ({ color }) => (
            <Ionicons name="construct" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cadastroFiscalizacao/index"
        options={{
          title: "Fiscalização",
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="detalhesObras/index"
        options={{
          title: "Detalhes",
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text" size={24} color={color} />
          ),
        }}
      />

      {/* Aba 2: Cadastro de Fiscalização */}
    </Tabs>
  );
}

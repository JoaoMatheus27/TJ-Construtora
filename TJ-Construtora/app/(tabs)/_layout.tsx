import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} />,
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="cadastrar"
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="plus-square" color={color} size={size} />,
          title: 'Cadastrar',
        }}
      />
      <Tabs.Screen
        name="obra"
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="building" color={color} size={size} />,
          title: 'Obras',
        }}
      />
    </Tabs>
  );
}

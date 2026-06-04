import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#6C63FF',
          shadowOpacity: 0.1,
          shadowRadius: 20,
          height: 65,
          paddingBottom: 10,
        },
        tabBarLabelStyle: { fontWeight: '600', fontSize: 11 },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculadora"
        options={{
          title: 'Calculadora',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
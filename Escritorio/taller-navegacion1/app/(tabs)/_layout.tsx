import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { COLORS } from '../../constants/theme';

// Pestañas del menú inferior
const TABS = [
  { name: 'index',       title: 'Home',        icon: 'home'       },
  { name: 'perfil',      title: 'Perfil',      icon: 'person'     },
  { name: 'calculadora', title: 'Calculadora', icon: 'calculator' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown:            false,
        tabBarActiveTintColor:   COLORS.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth:  0,
          elevation:       20,
          shadowColor:     COLORS.primary,
          shadowOpacity:   0.1,
          shadowRadius:    20,
          height:          65,
          paddingBottom:   10,
        },
        tabBarLabelStyle: { fontWeight: '600', fontSize: 11 },
      }}
    >
      {TABS.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={icon as any} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

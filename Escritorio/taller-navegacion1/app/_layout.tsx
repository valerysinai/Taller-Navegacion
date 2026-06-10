import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from '../constants/theme';

// Pantallas registradas en el Drawer (menú lateral)
const DRAWER_SCREENS = [
  { name: '(tabs)',        title: 'Inicio',        icon: 'home-outline'          },
  { name: 'configuracion', title: 'Configuración', icon: 'settings-outline'      },
  { name: 'scroll',        title: 'Scroll Lista',  icon: 'list-outline'          },
  { name: 'detalle',       title: 'Detalle',       icon: 'document-text-outline' },
];

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle:      { backgroundColor: COLORS.primary },
          headerTintColor:  '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
          drawerActiveTintColor:   COLORS.primary,
          drawerInactiveTintColor: '#64748B',
          drawerStyle: { backgroundColor: '#F8F7FF' },
        }}
      >
        {DRAWER_SCREENS.map(({ name, title, icon }) => (
          <Drawer.Screen
            key={name}
            name={name}
            options={{
              title,
              drawerIcon: ({ color }) => (
                <Ionicons name={icon as any} size={22} color={color} />
              ),
            }}
          />
        ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}

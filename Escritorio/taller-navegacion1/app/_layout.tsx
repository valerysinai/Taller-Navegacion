import { GestureHandlerRootView } from 'react-native-gesture-handler'; //habilita el reconocimiento de gestos táctiles en toda la app
import { Drawer } from 'expo-router/drawer'; // conector de la raiz de toda la navegacion
import { Ionicons } from '@expo/vector-icons'; // libreria de iconos para usar en la app

export default function Layout() { // componente que define la estructura de navegación de la aplicación
  return (
    //flex: 1 hace que ocupe toda la pantalla disponible.
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: '#6C63FF' }, // Encabezado superior
          headerTintColor: '#FFF', //  flecha de retroceso en el header 
          headerTitleStyle: { fontWeight: 'bold' }, // Estilo del título del header
          drawerActiveTintColor: '#6C63FF',
          drawerInactiveTintColor: '#64748B', //ítems no seleccionados
          drawerStyle: { backgroundColor: '#F8F7FF' },
        }}
      >
        <Drawer.Screen // Cada Drawer.Screen le dice al Drawer qué pantallas existen y cómo mostrarlas en el menú lateral.
          name="(tabs)"
          options={{
            title: 'Inicio',
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="configuracion"
          options={{
            title: 'Configuración',
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="scroll"
          options={{
            title: 'Scroll Lista',
            drawerIcon: ({ color }) => (
              <Ionicons name="list-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="detalle"
          options={{
            title: 'Detalle',
            drawerIcon: ({ color }) => (
              <Ionicons name="document-text-outline" size={22} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
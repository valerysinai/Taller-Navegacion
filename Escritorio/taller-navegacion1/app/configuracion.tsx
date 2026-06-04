import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; // Componentes base de React Native
import { LinearGradient } from 'expo-linear-gradient'; // Componente que dibuja un degradado de colores
import { Ionicons } from '@expo/vector-icons';

// Los datos de la pantalla
const items = [
  { icon: 'phone-portrait', title: 'Plataforma',    val: 'Android & iOS'        },
  { icon: 'logo-react',     title: 'React Native',  val: '0.76.x'               },
  { icon: 'cube',           title: 'Expo SDK',       val: '52'                   },
  { icon: 'git-branch',     title: 'Navegación',     val: 'Expo Router v4'       },
  { icon: 'layers',         title: 'Estructura',     val: 'File-based routing'   },
];

export default function ConfiguracionScreen() { // componente que define la estructura de navegación de la aplicación
  return (
    // Envuelve toda la pantalla en un ScrollView para que si el contenido es muy largo el usuario pueda desplazarse. 
    <ScrollView style={styles.container}> 
      <LinearGradient colors={['#6C63FF', '#4834DF']} style={styles.header}>
        <Ionicons name="settings" size={42} color="rgba(255,255,255,0.9)" />
        <Text style={styles.name}>Configuración</Text>
        <Text style={styles.role}>Información del proyecto</Text>
      </LinearGradient>

      <View style={styles.body}> 
        {items.map(it => ( //recorre el arreglo items y por cada objeto genera una fila visual. Es la forma estándar en React de renderizar listas de elementos sin repetir código.
          <View key={it.title} style={styles.row}> 
            <View style={styles.rowIcon}>
              <Ionicons name={it.icon as any} size={20} color="#6C63FF" /> 
            </View>
            <Text style={styles.rowKey}>{it.title}</Text>
            <Text style={styles.rowVal}>{it.val}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Navegación implementada</Text> 
        <View style={styles.navCard}> 
          {[//Muestra un resumen visual de los tres tipos de navegación implementados en el taller, lo cual es útil como evidencia de conocimiento que pide el PDF.
            { icon: 'layers',        label: 'Stack Navigator (Expo Router)' },
            { icon: 'apps',          label: 'Bottom Tabs Navigator'         },
            { icon: 'menu',          label: 'Drawer Layout'                 },
            { icon: 'arrow-forward', label: 'router.push / router.back()'  }, 
          ].map(n => (
            <View key={n.label} style={styles.navRow}>
              <Ionicons name={n.icon as any} size={18} color="#6C63FF" />
              <Text style={styles.navLabel}>{n.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Estilos para los componentes de la pantalla, utilizando StyleSheet de React Native para mantener el código organizado y fácil de mantener. 
const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F5F7FB' },
  header:       { padding: 36, alignItems: 'center', gap: 10 },
  name:         { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  role:         { color: 'rgba(255,255,255,0.75)', fontSize: 14 },
  body:         { padding: 20, gap: 12 },
  row:          {
    backgroundColor: '#FFF', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6,
  },
  rowIcon:      {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#EDE9FE',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  rowKey:       { color: '#94A3B8', fontSize: 13, flex: 1 },
  rowVal:       { color: '#1E293B', fontWeight: '700', fontSize: 14 },
  sectionTitle: { fontWeight: '700', fontSize: 16, color: '#1E293B', marginTop: 8, marginBottom: 4 },
  navCard:      {
    backgroundColor: '#FFF', borderRadius: 16, padding: 18, gap: 14,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6,
  },
  navRow:       { flexDirection: 'row', alignItems: 'center', gap: 12 },
  navLabel:     { color: '#374151', fontWeight: '600', fontSize: 14 },
});
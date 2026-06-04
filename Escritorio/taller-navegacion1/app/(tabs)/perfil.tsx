import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const datos = [
  { key: 'Nombre',              val: 'Aprendiz SENA',        icon: 'person'          },
  { key: 'Ficha',               val: '2024 — Taller RN',     icon: 'school'          },
  { key: 'Estado',              val: '✅ Activo',             icon: 'checkmark-circle'},
  { key: 'Partes completadas',  val: '6 / 6',                icon: 'trophy'          },
  { key: 'Tecnología',          val: 'React Native + Expo',  icon: 'logo-react'      },
];

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#EC4899', '#BE185D']} style={styles.header}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={40} color="#EC4899" />
        </View>
        <Text style={styles.name}>Aprendiz SENA</Text>
        <Text style={styles.role}>Desarrollo de Software</Text>
      </LinearGradient>

      <View style={styles.body}>
        {datos.map(d => (
          <View key={d.key} style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name={d.icon as any} size={20} color="#6C63FF" />
            </View>
            <Text style={styles.rowKey}>{d.key}</Text>
            <Text style={styles.rowVal}>{d.val}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB' },
  header: { padding: 36, alignItems: 'center', gap: 10 },
  avatarCircle: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center', marginBottom: 4,
  },
  name: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  role: { color: 'rgba(255,255,255,0.75)', fontSize: 14 },
  body: { padding: 20, gap: 12 },
  row: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6,
  },
  rowIcon: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#EDE9FE',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  rowKey: { color: '#94A3B8', fontSize: 13, flex: 1 },
  rowVal: { color: '#1E293B', fontWeight: '700', fontSize: 14 },
});
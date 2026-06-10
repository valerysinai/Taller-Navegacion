import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, GRADIENTS, SHADOW } from '../../constants/theme';

// ── Datos ────────────────────────────────────────────────────

const DATOS = [
  { icon: 'person',           label: 'Nombre',             value: 'Aprendiz SENA'       },
  { icon: 'school',           label: 'Ficha',              value: '2024 — Taller RN'    },
  { icon: 'checkmark-circle', label: 'Estado',             value: '✅ Activo'            },
  { icon: 'trophy',           label: 'Partes completadas', value: '6 / 6'               },
  { icon: 'logo-react',       label: 'Tecnología',         value: 'React Native + Expo' },
];

// ── Componente ───────────────────────────────────────────────

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header con avatar */}
      <LinearGradient colors={GRADIENTS.pink} style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={COLORS.pink} />
        </View>
        <Text style={styles.name}>Aprendiz SENA</Text>
        <Text style={styles.role}>Desarrollo de Software</Text>
      </LinearGradient>

      {/* Filas de información */}
      <View style={styles.body}>
        {DATOS.map(({ icon, label, value }) => (
          <View key={label} style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons name={icon as any} size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ── Estilos ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header:    { padding: 36, alignItems: 'center', gap: 10 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#FFF', justifyContent: 'center',
    alignItems: 'center', marginBottom: 4,
  },
  name:    { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  role:    { color: 'rgba(255,255,255,0.75)', fontSize: 14 },
  body:    { padding: 20, gap: 12 },
  row: {
    backgroundColor: COLORS.surface, borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', ...SHADOW,
  },
  iconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#EDE9FE',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  label: { color: COLORS.textMuted, fontSize: 13, flex: 1 },
  value: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
});

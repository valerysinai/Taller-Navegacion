import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradientHeader, SectionTitle } from '../components/ui';
import { COLORS, SHADOW } from '../constants/theme';

// ── Datos ────────────────────────────────────────────────────

const INFO_PROYECTO = [
  { icon: 'phone-portrait', label: 'Plataforma',   value: 'Android & iOS'      },
  { icon: 'logo-react',     label: 'React Native', value: '0.76.x'             },
  { icon: 'cube',           label: 'Expo SDK',      value: '52'                 },
  { icon: 'git-branch',     label: 'Navegación',    value: 'Expo Router v4'     },
  { icon: 'layers',         label: 'Estructura',    value: 'File-based routing' },
];

const NAVEGACION_IMPLEMENTADA = [
  { icon: 'layers',        label: 'Stack Navigator (Expo Router)' },
  { icon: 'apps',          label: 'Bottom Tabs Navigator'         },
  { icon: 'menu',          label: 'Drawer Layout'                 },
  { icon: 'arrow-forward', label: 'router.push / router.back()'  },
];

// ── Componente ───────────────────────────────────────────────

export default function ConfiguracionScreen() {
  return (
    <ScrollView style={styles.container}>
      <GradientHeader
        icon="settings"
        title="Configuración"
        subtitle="Información del proyecto"
      />

      <View style={styles.body}>
        {/* Información técnica */}
        {INFO_PROYECTO.map(({ icon, label, value }) => (
          <View key={label} style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons name={icon as any} size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}

        {/* Navegación implementada */}
        <SectionTitle style={{ marginTop: 8 }}>Navegación implementada</SectionTitle>

        <View style={styles.navCard}>
          {NAVEGACION_IMPLEMENTADA.map(({ icon, label }) => (
            <View key={label} style={styles.navRow}>
              <Ionicons name={icon as any} size={18} color={COLORS.primary} />
              <Text style={styles.navLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ── Estilos ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  body:      { padding: 20, gap: 12 },
  row: {
    backgroundColor: COLORS.surface, borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', ...SHADOW,
  },
  iconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#EDE9FE',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  label:   { color: COLORS.textMuted, fontSize: 13, flex: 1 },
  value:   { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
  navCard: {
    backgroundColor: COLORS.surface, borderRadius: 16,
    padding: 18, gap: 14, ...SHADOW,
  },
  navRow:  { flexDirection: 'row', alignItems: 'center', gap: 12 },
  navLabel:{ color: '#374151', fontWeight: '600', fontSize: 14 },
});

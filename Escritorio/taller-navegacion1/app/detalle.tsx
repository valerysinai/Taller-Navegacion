import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GradientHeader } from '../components/ui';
import { COLORS, SHADOW } from '../constants/theme';

// ── Datos ────────────────────────────────────────────────────

const INFO_STACK = [
  { label: 'Tipo',        value: 'Stack Navigator'        },
  { label: 'Navegación',  value: "router.push('/detalle')" },
  { label: 'Retorno',     value: 'router.back()'          },
];

const CODIGO_EJEMPLO = `// Navegar a esta pantalla
router.push('/detalle');

// Volver a la pantalla anterior
router.back();

// Expo Router convierte cada
// archivo en una ruta automática`;

// ── Componente ───────────────────────────────────────────────

export default function DetalleScreen() {
  return (
    <ScrollView style={styles.container}>
      <GradientHeader
        icon="document-text"
        title="Pantalla Detalle"
        subtitle="Stack Navigation — Expo Router"
        iconSize={48}
      />

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>¿Cómo llegué aquí?</Text>

        {/* Tarjeta informativa */}
        <View style={styles.infoCard}>
          {INFO_STACK.map(({ label, value }, index) => (
            <React.Fragment key={label}>
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>{label}</Text>
                <Text style={styles.infoVal}>{value}</Text>
              </View>
              {index < INFO_STACK.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Bloque de código */}
        <Text style={styles.sectionTitle}>Código de ejemplo</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.code}>{CODIGO_EJEMPLO}</Text>
        </View>

        {/* Botón volver */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#FFF" />
          <Text style={styles.backBtnTxt}>Volver atrás</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ── Estilos ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: COLORS.background },
  body:         { padding: 20 },
  sectionTitle: { fontWeight: '700', fontSize: 17, color: COLORS.textPrimary, marginBottom: 12, marginTop: 8 },
  infoCard: {
    backgroundColor: COLORS.surface, borderRadius: 20,
    padding: 18, marginBottom: 20, ...SHADOW,
  },
  infoRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  infoKey:  { color: COLORS.textMuted, fontSize: 13, fontWeight: '600' },
  infoVal:  { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700', flex: 1, textAlign: 'right' },
  divider:  { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  codeBlock:{ backgroundColor: '#1A1A2E', borderRadius: 16, padding: 18, marginBottom: 24 },
  code:     { color: '#A5B4FC', fontFamily: 'monospace', fontSize: 13, lineHeight: 22 },
  backBtn: {
    backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8, padding: 16, borderRadius: 18, marginBottom: 20,
  },
  backBtnTxt: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});

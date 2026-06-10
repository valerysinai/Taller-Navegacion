import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SectionTitle } from '../../components/ui';
import { COLORS, GRADIENTS, SHADOW } from '../../constants/theme';

// ── Datos ────────────────────────────────────────────────────

const BOTONES = [
  { label: 'Primario',   color: COLORS.primary, icon: 'flash'            },
  { label: 'Secundario', color: COLORS.pink,    icon: 'heart'            },
  { label: 'Éxito',      color: '#10B981',      icon: 'checkmark-circle' },
  { label: 'Peligro',    color: COLORS.danger,  icon: 'trash'            },
];

const MODAL_CONFIG = {
  info: {
    icon:   'information-circle' as const,
    color:  COLORS.primary,
    titulo: 'Información',
    texto:  'Este es un modal informativo. Muestra datos importantes al usuario.',
  },
  exito: {
    icon:   'checkmark-circle' as const,
    color:  COLORS.success,
    titulo: '¡Éxito!',
    texto:  'La operación se completó correctamente.',
  },
  alerta: {
    icon:   'warning' as const,
    color:  COLORS.warning,
    titulo: 'Advertencia',
    texto:  '¿Estás seguro de continuar? Esta acción no se puede deshacer.',
  },
};

const MODAL_TRIGGERS = [
  { tipo: 'info'   as const, label: 'Info',   color: COLORS.primary,      bg: '#EDE9FE' },
  { tipo: 'exito'  as const, label: 'Éxito',  color: COLORS.successDark,  bg: '#DCFCE7' },
  { tipo: 'alerta' as const, label: 'Alerta', color: COLORS.warningDark,  bg: '#FEF3C7' },
];

const LENGUAJES = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Kotlin', 'Swift'];

const NAVEGACION = [
  { ruta: '/detalle', icon: 'document-text', label: 'Pantalla Detalle (Stack)', bg: '#EDE9FE', color: COLORS.primary },
  { ruta: '/scroll',  icon: 'list',          label: 'Scroll Lista (FlatList)',  bg: '#FEF3C7', color: COLORS.warningDark },
];

// ── Componente principal ─────────────────────────────────────

export default function HomeScreen() {
  const [mensaje,      setMensaje]      = useState('');
  const [colorMsg,     setColorMsg]     = useState(COLORS.primary);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo,    setModalTipo]    = useState<keyof typeof MODAL_CONFIG>('info');
  const [opcion,       setOpcion]       = useState('JavaScript');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempOpcion,   setTempOpcion]   = useState('JavaScript');

  const mc = MODAL_CONFIG[modalTipo];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient colors={GRADIENTS.primary} style={styles.header}>
        <Text style={styles.title}>Taller React Native</Text>
        <Text style={styles.subtitle}>Expo Router + Navegación</Text>
      </LinearGradient>

      {/* ── PARTE 1: BOTONES ──────────────────────────────── */}
      <SectionTitle>🔘 Parte 1 — Botones</SectionTitle>

      <View style={styles.btnGrid}>
        {BOTONES.map(({ label, color, icon }) => (
          <TouchableOpacity
            key={label}
            style={[styles.btn, { backgroundColor: color }]}
            onPress={() => { setMensaje(`✅ ${label} — onPress!`); setColorMsg(color); }}
            activeOpacity={0.8}
          >
            <Ionicons name={icon as any} size={18} color="#FFF" />
            <Text style={styles.btnTxt}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {mensaje !== '' && (
        <View style={[styles.feedback, { borderLeftColor: colorMsg }]}>
          <Text style={[styles.feedbackTxt, { color: colorMsg }]}>{mensaje}</Text>
        </View>
      )}

      {/* ── PARTE 2: MODAL ────────────────────────────────── */}
      <SectionTitle>💬 Parte 2 — Dialog / Modal</SectionTitle>

      <View style={styles.modalTriggers}>
        {MODAL_TRIGGERS.map(({ tipo, label, color, bg }) => (
          <TouchableOpacity
            key={tipo}
            style={[styles.modalTrigger, { backgroundColor: bg }]}
            onPress={() => { setModalTipo(tipo); setModalVisible(true); }}
          >
            <Ionicons name={MODAL_CONFIG[tipo].icon} size={22} color={color} />
            <Text style={[styles.modalTriggerTxt, { color }]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name={mc.icon} size={64} color={mc.color} />
            <Text style={styles.modalTitle}>{mc.titulo}</Text>
            <Text style={styles.modalText}>{mc.texto}</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#F1F5F9' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelTxt}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: mc.color }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.okTxt}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ── PARTE 3: DROPDOWN ─────────────────────────────── */}
      <SectionTitle>📋 Parte 3 — Dropdown (Android & iOS)</SectionTitle>

      <View style={styles.pickerCard}>
        <Text style={styles.pickerLabel}>Lenguaje favorito</Text>

        {/* Android: spinner nativo directo */}
        {Platform.OS === 'android' && (
          <View style={styles.pickerWrap}>
            <Picker selectedValue={opcion} onValueChange={setOpcion} style={styles.picker}>
              {LENGUAJES.map(l => <Picker.Item key={l} label={l} value={l} />)}
            </Picker>
          </View>
        )}

        {/* iOS: botón que abre un bottom sheet con rueda */}
        {Platform.OS === 'ios' && (
          <>
            <TouchableOpacity
              style={styles.iosBtn}
              onPress={() => { setTempOpcion(opcion); setPickerVisible(true); }}
            >
              <Text style={styles.iosBtnTxt}>{opcion}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.primary} />
            </TouchableOpacity>

            <Modal
              visible={pickerVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setPickerVisible(false)}
            >
              <Pressable style={styles.iosOverlay} onPress={() => setPickerVisible(false)}>
                <Pressable onPress={() => {}}>
                  <View style={styles.iosSheet}>
                    <View style={styles.iosSheetHeader}>
                      <TouchableOpacity onPress={() => setPickerVisible(false)}>
                        <Text style={styles.iosCancelTxt}>Cancelar</Text>
                      </TouchableOpacity>
                      <Text style={styles.iosSheetTitle}>Lenguaje favorito</Text>
                      <TouchableOpacity onPress={() => { setOpcion(tempOpcion); setPickerVisible(false); }}>
                        <Text style={styles.iosDoneTxt}>Listo</Text>
                      </TouchableOpacity>
                    </View>
                    <Picker
                      selectedValue={tempOpcion}
                      onValueChange={setTempOpcion}
                      style={styles.iosWheelPicker}
                    >
                      {LENGUAJES.map(l => <Picker.Item key={l} label={l} value={l} />)}
                    </Picker>
                  </View>
                </Pressable>
              </Pressable>
            </Modal>
          </>
        )}

        <View style={styles.selectedBox}>
          <Ionicons name="code-slash" size={18} color={COLORS.primary} />
          <Text style={styles.selectedTxt}>Seleccionaste: {opcion}</Text>
        </View>
      </View>

      {/* ── NAVEGACIÓN ────────────────────────────────────── */}
      <SectionTitle>🗺️ Navegar</SectionTitle>

      {NAVEGACION.map(({ ruta, icon, label, bg, color }) => (
        <TouchableOpacity key={ruta} style={styles.navOption} onPress={() => router.push(ruta as any)}>
          <View style={[styles.navIcon, { backgroundColor: bg }]}>
            <Ionicons name={icon as any} size={22} color={color} />
          </View>
          <Text style={styles.navText}>{label}</Text>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ── Estilos ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },
  header:     { padding: 28, borderRadius: 28, marginTop: 16, marginBottom: 24 },
  title:      { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  subtitle:   { color: 'rgba(255,255,255,0.8)', marginTop: 4, fontSize: 14 },

  // Botones
  btnGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 12 },
  btn: {
    flex: 1, minWidth: '45%', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 18,
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8,
  },
  btnTxt:     { color: '#FFF', fontWeight: '700', fontSize: 15 },
  feedback: {
    backgroundColor: COLORS.surface, borderRadius: 14, padding: 14,
    borderLeftWidth: 4, marginBottom: 20, ...SHADOW,
  },
  feedbackTxt: { fontWeight: '600', fontSize: 14 },

  // Modal triggers
  modalTriggers:   { flexDirection: 'row', gap: 12, marginBottom: 20 },
  modalTrigger:    { flex: 1, alignItems: 'center', padding: 16, borderRadius: 18, gap: 6 },
  modalTriggerTxt: { fontWeight: '700', fontSize: 13 },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalBox: {
    width: '85%', backgroundColor: COLORS.surface,
    borderRadius: 28, padding: 30, alignItems: 'center',
  },
  modalTitle:  { fontSize: 24, fontWeight: 'bold', marginTop: 12, color: COLORS.textPrimary },
  modalText:   { color: COLORS.textSecondary, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  modalActions:{ flexDirection: 'row', gap: 12, marginTop: 24, width: '100%' },
  modalBtn:    { flex: 1, padding: 14, borderRadius: 14, alignItems: 'center' },
  cancelTxt:   { color: COLORS.textSecondary, fontWeight: '700' },
  okTxt:       { color: '#FFF', fontWeight: '700' },

  // Picker
  pickerCard:  { backgroundColor: COLORS.surface, borderRadius: 20, padding: 16, marginBottom: 20, ...SHADOW },
  pickerLabel: { fontWeight: '700', color: '#374151', marginBottom: 8 },
  pickerWrap:  { backgroundColor: COLORS.surfaceAlt, borderRadius: 14, overflow: 'hidden' },
  picker:      { height: 50 },
  selectedBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12,
    backgroundColor: '#EDE9FE', borderRadius: 10, padding: 10,
  },
  selectedTxt: { color: COLORS.primary, fontWeight: '700' },

  // iOS Picker
  iosBtn: {
    backgroundColor: COLORS.surfaceAlt, borderRadius: 14, paddingHorizontal: 14,
    paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  iosBtnTxt:       { color: COLORS.textPrimary, fontSize: 15, fontWeight: '600' },
  iosOverlay:      { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  iosSheet:        { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 34 },
  iosSheetHeader:  {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.borderLight,
  },
  iosSheetTitle:   { fontWeight: '700', color: COLORS.textPrimary, fontSize: 15 },
  iosCancelTxt:    { color: COLORS.textSecondary, fontSize: 15 },
  iosDoneTxt:      { color: COLORS.primary, fontWeight: '700', fontSize: 15 },
  iosWheelPicker:  { width: '100%' },

  // Navegación
  navOption: {
    backgroundColor: COLORS.surface, borderRadius: 18, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12, ...SHADOW,
  },
  navIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  navText: { flex: 1, fontWeight: '600', fontSize: 15, color: COLORS.textPrimary },
});

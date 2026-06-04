import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [mensaje, setMensaje] = useState('');
  const [colorMensaje, setColorMensaje] = useState('#6C63FF');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState<'info' | 'exito' | 'alerta'>('info');
  const [opcion, setOpcion] = useState('JavaScript');

  const presionarBtn = (texto: string, color = '#6C63FF') => {
    setMensaje(texto);
    setColorMensaje(color);
  };

  const abrirModal = (tipo: 'info' | 'exito' | 'alerta') => {
    setModalTipo(tipo);
    setModalVisible(true);
  };

  const modalConfig = {
    info: {
      icon: 'information-circle' as const,
      color: '#6C63FF',
      titulo: 'Información',
      texto: 'Este es un modal informativo. Muestra datos importantes al usuario.',
    },
    exito: {
      icon: 'checkmark-circle' as const,
      color: '#22C55E',
      titulo: '¡Éxito!',
      texto: 'La operación se completó correctamente.',
    },
    alerta: {
      icon: 'warning' as const,
      color: '#F59E0B',
      titulo: 'Advertencia',
      texto: '¿Estás seguro de continuar? Esta acción no se puede deshacer.',
    },
  };

  const mc = modalConfig[modalTipo];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <LinearGradient colors={['#6C63FF', '#4834DF']} style={styles.header}>
        <Text style={styles.title}>Taller React Native</Text>
        <Text style={styles.subtitle}>Expo Router + Navegación</Text>
      </LinearGradient>

      {/* ── PARTE 1: BOTONES ─────────────────────────── */}
      <Text style={styles.section}>🔘 Parte 1 — Botones</Text>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#6C63FF' }]}
          onPress={() => presionarBtn('✅ Botón Primario — onPress!', '#6C63FF')}
          activeOpacity={0.8}
        >
          <Ionicons name="flash" size={18} color="#FFF" />
          <Text style={styles.btnTxt}>Primario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#EC4899' }]}
          onPress={() => presionarBtn('💖 Botón Secundario — onPress!', '#EC4899')}
          activeOpacity={0.8}
        >
          <Ionicons name="heart" size={18} color="#FFF" />
          <Text style={styles.btnTxt}>Secundario</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#10B981' }]}
          onPress={() => presionarBtn('🌟 Botón Éxito — onPress!', '#10B981')}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle" size={18} color="#FFF" />
          <Text style={styles.btnTxt}>Éxito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#EF4444' }]}
          onPress={() => presionarBtn('🔴 Botón Peligro — onPress!', '#EF4444')}
          activeOpacity={0.8}
        >
          <Ionicons name="trash" size={18} color="#FFF" />
          <Text style={styles.btnTxt}>Peligro</Text>
        </TouchableOpacity>
      </View>

      {mensaje !== '' && (
        <View style={[styles.feedback, { borderLeftColor: colorMensaje }]}>
          <Text style={[styles.feedbackTxt, { color: colorMensaje }]}>{mensaje}</Text>
        </View>
      )}

      {/* ── PARTE 2: MODAL ───────────────────────────── */}
      <Text style={styles.section}>💬 Parte 2 — Dialog / Modal</Text>

      <View style={styles.modalBtns}>
        <TouchableOpacity
          style={[styles.modalTrigger, { backgroundColor: '#EDE9FE' }]}
          onPress={() => abrirModal('info')}
        >
          <Ionicons name="information-circle" size={22} color="#6C63FF" />
          <Text style={[styles.modalTriggerTxt, { color: '#6C63FF' }]}>Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modalTrigger, { backgroundColor: '#DCFCE7' }]}
          onPress={() => abrirModal('exito')}
        >
          <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
          <Text style={[styles.modalTriggerTxt, { color: '#16A34A' }]}>Éxito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modalTrigger, { backgroundColor: '#FEF3C7' }]}
          onPress={() => abrirModal('alerta')}
        >
          <Ionicons name="warning" size={22} color="#D97706" />
          <Text style={[styles.modalTriggerTxt, { color: '#D97706' }]}>Alerta</Text>
        </TouchableOpacity>
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
                <Text style={styles.modalBtnCancelTxt}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: mc.color }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnOkTxt}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ── PARTE 3: DROPDOWN ────────────────────────── */}
      <Text style={styles.section}>📋 Parte 3 — Dropdown (Android & iOS)</Text>

      <View style={styles.pickerCard}>
        <Text style={styles.pickerLabel}>Lenguaje favorito</Text>
        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={opcion}
            onValueChange={(val) => setOpcion(val)}
            style={styles.picker}
          >
            <Picker.Item label="JavaScript" value="JavaScript" />
            <Picker.Item label="TypeScript" value="TypeScript" />
            <Picker.Item label="Python" value="Python" />
            <Picker.Item label="Java" value="Java" />
            <Picker.Item label="Kotlin" value="Kotlin" />
            <Picker.Item label="Swift" value="Swift" />
          </Picker>
        </View>
        <View style={styles.selectedBox}>
          <Ionicons name="code-slash" size={18} color="#6C63FF" />
          <Text style={styles.selectedTxt}>Seleccionaste: {opcion}</Text>
        </View>
      </View>

      {/* ── NAVEGACIÓN ───────────────────────────────── */}
      <Text style={styles.section}>🗺️ Navegar</Text>

      <TouchableOpacity
        style={styles.navOption}
        onPress={() => router.push('/detalle')}
      >
        <View style={[styles.navIcon, { backgroundColor: '#EDE9FE' }]}>
          <Ionicons name="document-text" size={22} color="#6C63FF" />
        </View>
        <Text style={styles.navText}>Pantalla Detalle (Stack)</Text>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navOption}
        onPress={() => router.push('/scroll')}
      >
        <View style={[styles.navIcon, { backgroundColor: '#FEF3C7' }]}>
          <Ionicons name="list" size={22} color="#D97706" />
        </View>
        <Text style={styles.navText}>Scroll Lista (FlatList)</Text>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB', paddingHorizontal: 18 },
  header: { padding: 28, borderRadius: 28, marginTop: 16, marginBottom: 24 },
  title: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  subtitle: { color: 'rgba(255,255,255,0.8)', marginTop: 4, fontSize: 14 },
  section: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 14, marginTop: 6 },
  btnRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  btn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16, borderRadius: 18,
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8,
  },
  btnTxt: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  feedback: {
    backgroundColor: '#FFF', borderRadius: 14, padding: 14, borderLeftWidth: 4,
    marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
  },
  feedbackTxt: { fontWeight: '600', fontSize: 14 },
  modalBtns: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  modalTrigger: { flex: 1, alignItems: 'center', padding: 16, borderRadius: 18, gap: 6 },
  modalTriggerTxt: { fontWeight: '700', fontSize: 13 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalBox: {
    width: '85%', backgroundColor: '#FFF', borderRadius: 28,
    padding: 30, alignItems: 'center',
  },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 12, color: '#1E293B' },
  modalText: { color: '#64748B', textAlign: 'center', marginTop: 8, lineHeight: 22 },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 24, width: '100%' },
  modalBtn: { flex: 1, padding: 14, borderRadius: 14, alignItems: 'center' },
  modalBtnCancelTxt: { color: '#64748B', fontWeight: '700' },
  modalBtnOkTxt: { color: '#FFF', fontWeight: '700' },
  pickerCard: {
    backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 20,
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10,
  },
  pickerLabel: { fontWeight: '700', color: '#374151', marginBottom: 8 },
  pickerWrap: { backgroundColor: '#F8F7FF', borderRadius: 14, overflow: 'hidden' },
  picker: { height: 50 },
  selectedBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12,
    backgroundColor: '#EDE9FE', borderRadius: 10, padding: 10,
  },
  selectedTxt: { color: '#6C63FF', fontWeight: '700' },
  navOption: {
    backgroundColor: '#FFF', borderRadius: 18, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
  },
  navIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  navText: { flex: 1, fontWeight: '600', fontSize: 15, color: '#1E293B' },
});
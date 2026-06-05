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

export default function HomeScreen() {
  const [mensaje, setMensaje] = useState('');
  const [colorMensaje, setColorMensaje] = useState('#6C63FF');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState<'info' | 'exito' | 'alerta'>('info');
  const [opcion, setOpcion] = useState('JavaScript');

  // Solo para iOS: controla el modal del picker
  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempOpcion, setTempOpcion] = useState('JavaScript');

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

{/* ── PARTE 3: DROPDOWN ────────────────────────── */}
<Text style={styles.section}>Parte 3 — Dropdown (Android & iOS)</Text>

<View style={styles.pickerCard}>
  <Text style={styles.pickerLabel}>Lenguaje favorito</Text>

  {/* Android */}
  {Platform.OS === 'android' && (
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
  )}

  {/* iOS */}
  {Platform.OS === 'ios' && (
    <>
      <TouchableOpacity
        style={styles.iosPickerBtn}
        onPress={() => {
          setTempOpcion(opcion);
          setPickerVisible(true);
        }}
      >
        <Text style={styles.iosPickerBtnTxt}>{opcion}</Text>
        <Ionicons name="chevron-down" size={18} color="#6C63FF" />
      </TouchableOpacity>

      <Modal
        visible={pickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <Pressable
          style={styles.iosOverlay}
          onPress={() => setPickerVisible(false)}
        >
          <Pressable onPress={() => {}}>
            <View style={styles.iosSheet}>
              <View style={styles.iosSheetHeader}>
                <TouchableOpacity
                  onPress={() => setPickerVisible(false)}
                >
                  <Text style={styles.iosCancelTxt}>Cancelar</Text>
                </TouchableOpacity>

                <Text style={styles.iosSheetTitle}>
                  Lenguaje favorito
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setOpcion(tempOpcion);
                    setPickerVisible(false);
                  }}
                >
                  <Text style={styles.iosDoneTxt}>Listo</Text>
                </TouchableOpacity>
              </View>

              <Picker
                selectedValue={tempOpcion}
                onValueChange={(val) => setTempOpcion(val)}
                style={styles.iosWheelPicker}
                itemStyle={{
                  color: '#000',
                  fontSize: 20,
                }}
              >
                <Picker.Item label="JavaScript" value="JavaScript" />
                <Picker.Item label="TypeScript" value="TypeScript" />
                <Picker.Item label="Python" value="Python" />
                <Picker.Item label="Java" value="Java" />
                <Picker.Item label="Kotlin" value="Kotlin" />
                <Picker.Item label="Swift" value="Swift" />
              </Picker>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )}

  <View style={styles.selectedBox}>
    <Ionicons name="code-slash" size={18} color="#6C63FF" />
    <Text style={styles.selectedTxt}>
      Seleccionaste: {opcion}
    </Text>
  </View>
</View>
      {/* ── PARTE 2: MODAL ───────────────────────────── */}
      <Text style={styles.section}> Parte 2 — Dialog / Modal</Text>

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
      <Text style={styles.section}>Parte 3 — Dropdown (Android & iOS)</Text>

      <View style={styles.pickerCard}>
        <Text style={styles.pickerLabel}>Lenguaje favorito</Text>

        {/* Android: funciona directo, sin cambios */}
        {Platform.OS === 'android' && (
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={opcion}
              onValueChange={(val) => setOpcion(val)}
              style={styles.picker}
            >
              <Picker.Item label="JavaScript" value="JavaScript" />
              <Picker.Item label="TypeScript" value="TypeScript" />
              <Picker.Item label="Python"     value="Python"     />
              <Picker.Item label="Java"       value="Java"       />
              <Picker.Item label="Kotlin"     value="Kotlin"     />
              <Picker.Item label="Swift"      value="Swift"      />
            </Picker>
          </View>
        )}

        {/* iOS: botón que abre bottom sheet con wheel picker */}
        {Platform.OS === 'ios' && (
          <>
            <TouchableOpacity
              style={styles.iosPickerBtn}
              onPress={() => {
                setTempOpcion(opcion);
                setPickerVisible(true);
              }}
            >
              <Text style={styles.iosPickerBtnTxt}>{opcion}</Text>
              <Ionicons name="chevron-down" size={16} color="#6C63FF" />
            </TouchableOpacity>

            <Modal
              visible={pickerVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setPickerVisible(false)}
            >
              <TouchableOpacity
                style={styles.iosOverlay}
                activeOpacity={1}
                onPress={() => setPickerVisible(false)}
              >
                <TouchableOpacity activeOpacity={1} onPress={() => {}}>
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
                      onValueChange={(val) => setTempOpcion(val)}
                      style={styles.iosWheelPicker}
                    >
                      <Picker.Item label="JavaScript" value="JavaScript" />
                      <Picker.Item label="TypeScript" value="TypeScript" />
                      <Picker.Item label="Python"     value="Python"     />
                      <Picker.Item label="Java"       value="Java"       />
                      <Picker.Item label="Kotlin"     value="Kotlin"     />
                      <Picker.Item label="Swift"      value="Swift"      />
                    </Picker>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}

        <View style={styles.selectedBox}>
          <Ionicons name="code-slash" size={18} color="#6C63FF" />
          <Text style={styles.selectedTxt}>Seleccionaste: {opcion}</Text>
        </View>
      </View>

      {/* ── NAVEGACIÓN ───────────────────────────────── */}
      <Text style={styles.section}>Navegar</Text>

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
  
  // ── iOS ──────────────────────────────────────────
  iosPickerBtn: {
    backgroundColor: '#F8F7FF', borderRadius: 14, paddingHorizontal: 14,
    paddingVertical: 14, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
  },
  iosPickerBtnTxt: { color: '#1E293B', fontSize: 15, fontWeight: '600' },
  iosOverlay: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)',
  },
  iosSheet: {
    backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 34,
  },
  iosSheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#E2E8F0',
  },
  iosSheetTitle: { fontWeight: '700', color: '#1E293B', fontSize: 15 },
  iosCancelTxt: { color: '#64748B', fontSize: 15 },
  iosDoneTxt: { color: '#6C63FF', fontWeight: '700', fontSize: 15 },
  iosWheelPicker: { width: '100%' },
  navOption: {
    backgroundColor: '#FFF', borderRadius: 18, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
  },
  navIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  navText: { flex: 1, fontWeight: '600', fontSize: 15, color: '#1E293B' },
});
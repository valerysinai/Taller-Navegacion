import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'; //TouchableOpacity — componente de botón que se vuelve semitransparente al presionarse. Se usa para el botón "Volver atrás".
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';//es el objeto de Expo Router que permite controlar la navegación desde el código, sin necesidad de tocar ningún botón de la interfaz

export default function DetalleScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#6C63FF', '#4834DF']} style={styles.banner}>
        <Ionicons name="document-text" size={48} color="rgba(255,255,255,0.9)" />
        <Text style={styles.bannerTitle}>Pantalla Detalle</Text>
        <Text style={styles.bannerSub}>Stack Navigation — Expo Router</Text>
      </LinearGradient>

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>¿Cómo llegué aquí?</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoKey}>Tipo</Text>
            <Text style={styles.infoVal}>Stack Navigator</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoKey}>Navegación</Text>
            <Text style={styles.infoVal}>router.push('/detalle')</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoKey}>Retorno</Text>
            <Text style={styles.infoVal}>router.back()</Text>
          </View>
        </View> 

        <Text style={styles.sectionTitle}>Código de ejemplo</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.code}>
            {`// Navegar a detalle\nrouter.push('/detalle');\n\n// Volver atrás\nrouter.back();\n\n// Expo Router usa el\n// sistema de archivos\n// como rutas automáticas`}
          </Text>
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#FFF" />
          <Text style={styles.backBtnTxt}>Volver atrás</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

//Estilos para los componentes de la pantalla, utilizando StyleSheet de React Native para mantener el código organizado y fácil de mantener.
const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F5F7FB' },
  banner:       { padding: 36, alignItems: 'center', gap: 8 },
  bannerTitle:  { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  bannerSub:    { color: 'rgba(255,255,255,0.75)', fontSize: 14 },
  body:         { padding: 20 },
  sectionTitle: { fontWeight: '700', fontSize: 17, color: '#1E293B', marginBottom: 12, marginTop: 8 },
  infoCard:     {
    backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginBottom: 20,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
  },
  infoRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  infoKey:      { color: '#94A3B8', fontSize: 13, fontWeight: '600' },
  infoVal:      { color: '#1E293B', fontSize: 13, fontWeight: '700', flex: 1, textAlign: 'right' },
  divider:      { height: 1, backgroundColor: '#F1F5F9', marginVertical: 10 },
  codeBlock:    { backgroundColor: '#1A1A2E', borderRadius: 16, padding: 18, marginBottom: 24 },
  code:         { color: '#A5B4FC', fontFamily: 'monospace', fontSize: 13, lineHeight: 22 },
  backBtn:      {
    backgroundColor: '#6C63FF', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8, padding: 16, borderRadius: 18, marginBottom: 20,
  },
  backBtnTxt:   { color: '#FFF', fontWeight: '700', fontSize: 16 },
});
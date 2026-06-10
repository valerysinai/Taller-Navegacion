import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS, SHADOW } from '../constants/theme';

// ── Configuración ────────────────────────────────────────────

const LIMITE         = 30; // máximo de elementos en la lista
const CARGA_INICIAL  = 10; // elementos al abrir la pantalla
const CARGA_EXTRA    = 8;  // elementos por cada carga adicional

// ── Datos y tipos ────────────────────────────────────────────

const COLORES = [COLORS.primary, COLORS.pink, '#10B981', COLORS.warning, '#3B82F6', COLORS.danger];
const ICONOS  = ['person', 'star', 'heart', 'flash', 'globe', 'rocket'];
const ROLES   = ['Desarrollador', 'Diseñador', 'DevOps', 'QA Tester', 'Scrum Master'];

type Item = {
  id:     string;
  nombre: string;
  rol:    string;
  color:  string;
  icono:  string;
};

// Genera n items a partir del índice 'desde'
const generarItems = (desde: number, n: number): Item[] =>
  Array.from({ length: n }, (_, i) => ({
    id:     `${desde + i}`,
    nombre: `Usuario ${desde + i + 1}`,
    rol:    ROLES[(desde + i) % ROLES.length],
    color:  COLORES[(desde + i) % COLORES.length],
    icono:  ICONOS[(desde + i) % ICONOS.length],
  }));

// ── Componente de cada ítem ──────────────────────────────────

function ItemCard({ item, index }: { item: Item; index: number }) {
  return (
    <View style={[styles.item, { borderLeftColor: item.color }]}>
      <View style={[styles.avatar, { backgroundColor: item.color + '22' }]}>
        <Ionicons name={item.icono as any} size={22} color={item.color} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.nombre}</Text>
        <Text style={styles.itemRole}>{item.rol}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: item.color + '22' }]}>
        <Text style={[styles.badgeTxt, { color: item.color }]}>#{index + 1}</Text>
      </View>
    </View>
  );
}

// ── Componente principal ─────────────────────────────────────

export default function ScrollScreen() {
  const [items,       setItems]       = useState<Item[]>([]);
  const [cargando,    setCargando]    = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [refresco,    setRefresco]    = useState(false);

  // Carga inicial al montar la pantalla
  useEffect(() => {
    setTimeout(() => {
      setItems(generarItems(0, CARGA_INICIAL));
      setCargando(false);
    }, 1500);
  }, []);

  // Carga más items al llegar al final — se detiene al alcanzar el límite
  const cargarMas = useCallback(() => {
    if (cargandoMas)            return; // ya está cargando
    if (items.length >= LIMITE) return; // límite alcanzado
    setCargandoMas(true);
    setTimeout(() => {
      setItems(prev => {
        const restantes = LIMITE - prev.length;
        const cantidad  = Math.min(CARGA_EXTRA, restantes); // no pasar del límite
        return [...prev, ...generarItems(prev.length, cantidad)];
      });
      setCargandoMas(false);
    }, 1200);
  }, [cargandoMas, items.length]);

  // Reinicia la lista al jalar hacia abajo
  const onRefrescar = () => {
    setRefresco(true);
    setTimeout(() => {
      setItems(generarItems(0, CARGA_INICIAL));
      setRefresco(false);
    }, 1000);
  };

  const limiteAlcanzado = items.length >= LIMITE;

  // Pantalla de carga inicial
  if (cargando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingTxt}>Cargando elementos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra superior con conteo */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Lista de usuarios</Text>
        <Text style={styles.headerCount}>
          {items.length}{limiteAlcanzado ? ` / ${LIMITE} máx` : ' elementos'}
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <ItemCard item={item} index={index} />}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        onEndReached={cargarMas}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresco}
            onRefresh={onRefrescar}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        ListFooterComponent={
          cargandoMas ? (
            // Spinner mientras carga más
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.footerTxt}>Cargando más...</Text>
            </View>
          ) : limiteAlcanzado ? (
            // Mensaje cuando se alcanza el límite
            <View style={styles.footer}>
              <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
              <Text style={styles.footerTxt}>
                Todos los {LIMITE} elementos cargados
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

// ── Estilos ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: COLORS.background },
  loading:     { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingTxt:  { color: COLORS.primary, fontWeight: '600', fontSize: 16 },
  headerBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 18, paddingVertical: 14,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  headerTitle: { fontWeight: '700', fontSize: 16, color: COLORS.textPrimary },
  headerCount: { color: COLORS.primary, fontWeight: '600', fontSize: 13 },
  item: {
    backgroundColor: COLORS.surface, borderRadius: 18, padding: 16,
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 10, borderLeftWidth: 4, ...SHADOW,
  },
  avatar:    { width: 46, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  itemInfo:  { flex: 1 },
  itemName:  { fontWeight: '700', color: COLORS.textPrimary, fontSize: 15 },
  itemRole:  { color: COLORS.textSecondary, fontSize: 13, marginTop: 2 },
  badge:     { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  badgeTxt:  { fontWeight: '700', fontSize: 12 },
  footer:    { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, padding: 16 },
  footerTxt: { color: COLORS.primary, fontWeight: '600' },
});
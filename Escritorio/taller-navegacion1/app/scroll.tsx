/**
 * Tres hooks de React, cada uno con un propósito distinto:
useState — guarda datos que pueden cambiar y actualiza la pantalla cuando cambian.
useEffect — ejecuta código cuando el componente aparece en pantalla (o cuando cambian dependencias).
useCallback — memoriza una función para que no se recree en cada render, importante en listas grandes para no causar renders innecesarios.
*/ 
import React, { useState, useEffect, useCallback } from 'react'; 
import {View, Text, FlatList, ActivityIndicator,StyleSheet, RefreshControl,} from 'react-native';
/**
 * Los tres componentes clave de esta pantalla:

FlatList — lista optimizada que solo renderiza los elementos visibles en pantalla.
ActivityIndicator — el spinner de carga nativo del sistema operativo.
RefreshControl — habilita el gesto de "jalar hacia abajo" para recargar.
 */
import { Ionicons } from '@expo/vector-icons';

const COLORES = ['#6C63FF', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444'];
const ICONOS  = ['person', 'star', 'heart', 'flash', 'globe', 'rocket'];
const ROLES   = ['Desarrollador', 'Diseñador', 'DevOps', 'QA Tester', 'Scrum Master'];

const generar = (desde: number, n: number) =>
  Array.from({ length: n }, (_, i) => ({
    id:    `${desde + i}`,
    nombre:`Usuario ${desde + i + 1}`,
    rol:    ROLES[(desde + i) % 5],
    color:  COLORES[(desde + i) % COLORES.length],
    icono:  ICONOS[(desde + i) % ICONOS.length],
  }));

export default function ScrollScreen() {
  const [items, setItems]           = useState<ReturnType<typeof generar>>([]);
  const [cargando, setCargando]     = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [refresco, setRefresco]     = useState(false);

  useEffect(() => {
    setTimeout(() => { setItems(generar(0, 10)); setCargando(false); }, 1500);
  }, []);

  const cargarMas = useCallback(() => {
    if (cargandoMas) return;
    setCargandoMas(true);
    setTimeout(() => {
      setItems(prev => [...prev, ...generar(prev.length, 8)]);
      setCargandoMas(false);
    }, 1200);
  }, [cargandoMas]);

  const onRefrescar = () => {
    setRefresco(true);
    setTimeout(() => { setItems(generar(0, 10)); setRefresco(false); }, 1000);
  };

  if (cargando)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingTxt}>Cargando elementos...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Lista de usuarios</Text>
        <Text style={styles.headerCount}>{items.length} elementos</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        onEndReached={cargarMas}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refresco} onRefresh={onRefrescar}
            tintColor="#6C63FF" colors={['#6C63FF']} />
        }
        ListFooterComponent={
          cargandoMas ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color="#6C63FF" />
              <Text style={styles.footerTxt}>Cargando más...</Text>
            </View>
          ) : null
        }
        renderItem={({ item, index }) => (
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
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F5F7FB' },
  loading:      { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingTxt:   { color: '#6C63FF', fontWeight: '600', fontSize: 16 },
  headerBar:    {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 18, paddingVertical: 14,
    backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  headerTitle:  { fontWeight: '700', fontSize: 16, color: '#1E293B' },
  headerCount:  { color: '#6C63FF', fontWeight: '600', fontSize: 13 },
  item:         {
    backgroundColor: '#FFF', borderRadius: 18, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderLeftWidth: 4,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
  },
  avatar:       { width: 46, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  itemInfo:     { flex: 1 },
  itemName:     { fontWeight: '700', color: '#1E293B', fontSize: 15 },
  itemRole:     { color: '#64748B', fontSize: 13, marginTop: 2 },
  badge:        { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  badgeTxt:     { fontWeight: '700', fontSize: 12 },
  footer:       { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, padding: 16 },
  footerTxt:    { color: '#6C63FF', fontWeight: '600' },
});
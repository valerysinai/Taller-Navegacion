// ─────────────────────────────────────────────────────────────
// components/ui.tsx — Componentes reutilizables del taller
// Se importan en cualquier pantalla para no repetir código
// ─────────────────────────────────────────────────────────────

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, GRADIENTS, SHADOW } from '../constants/theme';

// ── 1. GradientHeader ────────────────────────────────────────
// Encabezado con degradado, ícono, título y subtítulo
// Usado en: Detalle, Configuración, Perfil, Scroll
interface GradientHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  gradient?: [string, string];
  iconSize?: number;
}

export function GradientHeader({
  icon,
  title,
  subtitle,
  gradient = GRADIENTS.primary,
  iconSize = 42,
}: GradientHeaderProps) {
  return (
    <LinearGradient colors={gradient} style={headerStyles.container}>
      <Ionicons name={icon as any} size={iconSize} color="rgba(255,255,255,0.9)" />
      <Text style={headerStyles.title}>{title}</Text>
      <Text style={headerStyles.subtitle}>{subtitle}</Text>
    </LinearGradient>
  );
}

const headerStyles = StyleSheet.create({
  container: { padding: 36, alignItems: 'center', gap: 8 },
  title:     { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  subtitle:  { color: 'rgba(255,255,255,0.75)', fontSize: 14 },
});

// ── 2. InfoRow ───────────────────────────────────────────────
// Fila con ícono, clave y valor — usada en Detalle y Configuración
interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  showDivider?: boolean;
}

export function InfoRow({ icon, label, value, showDivider = false }: InfoRowProps) {
  return (
    <>
      <View style={rowStyles.row}>
        <View style={rowStyles.iconBox}>
          <Ionicons name={icon as any} size={20} color={COLORS.primary} />
        </View>
        <Text style={rowStyles.label}>{label}</Text>
        <Text style={rowStyles.value}>{value}</Text>
      </View>
      {showDivider && <View style={rowStyles.divider} />}
    </>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  label:   { color: COLORS.textMuted, fontSize: 13, flex: 1 },
  value:   { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
});

// ── 3. SectionTitle ──────────────────────────────────────────
// Título de sección reutilizable
interface SectionTitleProps {
  children: string;
  style?: object;
}

export function SectionTitle({ children, style }: SectionTitleProps) {
  return (
    <Text style={[sectionStyles.title, style]}>{children}</Text>
  );
}

const sectionStyles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 14,
    marginTop: 6,
  },
});

// ── 4. Card ──────────────────────────────────────────────────
// Tarjeta blanca con sombra reutilizable
interface CardProps {
  children: React.ReactNode;
  style?: object;
}

export function Card({ children, style }: CardProps) {
  return (
    <View style={[cardStyles.card, style]}>
      {children}
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    ...SHADOW,
  },
});

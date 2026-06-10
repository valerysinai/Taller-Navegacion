// ─────────────────────────────────────────────────────────────
// theme.ts — Colores, tipografía y sombras centralizados
// Cambia aquí y se aplica en toda la app automáticamente
// ─────────────────────────────────────────────────────────────

export const COLORS = {
  primary:     '#6C63FF',
  primaryDark: '#4834DF',
  success:     '#22C55E',
  successDark: '#16A34A',
  warning:     '#F59E0B',
  warningDark: '#D97706',
  danger:      '#EF4444',
  pink:        '#EC4899',
  pinkDark:    '#BE185D',

  // Fondos
  background:  '#F5F7FB',
  surface:     '#FFFFFF',
  surfaceAlt:  '#F8F7FF',

  // Texto
  textPrimary:   '#1E293B',
  textSecondary: '#64748B',
  textMuted:     '#94A3B8',

  // Bordes y separadores
  border:      '#F1F5F9',
  borderLight: '#E2E8F0',
};

// Degradados reutilizables
export const GRADIENTS = {
  primary: [COLORS.primary, COLORS.primaryDark] as [string, string],
  pink:    [COLORS.pink,    COLORS.pinkDark]    as [string, string],
};

// Sombra estándar para tarjetas (funciona en Android e iOS)
export const SHADOW = {
  elevation:    2,
  shadowColor:  '#000',
  shadowOpacity: 0.05,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
};

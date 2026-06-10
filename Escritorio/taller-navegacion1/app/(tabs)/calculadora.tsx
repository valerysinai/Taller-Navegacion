import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

// ── Datos ────────────────────────────────────────────────────

const BUTTONS = [
  ['C', '+/-', '%', '÷'],
  ['7', '8',   '9', '×'],
  ['4', '5',   '6', '−'],
  ['1', '2',   '3', '+'],
  ['0', '.',   '='],
];

const OPERADORES = ['÷', '×', '−', '+'];

// ── Helpers ──────────────────────────────────────────────────

const calcular = (a: number, op: string, b: number): number | null => {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '×') return a * b;
  if (op === '÷') {
    if (b === 0) { Alert.alert('Error', 'No se puede dividir entre 0'); return null; }
    return a / b;
  }
  return null;
};

// ── Componente ───────────────────────────────────────────────

export default function CalculadoraScreen() {
  const [display,     setDisplay]     = useState('0');
  const [expresion,   setExpresion]   = useState('');
  const [operando,    setOperando]    = useState<number | null>(null);
  const [operador,    setOperador]    = useState<string | null>(null);
  const [nuevaEntrada, setNuevaEntrada] = useState(true);

  const handlePress = (btn: string) => {
    // Limpiar
    if (btn === 'C') {
      setDisplay('0'); setExpresion('');
      setOperando(null); setOperador(null); setNuevaEntrada(true);
      return;
    }

    // Cambiar signo / porcentaje
    if (btn === '+/-') { setDisplay(String(parseFloat(display) * -1)); return; }
    if (btn === '%')   { setDisplay(String(parseFloat(display) / 100)); return; }

    // Seleccionar operador
    if (OPERADORES.includes(btn)) {
      setOperando(parseFloat(display));
      setOperador(btn);
      setExpresion(`${display} ${btn}`);
      setNuevaEntrada(true);
      return;
    }

    // Calcular resultado
    if (btn === '=') {
      if (!operador || operando === null) return;
      const resultado = calcular(operando, operador, parseFloat(display));
      if (resultado === null) return;
      setExpresion(`${operando} ${operador} ${display} =`);
      setDisplay(String(Math.round(resultado * 1e10) / 1e10));
      setOperando(null); setOperador(null); setNuevaEntrada(true);
      return;
    }

    // Punto decimal
    if (btn === '.') {
      if (nuevaEntrada) { setDisplay('0.'); setNuevaEntrada(false); }
      else if (!display.includes('.')) setDisplay(prev => prev + '.');
      return;
    }

    // Dígito numérico
    if (nuevaEntrada) { setDisplay(btn); setNuevaEntrada(false); }
    else setDisplay(prev => prev === '0' ? btn : prev + btn);
  };

  const btnStyle = (btn: string) => [
    styles.btn,
    btn === '0'            && styles.btnWide,
    OPERADORES.includes(btn) && styles.btnOp,
    btn === '='            && styles.btnEq,
    btn === 'C'            && styles.btnClr,
  ];

  const txtStyle = (btn: string) => [
    styles.btnTxt,
    (OPERADORES.includes(btn) || btn === '=') && styles.btnTxtLight,
    btn === 'C' && styles.btnTxtClr,
  ];

  return (
    <View style={styles.container}>
      {/* Pantalla */}
      <View style={styles.display}>
        <Text style={styles.expresion} numberOfLines={1}>{expresion}</Text>
        <Text
          style={[styles.result, display.length > 9 && { fontSize: 36 }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {display}
        </Text>
      </View>

      {/* Teclado */}
      {BUTTONS.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map(btn => (
            <TouchableOpacity
              key={btn}
              style={btnStyle(btn)}
              onPress={() => handlePress(btn)}
              activeOpacity={0.75}
            >
              <Text style={txtStyle(btn)}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

// ── Estilos ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#1A1A2E', padding: 16, justifyContent: 'flex-end' },
  display:     { padding: 20, alignItems: 'flex-end', marginBottom: 12 },
  expresion:   { color: 'rgba(255,255,255,0.4)', fontSize: 18, marginBottom: 6 },
  result:      { color: '#FFF', fontSize: 56, fontWeight: '300', letterSpacing: -1 },
  row:         { flexDirection: 'row', gap: 12, marginBottom: 12 },
  btn: {
    flex: 1, backgroundColor: '#252540', borderRadius: 20,
    paddingVertical: 22, alignItems: 'center', justifyContent: 'center',
  },
  btnWide:     { flex: 2 },
  btnOp:       { backgroundColor: '#3A3560' },
  btnEq:       { backgroundColor: COLORS.primary },
  btnClr:      { backgroundColor: '#FF3B3B22' },
  btnTxt:      { color: '#E2E8F0', fontSize: 22, fontWeight: '500' },
  btnTxtLight: { color: '#FFF', fontWeight: '700' },
  btnTxtClr:   { color: '#FF3B3B', fontWeight: '700' },
});

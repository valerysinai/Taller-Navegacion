import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const BUTTONS = [
  ['C', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function CalculadoraScreen() {
  const [display, setDisplay] = useState('0');
  const [expresion, setExpresion] = useState('');
  const [operando, setOperando] = useState<number | null>(null);
  const [operador, setOperador] = useState<string | null>(null);
  const [nuevaEntrada, setNuevaEntrada] = useState(true);

  const handlePress = (btn: string) => {
    if (btn === 'C') {
      setDisplay('0'); setExpresion('');
      setOperando(null); setOperador(null); setNuevaEntrada(true);
      return;
    }
    if (btn === '+/-') { setDisplay(String(parseFloat(display) * -1)); return; }
    if (btn === '%')   { setDisplay(String(parseFloat(display) / 100)); return; }

    if (['÷', '×', '−', '+'].includes(btn)) {
      setOperando(parseFloat(display)); setOperador(btn);
      setExpresion(`${display} ${btn}`); setNuevaEntrada(true);
      return;
    }

    if (btn === '=') {
      if (!operador || operando === null) return;
      const b = parseFloat(display);
      let r: number;
      if (operador === '+') r = operando + b;
      else if (operador === '−') r = operando - b;
      else if (operador === '×') r = operando * b;
      else {
        if (b === 0) { Alert.alert('Error', 'No se puede dividir entre 0'); return; }
        r = operando / b;
      }
      setExpresion(`${operando} ${operador} ${b} =`);
      setDisplay(String(Math.round(r * 1e10) / 1e10));
      setOperando(null); setOperador(null); setNuevaEntrada(true);
      return;
    }

    if (btn === '.') {
      if (nuevaEntrada) { setDisplay('0.'); setNuevaEntrada(false); }
      else if (!display.includes('.')) setDisplay(prev => prev + '.');
      return;
    }

    if (nuevaEntrada) { setDisplay(btn); setNuevaEntrada(false); }
    else setDisplay(prev => prev === '0' ? btn : prev + btn);
  };

  const isOp  = (b: string) => ['÷', '×', '−', '+'].includes(b);
  const isEq  = (b: string) => b === '=';
  const isClr = (b: string) => b === 'C';

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.expresion} numberOfLines={1}>{expresion}</Text>
        <Text style={[styles.result, display.length > 9 && { fontSize: 36 }]}
              numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      {BUTTONS.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map(btn => (
            <TouchableOpacity
              key={btn}
              style={[
                styles.btn,
                btn === '0'   && styles.btnWide,
                isOp(btn)     && styles.btnOp,
                isEq(btn)     && styles.btnEq,
                isClr(btn)    && styles.btnClr,
              ]}
              onPress={() => handlePress(btn)}
              activeOpacity={0.75}
            >
              <Text style={[
                styles.btnTxt,
                (isOp(btn) || isEq(btn)) && styles.btnTxtLight,
                isClr(btn) && styles.btnTxtClr,
              ]}>
                {btn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E', padding: 16, justifyContent: 'flex-end' },
  display: { padding: 20, alignItems: 'flex-end', marginBottom: 12 },
  expresion: { color: 'rgba(255,255,255,0.4)', fontSize: 18, marginBottom: 6 },
  result: { color: '#FFF', fontSize: 56, fontWeight: '300', letterSpacing: -1 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  btn: {
    flex: 1, backgroundColor: '#252540', borderRadius: 20,
    paddingVertical: 22, alignItems: 'center', justifyContent: 'center',
  },
  btnWide: { flex: 2 },
  btnOp:  { backgroundColor: '#3A3560' },
  btnEq:  { backgroundColor: '#6C63FF' },
  btnClr: { backgroundColor: '#FF3B3B22' },
  btnTxt: { color: '#E2E8F0', fontSize: 22, fontWeight: '500' },
  btnTxtLight: { color: '#FFF', fontWeight: '700' },
  btnTxtClr:   { color: '#FF3B3B', fontWeight: '700' },
});
import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Body, Card, Muted, Overline, Title } from '../../src/components/Ui';
import { mockEvolution } from '../../src/data/student';
import { colors } from '../../src/theme';

export default function EvolucaoScreen() {
  const insets = useSafeAreaInsets();
  const data = mockEvolution;
  const max = Math.max(...data.points.map((p) => p.total));

  return (
    <ScrollView contentContainerStyle={[styles.root, { paddingTop: insets.top + 16 }]}>
      <Overline>Últimas 6 redações</Overline>
      <Title>Minha evolução</Title>
      <Card style={styles.hero}>
        <Title style={styles.score}>{data.latestTotal}</Title>
        <Muted>nota mais recente</Muted>
        <Body style={styles.delta}>+{data.deltaSinceFirst} desde a 1ª</Body>
      </Card>

      <Card>
        <View style={styles.chart}>
          {data.points.map((p) => (
            <View key={p.id} style={styles.col}>
              <View style={styles.barTrack}>
                <View style={[styles.bar, { height: Math.max(8, (p.total / max) * 120) }]} />
              </View>
              <Muted>{p.label}</Muted>
            </View>
          ))}
        </View>
      </Card>

      <Overline>Por competência</Overline>
      {data.competencies.map((c) => (
        <Card key={c.id} style={styles.comp}>
          <View style={styles.row}>
            <Body style={styles.compId}>{c.id}</Body>
            <Title style={styles.compScore}>{c.score}</Title>
          </View>
          <Muted>{c.label}</Muted>
          {c.attention ? (
            <Text style={styles.attention}>atenção</Text>
          ) : c.delta ? (
            <Text style={styles.up}>+{c.delta}</Text>
          ) : null}
        </Card>
      ))}

      <Card>
        <Overline>Frequência</Overline>
        <Body>{data.attendance.label}</Body>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  hero: { alignItems: 'flex-start', gap: 4 },
  score: { fontSize: 40, color: colors.action },
  delta: { color: colors.success, fontWeight: '600' },
  chart: { flexDirection: 'row', height: 140, alignItems: 'flex-end', gap: 8 },
  col: { flex: 1, alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' },
  barTrack: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: colors.subtle,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bar: { width: '100%', backgroundColor: colors.brand, borderRadius: 8, minHeight: 8 },
  comp: { gap: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  compId: { fontWeight: '700' },
  compScore: { fontSize: 22 },
  attention: { color: colors.warning, fontWeight: '700', fontSize: 13 },
  up: { color: colors.success, fontWeight: '700', fontSize: 13 },
});

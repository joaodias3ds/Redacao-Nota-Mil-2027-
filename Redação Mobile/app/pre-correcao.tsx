import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PreCorrection } from '@nota-mil/shared/student';
import {
  Body,
  Card,
  GhostButton,
  Muted,
  Overline,
  PrimaryButton,
  SecondaryButton,
  Title,
} from '../src/components/Ui';
import { studentApi } from '../src/lib/student-api';
import { colors } from '../src/theme';

export default function PreCorrecaoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { essayId } = useLocalSearchParams<{ essayId?: string }>();
  const id = essayId || '22222222-2222-4222-8222-222222222222';
  const [data, setData] = useState<PreCorrection | null>(null);

  useEffect(() => {
    studentApi.getPreCorrection(id).then(setData).catch(() => setData(null));
  }, [id]);

  if (!data) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 16 }]}>
        <Muted>Gerando pré-correção…</Muted>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.root, { paddingTop: insets.top + 16 }]}>
      <GhostButton label="Voltar" onPress={() => router.back()} />
      <Title>Pré-correção</Title>

      <Card style={styles.hero}>
        <Overline>Nota estimada para treino · IA</Overline>
        <Muted>{data.disclaimer}</Muted>
        <Title style={styles.total}>
          {data.estimatedTotal}
          <Text style={styles.max}>/{data.maxTotal}</Text>
        </Title>
      </Card>

      {data.competencies.map((c) => (
        <Card key={c.id} style={c.attention ? styles.attentionCard : undefined}>
          <View style={styles.row}>
            <Body style={styles.comp}>
              {c.id} · {c.label}
            </Body>
            <Title style={styles.score}>{c.score}</Title>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${(c.score / c.max) * 100}%` }]} />
          </View>
          {c.comment ? <Muted>{c.comment}</Muted> : null}
        </Card>
      ))}

      <Card style={styles.attentionCard}>
        <Overline>Ponto de atenção · {data.attention.competency}</Overline>
        <Body style={styles.attTitle}>{data.attention.title}</Body>
        <Muted>{data.attention.body}</Muted>
        <GhostButton label="Ver repertórios para este tema" onPress={() => router.push('/(tabs)/feed')} />
      </Card>

      <SecondaryButton label="Pedir revisão" onPress={() => {}} />
      <PrimaryButton label="Reescrever" onPress={() => router.push('/editor')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: 16, paddingBottom: 32, gap: 12 },
  hero: { gap: 8 },
  total: { fontSize: 40, color: colors.action },
  max: { fontSize: 20, color: colors.muted, fontWeight: '500' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  comp: { fontWeight: '600', flex: 1, paddingRight: 8 },
  score: { fontSize: 20 },
  track: { height: 6, backgroundColor: colors.subtle, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.brand, borderRadius: 3 },
  attentionCard: { backgroundColor: '#FFF5E1', borderColor: '#FFD98A' },
  attTitle: { fontWeight: '700' },
});

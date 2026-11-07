import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Body, Card, GhostButton, Muted, Overline, PrimaryButton, Title } from '../src/components/Ui';
import { mockToday } from '../src/data/student';
import { colors } from '../src/theme';

export default function StatusScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const essay = mockToday.lastEssay!;

  return (
    <ScrollView contentContainerStyle={[styles.root, { paddingTop: insets.top + 16 }]}>
      <GhostButton label="Voltar" onPress={() => router.back()} />
      <Title>Status da correção</Title>
      <Card>
        <Overline>Redação enviada</Overline>
        <Body style={styles.theme}>{essay.theme}</Body>
        <Muted>
          {essay.sentAtLabel} · Versão {essay.version}
        </Muted>
      </Card>

      <Card style={styles.timeline}>
        {essay.pipeline.map((step) => (
          <View key={step.key} style={styles.step}>
            <View
              style={[
                styles.dot,
                step.done && styles.dotDone,
                step.current && styles.dotCurrent,
              ]}
            />
            <View style={styles.stepText}>
              <Body style={styles.stepLabel}>{step.label}</Body>
              <Muted>{step.detail}</Muted>
            </View>
          </View>
        ))}
      </Card>

      <Muted>
        A pré-correção é uma estimativa feita por IA. A nota oficial é a do seu professor.
      </Muted>
      <PrimaryButton label="Ver pré-correção" onPress={() => router.push('/pre-correcao')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: 16, paddingBottom: 32, gap: 16 },
  theme: { fontWeight: '700' },
  timeline: { gap: 16 },
  step: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 4,
    backgroundColor: colors.border,
  },
  dotDone: { backgroundColor: colors.success },
  dotCurrent: { backgroundColor: colors.brand },
  stepText: { flex: 1, gap: 2 },
  stepLabel: { fontWeight: '700' },
});

import React from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Body, Card, Muted, Overline, PrimaryButton, Title } from '../../src/components/Ui';
import { mockToday } from '../../src/data/student';
import { colors } from '../../src/theme';

export default function HojeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const data = mockToday;

  return (
    <ScrollView
      contentContainerStyle={[styles.root, { paddingTop: insets.top + 16 }]}
      showsVerticalScrollIndicator={false}
    >
      <Muted>{data.greeting}</Muted>
      <Title>Oi, {data.studentName}</Title>

      {data.draft ? (
        <Card style={styles.block}>
          <View style={styles.row}>
            <Overline>Rascunho</Overline>
            <Muted>{data.draft.savedLabel}</Muted>
          </View>
          <PrimaryButton label="Continuar redação" onPress={() => router.push('/editor')} />
          <Body style={styles.theme}>Tema: {data.draft.theme}</Body>
          <Muted>
            {data.draft.linesUsed} de {data.draft.linesMax} linhas
          </Muted>
        </Card>
      ) : null}

      <Pressable onPress={() => router.push('/status')}>
        <Card style={styles.block}>
          <View style={styles.row}>
            <Body style={styles.cardTitle}>Sua última redação</Body>
            <View style={styles.badge}>
              <Muted style={styles.badgeText}>{data.lastEssay?.statusLabel}</Muted>
            </View>
          </View>
          <View style={styles.pipeline}>
            {['Enviada', 'IA', 'Professor', 'Pronta'].map((label, i) => (
              <View key={label} style={styles.pipeItem}>
                <View style={[styles.pipeDot, i < 2 && styles.pipeDotDone, i === 2 && styles.pipeDotCurrent]} />
                <Muted style={i === 2 ? styles.pipeCurrent : undefined}>{label}</Muted>
              </View>
            ))}
          </View>
        </Card>
      </Pressable>

      <Card style={styles.block}>
        <Overline>Meta do feed</Overline>
        <Title style={styles.meta}>
          {data.feedGoal.done} / {data.feedGoal.target}
        </Title>
        <Muted>Faltam {data.feedGoal.target - data.feedGoal.done} cards</Muted>
        <PrimaryButton label="Abrir feed" onPress={() => router.push('/(tabs)/feed')} />
      </Card>

      <Card style={styles.block}>
        <Overline>Esta semana</Overline>
        <Body>{data.weekStreakDays} dias de prática</Body>
        <Overline>Tema da semana</Overline>
        <Body>{data.weekTheme}</Body>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  block: { gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  theme: { color: colors.gray },
  cardTitle: { fontWeight: '700' },
  badge: { backgroundColor: colors.soft, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { color: colors.action, fontWeight: '600' },
  pipeline: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  pipeItem: { alignItems: 'center', gap: 6, flex: 1 },
  pipeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.border },
  pipeDotDone: { backgroundColor: colors.success },
  pipeDotCurrent: { backgroundColor: colors.brand },
  pipeCurrent: { color: colors.action, fontWeight: '700' },
  meta: { fontSize: 28 },
});

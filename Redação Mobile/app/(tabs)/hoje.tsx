import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { TodayHome } from '@nota-mil/shared/student';
import { Body, Card, Muted, Overline, PrimaryButton, Title } from '../../src/components/Ui';
import { studentApi } from '../../src/lib/student-api';
import { colors } from '../../src/theme';

export default function HojeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<TodayHome | null>(null);

  useEffect(() => {
    studentApi.getToday().then(setData).catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 16 }]}>
        <Muted>Carregando… (API web em :3001?)</Muted>
      </View>
    );
  }

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

      {data.lastEssay ? (
        <Pressable onPress={() => router.push('/status')}>
          <Card style={styles.block}>
            <View style={styles.row}>
              <Body style={styles.cardTitle}>Sua última redação</Body>
              <View style={styles.badge}>
                <Muted style={styles.badgeText}>{data.lastEssay.statusLabel}</Muted>
              </View>
            </View>
          </Card>
        </Pressable>
      ) : null}

      <Card style={styles.block}>
        <Overline>Meta do feed</Overline>
        <Body style={styles.cardTitle}>
          {data.feedGoal.done}/{data.feedGoal.target} repertórios
        </Body>
        <Muted>
          Sequência: {data.weekStreakDays} dias · {data.weekTheme}
        </Muted>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { padding: 16, gap: 16, paddingBottom: 40, backgroundColor: colors.page, flexGrow: 1 },
  block: { gap: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  theme: { color: colors.muted },
  cardTitle: { fontWeight: '700' },
  badge: {
    backgroundColor: colors.soft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { color: colors.action, fontWeight: '600' },
});

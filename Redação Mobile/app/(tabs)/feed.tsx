import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { mockFeedCards, mockToday } from '../../src/data/student';
import { colors } from '../../src/theme';

const { height } = Dimensions.get('window');

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<'para-voce' | 'temas' | 'salvos'>('para-voce');
  const card = mockFeedCards[index % mockFeedCards.length];
  const goal = mockToday.feedGoal;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.tabs}>
        {(
          [
            ['para-voce', 'Para você'],
            ['temas', 'Temas'],
            ['salvos', 'Salvos'],
          ] as const
        ).map(([id, label]) => (
          <Pressable key={id} onPress={() => setTab(id)} style={styles.tabBtn}>
            <Text style={[styles.tabLabel, tab === id && styles.tabActive]}>{label}</Text>
          </Pressable>
        ))}
        <Text style={styles.goal}>
          {goal.done}/{goal.target}
        </Text>
      </View>

      <Pressable
        style={styles.card}
        onPress={() => setIndex((i) => i + 1)}
        accessibilityRole="button"
        accessibilityLabel="Próximo card"
      >
        <Text style={styles.kind}>
          {card.kind.toUpperCase()} · COMPETÊNCIA {card.competency.replace('C', '')}
        </Text>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.sub}>{card.subtitle}</Text>
        <Text style={styles.body}>{card.body}</Text>
        <View style={styles.howBox}>
          <Text style={styles.howLabel}>COMO USAR</Text>
          <Text style={styles.how}>{card.howToUse}</Text>
        </View>
      </Pressable>

      <View style={[styles.actions, { paddingBottom: 12 }]}>
        <SideAction label="Salvar" />
        <SideAction label="Usar" onPress={() => router.push('/editor')} />
        <SideAction label="Fonte" />
      </View>
    </View>
  );
}

function SideAction({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.sideBtn} accessibilityRole="button">
      <Text style={styles.sideText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.black },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
    minHeight: 48,
  },
  tabBtn: { paddingVertical: 8 },
  tabLabel: { color: 'rgba(255,255,255,0.55)', fontWeight: '600', fontSize: 15 },
  tabActive: { color: colors.white },
  goal: { marginLeft: 'auto', color: colors.brand, fontWeight: '700' },
  card: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    backgroundColor: '#211F20',
    padding: 24,
    justifyContent: 'center',
    gap: 12,
    minHeight: height * 0.55,
  },
  kind: { color: colors.brand, fontSize: 12, fontWeight: '700', letterSpacing: 0.8 },
  title: { color: colors.white, fontSize: 32, fontWeight: '700', letterSpacing: -0.5, lineHeight: 38 },
  sub: { color: 'rgba(255,255,255,0.65)', fontSize: 15 },
  body: { color: 'rgba(255,255,255,0.9)', fontSize: 17, lineHeight: 26, marginTop: 8 },
  howBox: { marginTop: 16, gap: 6 },
  howLabel: { color: colors.brand, fontSize: 11, fontWeight: '700', letterSpacing: 0.8 },
  how: { color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 21 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, paddingHorizontal: 16 },
  sideBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sideText: { color: colors.white, fontWeight: '600', fontSize: 13 },
});

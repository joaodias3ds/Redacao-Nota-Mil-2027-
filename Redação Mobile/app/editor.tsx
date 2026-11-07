import React, { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Body, GhostButton, Muted, Overline, PrimaryButton, Title } from '../src/components/Ui';
import { mockToday } from '../src/data/student';
import { colors } from '../src/theme';

export default function EditorScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const draft = mockToday.draft!;
  const [text, setText] = useState(draft.text);
  const lines = useMemo(() => Math.max(1, text.split(/\n/).length + Math.floor(text.length / 70)), [text]);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.top}>
        <GhostButton label="Voltar" onPress={() => router.back()} />
        <Muted>Salvo agora</Muted>
        <PrimaryButton label="Enviar" onPress={() => router.push('/status')} />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Title>Nova redação</Title>
        <Overline>Tema</Overline>
        <Body style={styles.theme}>{draft.theme}</Body>
        <Overline>Seu texto</Overline>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top"
          style={styles.input}
          placeholder="Escreva sua redação aqui"
          placeholderTextColor={colors.muted}
        />
        <Muted>
          {Math.min(lines, draft.linesMax)} de {draft.linesMax} linhas · Mínimo recomendado:{' '}
          {draft.minRecommended} linhas
        </Muted>

        <Pressable style={styles.rep} onPress={() => router.push('/(tabs)/feed')}>
          <Text style={styles.repTitle}>Repertório que você salvou</Text>
          <Text style={styles.repBody}>Modernidade líquida + Ver salvos</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 8,
    minHeight: 56,
  },
  content: { padding: 16, gap: 12, paddingBottom: 40 },
  theme: { fontWeight: '600' },
  input: {
    minHeight: 280,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    color: colors.graphite,
    backgroundColor: colors.white,
  },
  rep: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.soft,
    gap: 4,
  },
  repTitle: { fontWeight: '700', color: colors.graphite },
  repBody: { color: colors.action, fontWeight: '600' },
});

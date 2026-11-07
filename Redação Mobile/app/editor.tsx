import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { EssayDraft, WritingAssistResult } from '@nota-mil/shared/student';
import { Body, GhostButton, Muted, Overline, PrimaryButton, Title } from '../src/components/Ui';
import { countEssayLines, studentApi } from '../src/lib/student-api';
import { colors } from '../src/theme';

export default function EditorScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<EssayDraft | null>(null);
  const [text, setText] = useState('');
  const [savedLabel, setSavedLabel] = useState('Carregando…');
  const [assist, setAssist] = useState<WritingAssistResult | null>(null);
  const [assistLoading, setAssistLoading] = useState(false);

  const lines = useMemo(() => countEssayLines(text), [text]);

  useEffect(() => {
    let alive = true;
    studentApi
      .getDraft()
      .then((d) => {
        if (!alive || !d) return;
        setDraft(d);
        setText(d.text);
        setSavedLabel(d.savedLabel);
      })
      .catch(() => {
        if (alive) setSavedLabel('Falha ao carregar — a API web está rodando?');
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!draft) return;
    const handle = setTimeout(() => {
      studentApi
        .saveDraft({
          id: draft.id,
          theme: draft.theme,
          text,
          linesUsed: Math.min(lines, draft.linesMax),
          linesMax: draft.linesMax,
          minRecommended: draft.minRecommended,
          savedRepertoireIds: draft.savedRepertoireIds,
        })
        .then((saved) => setSavedLabel(saved.savedLabel))
        .catch(() => setSavedLabel('Erro ao salvar'));
    }, 700);
    return () => clearTimeout(handle);
  }, [text, lines, draft]);

  const askAssist = useCallback(async () => {
    if (!draft) return;
    setAssistLoading(true);
    try {
      setAssist(await studentApi.writingAssist({ theme: draft.theme, text }));
    } catch {
      setAssist(null);
    } finally {
      setAssistLoading(false);
    }
  }, [draft, text]);

  if (!draft) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 8, padding: 16 }]}>
        <Muted>{savedLabel}</Muted>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.top}>
        <GhostButton label="Voltar" onPress={() => router.back()} />
        <Muted>{savedLabel}</Muted>
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

        <View style={styles.assist}>
          <View style={styles.assistHead}>
            <Overline>IA auxiliar (estrutura)</Overline>
            <Pressable style={styles.assistBtn} onPress={askAssist} disabled={assistLoading}>
              {assistLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.assistBtnText}>Pedir dicas</Text>
              )}
            </Pressable>
          </View>
          <Muted>Orienta a estrutura do curso. Sem nota ENEM nesta etapa.</Muted>
          {assist ? (
            <View style={styles.assistBody}>
              <Body style={styles.theme}>{assist.structure.summary}</Body>
              <View style={styles.flags}>
                {[
                  ['Contexto', assist.structure.hasContext],
                  ['Tese', assist.structure.hasThesis],
                  ['Desenv.', assist.structure.hasDevelopment],
                  ['Intervenção', assist.structure.hasIntervention],
                ].map(([label, on]) => (
                  <Text key={String(label)} style={[styles.flag, on ? styles.flagOn : null]}>
                    {label}
                  </Text>
                ))}
              </View>
              {assist.tips.map((tip) => (
                <View key={`${tip.area}-${tip.title}`} style={styles.tip}>
                  <Overline>{tip.area}</Overline>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Muted>{tip.body}</Muted>
                </View>
              ))}
              <Muted>{assist.encouragement}</Muted>
            </View>
          ) : null}
        </View>

        <Pressable style={styles.rep} onPress={() => router.push('/(tabs)/feed')}>
          <Text style={styles.repTitle}>Repertório que você salvou</Text>
          <Text style={styles.repBody}>Ver salvos no feed</Text>
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
  assist: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    backgroundColor: colors.white,
  },
  assistHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  assistBtn: {
    backgroundColor: colors.action,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 110,
    alignItems: 'center',
  },
  assistBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  assistBody: { gap: 10, marginTop: 4 },
  flags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  flag: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    color: colors.muted,
  },
  flagOn: {
    borderColor: colors.action,
    color: colors.action,
    fontWeight: '700',
  },
  tip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  tipTitle: { fontWeight: '700', color: colors.graphite },
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

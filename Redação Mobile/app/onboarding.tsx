import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Body, GhostButton, Muted, Overline, PrimaryButton, Title } from '../src/components/Ui';
import { colors } from '../src/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 16 }]}>
      <Overline>Citação · C2</Overline>
      <View style={styles.hero}>
        <Title style={styles.brand}>App Redação</Title>
        <Title style={styles.headline}>Escreva. Receba{'\n'}retorno. Evolua.</Title>
        <Body style={styles.support}>
          Envie sua redação, acompanhe a correção e veja sua evolução em cada competência.
        </Body>
      </View>
      <View style={styles.actions}>
        <PrimaryButton label="Próximo" onPress={() => router.push('/login')} />
        <View style={styles.skip}>
          <GhostButton label="Pular" onPress={() => router.replace('/login')} />
        </View>
      </View>
      <Muted style={styles.foot}>Design system Redação Nota Mil</Muted>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 24, backgroundColor: colors.page, justifyContent: 'space-between' },
  hero: { gap: 16, marginTop: 48 },
  brand: { fontSize: 18, color: colors.action },
  headline: { fontSize: 34, lineHeight: 40, letterSpacing: -0.6 },
  support: { color: colors.gray, maxWidth: 320 },
  actions: { gap: 16 },
  skip: { alignItems: 'center' },
  foot: { textAlign: 'center' },
});

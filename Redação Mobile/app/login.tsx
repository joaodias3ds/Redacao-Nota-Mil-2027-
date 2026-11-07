import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Body, GhostButton, Muted, PrimaryButton, Title } from '../src/components/Ui';
import { colors } from '../src/theme';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView
      contentContainerStyle={[
        styles.root,
        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Title>Entrar</Title>
      <Body style={styles.support}>Use o e-mail do convite que o curso enviou para você.</Body>

      <View style={styles.fields}>
        <Muted>E-mail</Muted>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="nome@email.com"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <Muted>Senha</Muted>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Sua senha"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <GhostButton label="Esqueci minha senha" onPress={() => {}} />
      </View>

      <PrimaryButton label="Entrar" onPress={() => router.replace('/(tabs)/hoje')} />

      <Muted style={styles.note}>
        Tem menos de 18 anos? Seu responsável precisa aceitar os termos antes do seu primeiro acesso.
        Coletamos só o necessário.
      </Muted>
      <Muted style={styles.note}>Não tem convite? Fale com a secretaria do seu curso.</Muted>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flexGrow: 1, paddingHorizontal: 24, gap: 16, backgroundColor: colors.page },
  support: { color: colors.gray },
  fields: { gap: 8, marginVertical: 8 },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#8E8F92',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: colors.graphite,
    backgroundColor: colors.white,
  },
  note: { marginTop: 4 },
});

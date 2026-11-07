import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Body, Card, Muted, PrimaryButton, SecondaryButton, Title } from '../../src/components/Ui';
import { mockStudentName } from '../../src/data/student';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={[styles.root, { paddingTop: insets.top + 16 }]}>
      <Title>Perfil</Title>
      <Card>
        <Title style={{ fontSize: 18 }}>{mockStudentName}</Title>
        <Muted>Aluna · Redação ENEM</Muted>
        <Body>Preferências, notificações e privacidade entram na próxima etapa.</Body>
      </Card>
      <SecondaryButton label="Ver status da última redação" onPress={() => router.push('/status')} />
      <PrimaryButton label="Sair" onPress={() => router.replace('/login')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
});

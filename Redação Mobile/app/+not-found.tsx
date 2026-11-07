import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Body, Title } from '../src/components/Ui';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Não encontrado' }} />
      <View style={styles.root}>
        <Title>Tela não encontrada</Title>
        <Body>
          <Link href="/(tabs)/hoje">Voltar para Hoje</Link>
        </Body>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
});

import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function BoasVindasScreen() {
  const { nome } = useLocalSearchParams<{ nome?: string }>();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/tabIcons/background_lilile.jpg')}
        style={styles.background}
        resizeMode="cover"
      />

      <Text style={styles.saudacao}>
        {nome ? `Oi, ${nome}!` : 'Oi!'}
      </Text>

      <Image
        source={require('@/assets/images/tabIcons/principal_lilile.png')}
        style={styles.personagem}
        resizeMode="contain"
        accessibilityLabel="Lili Lê, personagem mágica da leitura"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1E7FF',
  },
  background: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  saudacao: {
    color: '#50346E',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  personagem: {
    width: '100%',
    height: '60%',
  },
});
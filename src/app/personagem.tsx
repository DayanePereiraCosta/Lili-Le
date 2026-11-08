
import { useAudioPlayer } from 'expo-audio';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const LINHAS = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
  ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z', 'Ç'],
];

export default function PersonagemScreen() {
  const movimento = useRef(new Animated.Value(0)).current;

  const [mostrarNome, setMostrarNome] = useState(true);
  const [nome, setNome] = useState('');

  const player = useAudioPlayer(
    require('@/assets/songs/fala_lilile.wav')
  );

  useEffect(() => {
    setMostrarNome(true);
    player.seekTo(0);
    player.play();
  }, [player]);

  useEffect(() => {
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.timing(movimento, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(movimento, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animacao.start();

    return () => animacao.stop();
  }, [movimento]);

  const deslocamento = movimento.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  function adicionarLetra(letra: string) {
    if (nome.length < 40) {
      setNome((atual) => atual + letra);
    }
  }

  function apagarLetra() {
    setNome((atual) => atual.slice(0, -1));
  }

  function continuar() {
    if (!nome.trim()) return;

    Keyboard.dismiss();
    console.log('Nome da criança:', nome.trim());

    // Na próxima etapa, vamos guardar o nome
    // e iniciar a aventura personalizada.
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/tabIcons/background_lilile.jpg')}
        style={styles.background}
        resizeMode="cover"
      />

      <View
        style={[
          styles.areaPersonagem,
          mostrarNome && styles.personagemComTeclado,
        ]}
      >
        <Animated.View
          style={[
            styles.personagemContainer,
            { transform: [{ translateY: deslocamento }] },
          ]}
        >
          <Image
            source={require('@/assets/images/tabIcons/principal_lilile.png')}
            style={styles.personagem}
            resizeMode="contain"
            accessibilityLabel="Lili Lê, personagem mágica da leitura"
          />
        </Animated.View>
      </View>

      {mostrarNome && (
        <View style={styles.areaNome}>
          <View
            style={styles.campoNome}
            accessibilityLabel={`Nome digitado: ${nome || 'vazio'}`}
            accessibilityRole="text"
          >
            <Text
              style={[
                styles.textoNome,
                !nome && styles.placeholder,
              ]}
              numberOfLines={1}
            >
              {nome || 'TOQUE NAS LETRAS'}
            </Text>
          </View>

          <ScrollView
            style={styles.teclado}
            contentContainerStyle={styles.tecladoConteudo}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            {LINHAS.map((linha, indice) => (
              <View style={styles.linhaTeclas} key={indice}>
                {linha.map((letra) => (
                  <Pressable
                    key={letra}
                    style={({ pressed }) => [
                      styles.tecla,
                      pressed && styles.teclaPressionada,
                    ]}
                    onPress={() => adicionarLetra(letra)}
                    accessibilityRole="button"
                    accessibilityLabel={`Letra ${letra}`}
                  >
                    <Text style={styles.textoTecla}>
                      {letra}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </ScrollView>

          <View style={styles.acoes}>
            <Pressable
              style={({ pressed }) => [
                styles.botaoApagar,
                pressed && styles.teclaPressionada,
              ]}
              onPress={apagarLetra}
              accessibilityRole="button"
              accessibilityLabel="Apagar última letra"
            >
              <Text style={styles.textoApagar}>
                ⌫ Apagar
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.botaoContinuar,
                pressed && styles.teclaPressionada,
                !nome.trim() && styles.botaoDesativado,
              ]}
              onPress={continuar}
              disabled={!nome.trim()}
              accessibilityRole="button"
            >
              <Text style={styles.textoContinuar}>
                Pronto! ✨
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F1E7FF',
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  areaPersonagem: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personagemComTeclado: {
    bottom: '30%',
  },
  personagemContainer: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personagem: {
    width: '100%',
    height: '100%',
  },
  areaNome: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 8,
    maxHeight: '53%',
    padding: 10,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.97)',
    alignItems: 'center',
    elevation: 5,
  },
  pergunta: {
    color: '#7545A6',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  campoNome: {
    width: '100%',
    minHeight: 40,
    justifyContent: 'center',
    backgroundColor: '#F8F2FF',
    borderColor: '#D8C4F0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 7,
    marginBottom: 7,
  },
  textoNome: {
    color: '#50346E',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    color: '#9A85AE',
    fontSize: 14,
  },
  teclado: {
    width: '100%',
    flexShrink: 1,
  },
  tecladoConteudo: {
    gap: 5,
    paddingVertical: 2,
  },
  linhaTeclas: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  tecla: {
    flex: 1,
    minWidth: 0,
    height: 37,
    borderRadius: 9,
    backgroundColor: '#F0E5FF',
    borderWidth: 1,
    borderColor: '#DCCAF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teclaPressionada: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },
  textoTecla: {
    color: '#7545A6',
    fontSize: 17,
    fontWeight: 'bold',
  },
  acoes: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginTop: 7,
  },
  botaoApagar: {
    flex: 1,
    minHeight: 40,
    borderRadius: 12,
    backgroundColor: '#E8D9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoApagar: {
    color: '#603B8A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  botaoContinuar: {
    flex: 1,
    minHeight: 40,
    borderRadius: 12,
    backgroundColor: '#8C61C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoDesativado: {
    opacity: 0.45,
  },
  textoContinuar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

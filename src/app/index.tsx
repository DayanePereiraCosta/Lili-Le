
import { useAudioPlayer } from 'expo-audio';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const player = useAudioPlayer(
    require('@/assets/songs/abertura_lilile.mp3')
  );

  useEffect(() => {
    let ativo = true;

    player.seekTo(0);
    player.play();

    const timer = setTimeout(() => {
      if (!ativo) return;

      router.replace('/personagem');
    }, 5000);

    return () => {
      ativo = false;
      clearTimeout(timer);
    };
  }, [player, router]);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/tabIcons/lilile_cenario_encantado.jpg')}
        style={styles.heroImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },

  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
});


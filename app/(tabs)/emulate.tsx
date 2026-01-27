import { NfcEmulationPanelWrapper } from '@/components/nfcemulationpanelWrapper';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Image } from 'expo-image';
import { Platform, StyleSheet, Text } from 'react-native';


export default function NFCScreen() {


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
          />
        }>
        <Text className='text-black dark:text-white m-auto text-2xl'> - NFC Emulate-</Text>
        {Platform.OS === 'android' && <NfcEmulationPanelWrapper></NfcEmulationPanelWrapper>}
        {Platform.OS ==='ios' && <Text className='text-red-900 dark:text-red-500 m-auto text-xl'>IOS eszközön nem elérhető</Text>}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

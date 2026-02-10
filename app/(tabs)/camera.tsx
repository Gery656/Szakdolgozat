import BleScanControl from '@/components/bleScanControl';
import CameraScanControl from '@/components/cameraScanControl';
import LocatorControl from '@/components/locatorControl';
import SecureStorageControl from '@/components/secureStorageControl';
import { StyleSheet, Text, View } from 'react-native';


export default function CameraScreen() {


  return (
    <View>
        <Text className='text-black dark:text-white m-auto text-2xl my-32'> - Camera / BLE -</Text>
        <CameraScanControl></CameraScanControl>
        <BleScanControl></BleScanControl>
        <LocatorControl></LocatorControl>
        <SecureStorageControl></SecureStorageControl>
    </View>
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

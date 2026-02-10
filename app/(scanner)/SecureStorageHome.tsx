import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function GeoHome() {

  const isFocused = useIsFocused();
  
// async function save(key:string, value:string) {
//   await SecureStore.setItemAsync(key, value);
// }

// async function getValueFor(key:string) {
//   let result = await SecureStore.getItemAsync(key);
//   if (result) {
//     alert("🔐 Here's your value 🔐 \n" + result);
//   } else {
//     alert('No values stored under that key.');
//   }
// }

  return (isFocused &&
      <SafeAreaView
        style={
          StyleSheet.absoluteFillObject
        }
      > 
        <Text className='text-red-500 text-lg mt-20 mx-auto'>Secure storage</Text>


      </SafeAreaView>
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

import { StyleSheet, Text, View } from 'react-native';


export default function NFCScreen() {


  return (
    <View className='h-full'>
        <Text className='text-black dark:text-white m-auto text-2xl mt-32'> - Camera -</Text>

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

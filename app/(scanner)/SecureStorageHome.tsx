import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function GeoHome() {

  const isFocused = useIsFocused();

  const [key, onChangeKey] = useState('Your key here');
  const [value, onChangeValue] = useState('Your value here');
  
 async function save(key:string, value:string) {
   await SecureStore.setItemAsync(key, value);
 }

  async function getValueFor(key:string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert('No values stored under that key.');
    }
  }

  return (isFocused &&
      <SafeAreaView
        style={
          StyleSheet.absoluteFillObject
        }
      > 
        <Text className='text-red-500 text-lg mt-20 mx-auto'>Secure storage</Text>

      <View className='w-11/12 mx-auto mt-32 bg-blue-950 rounded-xl'>

      <TextInput className='border border-white rounded mb-20'
      placeholder="Enter your name"
      onSubmitEditing={event => {
          save("name",event.nativeEvent.text);
        }}
      />
      
      <Button
        title="Save (name,Gergely) pair"
        onPress={() => {
          save("name", "Gergely");
          onChangeKey('Your key here');
          onChangeValue('Your value here');
        }}
      />
      <Text className='text-white mx-auto mb-5 mt-20'>🔐 Enter 'name' 🔐 </Text>

      <TextInput className='border border-white rounded'
        
        onSubmitEditing={event => {
          getValueFor(event.nativeEvent.text);
        }}
        placeholder="Enter the key for the value you want to get"
      />
    </View>


      </SafeAreaView>
  );
}

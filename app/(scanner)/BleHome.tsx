import useBLE from '@/hooks/useBLE';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default function BleHome() {

  const isFocused = useIsFocused();

  const {scanForPeripherals, allDevices, stopScanForPeripherals} = useBLE();

  const [isScanningDone,setIsScanningDone] = useState<boolean>(false);

  useEffect(()=>{
    
    scanForPeripherals();
    let timeout1 = setTimeout(() => {
        stopScanForPeripherals();
        setIsScanningDone(true);
        console.log("BLE SCAN")
    }, 5000);
    

    return ()=>{
        stopScanForPeripherals();
        console.log("Return of useEffect")
        clearTimeout(timeout1);
        
    };
  },[]);
  
  return (isFocused &&
      <ScrollView
        style={
          StyleSheet.absoluteFillObject
        }>

        <Text className='text-white text-xl mx-auto mt-20'>BLE scan helye</Text>

                {isScanningDone && <View className='w-11/12 bg-blue-950 mt-5 mx-auto rounded-3xl'>
                  {allDevices.map((device,i)=>
                  <View key={i} className='w-11/12 mx-auto border-b pb-1 border-red-500'>
                    <Text className='text-white mt-2'>{device.id}</Text>
                    {device.serviceUUIDs?.map((uuid,j)=><Text key={j} className='text-white mx-auto'>{uuid}</Text>)}
                    <Text className='text-white mx-auto'>{device.name}</Text>
                  </View>
                )}
                </View>}
                
      </ScrollView>
  );
}

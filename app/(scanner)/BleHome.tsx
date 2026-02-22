import useBLE from '@/hooks/useBLE';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default function BleHome() {

  const isFocused = useIsFocused();

  const {requestPermissions, scanForPeripherals, allDevices, stopScanForPeripherals} = useBLE();

  const [isModalVisible,setModalVisible] = useState<boolean>(false);

  const [isScanningDone,setIsScanningDone] = useState<boolean>(false);

  const scanForDevices = async () => {
    const isPermissionEnabled = await requestPermissions();
    if (isPermissionEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = ()=>{
    setModalVisible(false); 
  }

  const openModal = async ()=>{
    scanForDevices();
    setModalVisible(true);
  }

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
        }
      >

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

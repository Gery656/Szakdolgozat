import MessageBlock from '@/components/ui/messageBlock';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import NfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager";


export default function NFCScanScreen() {
  const isFocused = useIsFocused();
  const [stateOfScan, setStateOfScan] = useState({state:"loading",message:""});

  function listenToNfcEventOnce() {
  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
  };

  return new Promise((resolve :any) => {
    let tagFound : any = null;

    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag : any) => {
      tagFound = tag;
      resolve(tagFound);
      NfcManager.unregisterTagEvent();
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      cleanUp();
      if (!tagFound) {
        resolve();
      }
    });

    NfcManager.registerTagEvent();
  });
}

    async function readNdef() {
    try {
      NfcManager.start()
      // register for the NFC tag with NDEF in it
      if (Platform.OS==="ios") {
        // await NfcManager.requestTechnology(NfcTech.MifareIOS);
        // const tag = await NfcManager.getTag();
        // const gotBytes : number[] = [];
        // tag?.ndefMessage[0].payload.forEach(num => gotBytes.push(num))
        // const decodeddata = new Uint8Array(gotBytes)
        // console.warn('Tag found', Ndef.text.decodePayload(decodeddata));
        const tag : any = await listenToNfcEventOnce()
        const gotBytes : number[] = [];
        tag.ndefMessage[0].payload.forEach((num : any) => gotBytes.push(num))
        const decodeddata = new Uint8Array(gotBytes)

        console.warn('Tag found', Ndef.text.decodePayload(decodeddata));
        setStateOfScan(prevState => {
          return {
            ...prevState,
            state: "done",
            message: Ndef.text.decodePayload(decodeddata)
          }
        });

      }
      else{
        await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        const gotBytes : number[] = [];
        tag?.ndefMessage[0].payload.forEach(num => gotBytes.push(num))
        const decodeddata = new Uint8Array(gotBytes)

        console.warn('Tag found', Ndef.text.decodePayload(decodeddata));
                setStateOfScan(prevState => {
          return {
            ...prevState,
            state: "done",
            message: Ndef.text.decodePayload(decodeddata)
          }
        });

      }
    } catch (ex) {
      console.warn('Oops!', ex);
      setStateOfScan(prevState => {
          return {
            ...prevState,
            state: "error",
            message: "Nem sikerült beolvasni a jelet."
          }
        });
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }


  useEffect(() => {
    async function checkIfEnabledAndScan() {
      if (await NfcManager.isEnabled()) {
        setStateOfScan(prevState => {
          return {
            ...prevState,
            state: "scanning",
            message: ""
          }
        });
        readNdef();
        console.log("Scanning...")
      }
      else {

        setStateOfScan(prevState => {
          return {
            ...prevState,
            state: "error",
            message: "NFC nincs bekapcsolva."
          }
        });
      }
    }

    checkIfEnabledAndScan();
    console.log("useEffect()");
    return(()=>{
      NfcManager.cancelTechnologyRequest();
      console.log("end of useEffect()")
    })
  },[]);

  return (isFocused &&
    <View className='min-w-full min-h-full'>

     {stateOfScan.state==="error" &&
            <MessageBlock
              title="Hiba történt"
              message1={stateOfScan.message}
              message2={"Próbálkozzon újra"}/> 
            }

      {stateOfScan.state === "done" &&
              <MessageBlock
              title="Sikeres olvasás"
              message1={stateOfScan.message}/>
              }

      {stateOfScan.state === "loading" &&
              <MessageBlock
              title="Betöltés..."/>
      }

      {stateOfScan.state === "scanning" &&
              <MessageBlock
              title="Olvasás..."/>
      }
        
    </View>
  );
}

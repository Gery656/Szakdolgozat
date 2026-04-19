import useBLE from "@/hooks/useBLE";
import { getDefaultBluetoothIdentifier, setBluetoothIdentifierToSend } from "@/redux/applicationSlice";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpBluetoothSignalsSubmitForm(){

  const {requestPermissions} = useBLE();
  const defaultBluetoothIdentifier = useSelector(getDefaultBluetoothIdentifier);
  const [errorText,setErrorText] = useState("");
  const [identifier,setIdentifier] = useState(defaultBluetoothIdentifier);
  const dispatch = useDispatch();

const evaluatePermissions = async () => {
    const isPermissionEnabled = await requestPermissions();
    if (isPermissionEnabled) {
      setErrorText("")
      dispatch(setBluetoothIdentifierToSend(identifier));
      router.push('/(scanner)/BleHome');
    }
    else{
        setErrorText("Kérem kapcsolja be a bluetooth-t és a beállításokban adja meg a következő engedélyeket: Helyadatok, Közeli eszközök")
    }
  };
    return(
        <View className="bg-custom-primary mt-32 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row">

            <Text className="text-lg">Forrás jeligéje:</Text>
            <TextInput
              className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" 
              defaultValue={identifier}
              onChange={(event) => {setIdentifier(event.nativeEvent.text)}}
            />

            <Pressable
             className="w-full h-16 bg-custom-secondary mt-10 rounded-lg"
             onPress={evaluatePermissions}>
                <Text className="text-[#F5F5F5] m-auto">Jelentkezés</Text>
            </Pressable>
            {errorText && <Text className="text-red-600 mt-2">{errorText}</Text>}
        </View>
    )
}
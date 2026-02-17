import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";

export default function NewCatalogForm() {

    const [catalogType, setCatalogType] = useState("code");
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <View className="bg-[#F2EAD3] mt-20 w-11/12 py-3 px-3 rounded-2xl mx-auto shadow">

            <Text className="text-lg">Ellenőrzés neve:</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

            <Text className="text-lg mt-2">Hossz:</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

            <Text className="text-lg mt-2">Ellenőrzés típusa:</Text>

            <View className='border border-custom-secondary rounded-lg text-black text-lg bg-custom-background'>
                <Picker
                    style={styles.pickerStyle}
                    dropdownIconColor={"#000000"}
                    selectedValue={catalogType}
                    onValueChange={(itemValue, itemIndex) =>
                        setCatalogType(itemValue)
                    }>
                    <Picker.Item label="Kód" value="code" />
                    <Picker.Item label="QR" value="qr" />
                    <Picker.Item label="Bluetooth" value="bluetooth" />
                    <Picker.Item label="NFC" value="nfc" />
                </Picker>
            </View>

            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>{setIsEnabled(!isEnabled)}}
                value={isEnabled}
            />


            <Pressable className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                <Text className="text-[#F5F5F5] m-auto">Létrehozás</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    pickerStyle: {
        color: "#000000",
    }
})
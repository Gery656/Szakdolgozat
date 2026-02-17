import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";

export default function NewCatalogForm() {

    const [catalogType, setCatalogType] = useState("code");
    const [isEnabled, setIsEnabled] = useState(false);

    const isFocused = useIsFocused();

    return (isFocused &&
        <View>
            <View className="bg-[#F2EAD3] mt-10 w-11/12 h-fit py-3 px-3 rounded-2xl mx-auto shadow">

                <Text className="text-lg">Ellenőrzés neve:</Text>
                <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

                <Text className="text-lg mt-2">Hossz:</Text>
                <View className='flex flex-row gap-2'>
                    <TextInput keyboardType='numeric' className="w-10/12 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />
                    <Text className='my-auto text-lg'>perc</Text>
                </View>

                {Platform.OS==='android'
                    ? <Text className="text-lg mt-2">Ellenőrzés típusa:</Text>
                    : <View className='flex flex-row justify-between px-5'>
                        <Text className="text-lg mt-2">Ellenőrzés típusa:</Text>
                        {catalogType==='bluetooth' && <Text className="text-lg mt-2">Eszköz:</Text>}
                    </View>
}                       
                {/* first Picker for the type, second is only visible if the type is bluetooth */}
                <View className='android:border android:border-custom-secondary rounded-lg text-black text-lg bg-custom-background ios:flex ios:flex-row'>
                    <Picker
                        style={Platform.OS === "android" ? styles.androidPickerStyle : styles.iosPickerStyle}
                        dropdownIconColor={"#000000"}
                        itemStyle={Platform.OS === "android" ? styles.androidPickerStyle : styles.iosPickerStyle}
                        selectedValue={catalogType}

                        onValueChange={(itemValue, itemIndex) =>
                            setCatalogType(itemValue)
                        }>
                        <Picker.Item label="Kód" value="code" />
                        <Picker.Item label="QR" value="qr" />
                        <Picker.Item label="Bluetooth" value="bluetooth" />
                        <Picker.Item label="NFC" value="nfc" />
                    </Picker>
                    {/* the second Picker for IOS */}
                    {Platform.OS === "ios" && catalogType === "bluetooth" &&
                        <Picker
                            style={styles.iosPickerStyle}
                            dropdownIconColor={"#000000"}
                            itemStyle={styles.iosPickerStyle}
                            selectedValue={catalogType}

                            onValueChange={(itemValue, itemIndex) =>
                                null
                            }>
                            <Picker.Item label="Kód" value="code" />
                            <Picker.Item label="QR" value="qr" />
                            <Picker.Item label="Bluetooth" value="bluetooth" />
                            <Picker.Item label="NFC" value="nfc" />
                        </Picker>}
                </View>

                {/* the second Picker for Android */}
                {Platform.OS === "android" && catalogType === "bluetooth" &&
                    <>
                        <Text className="text-lg mt-2">Eszköz:</Text>
                        <View className='android:border android:border-custom-secondary rounded-lg text-black text-lg bg-custom-background ios:flex ios:flex-row'>
                            <Picker
                                style={styles.androidPickerStyle}
                                dropdownIconColor={"#000000"}
                                itemStyle={styles.androidPickerStyle}
                                selectedValue={catalogType}

                                onValueChange={(itemValue, itemIndex) =>
                                    null
                                }>
                                <Picker.Item label="Kód" value="code" />
                                <Picker.Item label="QR" value="qr" />
                                <Picker.Item label="Bluetooth" value="bluetooth" />
                                <Picker.Item label="NFC" value="nfc" />
                            </Picker>
                        </View>
                    </>}




                <View className='flex flex-row justify-center mt-5 ios:gap-2'>
                    <View>
                        <Text className='my-auto'>GPS</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsEnabled(!isEnabled) }}
                        value={isEnabled}
                    />
                </View>
                <Pressable className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                    <Text className="text-[#F5F5F5] m-auto">Indítás</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    androidPickerStyle: {
        color: "#000000",
    },
    iosPickerStyle: {
        color: "#000000",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto"
    }
})
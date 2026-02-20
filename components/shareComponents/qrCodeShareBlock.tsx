import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function QrCodeShareBlock(){
    return(
        <View className="mx-auto bg-custom-primary mt-20 p-5 rounded-2xl shadow">
            <Text className="text-lg mb-1">Kód:</Text> 
            <Image source={"https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"} style={styles.qr}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
  qr: {
    height: 200,
    width: 200,
    bottom: 0,
    left: 0,
    margin:"auto"
  },
});
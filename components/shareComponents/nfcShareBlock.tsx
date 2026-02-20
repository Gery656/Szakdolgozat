import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function NfcShareBlock(){
    return(
        <View className="mx-auto bg-custom-primary mt-28 p-5 rounded-2xl shadow">
            <Image source={require("@/assets/images/nfc-tag.png")} style={styles.qr}></Image>
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
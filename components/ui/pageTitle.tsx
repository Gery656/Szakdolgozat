import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TitleProp{
    title:string,
    backButton:boolean|null
}

export default function PageTitle({title,backButton}:TitleProp){

    return(
              <View className='bg-custom-primary h-24 mt-20 w-11/12 rounded-2xl mx-auto shadow flex flex-row'>
                {backButton &&
                <Pressable
                className="w-2/12 h-full"
                onPress={()=>{
                    if (router.canGoBack()) {
                        router.back();
                    }
                }}>
                        <Image source={require("@/assets/images/leftArrow.png")} style={styles.image}/>
                </Pressable>
            }
                <View className={backButton ? "w-10/12 h-full" : "w-full h-full"}>
                    <Text className='text-2xl m-auto font-normal'>{title}</Text>
                </View>
              </View>
    )
}

const styles = StyleSheet.create({
  image: {
    height: 23,
    width: 23,
    bottom: 0,
    left: 0,
    margin:"auto"
  },
});
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface NewEventButtonProp{
    title:string,
}
export default function NewEventButton({title}:NewEventButtonProp)
{
    return(
        <Link href={'/NewEventScreen'} asChild >
            <Pressable>
                <View className="border border-custom-secondary rounded-3xl shadow bg-custom-primary">
                    <View className="flex flex-row gap-2 px-4 py-2 m-auto">
                            <Image source={require('@/assets/images/plus.png')} style={styles.image}/>
                        <Text className="text-xl">
                            {title}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </Link>
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

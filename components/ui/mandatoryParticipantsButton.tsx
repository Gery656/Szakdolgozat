import { Image } from "expo-image";
import { Href, Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface MandatoryParticipantsButtonProp{
    title:string,
    destination: Href
}
export default function MandatoryParticipantsButton({title,destination}:MandatoryParticipantsButtonProp)
{
    return(
        <Link href={destination} asChild >
            <Pressable>
                <View className="border border-custom-secondary rounded-3xl shadow bg-custom-primary">
                    <View className="flex flex-row gap-2 px-4 py-2 m-auto">
                            <Image source={require('@/assets/images/person.png')} style={styles.image}/>
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
    height: 20,
    width: 20,
    bottom: 0,
    left: 0,
    margin:"auto"
  },
});

import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function CatalogList(){

    const nums = [...Array(10).keys()];

        return(
            <View className="w-11/12 mx-auto">
    
    
            {nums.map((num) =>
                <Link
                key={num}
                href={{pathname: "/(screens)/ChosenEventScreen", params:{event_id: num}}}
                asChild>
                    <Pressable className="my-2">
                        <View className="w-full flex flex-row bg-custom-primary rounded-2xl shadow p-2">
                            <View className="w-5/6">
                                <View className="my-auto w-full h-fit">
                                    <Text className="text-xl">{num}. Jelentkezés</Text>
                                    <View className="flex flex-row w-full">
                                        <View className="w-1/2 flex flex-row gap-2">
                                            <View>
                                                <Image source={require("@/assets/images/person.png")} style={styles.personIcon}/>
                                            </View>
                                            <Text className="my-auto">{Math.floor(Math.random()*100)}</Text>
                                        </View>
                                        <View className="w-1/2">
                                            <Text className="mx-auto">2025.11.15.</Text>
                                            <Text className="mx-auto">13:00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className="w-1/6">
                                <Image source={require("@/assets/images/rightArrow.png")} style={styles.image}/>
                            </View>
                        </View>
                    </Pressable>
                </Link>
            )}
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
      personIcon: {
        height: 13,
        width: 13,
        bottom: 0,
        left: 0,
        margin:"auto"
      },
    });
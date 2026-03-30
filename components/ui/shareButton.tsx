import { getSelectedCatalog, setSharedCatalog } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface ShareButtonProp{
    title:string
}
export default function ShareButton({title}:ShareButtonProp)
{
    const dispatch = useDispatch();
    const catalog_id = useSelector(getSelectedCatalog);
    return(
        
            <Pressable
            onPress={()=>{
                dispatch(setSharedCatalog(catalog_id));
                router.push("/OnSuccessfulCatalogCreation");
            }}>
                <View className="border border-custom-secondary rounded-3xl shadow bg-custom-primary">
                    <View className="flex flex-row gap-2 px-4 py-2 m-auto">
                            <Image source={require('@/assets/images/rocket.png')} style={styles.image}/>
                        <Text className="text-xl">
                            {title}
                        </Text>
                    </View>
                </View>
            </Pressable>
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

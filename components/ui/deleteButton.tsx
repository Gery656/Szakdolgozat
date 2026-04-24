import { apiURL, getSelectedCatalog, getSelectedEvent, getToken, setEvents, setUser } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface DeleteButtonProp {
    title: string,
    isEvent: boolean
}

export default function DeleteButton({ title, isEvent }: DeleteButtonProp) {
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const selectedEvent = useSelector(getSelectedEvent);
    const selectedCatalog = useSelector(getSelectedCatalog);

    async function deleteEvent() {
        const deleteResponse = isEvent ?
            await fetch(apiURL + "/events/" + selectedEvent, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            :
            await fetch(apiURL + "/events/" + selectedEvent + "/catalogs/" + selectedCatalog, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

        if (!deleteResponse.ok) {
            if (deleteResponse.status === 401) {
                if (router.canDismiss()) {
                    router.dismissAll()
                }
                router.dismissTo('/');
            }

            return;
        }

        const response = await fetch(apiURL + "/resources", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                if (router.canDismiss()) {
                    router.dismissAll()
                }
                router.dismissTo('/');
            }

            return;
        }

        if (router.canDismiss()) {
            if (isEvent) {
                router.dismissTo("/MyEvents")
            }
            else{
                router.dismissTo("/ChosenEventScreen")
            }
        }

        const recievedData = await response.json();
        dispatch(setUser(recievedData.user));
        dispatch(setEvents(recievedData.events));
    }

    const areYouSureAlert = () => {
        Alert.alert("Vigyázat!", "Biztosan törölni szeretné?", [
            {
                text: "Mégse",
                style: "cancel"
            }, {
                text: "Törlés",
                style: "destructive",
                onPress: deleteEvent
            }
        ])
    }
    return (
        <Pressable onPress={areYouSureAlert} className="ml-auto">
            <View className="border border-red-600 rounded-3xl shadow bg-custom-primary">
                <View className="flex flex-row gap-2 px-4 py-2 m-auto">
                    <Image source={require('@/assets/images/trash-red.png')} style={styles.image} />
                    <Text className="text-xl text-red-600">
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
        margin: "auto"
    },
});

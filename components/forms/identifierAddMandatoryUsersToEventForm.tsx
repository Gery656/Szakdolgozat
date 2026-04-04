import { apiURL, getSelectedEvent, getToken, setEvents, setUser } from "@/redux/applicationSlice";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function IdentifierAddMandatoryUsersToEventForm() {
    const [identifiers, setIdentifiers] = useState<string[]>([]);
    const [identifiersError, setIdentifiersError] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const event_id = useSelector(getSelectedEvent);
    const token = useSelector(getToken);

    const dispatch = useDispatch();

    async function sendFormOnPress() {
        setIdentifiersError([]);

        setIsLoading(true);

        const response = await fetch(apiURL + "/events/"+event_id+"/mandatory/identifier", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                identifiers:identifiers
            })
        });

        const body = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                if (body.errors) {
                    const errorsToShow:string[]=[];
                    Object.values<string[]>(body.errors).map((errorArray)=>{errorArray.map((errorText)=>errorsToShow.push(errorText))})
                    setIdentifiersError(errorsToShow);
                }
            }
            if (response.status === 401) {
                if (router.canDismiss()) {
                    router.dismissAll()
                }
                router.dismissTo('/');
            }
            setIsLoading(false);
            return;
        }

        const response2 = await fetch(apiURL + "/resources", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        if (!response2.ok) {
            if (response2.status === 401) {
                if (router.canDismiss()) {
                    router.dismissAll()
                }
                router.dismissTo('/');
            }
            setIsLoading(false);
            return;
        }
        const recievedData = await response2.json();
        dispatch(setUser(recievedData.user));
        dispatch(setEvents(recievedData.events));

        setIsLoading(false);

        router.dismissTo("/MandatoryUsersScreen");
    }

    return (
        <View className="w-11/12 mx-auto mt-5">
            <Text className="text-lg mt-2">Egyedi azonosítók:</Text>
            <TextInput
                editable
                multiline={true}
                placeholder="exampleIdentifier1
exampleIdentifier2
aAsdAklsuAz1
aAsdAklsuAz2"
                className="border border-custom-secondary rounded-lg text-black bg-custom-background placeholder:text-gray-400"
                onChange={(event) => { setIdentifiers(event.nativeEvent.text.split("\n")) }}
            />
            {identifiersError.length !== 0 && identifiersError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            {isLoading ?
                <View className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                    <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                </View>
                :
                <Pressable className="w-full h-16 bg-custom-secondary mt-10 rounded-lg"
                    onPress={sendFormOnPress}>
                    <Text className="text-[#F5F5F5] m-auto">Hozzáadás</Text>
                </Pressable>
            }
        </View>
    )
}
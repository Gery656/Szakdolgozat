import { Event } from "@/interfaces/types";
import { apiURL, getEvents, getSelectedEvent, getToken, setEvents, setUser } from "@/redux/applicationSlice";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateEventForm() {
    const event_id = useSelector(getSelectedEvent);
    const events = useSelector(getEvents);
    const event = events.find((event: Event) => event.id === event_id);
    const token = useSelector(getToken);

    const [name, setName] = useState(event.name);
    const [nameError, setNameError] = useState<string[]>([]);
    const [description, setDescription] = useState(event.description);
    const [descriptionError, setDescriptionError] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    async function newEventOnPress() {

        setNameError([]);
        setDescriptionError([]);

        setIsLoading(true);

        const response = await fetch(apiURL + "/events/" + event_id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                ...(name !== event.name ? { name: name } : {}),
                ...(description !== event.description ? { description: description } : {})
            })
        });

        const body = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                if (body.errors.name) {
                    setNameError([...body.errors.name]);
                }
                if (body.errors.description) {
                    setDescriptionError([...body.errors.description]);
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

        router.dismissTo("/ChosenEventScreen");
    }

    return (
        <View className="bg-custom-primary mt-20 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row">

            <Text className="text-lg">Esemény neve</Text>
            <TextInput
                defaultValue={name}
                className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"
                onChange={(event) => { setName(event.nativeEvent.text) }}
            />
            {nameError.length !== 0 && nameError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            <Text className="text-lg mt-2">Rövid leírás</Text>
            <TextInput
                defaultValue={description}
                editable
                multiline={true}
                numberOfLines={4}
                className="border border-custom-secondary rounded-lg text-black text-lg min-h-12 bg-custom-background"
                onChange={(event) => { setDescription(event.nativeEvent.text) }}
            />
            {descriptionError.length !== 0 && descriptionError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            {isLoading ?
                <View className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                    <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                </View>
                :
                <Pressable
                    className="w-full h-16 bg-custom-secondary mt-10 rounded-lg"
                    onPress={newEventOnPress}>
                    <Text className="text-[#F5F5F5] m-auto">Módosítás</Text>
                </Pressable>
            }
        </View>
    )
}
import { apiURL, getSelectedCatalog, getSelectedEvent, getToken, setEvents, setUser } from "@/redux/applicationSlice";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function AddUserToACatalogForm() {
    const [isMethodEmail, setIsMethodEmail] = useState(true);
    const [email, setEmail] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [inputError, setInputError] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);
    const token = useSelector(getToken);

    function showAddWithEmail(value: boolean) {
        setIsMethodEmail(value);
        setInputError([]);
        setIdentifier("");
        setEmail("");
    }

    async function addUserWithEmailOnPress() {
        setInputError([]);
        setIsLoading(true);

        const response = await fetch(apiURL + "/events/" + event_id + "/catalogs/" + catalog_id + "/addUserViaEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                email: email
            })
        });

        const body = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                if (body.errors.email) {
                    setInputError([...body.errors.email]);
                }
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
        setEmail("");

        setIsLoading(false);
    }

    async function addUserWithIdentifierOnPress() {
        setInputError([]);
        setIsLoading(true);

        const response = await fetch(apiURL + "/events/" + event_id + "/catalogs/" + catalog_id + "/addUserViaIdentifier", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                identifier: identifier
            })
        });

        const body = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                if (body.errors.identifier) {
                    setInputError([...body.errors.identifier]);
                }
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
        setIdentifier("");

        setIsLoading(false);
    }

    return (
        <View className="w-11/12 mx-auto border p-2 rounded-2xl border-custom-secondary/50">
            <View className="flex flex-row mb-4">
                <TouchableOpacity
                    className={isMethodEmail ? "w-1/2 py-2 border-b-2 border-custom-secondary" : "w-1/2 py-2"}
                    onPress={() => {
                        showAddWithEmail(true);
                    }}>
                    <Text className="m-auto text-lg">Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={!isMethodEmail ? "w-1/2 py-2 border-b-2 border-custom-secondary" : "w-1/2 py-2"}
                    onPress={() => {
                        showAddWithEmail(false);
                    }}>
                    <Text className="mx-auto text-lg">Azonosító</Text>
                </TouchableOpacity>
            </View>

            {isMethodEmail &&
                <View className="flex flex-row justify-between">
                    <TextInput className="w-8/12 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background placeholder:text-gray-400"
                        placeholder="péter@példa.hu"
                        value={email}
                        onChange={(event) => setEmail(event.nativeEvent.text)}
                    />
                    {isLoading ?
                        <View className="rounded-lg h-12 bg-custom-secondary px-2 w-3/12">
                            <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                        </View>
                        :
                        <Pressable onPress={addUserWithEmailOnPress} className="rounded-lg h-12 bg-custom-secondary px-2 w-3/12">
                            <Text className="text-white m-auto">Hozzáad</Text>
                        </Pressable>}
                </View>
            }
            {!isMethodEmail &&

                <View className="flex flex-row justify-between">
                    <TextInput className="w-8/12 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background placeholder:text-gray-400"
                        placeholder="1234abcd"
                        value={identifier}
                        onChange={(event) => setIdentifier(event.nativeEvent.text)}
                    />
                    {isLoading ?
                        <View className="rounded-lg h-12 bg-custom-secondary px-2 w-3/12">
                            <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                        </View>
                        :
                        <Pressable onPress={addUserWithIdentifierOnPress} className="rounded-lg h-12 bg-custom-secondary px-2 w-3/12">
                            <Text className="text-white m-auto">Hozzáad</Text>
                        </Pressable>}
                </View>}

            {inputError.length !== 0 && inputError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}
        </View>
    )
}
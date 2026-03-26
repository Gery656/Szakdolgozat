import { apiURL } from "@/redux/applicationSlice";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import MessageBlock from "../ui/messageBlock";

interface catalog {
    id: number,
    name: string,
    lengthInMin: number,
    type: string,
    isGPSNeeded: boolean,
    signUpCode: string | null,
    latitude: number | null,
    longitude: number | null,
    qrFileName: string | null,
    event_id: number,
    bluetooth_device_id: number | null,
    created_at: string,
    updated_at: string
}

export default function RegisterForm() {

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string[]>([]);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string[]>([]);
    const [identifier, setIdentifier] = useState("");
    const [identifierError, setIdentifierError] = useState<string[]>([]);
    const [password1, setPassword1] = useState("");
    const [password1Error, setPassword1Error] = useState<string[]>([]);
    const [password2, setPassword2] = useState("");
    const [password2Error, setPassword2Error] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

    return (isRegistrationSuccess ?
        <View className="mt-32">
            <MessageBlock
            title="Siker!"
            message1={"Sikeresen regisztrált!"}
            message2={"Profilod aktiválásához kérlek nyisd meg az ellenőrző emailben kapott linket!"}
            />
        </View>
         :
        <View className="bg-[#F2EAD3] mt-10 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row shadow">
            <Text className="text-lg">Név</Text>
            <TextInput
                className="px-2 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"
                onChange={(event) => { setName(event.nativeEvent.text) }}
            />
            {nameError.length !== 0 && nameError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            <Text className="text-lg mt-2">Email</Text>
            <TextInput
                onChange={(event) => { setEmail(event.nativeEvent.text) }}
                className="px-2 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />
            {emailError.length !== 0 && emailError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            <Text className="text-lg mt-2">Egyedi azonosító</Text>
            <TextInput
                onChange={(event) => { setIdentifier(event.nativeEvent.text) }}
                className="px-2 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />
            {identifierError.length !== 0 && identifierError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            <Text className="text-lg mt-2">Jelszó</Text>
            <TextInput
                secureTextEntry={true}
                onChange={(event) => { setPassword1(event.nativeEvent.text) }}
                className="px-2 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />
            {password1Error.length !== 0 && password1Error.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}


            <Text className="text-lg mt-2">Jelszó megismétlése</Text>
            <TextInput
                secureTextEntry={true}
                onChange={(event) => { setPassword2(event.nativeEvent.text) }}
                className="px-2 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />
            {password2Error.length !== 0 && password2Error.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            {isLoading ?
                <View className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                    <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                </View>
                :
                <Pressable onPress={async () => {
                    setNameError([]);
                    setEmailError([]);
                    setIdentifierError([]);
                    setPassword1Error([]);
                    setPassword2Error([]);

                    setIsLoading(true);

                    const ans = await fetch(apiURL + "/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            identifier: identifier,
                            password1: password1,
                            password2: password2
                        })
                    });
                    
                    setIsLoading(false);

                    const body = await ans.json();

                    if (!ans.ok) {
                        if (ans.status === 422) {
                            if (body.errors.name) {
                                setNameError([...body.errors.name]);
                            }
                            if (body.errors.email) {
                                setEmailError([...body.errors.email]);
                            }
                            if (body.errors.identifier) {
                                setIdentifierError([...body.errors.identifier]);
                            }
                            if (body.errors.password1) {
                                setPassword1Error([...body.errors.password1]);
                            }
                            if (body.errors.password2) {
                                setPassword2Error([...body.errors.password2]);
                            }

                        }
                        return;
                    }

                    setIsRegistrationSuccess(true);

                }} className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                    <Text className="text-[#F5F5F5] m-auto">Regisztráció</Text>
                </Pressable>
            }
        </View>
    )
}
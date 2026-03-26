import { apiURL, save, setEvents, setToken, setUser } from "@/redux/applicationSlice";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import ResendEmailButton from "../resendEmailButton";

export default function LoginForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password1, setPassword] = useState("");
    const [error1, setError1] = useState<string[]>([]);
    const [error2, setError2] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResendVisible, setIsResendVisible] = useState(false);
    return (
        <View className="bg-[#F2EAD3] mt-20 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row">

            <Text className="text-lg">Email</Text>
            <TextInput
                onChange={(event) => { setEmail(event.nativeEvent.text); setIsResendVisible(false) }}
                className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

            {error1.length !== 0 && error1.map((error,i)=><Text key={i} className="text-red-500">{error}</Text>)}

            <Text className="text-lg mt-2">Jelszó</Text>
            <TextInput secureTextEntry={true}
                onChange={(event) => { setPassword(event.nativeEvent.text); setIsResendVisible(false) }}
                className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

            {error2.length !== 0 && error2.map((error,i)=><Text key={i} className="text-red-500">{error}</Text>)}
            

            {isLoading ?
                <View className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                    <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                </View>
                :
                <Pressable onPress={async () => {
                    setError1([]);
                    setError2([]);
                    setIsResendVisible(false);

                    let emailErrors = [];
                    let passwordErrors = []

                    if (email=="") {
                        emailErrors.push("Email mező kötelező");
                    }
                    if (password1=="") {
                        passwordErrors.push("Jelszó mező kötelező");
                    }
                    
                    if (emailErrors.length === 0 && passwordErrors.length === 0) {

                        setIsLoading(true);
    
                        const ans = await fetch(apiURL + "/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password1
                            })
                        });
    
                        
                        if (!ans.ok) {
                            if (ans.status === 401) {
                                emailErrors.push("Hibás email cím vagy jelszó!")
                                passwordErrors.push("Hibás email cím vagy jelszó!")
                            }
                            if (ans.status === 403) {
                                emailErrors.push("Profil nincs aktiválva!")
                                setIsResendVisible(true);
                            }
                            if (ans.status === 422) {
                                emailErrors.push("Email címet szükséges megadni")
                            }
                            
                        }else{

                            const body = await ans.json();
                            dispatch(setToken(body.token));
                            emailErrors = [];
                            passwordErrors = [];
                            save("token",body.token);

                            const response = await fetch(apiURL + "/resources", {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "Authorization": "Bearer " + body.token
                                }
                            });
                            const recievedData = await response.json();
                            dispatch(setUser(recievedData.user));
                            dispatch(setEvents(recievedData.events));

                            router.replace('/(screens)/MyEvents')
                        }
                    }
                    
                    setIsLoading(false);

                    setError1(emailErrors);
                    setError2(passwordErrors);


                }} className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                    <Text className="text-[#F5F5F5] m-auto">Bejelentkezés</Text>
                </Pressable>
            }

            {isResendVisible && <ResendEmailButton email={email} />}

        </View>
    )
}
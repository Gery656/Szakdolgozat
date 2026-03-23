import { apiURL, getToken, getUser, setToken, setUser } from "@/redux/applicationSlice";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface catalog{
    id:number,
    name:string,
    lengthInMin:number,
    type:string,
    isGPSNeeded:boolean,
    signUpCode:string|null,
    latitude:number|null,
    longitude:number|null,
    qrFileName:string|null,
    event_id:number,
    bluetooth_device_id:number|null,
    created_at:string,
    updated_at:string
}

export default function RegisterForm(){

    const dispatch = useDispatch();

    const token = useSelector(getToken);
    const user = useSelector(getUser);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorText, setErrorText] = useState("");

    return(
        <View className="bg-[#F2EAD3] mt-10 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row shadow">
            <Text className="text-lg">Név</Text>
            <TextInput
            className="px-2 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"
            onChange={(event)=>{setName(event.nativeEvent.text)}}
            />

            <Text className="text-lg mt-2">Email</Text>
            <TextInput
            onChange={(event)=>{setEmail(event.nativeEvent.text)}}
            className="px-2 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"/>

            <Text className="text-lg mt-2">Jelszó</Text>
            <TextInput
            onChange={(event)=>{setPassword1(event.nativeEvent.text)}}
            className="px-2 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"/>

            <Text className="text-lg mt-2">Jelszó megismétlése</Text>
            <TextInput
            onChange={(event)=>{setPassword2(event.nativeEvent.text)}}
            className="px-2 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"/>
            {user !== null &&
            <View>
                <Text className="text-lg mt-2">{user.name}</Text>
                <Text className="text-lg mt-2">{token}</Text>
            </View>
            }
            {errorText!=="" && <Text className="text-lg mt-2 text-red-500">{errorText}</Text>}

            <Pressable onPress={async ()=>{

                const ans = await fetch(apiURL+"/login",{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        email:email,
                        password:password1
                    })
                });

                if (!ans.ok) {
                    if (ans.status === 422) {
                        setErrorText("Hibás formátum")
                    }
                    if (ans.status===401) {
                        setErrorText("Hibás email vagy jelszó!")
                    }
                    if (ans.status===403) {
                        setErrorText("Profil nincs aktiválva")
                    }
                    return;
                }
                
                const body = await ans.json();
                dispatch(setToken(body.token));
                dispatch(setUser(body.user));
                setErrorText("");

            }} className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                <Text className="text-[#F5F5F5] m-auto">Regisztráció</Text>
            </Pressable>
        </View>
    )
}
import { apiURL } from "@/redux/applicationSlice";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

interface ResendEmailButtonProp{
    email:string
}

export default function ResendEmailButton({email}:ResendEmailButtonProp) {
    const [isLoading, setIsLoading] = useState(false); 
    return (
        <TouchableOpacity className="mt-4"
        onPress={async()=>{
            setIsLoading(true);

            await fetch(apiURL + "/email/verification-notification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    email: email
                })
            });

            setIsLoading(false);
        }}>
            <Text className="m-auto mt-1 underline rounded-lg">Email újra küldése</Text>
        </TouchableOpacity>
    )
}
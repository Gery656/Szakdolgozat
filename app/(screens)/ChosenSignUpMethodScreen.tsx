
import SignUpBluetoothSignalsSubmitForm from "@/components/forms/signUpBluetoothSignalsSubmitFrom";
import SignUpCodeSubmitForm from "@/components/forms/signUpCodeSubmitForm";
import SignUpQrCodeSubmitForm from "@/components/forms/signUpQrCodeSubmitForm";
import PageTitle from "@/components/ui/pageTitle";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function ChosenSignUpMethodScreen(){

    const { mode,isGps } = useLocalSearchParams();

    return(
        <View className="min-w-full min-h-full">
            
            <PageTitle title="Jelentkezés" backButton={false}></PageTitle>

            {mode==="code" && <SignUpCodeSubmitForm />}
            {mode==="qr" && <SignUpQrCodeSubmitForm />}

            {mode==="bluetooth" && <SignUpBluetoothSignalsSubmitForm />}
            

        </View>
    )
}
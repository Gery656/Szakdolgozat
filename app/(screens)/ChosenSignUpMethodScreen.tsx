
import SignUpBluetoothSignalsSubmitForm from "@/components/forms/signUpBluetoothSignalsSubmitFrom";
import SignUpCodeSubmitForm from "@/components/forms/signUpCodeSubmitForm";
import PageTitle from "@/components/ui/pageTitle";
import { getMethodToSignUp } from "@/redux/applicationSlice";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function ChosenSignUpMethodScreen(){

    const {method,isGPSNeeded} = useSelector(getMethodToSignUp);

    return(
        <View className="min-w-full min-h-full">
            
            <PageTitle title="Jelentkezés" backButton={true}></PageTitle>
            <Text>{method}</Text>
            <Text>{isGPSNeeded ? "true": "false"}</Text>

            {method==="code" && <SignUpCodeSubmitForm />}
            {/* {mode==="qr" && <SignUpQrCodeSubmitForm />} */}

            {method==="bluetooth" && <SignUpBluetoothSignalsSubmitForm />}
            

        </View>
    )
}
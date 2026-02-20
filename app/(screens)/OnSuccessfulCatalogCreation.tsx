import PageTitle from "@/components/pageTitle";
import SecondaryTitle from "@/components/secondaryTitle";
import NfcShareBlock from "@/components/shareComponents/nfcShareBlock";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function OnSuccessfulCatalogCreation() {

    const { event_id, catalog_id } = useLocalSearchParams();
    
    return (
        <View className="min-w-full min-h-full">

            <PageTitle title={event_id+". Példa esemény"} backButton={true}></PageTitle>

            <SecondaryTitle text={catalog_id+". Ellenőrzés"}/>

            <NfcShareBlock></NfcShareBlock>

        </View>
    )
}
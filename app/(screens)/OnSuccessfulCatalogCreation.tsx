import { NfcEmulationPanelWrapper } from "@/components/nfcemulationpanelWrapper";
import SuccessText from "@/components/shareComponents/successText";
import PageTitle from "@/components/ui/pageTitle";
import SecondaryTitle from "@/components/ui/secondaryTitle";
import { useLocalSearchParams } from "expo-router";
import { Platform, Text, View } from "react-native";

export default function OnSuccessfulCatalogCreation() {

    const { event_id, catalog_id, mode } = useLocalSearchParams();

    return (
        <View className="min-w-full min-h-full">

            <PageTitle title={event_id + ". Példa esemény"} backButton={true}></PageTitle>

            <SecondaryTitle text={catalog_id + ". Ellenőrzés"} />

            {mode === "nfc" ?
                <>
                    {Platform.OS === 'android' && <NfcEmulationPanelWrapper></NfcEmulationPanelWrapper>}
                    {Platform.OS === 'ios' && <Text className='text-red-900 dark:text-red-500 m-auto text-xl'>IOS eszközön nem elérhető</Text>}
                </>
                :
                <SuccessText></SuccessText>
                }


        </View>
    )
}
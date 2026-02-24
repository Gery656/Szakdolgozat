import NewCatalogForm from "@/components/forms/newCatalogForm";
import PageTitle from "@/components/ui/pageTitle";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function NewCatalogScreen() {

    const { event_id } = useLocalSearchParams();

    return (
            <View className="min-w-full min-h-full">

                <PageTitle title="Új ellenőrzés" backButton={true}></PageTitle>

                <NewCatalogForm event_id={event_id.toString()}/>


            </View>
    )
}
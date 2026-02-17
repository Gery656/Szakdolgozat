import NewCatalogForm from "@/components/newCatalogForm";
import PageTitle from "@/components/pageTitle";
import { View } from "react-native";

export default function NewCatalogScreen() {
    return (
        <>
            <View className="min-w-full min-h-full">

                <PageTitle title="Új ellenőrzés" backButton={true}></PageTitle>

                <NewCatalogForm />


            </View>

            
        </>
    )
}
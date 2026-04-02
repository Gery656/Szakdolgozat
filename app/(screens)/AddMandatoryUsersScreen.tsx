import AddMethodChoice from "@/components/ui/addMethodChoice";
import PageTitle from "@/components/ui/pageTitle";
import SeparatingLine from "@/components/ui/separatingLine";
import { ScrollView } from "react-native";

export default function AddMandatoryUsersScreen(){
    return(
        <ScrollView className="min-w-full min-h-full">
            <PageTitle title="Résztvevők" backButton={true}/>

            <AddMethodChoice />

            <SeparatingLine />
        </ScrollView>
    )
}
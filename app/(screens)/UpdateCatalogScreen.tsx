import UpdateCatalogForm from "@/components/forms/updateCatalogForm";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import { Catalog, Event } from "@/interfaces/types";
import { getEvents, getSelectedCatalog, getSelectedEvent } from "@/redux/applicationSlice";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

export default function UpdateCatalogScreen() {
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);
    const events = useSelector(getEvents);
    const event = events.find((event:Event)=>event.id===event_id);
    const catalog = event.catalogs.find((catalog:Catalog)=>catalog.id===catalog_id);

    return (
            <ScrollView className="min-w-full min-h-full">

                <PageTitle title={catalog.name} backButton={true}></PageTitle>

                <UpdateCatalogForm/>

                <PadElement></PadElement>
            </ScrollView>
    )
}
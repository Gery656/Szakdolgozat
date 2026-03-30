import { NfcEmulationPanelWrapper } from "@/components/nfcemulationpanelWrapper";
import CodeShareBlock from "@/components/shareComponents/codeShareBlock";
import QrCodeShareBlock from "@/components/shareComponents/qrCodeShareBlock";
import SuccessText from "@/components/shareComponents/successText";
import PageTitle from "@/components/ui/pageTitle";
import SecondaryTitle from "@/components/ui/secondaryTitle";
import { Catalog, Event } from "@/interfaces/types";
import { getEvents, getSelectedEvent, getSharedCatalog, setSharedCatalog } from "@/redux/applicationSlice";
import { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function OnSuccessfulCatalogCreation() {

    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const sharedCatalog_id = useSelector(getSharedCatalog);
    const event = events.find((event:Event)=>event.id===event_id);
    const catalog = event.catalogs.find((catalog:Catalog)=>catalog.id===sharedCatalog_id);
    const dispatch = useDispatch();

    useEffect(()=>{
        return(()=>{
            dispatch(setSharedCatalog(null));
        })
    },[]);
    return (
        <View className="min-w-full min-h-full">

            <PageTitle title={event.name} backButton={true}></PageTitle>

            <SecondaryTitle text={catalog.name} />

            {catalog.type === "nfc" &&
                <>
                    {Platform.OS === 'android' && <NfcEmulationPanelWrapper></NfcEmulationPanelWrapper>}
                    {Platform.OS === 'ios' && <Text className='text-red-900 dark:text-red-500 m-auto text-xl'>IOS eszközön nem elérhető</Text>}
                </>
            }

            {catalog.type === "code" &&
                <CodeShareBlock />
            }

            {catalog.type === "qr" &&
                <QrCodeShareBlock />
            }

            {catalog.type === "bluetooth" &&
                <SuccessText />
            }


        </View>
    )
}
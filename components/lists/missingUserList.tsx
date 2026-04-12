import { Catalog, Event, MandatoryUser, SignedUpUser } from "@/interfaces/types";
import { getEvents, getSelectedCatalog, getSelectedEvent } from "@/redux/applicationSlice";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import MissingUserRecord from "../ui/missingUserRecord";

export default function MissingUserList() {
    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);

    const event: Event = events.find((event: Event) => event.id === event_id);
    const catalog: Catalog | undefined = event.catalogs.find((catalog: Catalog) => catalog.id === catalog_id);

    const missingUsers = event.mandatoryTo.filter((user: MandatoryUser) => !catalog?.signedUp.find((signedUpUser: SignedUpUser) => signedUpUser.email === user.email))

    return (
        <View className="w-full mt-5">

            {missingUsers.length !== 0 &&
                <View className="w-11/12 my-2 mx-auto flex flex-row flex-wrap gap-1">
                    <Text className="text-xl font-bold">
                        {missingUsers.length}
                    </Text>
                    <Text className="text-lg">hiányzó van!</Text>
                </View>
            }

            {missingUsers.map((user: MandatoryUser, i: number) =>
                <MissingUserRecord key={i} name={user.name} email={user.email} identifier={user.identifier} isColored={i%2===0}/>
            )}

            {missingUsers.length === 0 && <Text className="mx-auto mt-5">Nincsenek hiányzók</Text>}
        </View>
    )
}
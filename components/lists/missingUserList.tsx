import { Catalog, Event, MandatoryUser, SignedUpUser } from "@/interfaces/types";
import { getEvents, getSelectedCatalog, getSelectedEvent } from "@/redux/applicationSlice";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MissingUserRecord from "../ui/missingUserRecord";

export default function MissingUserList() {
    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);

    const [isAddButtonShown, setIsAddButtonShown] = useState(false);

    const event: Event = events.find((event: Event) => event.id === event_id);
    const catalog: Catalog | undefined = event.catalogs.find((catalog: Catalog) => catalog.id === catalog_id);

    const missingUsers = event.mandatoryTo.filter((user: MandatoryUser) => !catalog?.signedUp.find((signedUpUser: SignedUpUser) => signedUpUser.email === user.email))

    return (
        <View className="w-full mt-5">

            {missingUsers.length !== 0 &&
                <View className="w-11/12 my-2 mx-auto flex flex-row flex-wrap">
                    <View className="w-2/4">
                        <Text className="text-lg">
                            <Text className="text-xl font-bold">{missingUsers.length}</Text> hiányzó van!
                        </Text>
                    </View>

                    <View className="w-2/4 flex flex-row justify-center gap-2">
                        <Text className="align-middle text-lg">Jelentkeztetés</Text>
                        <Switch
                            className="align-middle"
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isAddButtonShown ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            value={isAddButtonShown}
                            onValueChange={setIsAddButtonShown}
                        />
                    </View>
                </View>
            }

            {missingUsers.map((user: MandatoryUser, i: number) =>
                <MissingUserRecord key={i} name={user.name} email={user.email} identifier={user.identifier} isColored={i % 2 === 0} isAddButtonShown={isAddButtonShown} />
            )}

            {missingUsers.length === 0 && <Text className="mx-auto mt-5">Nincsenek hiányzók</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 23,
        width: 23,
        bottom: 0,
        left: 0,
        margin: "auto"
    },
});
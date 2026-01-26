import { useContext, useState } from "react";
import { Button, View } from "react-native";
import { HCESessionContext, NFCTagType4, NFCTagType4NDEFContentType } from "react-native-hce";

export function NfcEmulationPanel() {
    const [wether, setwether] = useState(true);

    const { session } = useContext(HCESessionContext);

    const startSession = async () => {
        const tag = new NFCTagType4({
            type: NFCTagType4NDEFContentType.Text,
            content: 'Hello world123123',
            writable: false,
        });


        session.setApplication(tag);
        await session.setEnabled(true);
    };

    const stopSession = async () => {
        await session.setEnabled(false);
    };
    return (
        <View>
            <Button title='START' onPress={() => {
                if (wether == true) {
                    setwether(false);
                    startSession();
                }


            }}></Button>

            <View className={`h-40 w-40 ${wether ? 'bg-red-600' : 'bg-green-600'} m-auto my-5`}></View>

            <Button title='STOP' onPress={() => {

                if (wether == false) {
                    setwether(true);
                    stopSession();
                }

            }}></Button>
        </View>
    )
}
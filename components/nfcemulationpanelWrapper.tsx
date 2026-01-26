import React from "react";
import { HCESessionProvider } from "react-native-hce";
import { NfcEmulationPanel } from "./nfcemulationpanel";

export function NfcEmulationPanelWrapper()
{
    return(
    <HCESessionProvider>
        <NfcEmulationPanel>
        </NfcEmulationPanel>
    </HCESessionProvider>
    )
}
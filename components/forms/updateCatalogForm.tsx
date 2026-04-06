import { Catalog, Event } from '@/interfaces/types';
import { apiURL, getEvents, getSelectedCatalog, getSelectedEvent, getToken, setEvents, setUser } from '@/redux/applicationSlice';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import SeparatingLine from '../ui/separatingLine';

export default function UpdateCatalogForm() {
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);
    const events = useSelector(getEvents);
    const event = events.find((event: Event) => event.id === event_id);
    const catalog = event.catalogs.find((catalog: Catalog) => catalog.id === catalog_id);

    const [name, setName] = useState(catalog.name);
    const [nameError, setNameError] = useState<string[]>([]);
    const [lengthInMin, setLengthInMin] = useState(catalog.lengthInMin.toString());
    const [lengthInMinError, setLengthInMinError] = useState<string[]>([]);
    const [isGPSNeeded, setIsGPSNeeded] = useState(catalog.isGPSNeeded ? true : false);
    const [locationError, setLocationError] = useState<string[]>([]);
    const [wantsRefreshLocation, setWantsRefreshLocation] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    const token = useSelector(getToken);

    const dispatch = useDispatch();

    async function getCurrentLocation() {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocationError(["Helymeghatározás engedélyek hiányoznak!"]);
            return null;
        }

        return await Location.getCurrentPositionAsync({});
    }

    async function updateCatalogOnPress() {
        setNameError([]);
        setLengthInMinError([]);
        setLocationError([]);

        setIsLoading(true);

        let location = null;
        if ((!catalog.isGPSNeeded && isGPSNeeded) || wantsRefreshLocation) {
            try {
                location = await getCurrentLocation();
            } catch (error) {
                setLocationError(["Helymeghatározás ki van kapcsolva!"]);
                setIsLoading(false);
                return
            }

            if (!location) {
                setIsLoading(false);
                return
            }
        }

        let response = null;
        try {
            response = await fetch(apiURL + "/events/" + event_id + "/catalogs/" + catalog_id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    ...(name !== catalog.name ? { name: name } : {}),
                    ...(lengthInMin !== catalog.lengthInMin.toString() ? { lengthInMin: lengthInMin } : {}),
                    ...(isGPSNeeded !== (catalog.isGPSNeeded ? true : false) ? { isGPSNeeded: isGPSNeeded } : {}),

                    ...(location !== null ? {
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude
                    } : {})
                })
            });
        } catch (ex) {
            setLocationError([...locationError, "Próbálkozzon újra!"])
            setIsLoading(false);
            return;
        }
        const body = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                const newLocationErrors:string[]=[]
                if (body.errors.name) {
                    setNameError([...body.errors.name]);
                }
                if (body.errors.lengthInMin) {
                    setLengthInMinError([...body.errors.lengthInMin]);
                }
                if (body.errors.isGPSNeeded) {
                    Object.values<string>(body.errors.isGPSNeeded).map((errorText)=>newLocationErrors.push(errorText))
                }
                if (body.errors.latitude) {
                    Object.values<string>(body.errors.latitude).map((errorText)=>newLocationErrors.push(errorText))
                }
                if (body.errors.longitude) {
                    Object.values<string>(body.errors.longitude).map((errorText)=>newLocationErrors.push(errorText))
                }
                if (body.errors.catalog) {
                    Object.values<string>(body.errors.catalog).map((errorText)=>newLocationErrors.push(errorText))
                }
                setLocationError([...newLocationErrors])
            }
            if (response.status === 404) {
                setLocationError([...locationError, ...body.error])
            }
            if (response.status === 401) {
                if (router.canDismiss()) {
                    router.dismissAll()
                }
                router.dismissTo('/');
            }

            setIsLoading(false);
            return;
        }

        const response2 = await fetch(apiURL + "/resources", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!response2.ok) {
            if (response2.status === 401) {
                if (router.canDismiss()) {
                    router.dismissAll()
                }
                router.dismissTo('/');
            }

            setIsLoading(false);
            return;
        }

        const recievedData = await response2.json();
        dispatch(setUser(recievedData.user));
        dispatch(setEvents(recievedData.events));
        setIsLoading(false);

        router.dismissTo("/ChosenCatalogScreen");
    }

    return (
        <View>
            <View className="bg-[#F2EAD3] mt-10 w-11/12 h-fit py-3 px-3 rounded-2xl mx-auto shadow">
                <Text className="text-lg">Ellenőrzés neve:</Text>
                <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"
                    defaultValue={name}
                    onChange={(event) => setName(event.nativeEvent.text)}
                />
                {nameError.length !== 0 && nameError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

                <Text className="text-lg mt-2">Hossz:</Text>
                <View className='flex flex-row gap-2'>
                    <TextInput keyboardType='numeric' className="w-10/12 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"
                        defaultValue={lengthInMin}
                        onChange={(event) => setLengthInMin(event.nativeEvent.text)}
                    />
                    <Text className='my-auto text-lg'>perc</Text>
                </View>
                {lengthInMinError.length !== 0 && lengthInMinError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

                <View className='flex flex-row justify-center mt-5 mb-5 gap-2'>
                    <View>
                        <Text className='my-auto'>GPS</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isGPSNeeded ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsGPSNeeded(!isGPSNeeded) }}
                        value={isGPSNeeded}
                    />
                </View>

                {(catalog.isGPSNeeded ? true : false) && isGPSNeeded && <>
                    <SeparatingLine />

                    <View className='mt-5 mb-10 gap-2'>
                        <View>
                            <Text className='mx-auto'>Frissítsük az ellenőrzés helyét?</Text>
                        </View>
                        <Switch
                            className='mx-auto'
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={wantsRefreshLocation ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => { setWantsRefreshLocation(!wantsRefreshLocation) }}
                            value={wantsRefreshLocation}
                        />
                    </View>
                </>
                }

                {locationError.length !== 0 && locationError.map((error, i) => <Text key={i} className="text-red-500 m-auto">{error}</Text>)}

                {isLoading ?
                    <View className="w-full h-16 bg-custom-secondary rounded-lg">
                        <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                    </View>
                    :
                    <Pressable
                        onPress={updateCatalogOnPress}
                        className="w-full h-16 bg-custom-secondary mt-2 rounded-lg">
                        <Text className="text-[#F5F5F5] m-auto">Módosítás</Text>
                    </Pressable>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    androidPickerStyle: {
        color: "#000000",
    },
    iosPickerStyle: {
        height: 120,
        color: "#000000",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 16
    }
})
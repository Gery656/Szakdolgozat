import { Event, MandatoryUser } from "@/interfaces/types";
import { getEvents, getSelectedEvent } from "@/redux/applicationSlice";
import { View } from "react-native";
import { useSelector } from "react-redux";
import MandatoryUserRecord from "../ui/mandatoryUserRecord";

export default function MandatoryUserList() {
    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);

    const event = events.find((event:Event)=>event.id===event_id);
    return (
        <View className="w-full mt-5">
            {event.mandatoryTo.map((user:MandatoryUser, i:number) =>
                <MandatoryUserRecord key={i} name={user.name} email={user.email} isColored={i % 2 === 0}/>
            )}
        </View>
    )
}
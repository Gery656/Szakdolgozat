import { Text, View } from "react-native";

interface SecondaryTitleProp{
    text:string
}

export default function SecondaryTitle({text}:SecondaryTitleProp){
    
    return(
        <View className='bg-custom-primary mt-4 w-9/12 rounded-2xl mx-auto shadow p-2'>
            <Text className="mx-auto">{text}</Text>
        </View>
    )
}
import { Text, View } from "react-native";

interface MessageBlockProp{
    title:      string,
    message1?:   string|null,
    message2?:   string|null,
}

export default function MessageBlock({title,message1,message2}:MessageBlockProp) {
    return (
        <View className='w-11/12 m-auto bg-custom-primary rounded-xl p-4'>
            <View className='border-b'>
                <Text className='text-xl mx-auto'>{title}</Text>
            </View>
            <View className='mt-4'>
                <Text className='mx-auto'>{message1 ?? ""}</Text>
                <Text className='mx-auto'>{message2 ?? ""}</Text>
            </View>
        </View>
    )
}
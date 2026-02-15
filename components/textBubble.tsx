import { Text, View } from "react-native";

interface TextBubbleProp{
    text:string
}

export default function TextBubble({text}:TextBubbleProp){
    
    return(
        <View className='bg-custom-primary mt-4 w-11/12 rounded-2xl mx-auto shadow p-2'>
            <Text>{text}</Text>
        </View>
    )
}
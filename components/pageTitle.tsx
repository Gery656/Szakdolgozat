import { Text, View } from "react-native"

interface TitleProp{
    title:string,
    backButton:boolean|null
}

export default function PageTitle({title,backButton}:TitleProp){
    return(
              <View className='bg-custom-primary mt-20 w-11/12 py-6 rounded-2xl mx-auto'>
                <Text className='text-2xl mx-auto font-normal'>{title}</Text>
              </View>
    )
}
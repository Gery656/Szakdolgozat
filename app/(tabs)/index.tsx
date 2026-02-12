
import PageTitle from '@/components/pageTitle';
import RegisterForm from '@/components/registerForm';
import RegisterLoginSwitch from '@/components/registerLoginSwitch';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';


export default function HomeScreen() {
  const isFocused = useIsFocused();
  return (isFocused &&
    <View className='bg-custom-background w-full h-full '>
      <PageTitle title='Regisztráció' backButton={false}></PageTitle>
      <RegisterForm></RegisterForm>
      <RegisterLoginSwitch isRegisterPage={true}></RegisterLoginSwitch>

    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

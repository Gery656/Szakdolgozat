import { StyleSheet, View } from 'react-native';

import LoginForm from '@/components/loginForm';
import PageTitle from '@/components/pageTitle';
import RegisterLoginSwitch from '@/components/registerLoginSwitch';
import { useIsFocused } from '@react-navigation/native';

export default function Login() {

  const isFocused = useIsFocused();

  return (isFocused &&
        <View className='bg-custom-background w-full h-full'>
          <PageTitle title='Bejelentkezés' backButton={false}></PageTitle>
          <LoginForm></LoginForm>
          <RegisterLoginSwitch isRegisterPage={false}></RegisterLoginSwitch>
    
        </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

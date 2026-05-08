import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';

import LoginForm from '@/components/forms/loginForm';
import PadElement from '@/components/ui/padElement';
import PageTitle from '@/components/ui/pageTitle';
import { getEvents, getToken, getUser } from '@/redux/applicationSlice';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Login() {
const user = useSelector(getUser)
const events = useSelector(getEvents)
const token = useSelector(getToken)
  const isFocused = useIsFocused();

  return (isFocused &&
    <KeyboardAvoidingView behavior='padding' className='bg-custom-background w-full h-full'>
      <ScrollView>
        <PageTitle title='Bejelentkezés' backButton={false}></PageTitle>
        <LoginForm></LoginForm>
        <PadElement />
      </ScrollView>
    </KeyboardAvoidingView>
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

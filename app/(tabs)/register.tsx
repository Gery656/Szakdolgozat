
import RegisterForm from '@/components/forms/registerForm';
import PadElement from '@/components/ui/padElement';
import PageTitle from '@/components/ui/pageTitle';
import { useIsFocused } from '@react-navigation/native';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';


export default function Register() {
  const isFocused = useIsFocused();
  return (isFocused &&
    <KeyboardAvoidingView behavior='padding' className='bg-custom-background min-w-full min-h-full'>
      <ScrollView>
        <PageTitle title='Regisztráció' backButton={false}></PageTitle>
        <RegisterForm></RegisterForm>
        <PadElement />
      </ScrollView>
    </KeyboardAvoidingView>
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


import RegisterForm from '@/components/forms/registerForm';
import PageTitle from '@/components/ui/pageTitle';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';


export default function HomeScreen() {
  const isFocused = useIsFocused();
  return (isFocused &&
    <ScrollView className='bg-custom-background min-w-full min-h-full '>

      <PageTitle title='Regisztráció' backButton={false}></PageTitle>

      <RegisterForm></RegisterForm>

    </ScrollView>
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

import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

const Home = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();          // Ends the session
    router.replace('/');      // Redirects to index.tsx (landing page)
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🏠 Home Screen</Text>
      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }}>
        <Text style={{ color: 'red', fontSize: 16 }}>Logout & Go to Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;


#fintech app-Errors and Fixes


1. Expo run on iOS is slow or reinstalls everything
Fix: Use npx expo start --dev-client, keep Metro bundler running. Avoid repeated npx expo run ios.

2. Expo SecureStore not compatible with Clerk's TokenCache
Error: Type missing getToken, saveToken
Fix:
export const tokenCache = {
  getToken: SecureStore.getItemAsync,
  saveToken: SecureStore.setItemAsync,
};

3. Clerk OTP fails due to missing signUp.create()
Fix: Call signUp.create({ identifier: phone }) before preparePhoneNumberVerification().

4. User not showing in Clerk dashboard
Fix: Ensure signUp.create() is called and phone number includes country code (e.g., +91...).

5. Dynamic routing in OTP screen fails
Fix: Use verify/[phone].tsx and get params via:
const { phone } = useLocalSearchParams();

6. OTP verification doesn’t redirect properly
Fix: After successful OTP verification and session activation, use router.replace('/home');.

7. Clerk session not persisting across reloads
Fix: Add tokenCache to ClerkProvider and use SecureStore to save and get tokens.

8. Expo Router layout not loading
Fix: Add app/_layout.tsx with:

export default function Layout() {
  return <Stack />;
}


9. Login and signup screens render twice
Fix: Ensure Clerk hooks aren't causing unnecessary re-renders. Memoize or scope properly.

10. Clerk redirect loop or stuck state
Fix: In _layout.tsx, use:
if (isLoaded && isSignedIn) router.replace("/home");

11. OTP input field resets on each keystroke
Fix: Use a stable useState to store OTP input:
const [otp, setOtp] = useState('');


12. User not found on verify screen
Fix: Pass phone number as param (/verify/[phone]) and rehydrate signUp in that screen.

13. Login not redirecting properly
Fix: After setting active session, redirect using:
router.replace("/home");

14. App stuck in auth state in layout
Fix: Don't render layout unless auth.isLoaded === true.


15. Login state not preserved on reload
Fix: Ensure Clerk’s tokenCache and SecureStore integration are fully working in _layout.tsx.

16. Dynamic param like phone is undefined
Fix: Access route param correctly using:
const { phone } = useLocalSearchParams();

17.expo-secure-store version mismatch with Clerk TokenCache
Error:
Type 'typeof import("expo-secure-store")' is missing properties from type 'TokenCache': getToken, saveToken
Fix:

Implement a wrapper manually in tokenCache.ts:
export const tokenCache: TokenCache = {
  getToken: SecureStore.getItemAsync,
  saveToken: SecureStore.setItemAsync,
};
Also ensure it's installed correctly:
npx expo install expo-secure-store

18. Clerk version not compatible with Expo Router (hooks or token persistence breaking
Error: Unexpected behavior with useSignUp, useUser, setActive, and routing.

Fix:

Use the latest stable versions:
npm install @clerk/clerk-expo@latest
Avoid conflicts with incompatible router hooks by upgrading expo-router to match Expo SDK.

19. expo-router version mismatch or layout not loading
Error: Layout doesn’t load, routing doesn’t work properly

Fix:
Make sure you have expo-router installed with correct Expo SDK support (e.g., SDK 50+)
npm install expo-router@latest

20. Expo SDK mismatches causing runtime errors
Date: June 19–21

Issue: Random runtime errors, compatibility issues when running on iOS simulator

Fix:

Sync versions in package.json with your installed Expo SDK:
npx expo install
Use this to regenerate package-lock.json:
rm -rf node_modules package-lock.json && npm install





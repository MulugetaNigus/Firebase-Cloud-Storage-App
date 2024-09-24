import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import SplashScreen from "./components/Splash/SplashScreen";
import Body from "./components/Home/Body/Body";
import { useEffect, useState } from "react";

export default function App() {
  const [screen, setscreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setscreen(false);
    }, 5000);
  }, []);
  return (
    <View>
      {screen ? <SplashScreen /> : <Body />}
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

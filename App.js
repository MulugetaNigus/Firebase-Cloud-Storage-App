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
    <>
      {screen ? <SplashScreen /> : <Body />}
    </>
  );
}
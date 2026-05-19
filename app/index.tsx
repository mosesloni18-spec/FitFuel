import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    const check = async () => {
      try {
        const seen = await AsyncStorage.getItem("seenOnboarding");

        if (seen === "true") {
          router.replace("/(tabs)");
        } else {
          router.replace("/onboarding");
        }
      } catch {
        router.replace("/onboarding");
      }
    };

    check();
  }, []);

  return null;
}
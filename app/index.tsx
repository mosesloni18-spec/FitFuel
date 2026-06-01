import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const check = async () => {
      try {
        const seen = await AsyncStorage.getItem("seenOnboarding");
        const currentUser = await AsyncStorage.getItem("fitfuel_current_user");

        if (seen !== "true") {
          router.replace("/onboarding");
          return;
        }

        if (currentUser) {
          router.replace("/(tabs)");
        } else {
          router.replace("/auth" as any);
        }
      } catch {
        router.replace("/onboarding");
      }
    };

    check();
  }, []);

  return null;
}

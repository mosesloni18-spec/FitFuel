import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);

  const pages = [
    {
      title: "Welcome to FitFuel 🔥",
      text: "Track your nutrition, workouts, and daily progress in one place.",
      emoji: "🥗",
    },
    {
      title: "Build Healthy Habits 💧",
      text: "Complete daily tasks like walking and hydration to earn points.",
      emoji: "🚶",
    },
    {
      title: "Compete and Gain Points⭐",
      text: "Climb the leaderboard and stay motivated with friends.",
      emoji: "🏆",
    },
  ];

  const next = () => {
    if (step < pages.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };

  const finish = async () => {
    await AsyncStorage.setItem("seenOnboarding", "true");
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{pages[step].emoji}</Text>

      <Text style={styles.title}>{pages[step].title}</Text>

      <Text style={styles.text}>{pages[step].text}</Text>

      {/* dots */}
      <View style={styles.dots}>
        {pages.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              step === i && styles.activeDot
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>
          {step === pages.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>

      {step < pages.length - 1 && (
        <TouchableOpacity onPress={finish}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  emoji: {
    fontSize: 70,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#192033",
    textAlign: "center",
    marginBottom: 12,
  },

  text: {
    fontSize: 16,
    color: "#5B6475",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },

  dots: {
    flexDirection: "row",
    marginBottom: 30,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C5D1E6",
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: "#11A9D8",
    width: 18,
  },

  button: {
    backgroundColor: "#11A9D8",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },

  skip: {
    marginTop: 16,
    color: "#5B6475",
    fontWeight: "600",
  },
});
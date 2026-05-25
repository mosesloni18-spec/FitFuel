import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const PRIVACY_KEY = "fitfuel_privacy_settings";
const PROFILE_KEY = "fitfuel_profile";
const FUEL_KEY = "fitfuel_fuel_data";

export default function FriendProfileScreen() {
  const [showName, setShowName] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPoints, setShowPoints] = useState(true);
  const [showStreak, setShowStreak] = useState(true);
  const [showWater, setShowWater] = useState(false);
  const [showGoal, setShowGoal] = useState(true);

  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@fitfuel.com");
  const [goal, setGoal] = useState("Build healthy habits");
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [water, setWater] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    const savedPrivacy = await AsyncStorage.getItem(PRIVACY_KEY);

    if (savedPrivacy) {
      const privacy = JSON.parse(savedPrivacy);

      setShowName(privacy.showName);
      setShowEmail(privacy.showEmail);
      setShowPoints(privacy.showPoints);
      setShowStreak(privacy.showStreak);
      setShowWater(privacy.showWater);
      setShowGoal(privacy.showGoal);
    }

    const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);

      if (profile.name) setName(profile.name);
      if (profile.email) setEmail(profile.email);
      if (profile.goal) setGoal(profile.goal);
    }

    const savedFuel = await AsyncStorage.getItem(FUEL_KEY);

    if (savedFuel) {
      const fuel = JSON.parse(savedFuel);

      setPoints(fuel.points ?? 0);
      setStreak(fuel.streak ?? 0);
      setWater(fuel.water ?? 0);
      setWaterGoal(fuel.waterGoal ?? 3);
    }
  };

  const allHidden =
    !showName &&
    !showEmail &&
    !showPoints &&
    !showStreak &&
    !showWater &&
    !showGoal;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Friend View</Text>

      <Text style={styles.subtitle}>
        This preview shows what your friends can see.
      </Text>

      <View style={styles.card}>
        {showName && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
        )}

        {showEmail && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
        )}

        {showPoints && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Points</Text>
            <Text style={styles.value}>{points}</Text>
          </View>
        )}

        {showStreak && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Streak</Text>
            <Text style={styles.value}>{streak} days</Text>
          </View>
        )}

        {showWater && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Water</Text>
            <Text style={styles.value}>
              {water}/{waterGoal} glasses
            </Text>
          </View>
        )}

        {showGoal && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fitness Goal</Text>
            <Text style={styles.value}>{goal}</Text>
          </View>
        )}

        {allHidden && (
          <Text style={styles.privateText}>
            This user has hidden all profile information.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#EEF5FF",
  },
  container: {
    paddingTop: 70,
    paddingHorizontal: 22,
    paddingBottom: 120,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#192033",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#5B6475",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "900",
    color: "#5B6475",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "900",
    color: "#192033",
  },
  privateText: {
    fontSize: 16,
    color: "#5B6475",
    textAlign: "center",
    fontWeight: "700",
  },
});

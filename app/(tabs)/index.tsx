import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const [userName, setUserName] = useState("User");
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [water, setWater] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3);

  const loadData = useCallback(async () => {
    try {
      const profileSaved = await AsyncStorage.getItem("fitfuel_profile");
      if (profileSaved) {
        const profile = JSON.parse(profileSaved);
        if (profile.name) setUserName(profile.name);
      }
    } catch {
      console.log("Could not load profile");
    }

    try {
      const fuelSaved = await AsyncStorage.getItem("fitfuel_fuel_data");
      if (fuelSaved) {
        const data = JSON.parse(fuelSaved);
        setPoints(data.points ?? 0);
        setWater(data.water ?? 0);
        setWaterGoal(data.waterGoal ?? 3);

        const today = new Date().toISOString().split('T')[0];
        const loadedLastActive = data.lastActiveDate ?? '';
        const loadedStreak = data.streak ?? 0;
        const displayedStreak = loadedLastActive === today ? loadedStreak : 0;
        setStreak(displayedStreak);
        setLongestStreak(data.longestStreak ?? loadedStreak);
      }
    } catch {
      console.log("Could not load fuel data");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome back, {userName}!</Text>
      <Text style={styles.subtitle}>Your health journey starts today</Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🥗</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>FitFuel</Text>
          <Text style={styles.heroText}>
            Track your nutrition, fitness tasks, and daily progress.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today&apos;s Summary</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryEmoji}>🔥</Text>
          <Text style={styles.summaryValue}>{streak}</Text>
          <Text style={styles.summaryLabel}>Streak</Text>
          <Text style={styles.summarySubLabel}>Best: {longestStreak}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryEmoji}>⭐</Text>
          <Text style={styles.summaryValue}>{points}</Text>
          <Text style={styles.summaryLabel}>Points</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryEmoji}>💧</Text>
          <Text style={styles.summaryValue}>{water}/{waterGoal}</Text>
          <Text style={styles.summaryLabel}>Water</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => router.push("/fuel")}
      >
        <View>
          <Text style={styles.actionTitle}>Open Fuel Page</Text>
          <Text style={styles.actionText}>
            View calories, protein, water intake, and progress.
          </Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      <View style={styles.taskRow}>
        <View style={styles.taskCard}>
          <Text style={styles.cardTitle}>Walking Task</Text>
          <Text style={styles.taskText}>Go for a 10 min walk</Text>
          <Text style={styles.emoji}>🚶</Text>
        </View>

        <View style={styles.taskCard}>
          <Text style={styles.cardTitle}>Hydration Task</Text>
          <Text style={styles.taskText}>Drink 3 glasses of water</Text>
          <Text style={styles.emoji}>🥤</Text>
        </View>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
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
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 24,
  },
  heroEmoji: {
    fontSize: 48,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#182033",
  },
  heroText: {
    fontSize: 14,
    color: "#5B6475",
    marginTop: 4,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#222",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#192033",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#5B6475",
    marginTop: 4,
    textAlign: "center",
  },
  summarySubLabel: {
    fontSize: 12,
    color: "#5B6475",
    textAlign: "center",
    marginTop: 2,
  },
  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#192033",
  },
  actionText: {
    fontSize: 13,
    color: "#5B6475",
    marginTop: 5,
    maxWidth: 250,
  },
  arrow: {
    fontSize: 30,
    fontWeight: "800",
    color: "#11A9D8",
  },
  taskRow: {
    flexDirection: "row",
    gap: 12,
  },
  taskCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    minHeight: 135,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#192033",
    marginBottom: 8,
  },
  taskText: {
    fontSize: 13,
    color: "#5B6475",
  },
  emoji: {
    fontSize: 34,
    textAlign: "center",
    marginTop: 12,
  },
});

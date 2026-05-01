import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const STORAGE_KEY = "fitfuel_fuel_data";

export default function FuelScreen() {
  const [calories, setCalories] = useState(250);
  const [protein, setProtein] = useState(25);
  const [water, setWater] = useState(1);
  const [points, setPoints] = useState(150);
  const [streak, setStreak] = useState(2);
  const [walkDone, setWalkDone] = useState(false);

  const calorieGoal = 500;
  const proteinGoal = 50;
  const waterGoal = 3;

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          const data = JSON.parse(saved);
          setCalories(data.calories ?? 250);
          setProtein(data.protein ?? 25);
          setWater(data.water ?? 1);
          setPoints(data.points ?? 150);
          setStreak(data.streak ?? 2);
          setWalkDone(data.walkDone ?? false);
        }
      } catch {
        Alert.alert("Error", "Could not load saved fuel data.");
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            calories,
            protein,
            water,
            points,
            streak,
            walkDone,
          }),
        );
      } catch {
        console.log("Failed to save fuel data");
      }
    };

    saveData();
  }, [calories, protein, water, points, streak, walkDone]);

  const completeWalk = () => {
    if (walkDone) {
      Alert.alert(
        "Already completed",
        "You already completed this walking task.",
      );
      return;
    }

    setWalkDone(true);
    setCalories((prev) => Math.min(prev + 80, calorieGoal));
    setPoints((prev) => prev + 50);

    Alert.alert("Great job!", "Walking task completed. +50 points!");
  };

  const trackWater = () => {
    if (water >= waterGoal) {
      Alert.alert(
        "Goal completed",
        "You already reached your water goal today.",
      );
      return;
    }

    setWater((prev) => prev + 1);
    setPoints((prev) => prev + 20);
  };

  const addCalories = () => {
    if (calories >= calorieGoal) {
      Alert.alert("Goal completed", "You already reached your calorie goal.");
      return;
    }

    setCalories((prev) => Math.min(prev + 50, calorieGoal));
    setPoints((prev) => prev + 10);
  };

  const addProtein = () => {
    if (protein >= proteinGoal) {
      Alert.alert("Goal completed", "You already reached your protein goal.");
      return;
    }

    setProtein((prev) => Math.min(prev + 5, proteinGoal));
    setPoints((prev) => prev + 10);
  };

  const resetData = async () => {
    setCalories(250);
    setProtein(25);
    setWater(1);
    setPoints(150);
    setStreak(2);
    setWalkDone(false);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const caloriePercent = Math.min((calories / calorieGoal) * 100, 100);
  const proteinPercent = Math.min((protein / proteinGoal) * 100, 100);
  const waterPercent = Math.min((water / waterGoal) * 100, 100);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome back, User!</Text>

      <Text style={styles.subtitle}>Climb the leaderboard</Text>

      <View style={styles.taskRow}>
        <View style={styles.taskCard}>
          <Text style={styles.cardTitle}>Tasks!</Text>
          <Text style={styles.taskText}>
            {walkDone ? "Walk completed today" : "Go for a 10 min walk"}
          </Text>
          <Text style={styles.emoji}>🚶</Text>

          <TouchableOpacity
            style={[styles.yellowButton, walkDone && styles.disabledButton]}
            onPress={completeWalk}
          >
            <Text style={styles.buttonText}>{walkDone ? "Done" : "Go!"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.taskCard}>
          <Text style={styles.cardTitle}>Tasks</Text>
          <Text style={styles.taskText}>Drink 3 glasses of water</Text>
          <Text style={styles.emoji}>🥤</Text>

          <TouchableOpacity style={styles.blueButton} onPress={trackWater}>
            <Text style={styles.buttonText}>Track</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your Fuel</Text>

      <View style={styles.fuelCard}>
        <View style={styles.fuelRow}>
          <View>
            <Text style={styles.fuelLabel}>Calories</Text>
            <Text style={styles.fuelValue}>
              {calories}/{calorieGoal} cal
            </Text>
          </View>

          <View>
            <Text style={styles.fuelLabel}>Protein</Text>
            <Text style={styles.fuelValue}>
              {protein}/{proteinGoal} g
            </Text>
          </View>

          <View>
            <Text style={styles.fuelLabel}>Water</Text>
            <Text style={styles.fuelValue}>
              {water}/{waterGoal} glasses
            </Text>
          </View>
        </View>

        <View style={styles.progressBox}>
          <View style={styles.progressBg}>
            <View
              style={[styles.calorieBar, { width: `${caloriePercent}%` }]}
            />
          </View>

          <View style={styles.progressBg}>
            <View
              style={[styles.proteinBar, { width: `${proteinPercent}%` }]}
            />
          </View>

          <View style={styles.progressBg}>
            <View style={[styles.waterBar, { width: `${waterPercent}%` }]} />
          </View>
        </View>

        <View style={styles.quickButtonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={addCalories}>
            <Text style={styles.smallButtonText}>+ Calories</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton} onPress={addProtein}>
            <Text style={styles.smallButtonText}>+ Protein</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dots}>
        <View style={styles.dotActive} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <View style={styles.streakCard}>
        <Text style={styles.fire}>🔥</Text>
        <View>
          <Text style={styles.streakTitle}>{streak} Day Streak!</Text>
          <Text style={styles.streakText}>Points +{points}</Text>
          <Text style={styles.streakSmall}>Next rank on leaderboard</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetData}>
        <Text style={styles.resetText}>Reset Demo Data</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: "900",
    color: "#192033",
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#222",
    marginBottom: 12,
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
    minHeight: 160,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
    color: "#000",
  },
  taskText: {
    fontSize: 15,
    color: "#333",
  },
  emoji: {
    fontSize: 38,
    textAlign: "center",
    marginTop: 14,
    marginBottom: 8,
  },
  yellowButton: {
    backgroundColor: "#FFC400",
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
  blueButton: {
    backgroundColor: "#13B2E4",
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#B8C0CC",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 28,
    marginBottom: 18,
    color: "#000",
  },
  fuelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  fuelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fuelLabel: {
    fontSize: 16,
    color: "#333",
  },
  fuelValue: {
    fontSize: 15,
    fontWeight: "900",
    color: "#000",
  },
  progressBox: {
    gap: 8,
    marginTop: 18,
  },
  progressBg: {
    height: 14,
    backgroundColor: "#D0EEF7",
    borderRadius: 20,
    overflow: "hidden",
  },
  calorieBar: {
    height: "100%",
    backgroundColor: "#FFD319",
  },
  proteinBar: {
    height: "100%",
    backgroundColor: "#CF31D8",
  },
  waterBar: {
    height: "100%",
    backgroundColor: "#10B6D8",
  },
  quickButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  smallButton: {
    flex: 1,
    backgroundColor: "#192033",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  smallButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
    marginVertical: 22,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9BA6B8",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D0D6E0",
  },
  streakCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  fire: {
    fontSize: 58,
  },
  streakTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#000",
  },
  streakText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
  },
  streakSmall: {
    fontSize: 16,
    color: "#555",
  },
  resetButton: {
    marginTop: 24,
    backgroundColor: "#192033",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  resetText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});

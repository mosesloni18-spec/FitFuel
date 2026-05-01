import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

  const [calorieGoal, setCalorieGoal] = useState(500);
  const [proteinGoal, setProteinGoal] = useState(50);
  const [waterGoal, setWaterGoal] = useState(3);

  const [calorieInput, setCalorieInput] = useState("");
  const [proteinInput, setProteinInput] = useState("");
  const [calorieGoalInput, setCalorieGoalInput] = useState("500");
  const [proteinGoalInput, setProteinGoalInput] = useState("50");
  const [waterGoalInput, setWaterGoalInput] = useState("3");

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

          setCalorieGoal(data.calorieGoal ?? 500);
          setProteinGoal(data.proteinGoal ?? 50);
          setWaterGoal(data.waterGoal ?? 3);

          setCalorieGoalInput(String(data.calorieGoal ?? 500));
          setProteinGoalInput(String(data.proteinGoal ?? 50));
          setWaterGoalInput(String(data.waterGoal ?? 3));
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
            calorieGoal,
            proteinGoal,
            waterGoal,
          }),
        );
      } catch {
        console.log("Failed to save fuel data");
      }
    };

    saveData();
  }, [
    calories,
    protein,
    water,
    points,
    streak,
    walkDone,
    calorieGoal,
    proteinGoal,
    waterGoal,
  ]);

  const addCalories = () => {
    const amount = Number(calorieInput);

    if (!amount || amount <= 0) {
      Alert.alert("Invalid input", "Please enter a valid calorie amount.");
      return;
    }

    setCalories((prev) => Math.min(prev + amount, calorieGoal));
    setPoints((prev) => prev + 10);
    setCalorieInput("");
  };

  const addProtein = () => {
    const amount = Number(proteinInput);

    if (!amount || amount <= 0) {
      Alert.alert("Invalid input", "Please enter a valid protein amount.");
      return;
    }

    setProtein((prev) => Math.min(prev + amount, proteinGoal));
    setPoints((prev) => prev + 10);
    setProteinInput("");
  };

  const increaseWater = () => {
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

  const decreaseWater = () => {
    setWater((prev) => Math.max(prev - 1, 0));
  };

  const completeWalk = () => {
    if (walkDone) {
      Alert.alert(
        "Already completed",
        "Walking task is already completed today.",
      );
      return;
    }

    setWalkDone(true);
    setCalories((prev) => Math.min(prev + 80, calorieGoal));
    setPoints((prev) => prev + 50);

    Alert.alert("Great job!", "Walking task completed. +50 points!");
  };

  const updateGoals = () => {
    const newCalorieGoal = Number(calorieGoalInput);
    const newProteinGoal = Number(proteinGoalInput);
    const newWaterGoal = Number(waterGoalInput);

    if (
      !newCalorieGoal ||
      !newProteinGoal ||
      !newWaterGoal ||
      newCalorieGoal <= 0 ||
      newProteinGoal <= 0 ||
      newWaterGoal <= 0
    ) {
      Alert.alert("Invalid goals", "Please enter valid goal numbers.");
      return;
    }

    setCalorieGoal(newCalorieGoal);
    setProteinGoal(newProteinGoal);
    setWaterGoal(newWaterGoal);

    setCalories((prev) => Math.min(prev, newCalorieGoal));
    setProtein((prev) => Math.min(prev, newProteinGoal));
    setWater((prev) => Math.min(prev, newWaterGoal));

    Alert.alert("Goals updated", "Your daily goals have been updated.");
  };

  const resetData = async () => {
    setCalories(250);
    setProtein(25);
    setWater(1);
    setPoints(150);
    setStreak(2);
    setWalkDone(false);

    setCalorieGoal(500);
    setProteinGoal(50);
    setWaterGoal(3);

    setCalorieInput("");
    setProteinInput("");
    setCalorieGoalInput("500");
    setProteinGoalInput("50");
    setWaterGoalInput("3");

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
          <Text style={styles.cardTitle}>Walking Task</Text>
          <Text style={styles.taskText}>
            {walkDone ? "Completed today" : "Go for a 10 min walk"}
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
          <Text style={styles.cardTitle}>Hydration</Text>
          <Text style={styles.taskText}>Track your water intake</Text>
          <Text style={styles.emoji}>🥤</Text>

          <View style={styles.waterButtons}>
            <TouchableOpacity
              style={styles.smallCircleButton}
              onPress={decreaseWater}
            >
              <Text style={styles.circleText}>−</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.blueButton} onPress={increaseWater}>
              <Text style={styles.buttonText}>+1</Text>
            </TouchableOpacity>
          </View>
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
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.inputTitle}>Log Intake</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Calories"
            keyboardType="numeric"
            value={calorieInput}
            onChangeText={setCalorieInput}
          />

          <TouchableOpacity style={styles.actionButton} onPress={addCalories}>
            <Text style={styles.actionText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Protein (g)"
            keyboardType="numeric"
            value={proteinInput}
            onChangeText={setProteinInput}
          />

          <TouchableOpacity style={styles.actionButton} onPress={addProtein}>
            <Text style={styles.actionText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.inputTitle}>Daily Goals</Text>

        <TextInput
          style={styles.fullInput}
          placeholder="Calorie goal"
          keyboardType="numeric"
          value={calorieGoalInput}
          onChangeText={setCalorieGoalInput}
        />

        <TextInput
          style={styles.fullInput}
          placeholder="Protein goal"
          keyboardType="numeric"
          value={proteinGoalInput}
          onChangeText={setProteinGoalInput}
        />

        <TextInput
          style={styles.fullInput}
          placeholder="Water goal"
          keyboardType="numeric"
          value={waterGoalInput}
          onChangeText={setWaterGoalInput}
        />

        <TouchableOpacity style={styles.updateButton} onPress={updateGoals}>
          <Text style={styles.buttonText}>Update Goals</Text>
        </TouchableOpacity>
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
    marginBottom: 36,
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
    minHeight: 175,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 12,
    color: "#000",
  },
  taskText: {
    fontSize: 14,
    color: "#333",
    minHeight: 38,
  },
  emoji: {
    fontSize: 36,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  yellowButton: {
    backgroundColor: "#FFC400",
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
  blueButton: {
    flex: 1,
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
    fontSize: 15,
  },
  waterButtons: {
    flexDirection: "row",
    gap: 8,
  },
  smallCircleButton: {
    width: 42,
    backgroundColor: "#192033",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
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
    fontSize: 15,
    color: "#333",
  },
  fuelValue: {
    fontSize: 14,
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
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#192033",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#F2F5FA",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  fullInput: {
    backgroundColor: "#F2F5FA",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: "#13B2E4",
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  updateButton: {
    backgroundColor: "#192033",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
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
    marginTop: 22,
  },
  fire: {
    fontSize: 56,
  },
  streakTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
  },
  streakText: {
    fontSize: 19,
    fontWeight: "900",
    color: "#000",
  },
  streakSmall: {
    fontSize: 15,
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

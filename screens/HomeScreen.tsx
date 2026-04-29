import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Welcome back, User!</Text>
      <Text style={styles.subHeader}>Check the dashboard</Text>

      {/* Task Cards */}
      <View style={styles.taskRow}>
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>Tasks!</Text>
          <Text>Go for a 10 min walk</Text>

          <View style={styles.orangeBtn}>
            <Text style={styles.btnText}>Go</Text>
          </View>
        </View>

        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>Tasks</Text>
          <Text>Drink 2 glasses of water</Text>

          <View style={styles.blueBtn}>
            <Text style={styles.btnText}>Track</Text>
          </View>
        </View>
      </View>

      {/* Fuel Section (CLICKABLE) */}
      <TouchableOpacity
        style={styles.fuelCard}
        onPress={() => navigation.navigate("Fuel")}
      >
        <Text style={styles.sectionTitle}>Your Fuel</Text>

        <FuelBar label="Calories" value={2300} max={3000} />
        <FuelBar label="Protein" value={25} max={50} />
        <FuelBar label="Water" value={1} max={3} />

        <Text style={styles.linkText}>Tap to view details →</Text>
      </TouchableOpacity>

      {/* Streak */}
      <View style={styles.streakCard}>
        <Text style={styles.streakTitle}>🔥 2 Day Streak!</Text>
        <Text>Points +60</Text>
        <Text>Keep it up & climb leaderboard</Text>
      </View>

    </ScrollView>
  );
}

function FuelBar({ label, value, max }: any) {
  const percent = (value / max) * 100;

  return (
    <View style={{ marginBottom: 10 }}>
      <Text>{label} {value}/{max}</Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f5f7fb"
  },

  header: {
    fontSize: 22,
    fontWeight: "bold"
  },

  subHeader: {
    color: "gray",
    marginBottom: 15
  },

  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  taskCard: {
    width: "48%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    elevation: 3
  },

  taskTitle: {
    fontWeight: "bold",
    marginBottom: 5
  },

  orangeBtn: {
    backgroundColor: "#FFA726",
    padding: 6,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center"
  },

  blueBtn: {
    backgroundColor: "#42A5F5",
    padding: 6,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center"
  },

  btnText: {
    color: "white"
  },

  fuelCard: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },

  barBg: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5
  },

  barFill: {
    height: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5
  },

  linkText: {
    marginTop: 10,
    color: "#42A5F5",
    fontWeight: "bold"
  },

  streakCard: {
    marginTop: 20,
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 12
  },

  streakTitle: {
    fontWeight: "bold",
    fontSize: 16
  }
});
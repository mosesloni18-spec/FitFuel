import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

export default function FuelScreen() {
  const [water, setWater] = useState(1);

  const nutrients = [
    { label: "Calories", value: "1020 / 2000", percent: 51 },
    { label: "Protein", value: "54g / 90g", percent: 60 },
    { label: "Carbs", value: "122g / 250g", percent: 49 },
  ];

  const meals = [
    { name: "Breakfast", item: "Oats + Banana", kcal: 320 },
    { name: "Lunch", item: "Chicken Salad", kcal: 520 },
    { name: "Snack", item: "Greek Yogurt", kcal: 180 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.smallText}>Today's Fuel</Text>
            <Text style={styles.title}>Fuel Tracker</Text>
          </View>
          <View style={styles.avatar}>
            <Text>🥗</Text>
          </View>
        </View>

        {/* Progress Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Progress</Text>

          {nutrients.map((n) => (
            <View key={n.label} style={{ marginTop: 10 }}>
              <View style={styles.row}>
                <Text>{n.label}</Text>
                <Text>{n.value}</Text>
              </View>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${n.percent}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Water + Streak */}
        <View style={styles.grid}>
          {/* Water */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>💧 Water</Text>
            <Text style={styles.bigText}>{water}/3</Text>

            <TouchableOpacity
              style={styles.blueBtn}
              onPress={() => setWater(Math.min(water + 1, 3))}
            >
              <Text style={styles.btnText}>Track</Text>
            </TouchableOpacity>
          </View>

          {/* Streak */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🔥 Streak</Text>
            <Text style={styles.bigText}>2 Days</Text>
            <Text>+150 points</Text>

            <View style={styles.streakBox}>
              <Text>On fire!</Text>
            </View>
          </View>
        </View>

        {/* Meal Log */}
        <Text style={styles.sectionTitle}>Meal Log</Text>

        {meals.map((meal) => (
          <View key={meal.name} style={styles.cardRow}>
            <View>
              <Text style={styles.bold}>{meal.name}</Text>
              <Text>{meal.item}</Text>
            </View>
            <Text>{meal.kcal} kcal</Text>
          </View>
        ))}

        {/* Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.bold}>Fuel Tip</Text>
          <Text>Add a high-protein snack today</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f7fb"
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },

  smallText: {
    color: "gray"
  },

  title: {
    fontSize: 22,
    fontWeight: "bold"
  },

  avatar: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 5
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  barBg: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginTop: 5
  },

  barFill: {
    height: 10,
    backgroundColor: "#4FC3F7",
    borderRadius: 5
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  bigText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 5
  },

  blueBtn: {
    backgroundColor: "#4FC3F7",
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center"
  },

  btnText: {
    color: "white"
  },

  streakBox: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#FFE0B2",
    borderRadius: 10,
    alignItems: "center"
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },

  cardRow: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  bold: {
    fontWeight: "bold"
  },

  tipCard: {
    backgroundColor: "#E1F5FE",
    padding: 15,
    borderRadius: 15,
    marginTop: 10
  }
});
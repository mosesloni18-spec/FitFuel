import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function FuelScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome back, User!</Text>

      <Text style={styles.subtitle}>Climb the leaderboard</Text>

      <View style={styles.taskRow}>
        <View style={styles.taskCard}>
          <Text style={styles.cardTitle}>Tasks!</Text>
          <Text style={styles.taskText}>Go for a 10 min walk</Text>
          <Text style={styles.emoji}>🚶</Text>
          <View style={styles.yellowButton}>
            <Text style={styles.buttonText}>Go!</Text>
          </View>
        </View>

        <View style={styles.taskCard}>
          <Text style={styles.cardTitle}>Tasks</Text>
          <Text style={styles.taskText}>Drink 3 glasses of water</Text>
          <Text style={styles.emoji}>🥤</Text>
          <View style={styles.blueButton}>
            <Text style={styles.buttonText}>Track</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your Fuel</Text>

      <View style={styles.fuelCard}>
        <View style={styles.fuelRow}>
          <View>
            <Text style={styles.fuelLabel}>Calories</Text>
            <Text style={styles.fuelValue}>250/500 cal</Text>
          </View>

          <View>
            <Text style={styles.fuelLabel}>Protein</Text>
            <Text style={styles.fuelValue}>25/50 g</Text>
          </View>

          <View>
            <Text style={styles.fuelLabel}>Water</Text>
            <Text style={styles.fuelValue}>1/3 glasses</Text>
          </View>
        </View>

        <View style={styles.progressBg}>
          <View style={styles.progressCalories} />
          <View style={styles.progressProtein} />
          <View style={styles.progressWater} />
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
          <Text style={styles.streakTitle}>2 Day Streak!</Text>
          <Text style={styles.streakText}>Points +150</Text>
          <Text style={styles.streakSmall}>Next rank on leaderboard</Text>
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
    minHeight: 150,
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
    marginTop: 4,
  },
  blueButton: {
    backgroundColor: "#13B2E4",
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 4,
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
  progressBg: {
    height: 28,
    backgroundColor: "#D0EEF7",
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    marginTop: 18,
  },
  progressCalories: {
    width: "34%",
    backgroundColor: "#FFD319",
  },
  progressProtein: {
    width: "33%",
    backgroundColor: "#CF31D8",
  },
  progressWater: {
    width: "24%",
    backgroundColor: "#10B6D8",
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
});

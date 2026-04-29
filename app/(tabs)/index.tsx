import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
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

      <View style={styles.bottomNav}>
        <Text style={styles.navActive}>🏠{"\n"}Home</Text>
        <Text style={styles.nav}>📋{"\n"}Routines</Text>
        <Text style={styles.nav}>🔥{"\n"}Fuel</Text>
        <Text style={styles.nav}>👤{"\n"}Friends</Text>
        <Text style={styles.nav}>⚙️{"\n"}Setting</Text>
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
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#192033",
    textAlign: "center",
    marginBottom: 22,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
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
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  taskText: {
    fontSize: 13,
    color: "#333",
  },
  emoji: {
    fontSize: 35,
    textAlign: "center",
    marginTop: 8,
  },
  yellowButton: {
    backgroundColor: "#FFC934",
    borderRadius: 12,
    paddingVertical: 7,
    alignItems: "center",
    marginTop: 6,
  },
  blueButton: {
    backgroundColor: "#20AEEA",
    borderRadius: 12,
    paddingVertical: 7,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 16,
  },
  fuelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
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
    fontSize: 14,
    color: "#333",
  },
  fuelValue: {
    fontSize: 13,
    fontWeight: "700",
  },
  progressBg: {
    height: 24,
    backgroundColor: "#D9EEF7",
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    marginTop: 12,
  },
  progressCalories: {
    width: "34%",
    backgroundColor: "#FFD84D",
  },
  progressProtein: {
    width: "33%",
    backgroundColor: "#C141D9",
  },
  progressWater: {
    width: "24%",
    backgroundColor: "#16B9E8",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginVertical: 14,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9BA6B8",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D0D6E0",
  },
  streakCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  fire: {
    fontSize: 48,
  },
  streakTitle: {
    fontSize: 22,
    fontWeight: "800",
  },
  streakText: {
    fontSize: 16,
    fontWeight: "700",
  },
  streakSmall: {
    fontSize: 13,
    color: "#555",
  },
  bottomNav: {
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navActive: {
    textAlign: "center",
    color: "#11A9D8",
    fontWeight: "800",
    fontSize: 12,
  },
  nav: {
    textAlign: "center",
    color: "#333",
    fontSize: 12,
  },
});

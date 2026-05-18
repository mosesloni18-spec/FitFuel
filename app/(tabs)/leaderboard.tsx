import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function LeaderboardScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.subtitle}>
        Stay motivated through friendly competition.
      </Text>

      <View style={styles.card}>
        <Text style={styles.rank}>🥇 1. Alice - 250 points</Text>
        <Text style={styles.rank}>🥈 2. Bob - 150 points</Text>
        <Text style={styles.rank}>🥉 3. Sara - 100 points</Text>
        <Text style={styles.rank}> 4. Michael - 80 points</Text>
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
    borderRadius: 22,
    padding: 20,
  },
  rank: {
    fontSize: 18,
    fontWeight: "800",
    color: "#192033",
    marginBottom: 14,
  },
});

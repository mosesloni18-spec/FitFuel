import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FriendsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <Text style={styles.subtitle}>
        Compete with your friends and stay motivated together.
      </Text>

      <View style={styles.emptyCard}>
        <Text style={styles.emptyEmoji}>👥</Text>
        <Text style={styles.emptyTitle}>No friends added yet</Text>
        <Text style={styles.emptyText}>
          Add friends to compare progress, compete on the leaderboard, and keep
          each other motivated.
        </Text>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Friend</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.leaderboardCard}
        onPress={() => router.push("/leaderboard")}
      >
        <View>
          <Text style={styles.cardTitle}>View Leaderboard</Text>
          <Text style={styles.cardText}>
            See how you rank against your friends.
          </Text>
        </View>

        <Text style={styles.arrow}>→</Text>
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
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 18,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#192033",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#5B6475",
    textAlign: "center",
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: "#11A9D8",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 18,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  leaderboardCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#192033",
  },
  cardText: {
    fontSize: 13,
    color: "#5B6475",
    marginTop: 5,
    maxWidth: 250,
  },
  arrow: {
    fontSize: 30,
    fontWeight: "900",
    color: "#11A9D8",
  },
});

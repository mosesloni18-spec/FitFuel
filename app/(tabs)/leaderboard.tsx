import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// use http://10.0.2.2:3001 if using simulator
// Use device ipv4 address if using real phone (http://*ipv4_address*:3001)
const API_URL = "http://10.0.2.2:3001";

type LeaderboardUser = {
  id: number;
  name: string;
  username: string;
  points: number;
};

export default function LeaderboardScreen() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [message, setMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadLeaderboard();
    }, []),
  );

  const loadLeaderboard = async () => {
    try {
      const response = await fetch(`${API_URL}/leaderboard`);
      const data = await response.json();

      setUsers(data);
      setMessage("");
    } catch {
      setMessage("Could not connect to backend.");
    }
  };

  const getMedal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return " ";
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      <Text style={styles.subtitle}>
        Stay motivated through friendly competition.
      </Text>

      {message !== "" && (
        <View style={styles.messageCard}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <View style={styles.card}>
        {users.length === 0 ? (
          <Text style={styles.emptyText}>No users found.</Text>
        ) : (
          users.map((user, index) => (
            <View key={user.id} style={styles.rankRow}>
              <Text style={styles.rank}>
                {getMedal(index)} {index + 1}. {user.name}
              </Text>

              <Text style={styles.username}>@{user.username}</Text>

              <Text style={styles.points}>{user.points} points</Text>
            </View>
          ))
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
    borderRadius: 22,
    padding: 20,
  },
  rankRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F5",
    paddingVertical: 12,
  },
  rank: {
    fontSize: 18,
    fontWeight: "900",
    color: "#192033",
  },
  username: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5B6475",
    marginTop: 3,
  },
  points: {
    fontSize: 15,
    fontWeight: "900",
    color: "#11A9D8",
    marginTop: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#5B6475",
    textAlign: "center",
    fontWeight: "700",
  },
  messageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
  },
  messageText: {
    color: "red",
    fontWeight: "800",
    textAlign: "center",
  },
});

import { StyleSheet, Text, View } from "react-native";

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <Text style={styles.text}>View your friends and leaderboard.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#192033",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#5B6475",
    textAlign: "center",
  },
});

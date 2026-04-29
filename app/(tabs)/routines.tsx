import { StyleSheet, Text, View } from "react-native";

export default function RoutinesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routines</Text>
      <Text style={styles.text}>Plan and review your workout routines.</Text>
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

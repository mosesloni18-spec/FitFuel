import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/profile")}
      >
        <Text style={styles.cardTitle}>👤 Profile</Text>
        <Text style={styles.cardText}>
          Manage your personal information
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
    paddingTop: 70,
    paddingHorizontal: 22,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#192033",
    marginBottom: 24,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#192033",
    marginBottom: 6,
  },

  cardText: {
    fontSize: 15,
    color: "#5B6475",
  },
});
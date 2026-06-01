import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingScreen() {
  const logout = async () => {
    await AsyncStorage.removeItem("fitfuel_current_user");
    router.replace("/auth" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/profile" as any)}
      >
        <Text style={styles.cardTitle}>👤 Profile</Text>
        <Text style={styles.cardText}>Manage your personal information</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/privacy" as any)}
      >
        <Text style={styles.cardTitle}>🔒 Privacy Settings</Text>
        <Text style={styles.cardText}>
          Control what information friends can see
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutCard} onPress={logout}>
        <Text style={styles.logoutTitle}>🚪 Logout / Switch Account</Text>
        <Text style={styles.logoutText}>
          Sign out and login with another account
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
  logoutCard: {
    backgroundColor: "#192033",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  logoutTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  logoutText: {
    fontSize: 15,
    color: "#C5D1E6",
  },
});

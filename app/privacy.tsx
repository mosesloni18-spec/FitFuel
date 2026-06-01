import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type PrivacySettings = {
  showName: boolean;
  showEmail: boolean;
  showPoints: boolean;
  showStreak: boolean;
  showWater: boolean;
  showGoal: boolean;
};

export default function PrivacyScreen() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [showName, setShowName] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPoints, setShowPoints] = useState(true);
  const [showStreak, setShowStreak] = useState(true);
  const [showWater, setShowWater] = useState(false);
  const [showGoal, setShowGoal] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const getPrivacyKey = (userId: number) => {
    return `fitfuel_privacy_settings_${userId}`;
  };

  const loadSettings = async () => {
    const savedUser = await AsyncStorage.getItem("fitfuel_current_user");

    if (!savedUser) {
      return;
    }

    const user: User = JSON.parse(savedUser);
    setCurrentUser(user);

    const saved = await AsyncStorage.getItem(getPrivacyKey(user.id));

    if (saved) {
      const settings: PrivacySettings = JSON.parse(saved);

      setShowName(settings.showName);
      setShowEmail(settings.showEmail);
      setShowPoints(settings.showPoints);
      setShowStreak(settings.showStreak);
      setShowWater(settings.showWater);
      setShowGoal(settings.showGoal);
    }
  };

  const saveSettings = async () => {
    if (!currentUser) {
      setMessage("No logged in user found");
      return;
    }

    const settings: PrivacySettings = {
      showName,
      showEmail,
      showPoints,
      showStreak,
      showWater,
      showGoal,
    };

    await AsyncStorage.setItem(
      getPrivacyKey(currentUser.id),
      JSON.stringify(settings),
    );

    setMessage("Privacy settings saved");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy Settings</Text>

      <Text style={styles.subtitle}>
        Choose what information friends can see.
      </Text>

      {currentUser && (
        <Text style={styles.accountText}>Account: @{currentUser.username}</Text>
      )}

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowName(!showName)}
        >
          <Text style={styles.rowText}>Share Name</Text>
          <Text style={[styles.toggle, showName && styles.toggleOn]}>
            {showName ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowEmail(!showEmail)}
        >
          <Text style={styles.rowText}>Share Email</Text>
          <Text style={[styles.toggle, showEmail && styles.toggleOn]}>
            {showEmail ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowPoints(!showPoints)}
        >
          <Text style={styles.rowText}>Share Points</Text>
          <Text style={[styles.toggle, showPoints && styles.toggleOn]}>
            {showPoints ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowStreak(!showStreak)}
        >
          <Text style={styles.rowText}>Share Streak</Text>
          <Text style={[styles.toggle, showStreak && styles.toggleOn]}>
            {showStreak ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowWater(!showWater)}
        >
          <Text style={styles.rowText}>Share Water Progress</Text>
          <Text style={[styles.toggle, showWater && styles.toggleOn]}>
            {showWater ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowGoal(!showGoal)}
        >
          <Text style={styles.rowText}>Share Fitness Goal</Text>
          <Text style={[styles.toggle, showGoal && styles.toggleOn]}>
            {showGoal ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveText}>Save Privacy Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.previewButton}
        onPress={() => router.push("/friend-profile" as any)}
      >
        <Text style={styles.previewText}>Preview What Friends Can See</Text>
      </TouchableOpacity>

      {message !== "" && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
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
    marginBottom: 8,
  },
  accountText: {
    textAlign: "center",
    color: "#5B6475",
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F5",
  },
  rowText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#192033",
  },
  toggle: {
    backgroundColor: "#B8C0CC",
    color: "#FFFFFF",
    fontWeight: "900",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    fontSize: 12,
  },
  toggleOn: {
    backgroundColor: "#11A9D8",
  },
  saveButton: {
    backgroundColor: "#11A9D8",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 14,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  previewButton: {
    backgroundColor: "#192033",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
  },
  previewText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  messageBox: {
    backgroundColor: "#192033",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 18,
  },
  messageText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});

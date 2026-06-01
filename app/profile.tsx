import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const FUEL_KEY = "fitfuel_fuel_data";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export default function ProfileScreen() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [bio, setBio] = useState("");
  const [points, setPoints] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
      loadPoints();
    }, []),
  );

  const getProfileKey = (userId: number) => {
    return `fitfuel_profile_${userId}`;
  };

  const loadProfile = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("fitfuel_current_user");

      if (!savedUser) {
        return;
      }

      const user: User = JSON.parse(savedUser);
      setCurrentUser(user);

      const saved = await AsyncStorage.getItem(getProfileKey(user.id));

      if (saved) {
        const profile = JSON.parse(saved);

        setName(profile.name || "");
        setAge(profile.age || "");
        setHeight(profile.height || "");
        setWeight(profile.weight || "");
        setGoal(profile.goal || "");
        setBio(profile.bio || "");
      } else {
        // if no profile saved yet, use account name as default
        setName(user.name || "");
      }
    } catch {
      Alert.alert("Error", "Could not load profile");
    }
  };

  const loadPoints = async () => {
    try {
      const saved = await AsyncStorage.getItem(FUEL_KEY);

      if (saved) {
        const data = JSON.parse(saved);
        setPoints(data.points ?? 0);
      }
    } catch {
      console.log("Could not load points");
    }
  };

  const saveProfile = async () => {
    try {
      if (!currentUser) {
        Alert.alert("Error", "No logged in user found");
        return;
      }

      const profile = {
        name,
        age,
        height,
        weight,
        goal,
        bio,
      };

      await AsyncStorage.setItem(
        getProfileKey(currentUser.id),
        JSON.stringify(profile),
      );

      Alert.alert("Success", "Profile saved successfully");
    } catch {
      Alert.alert("Error", "Could not save profile");
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {currentUser && (
        <Text style={styles.accountText}>Account: @{currentUser.username}</Text>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter height"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.label}>Fitness Goal</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Lose weight, Build muscle"
          value={goal}
          onChangeText={setGoal}
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Tell us a bit about yourself"
          value={bio}
          onChangeText={setBio}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pointsCard}>
        <Text style={styles.pointsEmoji}>⭐</Text>
        <View>
          <Text style={styles.pointsValue}>{points}</Text>
          <Text style={styles.pointsLabel}>Total Points</Text>
        </View>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Saved Profile</Text>

        <Text style={styles.profileText}>Name: {name}</Text>
        <Text style={styles.profileText}>Age: {age}</Text>
        <Text style={styles.profileText}>Height: {height} cm</Text>
        <Text style={styles.profileText}>Weight: {weight} kg</Text>
        <Text style={styles.profileText}>Goal: {goal}</Text>
        <Text style={styles.profileText}>Bio: {bio}</Text>
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

  accountText: {
    textAlign: "center",
    color: "#5B6475",
    fontWeight: "700",
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "800",
    color: "#192033",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#F2F5FA",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },

  bioInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#11A9D8",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  pointsCard: {
    backgroundColor: "#192033",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },

  pointsEmoji: {
    fontSize: 44,
  },

  pointsValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  pointsLabel: {
    fontSize: 14,
    color: "#A0AEC0",
    marginTop: 2,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
  },

  profileTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 12,
    color: "#192033",
  },

  profileText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const STORAGE_KEY = "fitfuel_profile";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (saved) {
        const profile = JSON.parse(saved);

        setName(profile.name || "");
        setAge(profile.age || "");
        setHeight(profile.height || "");
        setWeight(profile.weight || "");
        setGoal(profile.goal || "");
        setBio(profile.bio || "");
      }
    } catch {
      Alert.alert("Error", "Could not load profile");
    }
  };

  const saveProfile = async () => {
    try {
      const profile = {
        name,
        age,
        height,
        weight,
        goal,
        bio,
      };

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profile)
      );

      Alert.alert("Success", "Profile saved successfully");
    } catch {
      Alert.alert("Error", "Could not save profile");
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Profile</Text>

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
    marginBottom: 20,
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
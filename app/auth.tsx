import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// use http://10.0.2.2:3001 if using simulator
// Use device ipv4 address if using real phone (http://*ipv4_address*:3001)
const API_URL = "http://10.0.2.2:3001";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [loginText, setLoginText] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      await AsyncStorage.setItem(
        "fitfuel_current_user",
        JSON.stringify(data.user),
      );

      router.replace("/(tabs)");
    } catch {
      setMessage("Could not connect to backend.");
    }
  };

  const login = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginText: loginText,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      await AsyncStorage.setItem(
        "fitfuel_current_user",
        JSON.stringify(data.user),
      );

      router.replace("/(tabs)");
    } catch {
      setMessage("Could not connect to backend.");
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>FitFuel</Text>

      <Text style={styles.subtitle}>
        {isLogin ? "Login to your account" : "Create your account"}
      </Text>

      <View style={styles.card}>
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </>
        )}

        {isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Username or email"
            value={loginText}
            onChangeText={setLoginText}
            autoCapitalize="none"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {message !== "" && <Text style={styles.errorText}>{message}</Text>}

        <TouchableOpacity
          style={styles.mainButton}
          onPress={isLogin ? login : register}
        >
          <Text style={styles.mainButtonText}>
            {isLogin ? "Login" : "Create Account"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsLogin(!isLogin);
            setMessage("");
            setPassword("");
          }}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
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
    paddingTop: 90,
    paddingHorizontal: 22,
    paddingBottom: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#192033",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5B6475",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },
  input: {
    backgroundColor: "#F2F5FA",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 12,
  },
  mainButton: {
    backgroundColor: "#11A9D8",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 6,
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  switchText: {
    textAlign: "center",
    color: "#192033",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 16,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  demoText: {
    textAlign: "center",
    color: "#5B6475",
    marginTop: 18,
    fontWeight: "700",
  },
});

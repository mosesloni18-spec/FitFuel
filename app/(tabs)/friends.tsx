import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type FriendRequest = {
  id: number;
  fromUser: User;
};

// use http://10.0.2.2:3001 if using simulator
// Use device ipv4 address if using real phone (http://*ipv4_address*:3001)
const API_URL = "http://10.0.2.2:3001";

export default function FriendsScreen() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteInput, setInviteInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadUserAndFriends();
    }, []),
  );

  const loadUserAndFriends = async () => {
    const savedUser = await AsyncStorage.getItem("fitfuel_current_user");

    if (!savedUser) {
      router.replace("/auth" as any);
      return;
    }

    const user = JSON.parse(savedUser);
    setCurrentUser(user);

    loadFriendsData(user.id);
  };

  const loadFriendsData = async (userId: number) => {
    try {
      const requestsResponse = await fetch(
        `${API_URL}/friend-requests/${userId}`,
      );
      const friendsResponse = await fetch(`${API_URL}/friends/${userId}`);

      const requestsData = await requestsResponse.json();
      const friendsData = await friendsResponse.json();

      setPendingRequests(requestsData);
      setFriends(friendsData);
    } catch {
      setErrorMessage("Could not connect to backend.");
    }
  };

  const sendInvite = async () => {
    if (!currentUser) {
      setErrorMessage("Please login first.");
      return;
    }

    if (inviteInput.trim() === "") {
      setErrorMessage("Please enter a username or email.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/friend-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUserId: currentUser.id,
          searchText: inviteInput.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
        setLoading(false);
        return;
      }

      setInviteInput("");
      setErrorMessage("");
      setShowInviteModal(false);
      setSuccessMessage(data.message);

      await loadFriendsData(currentUser.id);

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch {
      setErrorMessage("Could not send friend request.");
    }

    setLoading(false);
  };

  const acceptRequest = async (request: FriendRequest) => {
    if (!currentUser) return;

    try {
      await fetch(`${API_URL}/friend-request/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: request.id,
        }),
      });

      setSuccessMessage(`${request.fromUser.name} added as a friend`);
      await loadFriendsData(currentUser.id);

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch {
      setSuccessMessage("Could not accept request.");
    }
  };

  const declineRequest = async (request: FriendRequest) => {
    if (!currentUser) return;

    try {
      await fetch(`${API_URL}/friend-request/decline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: request.id,
        }),
      });

      setSuccessMessage("Friend request declined");
      await loadFriendsData(currentUser.id);

      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch {
      setSuccessMessage("Could not decline request.");
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Friends</Text>

        <Text style={styles.subtitle}>
          {currentUser
            ? `Logged in as @${currentUser.username}`
            : "Invite friends to FitFuel"}
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Search users</Text>
          <Text style={styles.infoText}>
            Use a username or email to send a friend request.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.inviteButton}
          onPress={() => setShowInviteModal(true)}
        >
          <Text style={styles.inviteButtonText}>Invite Friend</Text>
        </TouchableOpacity>

        {errorMessage !== "" && (
          <View style={styles.messageBox}>
            <Text style={styles.errorMessageText}>{errorMessage}</Text>
          </View>
        )}

        {pendingRequests.length > 0 && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Friend Requests</Text>

            {pendingRequests.map((request) => (
              <View key={request.id} style={styles.pendingBox}>
                <Text style={styles.pendingName}>{request.fromUser.name}</Text>
                <Text style={styles.smallText}>
                  @{request.fromUser.username}
                </Text>
                <Text style={styles.smallText}>{request.fromUser.email}</Text>

                <View style={styles.pendingButtons}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => acceptRequest(request)}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => declineRequest(request)}
                  >
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Your Friends</Text>

          {friends.length === 0 ? (
            <View style={styles.emptyCardSmall}>
              <Text style={styles.emptyEmoji}>👥</Text>
              <Text style={styles.emptyTitle}>No friends added yet</Text>
              <Text style={styles.emptyText}>
                Search for a FitFuel user by username or email and send them a
                friend request.
              </Text>
            </View>
          ) : (
            friends.map((friend) => (
              <View key={friend.id} style={styles.friendRow}>
                <Text style={styles.friendText}>👤 {friend.name}</Text>
                <Text style={styles.smallText}>@{friend.username}</Text>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity
          style={styles.leaderboardCard}
          onPress={() => router.push("/(tabs)/leaderboard")}
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

      <Modal
        visible={showInviteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowInviteModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Invite Friend</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter username or email"
              value={inviteInput}
              onChangeText={(text) => {
                setInviteInput(text);
                setErrorMessage("");
              }}
              autoCapitalize="none"
            />

            {errorMessage !== "" && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <TouchableOpacity style={styles.sendButton} onPress={sendInvite}>
              <Text style={styles.sendButtonText}>
                {loading ? "Sending..." : "Send Invite"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowInviteModal(false);
                setInviteInput("");
                setErrorMessage("");
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {successMessage !== "" && (
        <View style={styles.successPopup}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#EEF5FF",
  },
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
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#192033",
  },
  infoText: {
    fontSize: 13,
    color: "#5B6475",
    marginTop: 4,
  },
  inviteButton: {
    backgroundColor: "#11A9D8",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 18,
  },
  inviteButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  messageBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
  },
  errorMessageText: {
    color: "red",
    fontWeight: "800",
    textAlign: "center",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#192033",
    marginBottom: 12,
  },
  emptyCardSmall: {
    alignItems: "center",
    paddingVertical: 10,
  },
  emptyEmoji: {
    fontSize: 45,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 20,
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
  friendRow: {
    marginBottom: 12,
  },
  friendText: {
    fontSize: 16,
    color: "#192033",
    fontWeight: "800",
  },
  smallText: {
    fontSize: 13,
    color: "#5B6475",
    marginTop: 2,
  },
  pendingBox: {
    backgroundColor: "#EEF5FF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  pendingName: {
    fontSize: 16,
    fontWeight: "900",
    color: "#192033",
  },
  pendingButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#11A9D8",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  declineButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  declineButtonText: {
    color: "#192033",
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
    marginBottom: 18,
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
  },
  modalBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#192033",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D0D6E0",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  sendButton: {
    width: "100%",
    backgroundColor: "#11A9D8",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  cancelText: {
    color: "#5B6475",
    fontSize: 15,
    fontWeight: "700",
  },
  successPopup: {
    position: "absolute",
    bottom: 110,
    alignSelf: "center",
    backgroundColor: "#192033",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  successText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});

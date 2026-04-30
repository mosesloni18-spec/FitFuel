import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// get today's date so it auto highlights
const today = new Date().getDate();

// demo routines (same idea as mockup)
const initialRoutines = [
  { id: "1", name: "Arm Day", progress: 0.4, emoji: "💪" },
  { id: "2", name: "Leg Day", progress: 0.3, emoji: "🦵" },
  { id: "3", name: "Full body", progress: 0.5, emoji: "🏋️" },
];

export default function Routines() {

  // store routines + selected day
  const [routines, setRoutines] = useState(initialRoutines);
  const [selectedDay, setSelectedDay] = useState(today);

  // delete routine (simple demo version)
  const deleteRoutine = (id: string) => {
    setRoutines(routines.filter(r => r.id !== id));
  };

  // edit routine (just renames for now)
  const editRoutine = (id: string) => {
    setRoutines(routines.map(r =>
      r.id === id ? { ...r, name: r.name + " (edited)" } : r
    ));
  };

  // fake week strip
  const days = [21,22,23,24,25,26,27,28];

  // how each routine card looks
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>

      {/* emoji + name */}
      <View style={styles.cardTop}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>

      {/* progress bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
      </View>

      {/* edit + delete buttons */}
      <View style={styles.row}>
      <Text style={styles.edit} onPress={() => {}}>Edit</Text>        <Text style={styles.delete} onPress={() => deleteRoutine(item.id)}>Delete</Text>
      </View>

    </View>
  );

  return (
    <ScrollView style={styles.container}>

      {/* calendar row */}
      <View style={styles.daysRow}>
        {days.map(day => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDay(day)}
            style={[
              styles.day,
              selectedDay === day && styles.activeDay
            ]}
          >
            <Text style={selectedDay === day && { color: "white" }}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* routines list */}
      <FlatList
        data={routines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      {/* create new routine card (just visual for now) */}
      <View style={styles.createCard}>
        <Text style={styles.plus}>+</Text>
        <Text style={styles.createText}>Create new routine</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  // calendar
  daysRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  day: {
    padding: 10,
    marginHorizontal: 4,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  activeDay: {
    backgroundColor: "#2AA7B8",
  },

  // routine card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  // emoji like teammate's style
  emoji: {
    fontSize: 40,
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  // progress bar
  progressBg: {
    height: 6,
    backgroundColor: "#D1D5DB",
    borderRadius: 10,
    marginTop: 12,
  },

  progressFill: {
    height: 6,
    backgroundColor: "#2AA7B8",
    borderRadius: 10,
  },

  // edit delete row
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  edit: { color: "#2AA7B8" },
  delete: { color: "red" },

  // create card
  createCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },

  plus: {
    fontSize: 28,
    color: "#2AA7B8",
  },

  createText: {
    color: "#2AA7B8",
    marginTop: 5,
  },
});
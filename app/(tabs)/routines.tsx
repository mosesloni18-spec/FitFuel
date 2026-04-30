import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const today = new Date().getDate();

// types
type Workout = {
  name: string;
  sets: string;
  reps: string;
  done: boolean;
};

type Routine = {
  id: string;
  name: string;
  emoji: string;
  workouts: Workout[];
};

const initialRoutines: Routine[] = [
  { id: "1", name: "Arm Day", emoji: "💪", workouts: [] },
  { id: "2", name: "Leg Day", emoji: "🦵", workouts: [] },
  { id: "3", name: "Full body", emoji: "🏋️", workouts: [] },
];

export default function Routines() {

  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);
  const [selectedDay, setSelectedDay] = useState(today);

  const [showForm, setShowForm] = useState(false);
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);

  const [routineName, setRoutineName] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await AsyncStorage.getItem("routines");
    if (data) setRoutines(JSON.parse(data));
  };

  const saveData = async (data: Routine[]) => {
    setRoutines(data);
    await AsyncStorage.setItem("routines", JSON.stringify(data));
  };

  // open form with 1 row so inputs show
  const openForm = () => {
    setShowForm(true);
    setRoutineName("");
    setWorkouts([{ name: "", sets: "", reps: "", done: false }]);
  };

  const addExercise = () => {
    setWorkouts([
      ...workouts,
      { name: "", sets: "", reps: "", done: false },
    ]);
  };

  const saveRoutine = () => {
    if (!routineName) return;

    const newRoutine: Routine = {
      id: Date.now().toString(),
      name: routineName,
      emoji: "🏋️",
      workouts,
    };

    const updated = [...routines, newRoutine];
    saveData(updated);

    setRoutineName("");
    setWorkouts([]);
    setShowForm(false);
  };

  const toggleWorkout = (id: string, index: number) => {
    const updated = routines.map(r => {
      if (r.id === id) {
        const w = [...r.workouts];
        w[index].done = !w[index].done;
        return { ...r, workouts: w };
      }
      return r;
    });

    saveData(updated);
  };

  const deleteRoutine = (id: string) => {
    const updated = routines.filter(r => r.id !== id);
    saveData(updated);
    setSelectedRoutineId(null);
  };

  const editRoutine = (id: string) => {
    Alert.prompt("Edit Routine", "New name:", (text) => {
      const updated = routines.map(r =>
        r.id === id ? { ...r, name: text } : r
      );
      saveData(updated);
    });
  };

  const selectedRoutine = routines.find(r => r.id === selectedRoutineId);

  const days = [21,22,23,24,25,26,27,28];

  const renderItem = ({ item }: { item: Routine }) => {

    const done = item.workouts.filter(w => w.done).length;
    const total = item.workouts.length;
    const progress = total === 0 ? 0 : done / total;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => setSelectedRoutineId(item.id)}
      >
        <View style={styles.cardTop}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>

        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>

      {/* calendar */}
      <View style={styles.daysRow}>
        {days.map(day => {
          const isToday = day === today;
          const isSelected = day === selectedDay;

          return (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              style={[
                styles.day,
                isToday && styles.todayDay,
                isSelected && styles.activeDay
              ]}
            >
              <Text style={[
                isToday && styles.todayText,
                isSelected && { color: "white" }
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* routines */}
      <FlatList
        data={routines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      {/* add routine */}
      <TouchableOpacity style={styles.createCard} onPress={openForm}>
        <Text style={styles.plus}>+</Text>
        <Text style={styles.createText}>Add a routine</Text>
      </TouchableOpacity>

      {/* ADD ROUTINE POPUP */}
      <Modal visible={showForm} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>

            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowForm(false)}>
              <Text>✕</Text>
            </TouchableOpacity>

            {/* FIXED LABEL */}
            <Text style={styles.label}>Routine Name</Text>

            <TextInput
              placeholder="Enter routine name"
              value={routineName}
              onChangeText={setRoutineName}
              style={styles.fullInput}
            />

            <View style={{ height: 12 }} />

            <View style={styles.inputsRow}>
              <Text style={styles.labelExercise}>Exercise</Text>
              <Text style={styles.labelSmall}>Sets</Text>
              <Text style={styles.labelSmall}>Reps</Text>
            </View>

            {workouts.map((w, i) => (
              <View key={i} style={styles.inputsRow}>
                <TextInput
                  placeholder="Exercise"
                  value={w.name}
                  onChangeText={(t) => {
                    const updated = [...workouts];
                    updated[i].name = t;
                    setWorkouts(updated);
                  }}
                  style={styles.exerciseInput}
                />
                <TextInput
                  placeholder="Sets"
                  value={w.sets}
                  onChangeText={(t) => {
                    const updated = [...workouts];
                    updated[i].sets = t;
                    setWorkouts(updated);
                  }}
                  style={styles.smallInput}
                />
                <TextInput
                  placeholder="Reps"
                  value={w.reps}
                  onChangeText={(t) => {
                    const updated = [...workouts];
                    updated[i].reps = t;
                    setWorkouts(updated);
                  }}
                  style={styles.smallInput}
                />
              </View>
            ))}

            <TouchableOpacity onPress={addExercise}>
              <Text>+ Add exercise</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={saveRoutine}>
              <Text style={styles.saveText}>Save Routine</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* VIEW ROUTINE POPUP */}
      <Modal visible={!!selectedRoutine} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>

            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedRoutineId(null)}>
              <Text>✕</Text>
            </TouchableOpacity>

            <Text style={styles.popupTitle}>
              {selectedRoutine?.name}
            </Text>

            {selectedRoutine?.workouts.map((w, i) => (
              <TouchableOpacity
                key={i}
                style={styles.exerciseRow}
                onPress={() => toggleWorkout(selectedRoutine.id, i)}
              >
                <Text style={styles.exerciseText}>
                  {w.done ? "✅" : "⬜"} {w.name} ({w.sets}x{w.reps})
                </Text>
              </TouchableOpacity>
            ))}

            <View style={styles.popupButtons}>
              <Text style={styles.edit} onPress={() => editRoutine(selectedRoutine!.id)}>Edit</Text>
              <Text style={styles.delete} onPress={() => deleteRoutine(selectedRoutine!.id)}>Delete</Text>
            </View>

          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

// styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF5FF", paddingTop: 60, paddingHorizontal: 20 },

  // ⭐ FIX ADDED HERE
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },

  daysRow: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  day: { padding: 10, marginHorizontal: 4, backgroundColor: "#eee", borderRadius: 10 },
  activeDay: { backgroundColor: "#2AA7B8" },
  todayDay: { borderWidth: 2, borderColor: "#2AA7B8" },
  todayText: { color: "#2AA7B8" },

  card: { backgroundColor: "#FFF", borderRadius: 18, padding: 16, marginBottom: 14 },
  cardTop: { flexDirection: "row", alignItems: "center" },
  emoji: { fontSize: 40, marginRight: 12 },
  cardTitle: { fontSize: 18, fontWeight: "600" },

  progressBg: { height: 6, backgroundColor: "#D1D5DB", borderRadius: 10, marginTop: 12 },
  progressFill: { height: 6, backgroundColor: "#2AA7B8", borderRadius: 10 },

  createCard: { backgroundColor: "#FFF", borderRadius: 18, padding: 16, alignItems: "center", marginBottom: 20 },
  plus: { fontSize: 28, color: "#2AA7B8" },
  createText: { color: "#2AA7B8", marginTop: 5 },

  fullInput: { borderWidth: 1, padding: 8, width: "100%" },

  inputsRow: { flexDirection: "row", alignItems: "center" },
  labelExercise: { flex: 2 },
  labelSmall: { flex: 1 },

  exerciseInput: { flex: 2, borderWidth: 1, margin: 2, padding: 6 },
  smallInput: { flex: 1, borderWidth: 1, margin: 2, padding: 6 },

  saveBtn: { marginTop: 10, backgroundColor: "#2AA7B8", padding: 10, borderRadius: 10, alignItems: "center" },
  saveText: { color: "white" },

  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 20 },
  modalBox: { backgroundColor: "white", borderRadius: 15, padding: 15 },
  closeBtn: { position: "absolute", top: 10, right: 10 },

  popupTitle: { fontWeight: "600", marginBottom: 15 },

  exerciseRow: { paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" },
  exerciseText: { fontSize: 16 },

  popupButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },

  edit: { color: "#2AA7B8" },
  delete: { color: "red" },
});
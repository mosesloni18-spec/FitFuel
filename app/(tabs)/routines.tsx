import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// types for routines + workouts (fixed the errors)
type Workout = {
  name: string;
  sets: string;
  reps: string;
  done: boolean;
};

type Routine = {
  id: string;
  name: string;
  workouts: Workout[];
};

export default function RoutinesScreen() {

  // main state
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [activity, setActivity] = useState<number>(0);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // form state
  const [showForm, setShowForm] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  // load saved data when app starts
  useEffect(() => { loadData(); }, []);

  // save data whenever something changes
  useEffect(() => { saveData(); }, [routines, activity, completedDays]);

  const loadData = async () => {
    try {
      const r = await AsyncStorage.getItem("routines");
      const a = await AsyncStorage.getItem("activity");
      const d = await AsyncStorage.getItem("days");

      if (r) setRoutines(JSON.parse(r));
      if (a) setActivity(JSON.parse(a));
      if (d) setCompletedDays(JSON.parse(d));
    } catch {}
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("routines", JSON.stringify(routines));
      await AsyncStorage.setItem("activity", JSON.stringify(activity));
      await AsyncStorage.setItem("days", JSON.stringify(completedDays));
    } catch {}
  };

  // gets a few days around today for the calendar
  const getWeekDays = () => {
    const today = new Date();
    const days: number[] = [];

    for (let i = -2; i <= 3; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      days.push(d.getDate());
    }

    return days;
  };

  // adds a workout into the current routine form
  const addWorkout = () => {
    if (!workoutName || !sets || !reps) return;

    setWorkouts([
      ...workouts,
      { name: workoutName, sets, reps, done: false }
    ]);

    setWorkoutName("");
    setSets("");
    setReps("");
  };

  // saves a new routine
  const saveRoutine = () => {
    if (!routineName || workouts.length === 0) return;

    setRoutines([
      ...routines,
      {
        id: Date.now().toString(),
        name: routineName,
        workouts
      }
    ]);

    setRoutineName("");
    setWorkouts([]);
    setShowForm(false);
  };

  // tick/untick workouts
  const toggleWorkout = (id: string, index: number) => {
    const updated = routines.map(r => {
      if (r.id === id) {
        const newWorkouts = [...r.workouts];
        newWorkouts[index].done = !newWorkouts[index].done;

        // if everything is done, mark the day
        if (newWorkouts.every(w => w.done)) {
          const today = new Date().getDate();
          if (!completedDays.includes(today)) {
            setCompletedDays([...completedDays, today]);
          }
        }

        return { ...r, workouts: newWorkouts };
      }
      return r;
    });

    setRoutines(updated);
  };

  // delete a routine
  const deleteRoutine = (id: string) => {
    setRoutines(routines.filter(r => r.id !== id));
  };

  // edit routine name
  const editRoutine = (id: string) => {
    Alert.prompt("Edit Routine", "New name:", (text) => {
      if (!text) return;
      setRoutines(routines.map(r =>
        r.id === id ? { ...r, name: text } : r
      ));
    });
  };

  // fake sync (for the feature)
  const syncData = () => {
    const steps = Math.floor(Math.random() * 10000);
    setActivity(steps);
    Alert.alert("Synced", `${steps} steps added`);
  };

  // display each routine
  const renderItem = ({ item }: { item: Routine }) => {
    const done = item.workouts.filter(w => w.done).length;
    const progress = item.workouts.length === 0 ? 0 : done / item.workouts.length;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>

        {item.workouts.map((w, i) => (
          <TouchableOpacity key={i} onPress={() => toggleWorkout(item.id, i)}>
            <Text style={styles.text}>
              {w.done ? "✅" : "⬜"} {w.name} ({w.sets}x{w.reps})
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        <View style={styles.row}>
          <Text style={styles.edit} onPress={() => editRoutine(item.id)}>Edit</Text>
          <Text style={styles.delete} onPress={() => deleteRoutine(item.id)}>Delete</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Routines</Text>
      <Text style={styles.text}>Plan and review your workout routines.</Text>

      <Text style={{ marginTop: 10 }}>
        Today: {activity} steps
      </Text>

      <TouchableOpacity onPress={syncData}>
        <Text style={{ color: "blue", marginBottom: 10 }}>Sync Fitness Data</Text>
      </TouchableOpacity>

      {/* calendar */}
      <View style={styles.calendar}>
        {getWeekDays().map(day => (
          <View
            key={day}
            style={[
              styles.day,
              completedDays.includes(day) && styles.completedDay
            ]}
          >
            <Text>{day}</Text>
          </View>
        ))}
      </View>

      {/* routines list */}
      <FlatList
        data={routines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* create routine button */}
      <TouchableOpacity onPress={() => setShowForm(true)}>
        <Text style={{ color: "blue", marginTop: 10 }}>
          + Create new routine
        </Text>
      </TouchableOpacity>

      {/* form */}
      {showForm && (
        <View style={{ marginTop: 10 }}>
          <TextInput placeholder="Routine name" value={routineName} onChangeText={setRoutineName} style={styles.input} />
          <TextInput placeholder="Workout name" value={workoutName} onChangeText={setWorkoutName} style={styles.input} />
          <TextInput placeholder="Sets" value={sets} onChangeText={setSets} style={styles.input} />
          <TextInput placeholder="Reps" value={reps} onChangeText={setReps} style={styles.input} />

          <TouchableOpacity onPress={addWorkout}>
            <Text>Add workout</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={saveRoutine}>
            <Text>Save Routine</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}


// original style (kept the same)
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

  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: 250,
  },

  progressBar: {
    height: 5,
    backgroundColor: "#ddd",
    marginTop: 5,
  },

  progressFill: {
    height: 5,
    backgroundColor: "green",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  edit: { color: "blue" },
  delete: { color: "red" },

  calendar: {
    flexDirection: "row",
    marginVertical: 10,
  },

  day: {
    padding: 5,
    backgroundColor: "white",
    marginHorizontal: 3,
  },

  completedDay: {
    backgroundColor: "green",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    padding: 5,
    width: 200,
  },
});
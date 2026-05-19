# 🥗 FitFuel

AI-powered Nutrition & Fitness Companion

FitFuel is a mobile fitness and nutrition tracking application built using **React Native (Expo)**.  
The goal of this project is to help users **build healthy habits through tracking, goal setting, and gamification**.

---

# 🚀 Overview

FitFuel combines **nutrition tracking, fitness routines, and social motivation** into one platform.

The system focuses on:

- Daily habit tracking
- User engagement through streaks & points
- Simple and intuitive mobile UI

This project was developed as part of **COMP602 Software Development Practice**.  
Currently at **Sprint 2**.

---

# 📱 Application Screens

## 🏠 Home Page (Moses)

- Live daily summary (current streak, longest streak, points, water intake)
- Quick navigation to Fuel page
- Daily task overview

## 🚀 Onboarding Screen (Moses)

- Short onboarding tutorial for first-time users
- Introduces core FitFuel features and navigation
- Includes skip functionality and progress indicators

## 🍽️ Fuel Page (Soyeon)

- Track calories, protein, and water intake
- Custom daily goals (calories, protein, water)
- Real-time progress bars
- Data persistence using AsyncStorage
- Points awarded for completing tasks (walk +50, water goal +20/glass, calorie goal +10, protein goal +10)
- Daily streak tracking — resets to 0 each new day until at least one task is completed
- Longest streak tracking and display
- Auto-calculation of calorie and protein goals from height and weight

## 👤 Profile Page (Moses, Soyeon)

- Personal info: name, age, height, weight
- Fitness goal and bio fields
- Total points display
- Data saved to AsyncStorage

## 🏋️ Routines Page (Lana)

- View workout routines (Arm, Leg, Full Body)
- Add new routines with exercises
- Input sets and reps
- Modal-based routine creation UI
- Sync fitness data feature

## 👥 Friends Page (Eilmar)

- Add friends (UI)
- View leaderboard navigation
- Social motivation UI

## 🏆 Leaderboard Page (Eilmar)

- Ranking system based on points
- Displays top users
- Gamification for competition

---

# ✨ Sprint 1 Completed Features

## 🔹 Nutrition & Tracking System

- Track calories, protein, and water intake
- Dynamic progress bar updates
- Manual input validation
- Local data persistence (AsyncStorage)
- Auto-calculation of calorie, protein, and water goals using height and weight

## 🔹 Goal Management

- User-defined daily goals
- Goals update dynamically in UI
- Improved usability with labeled inputs

## 🔹 Gamification System

- Points system for task completion
- Daily streak tracking
- Leaderboard ranking system

## 🔹 Routine Management

- Create and manage workout routines
- Add exercises with sets and reps
- Sync fitness data interaction
- Edit and delete routines
- Mark exercises as completed
- Progress bar updates based on completed exercises
- Calendar-based activity tracking (completed workout days highlighted)
- Visual activity history using completed routine progress

## 🔹 Social Features

- Friends page UI
- Leaderboard system
- Competitive motivation design

## 🔹 UI / UX Design

- Card-based layout
- Clean mobile UI
- Responsive design
- Navigation between tabs
- Calendar component for tracking daily activity
- Modal overlays for viewing and completing routines

---

# ✨ Sprint 2 Completed Features

## 🔹 Gamification System (Soyeon)

- Points awarded per task completion: walking task (+50), each glass of water (+20), reaching calorie goal (+10), reaching protein goal (+10)
- Points are only awarded on explicit task completion — incomplete tasks never award points
- Daily task completion flags (`walkDone`, `waterGoalDone`, `calorieGoalDone`, `proteinGoalDone`) reset automatically at the start of each new calendar day
- Daily streak resets to 0 at the start of each new day and increments only when a task is completed
- Streak increments by 1 for consecutive active days; resets to 1 if a day is skipped
- Longest streak tracked separately and updated whenever the current streak exceeds the previous best
- Current streak and longest streak both displayed on the Home screen and Fuel page
- Points total displayed on the Home screen, Fuel page, and Profile page

## 🔹 Home Screen Live Data (Soyeon)

- Streak, longest streak, points, and water intake now load dynamically from AsyncStorage instead of showing hardcoded placeholder values
- Home screen refreshes data automatically each time the tab is focused via `useFocusEffect`

## 🔹 Profile System (Moses, Soyeon)

- Added editable user profile management
- Stores name, age, height, and weight information
- Added fitness goal and personal bio fields
- Added total points display synced with the gamification system
- Profile data persistence using AsyncStorage
- Responsive card-based profile UI

## 🔹 Short Onboarding Tutorial (Moses)

- Multi-step onboarding flow for first-time users
- Introduces the main FitFuel features including: Nutrition tracking, Daily fitness tasks and Leaderboard competition
- Includes progress indicators and skip functionality
- Uses AsyncStorage to persist onboarding completion state
- Returning users are automatically redirected to the main application tabs
- Designed with a clean and mobile-friendly UI consistent with the FitFuel theme
- The onboarding experience helps new users quickly understand the purpose and core functionality of the application before entering the main system.

---

# 👥 Team Contribution

| Feature               | Developer |
| --------------------- | --------- |
| Home & Profile        | Moses     |
| Fuel Page             | Soyeon    |
| Routines Page         | Lana      |
| Friends & Leaderboard | Eilmar    |

---

# 🛠️ Tech Stack

### Frontend

- React Native (Expo)
- TypeScript

### Storage

- AsyncStorage (Local Persistence)

---

# 🚧 Future Improvements

- 🔐 User Authentication (Firebase)
- ☁️ Cloud database integration
- 🤖 AI-based nutrition recommendation
- 🧑‍🤝‍🧑 Real-time social system
- 📊 Advanced analytics dashboard
- 📈 Detailed activity tracking (steps, calories burned, active minutes)
- 📅 Full calendar integration with historical workout data
- 🔗 Integration with Apple Health / Google Fit
- 🔔 Smart activity reminders with customisable frequency and time
- 🏅 Streak milestone rewards and bonus points
- 🤝 Friend invitation and live leaderboard

---

# 📱 Installation

```bash
git clone https://github.com/mosesloni18-spec/FitFuel.git
cd FitFuel
npm install
npx expo start
```

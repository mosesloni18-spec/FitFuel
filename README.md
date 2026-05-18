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

This project was developed as part of **COMP602 Software Development Practice (Sprint 1 MVP)**.

---

# 📱 Application Screens

## 🏠 Home Page (Moses)

- Daily summary (streak, points, water)
- Quick navigation to Fuel page
- Daily task overview

## 🍽️ Fuel Page (Soyeon)

- Track calories, protein, and water intake
- Custom daily goals (calories, protein, water)
- Real-time progress bars
- Data persistence using AsyncStorage
- Streak and points system

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
- - Auto-calculation of calorie, protein, and water goals using height and weight

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

# 👥 Team Contribution

| Feature               | Developer |
| --------------------- | --------- |
| Home Page             | Moses     |
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

---

# 📱 Installation

```bash
git clone https://github.com/mosesloni18-spec/FitFuel.git
cd FitFuel
npm install
npx expo start
```

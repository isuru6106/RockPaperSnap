# 🎮 RockPaperSnap

**Think Fast. Choose Smart. Win the Battle!**

## 👨‍🎓 Student Details

| Field        | Details                        |
| ------------ | ------------------------------ |
| Student Name | Isuru Udeshitha                |
| Student ID   | PS/2022/036                    |
| Course       | Mobile Application Development |
| Assignment   | Practical Tutorial 05          |

---

**Think Fast. Choose Smart. Win the Battle!**

RockPaperSnap is a mobile Rock, Paper, Scissors game developed using **React Native, Expo, and TypeScript**. Players compete against the computer through an interactive gaming interface with score tracking, winning streaks, match history, and a dedicated game rules screen.

## ✨ Features

- **Interactive Gameplay** – Play Rock, Paper, Scissors against the computer.
- **Random Computer Selection** – The computer randomly chooses Rock, Paper, or Scissors.
- **Scoreboard** – Tracks wins, draws, and losses.
- **Round Counter** – Displays the current game round.
- **Winning Streak** – Tracks current and best winning streaks.
- **Match History** – Displays the latest five match results.
- **Reset Game** – Reset game statistics with confirmation.
- **Game Rules** – A separate screen explaining the rules and gameplay.
- **Haptic Feedback** – Provides vibration feedback during gameplay.
- **Modern User Interface** – Dark-themed interface with gradients and interactive elements.

## 🛠️ Technologies Used

| Technology           | Purpose                               |
| -------------------- | ------------------------------------- |
| React Native         | Mobile application development        |
| Expo                 | Development and application framework |
| TypeScript           | Application programming               |
| Expo Router          | Navigation between screens            |
| Expo Linear Gradient | Gradient backgrounds                  |
| Expo Haptics         | Vibration feedback                    |
| Expo Vector Icons    | User interface icons                  |

## 📱 Application Screenshots

The application screenshots are available in the `Output_Screens` directory.

| Screen                              | Description                   |
| ----------------------------------- | ----------------------------- |
| `01_Game_Win_and_Match_History.jpg` | Game result and match history |
| `02_Main_Game_Screen.jpg`           | Main gameplay interface       |
| `03_Game_Rules_Screen.jpg`          | Game rules and instructions   |
| `04_Reset_Game_Screen.jpg`          | Reset game interface          |

## 🎯 Game Rules

- 🪨 **Rock** crushes Scissors.
- 📄 **Paper** covers Rock.
- ✂️ **Scissors** cuts Paper.
- Choosing the same weapon results in a draw.

## 🚀 Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- Expo Go application (for testing on a physical mobile device)

### 1. Clone the Repository

```bash
git clone https://github.com/isuru6106/RockPaperSnap.git
```

### 2. Navigate to the Project Directory

```bash
cd RockPaperSnap
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npx expo start
```

### 5. Run the Application

Scan the QR code displayed in the terminal using Expo Go on your mobile device.

## 📂 Project Structure

```text
RockPaperSnap/
│
├── assets/
│   └── images/
│       └── appIcon.png
│
├── Output_Screens/
│   ├── 01_Game_Win_and_Match_History.jpg
│   ├── 02_Main_Game_Screen.jpg
│   ├── 03_Game_Rules_Screen.jpg
│   └── 04_Reset_Game_Screen.jpg
│
├── src/
│   └── app/
│       ├── (tabs)/
│       │   ├── _layout.tsx
│       │   ├── index.tsx
│       │   └── rules.tsx
│       │
│       ├── _layout.tsx
│       └── index.tsx
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing

The application was tested using Expo Go on a mobile device.

The following functionalities were verified:

- Player weapon selection.
- Random computer weapon selection.
- Win, lose, and draw result calculation.
- Scoreboard updates.
- Round counter updates.
- Winning streak tracking.
- Match history updates.
- Navigation between game and rules screens.
- Reset game functionality.

## 👨‍💻 Developer

Developed as part of the **Mobile Application Development Practical Assignment**.

## 🔗 GitHub Repository

[https://github.com/isuru6106/RockPaperSnap](https://github.com/isuru6106/RockPaperSnap)

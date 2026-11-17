import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
    Alert,
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const COLORS = {
  background: "#080D1B",
  card: "#121C32",
  border: "#263650",
  text: "#F8FAFC",
  muted: "#91A1BA",
  rock: "#FF5268",
  paper: "#20D6C0",
  scissors: "#FFBE55",
  win: "#26D99A",
  lose: "#FF5268",
  draw: "#91A1BA",
};

const CHOICES = [
  { name: "Rock", emoji: "✊", color: COLORS.rock },
  { name: "Paper", emoji: "✋", color: COLORS.paper },
  { name: "Scissors", emoji: "✌️", color: COLORS.scissors },
];

type Choice = (typeof CHOICES)[number];

type Match = {
  round: number;
  player: string;
  computer: string;
  result: "WIN" | "LOSE" | "DRAW";
};

export default function PlayScreen() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);

  const [result, setResult] = useState("READY TO PLAY?");
  const [resultColor, setResultColor] = useState(COLORS.muted);

  const [score, setScore] = useState({
    wins: 0,
    draws: 0,
    losses: 0,
  });

  const [round, setRound] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [history, setHistory] = useState<Match[]>([]);

  const scale = useRef(new Animated.Value(1)).current;

  const playGame = async (choice: Choice) => {
    const computer = CHOICES[Math.floor(Math.random() * CHOICES.length)];

    const nextRound = round + 1;

    setUserChoice(choice);
    setComputerChoice(computer);
    setRound(nextRound);

    let matchResult: Match["result"];

    if (choice.name === computer.name) {
      matchResult = "DRAW";
      setResult("IT'S A DRAW!");
      setResultColor(COLORS.draw);

      setScore((previous) => ({
        ...previous,
        draws: previous.draws + 1,
      }));

      setStreak(0);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else if (
      (choice.name === "Rock" && computer.name === "Scissors") ||
      (choice.name === "Paper" && computer.name === "Rock") ||
      (choice.name === "Scissors" && computer.name === "Paper")
    ) {
      matchResult = "WIN";
      setResult("YOU WIN!");
      setResultColor(COLORS.win);

      setScore((previous) => ({
        ...previous,
        wins: previous.wins + 1,
      }));

      setStreak((previous) => {
        const nextStreak = previous + 1;

        setBestStreak((best) => Math.max(best, nextStreak));

        return nextStreak;
      });

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      matchResult = "LOSE";
      setResult("YOU LOSE!");
      setResultColor(COLORS.lose);

      setScore((previous) => ({
        ...previous,
        losses: previous.losses + 1,
      }));

      setStreak(0);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    setHistory((previous) =>
      [
        {
          round: nextRound,
          player: choice.name,
          computer: computer.name,
          result: matchResult,
        },
        ...previous,
      ].slice(0, 5),
    );

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.08,
        duration: 130,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetGame = () => {
    Alert.alert(
      "Reset Game?",
      "Are you sure you want to reset your score and match history?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            setUserChoice(null);
            setComputerChoice(null);

            setResult("READY TO PLAY?");
            setResultColor(COLORS.muted);

            setScore({
              wins: 0,
              draws: 0,
              losses: 0,
            });

            setRound(0);
            setStreak(0);
            setBestStreak(0);
            setHistory([]);

            scale.setValue(1);

            await Haptics.selectionAsync();
          },
        },
      ],
    );
  };

  return (
    <LinearGradient
      colors={["#080D1B", "#101B32", "#080D1B"]}
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.eyebrow}>THE ULTIMATE BATTLE</Text>
            <Text style={styles.title}>RPS SHOWDOWN</Text>
            <Text style={styles.subtitle}>Rock • Paper • Scissors</Text>
          </View>

          <View style={styles.roundBadge}>
            <Text style={styles.roundNumber}>{round}</Text>
            <Text style={styles.roundLabel}>ROUND</Text>
          </View>
        </View>

        {/* SCOREBOARD */}
        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>WINS</Text>
            <Text style={[styles.statValue, { color: COLORS.win }]}>
              {score.wins}
            </Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <Text style={styles.statLabel}>DRAWS</Text>
            <Text style={styles.statValue}>{score.draws}</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <Text style={styles.statLabel}>LOSSES</Text>
            <Text style={[styles.statValue, { color: COLORS.lose }]}>
              {score.losses}
            </Text>
          </View>
        </View>

        {/* STREAK INFORMATION */}
        <View style={styles.extraStats}>
          <View style={styles.extraStat}>
            <Text style={styles.extraEmoji}>🔥</Text>
            <Text style={styles.extraText}>Streak: {streak}</Text>
          </View>

          <View style={styles.extraStat}>
            <Text style={styles.extraEmoji}>🏆</Text>
            <Text style={styles.extraText}>Best: {bestStreak}</Text>
          </View>
        </View>

        {/* BATTLE ARENA */}
        <View style={styles.arena}>
          <Text style={styles.sectionLabel}>⚡ BATTLE ARENA</Text>

          <Animated.View style={[styles.battleRow, { transform: [{ scale }] }]}>
            <View style={styles.player}>
              <Text style={styles.playerLabel}>YOU</Text>

              <View
                style={[
                  styles.choiceCircle,
                  {
                    borderColor: userChoice?.color || COLORS.border,
                  },
                ]}
              >
                <Text style={styles.choiceEmoji}>
                  {userChoice ? userChoice.emoji : "❔"}
                </Text>
              </View>

              <Text style={styles.choiceName}>
                {userChoice?.name || "Waiting"}
              </Text>
            </View>

            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            <View style={styles.player}>
              <Text style={styles.playerLabel}>COMPUTER</Text>

              <View
                style={[
                  styles.choiceCircle,
                  {
                    borderColor: computerChoice?.color || COLORS.border,
                  },
                ]}
              >
                <Text style={styles.choiceEmoji}>
                  {computerChoice ? computerChoice.emoji : "❔"}
                </Text>
              </View>

              <Text style={styles.choiceName}>
                {computerChoice?.name || "Waiting"}
              </Text>
            </View>
          </Animated.View>

          <View style={[styles.resultBox, { borderColor: resultColor }]}>
            <Text style={[styles.resultText, { color: resultColor }]}>
              {result}
            </Text>
          </View>
        </View>

        {/* WEAPON SELECTION */}
        <Text style={styles.instruction}>CHOOSE YOUR WEAPON</Text>

        <View style={styles.weaponsRow}>
          {CHOICES.map((choice) => (
            <TouchableOpacity
              key={choice.name}
              activeOpacity={0.75}
              onPress={() => playGame(choice)}
              style={[styles.weaponButton, { borderBottomColor: choice.color }]}
            >
              <Text style={styles.weaponEmoji}>{choice.emoji}</Text>

              <Text style={styles.weaponName}>{choice.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* MATCH HISTORY */}
        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>📊 MATCH HISTORY</Text>

            <Text style={styles.historyCount}>{history.length}/5</Text>
          </View>

          {history.length === 0 ? (
            <Text style={styles.emptyHistory}>
              No matches yet. Start playing!
            </Text>
          ) : (
            history.map((match) => (
              <View key={match.round} style={styles.historyRow}>
                <Text style={styles.historyRound}>#{match.round}</Text>

                <Text style={styles.historyMatch}>
                  {match.player} vs {match.computer}
                </Text>

                <Text
                  style={[
                    styles.historyResult,
                    {
                      color:
                        match.result === "WIN"
                          ? COLORS.win
                          : match.result === "LOSE"
                            ? COLORS.lose
                            : COLORS.draw,
                    },
                  ]}
                >
                  {match.result}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* RESET BUTTON */}
        <TouchableOpacity
          onPress={resetGame}
          activeOpacity={0.8}
          style={styles.resetButton}
        >
          <Text style={styles.resetText}>↻ RESET GAME</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>MADE FOR CHAMPIONS • RPS SHOWDOWN</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingTop: 58,
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerContent: {
    flex: 1,
  },
  eyebrow: {
    color: COLORS.paper,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
  title: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 7,
    letterSpacing: 0.5,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 5,
  },
  roundBadge: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    minWidth: 65,
  },
  roundNumber: {
    color: COLORS.paper,
    fontSize: 23,
    fontWeight: "900",
  },
  roundLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "800",
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 17,
    marginBottom: 12,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  extraStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  extraStat: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 13,
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 4,
  },
  extraEmoji: {
    fontSize: 16,
    marginRight: 7,
  },
  extraText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
  },
  arena: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    alignItems: "center",
  },
  sectionLabel: {
    color: COLORS.paper,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 25,
  },
  battleRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  player: {
    flex: 1,
    alignItems: "center",
  },
  playerLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 13,
  },
  choiceCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceEmoji: {
    fontSize: 43,
  },
  choiceName: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 10,
  },
  vsContainer: {
    paddingHorizontal: 10,
  },
  vsText: {
    color: COLORS.scissors,
    fontSize: 19,
    fontWeight: "900",
  },
  resultBox: {
    width: "100%",
    borderWidth: 1.5,
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 25,
    backgroundColor: COLORS.background,
  },
  resultText: {
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1,
  },
  instruction: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 27,
    marginBottom: 15,
  },
  weaponsRow: {
    flexDirection: "row",
    gap: 10,
  },
  weaponButton: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomWidth: 4,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
  },
  weaponEmoji: {
    fontSize: 32,
  },
  weaponName: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 9,
  },
  historyCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    padding: 17,
    marginTop: 22,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  historyTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },
  historyCount: {
    color: COLORS.paper,
    fontSize: 12,
    fontWeight: "800",
  },
  emptyHistory: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 15,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  historyRound: {
    color: COLORS.muted,
    fontSize: 11,
    width: 35,
    fontWeight: "800",
  },
  historyMatch: {
    flex: 1,
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "700",
  },
  historyResult: {
    fontSize: 11,
    fontWeight: "900",
  },
  resetButton: {
    backgroundColor: "#1B2942",
    borderWidth: 1,
    borderColor: "#344763",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 23,
  },
  resetText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },
  footer: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 25,
  },
});

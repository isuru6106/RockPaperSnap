import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const COLORS = {
  background: "#080D1B",
  card: "#121C32",
  border: "#263650",
  text: "#F8FAFC",
  muted: "#91A1BA",
  rock: "#FF5268",
  paper: "#20D6C0",
  scissors: "#FFBE55",
};

const RULES = [
  {
    emoji: "✊",
    name: "ROCK",
    description: "Rock crushes Scissors",
    color: COLORS.rock,
    opponent: "SCISSORS",
  },
  {
    emoji: "✋",
    name: "PAPER",
    description: "Paper covers Rock",
    color: COLORS.paper,
    opponent: "ROCK",
  },
  {
    emoji: "✌️",
    name: "SCISSORS",
    description: "Scissors cuts Paper",
    color: COLORS.scissors,
    opponent: "PAPER",
  },
];

const STEPS = [
  "Choose Rock, Paper or Scissors.",
  "The computer randomly selects its weapon.",
  "Both choices are compared using the game rules.",
  "The winner earns a point in the scoreboard.",
];

export default function RulesScreen() {
  return (
    <LinearGradient
      colors={["#080D1B", "#101B32", "#080D1B"]}
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>LEARN THE GAME</Text>
        <Text style={styles.header}>GAME RULES 📜</Text>
        <Text style={styles.subtitle}>
          Master the weapons. Conquer the arena.
        </Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⚔️ THE THREE WEAPONS</Text>
          <Text style={styles.sectionSubtitle}>
            Understand how each weapon wins
          </Text>
        </View>

        {RULES.map((rule) => (
          <View
            key={rule.name}
            style={[styles.ruleCard, { borderLeftColor: rule.color }]}
          >
            <View style={[styles.emojiCircle, { borderColor: rule.color }]}>
              <Text style={styles.emoji}>{rule.emoji}</Text>
            </View>

            <View style={styles.ruleContent}>
              <Text style={[styles.ruleName, { color: rule.color }]}>
                {rule.name}
              </Text>
              <Text style={styles.ruleDescription}>{rule.description}</Text>
              <Text style={styles.beatsText}>DEFEATS: {rule.opponent}</Text>
            </View>

            <Text style={[styles.arrow, { color: rule.color }]}>→</Text>
          </View>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎮 HOW TO PLAY</Text>
          <Text style={styles.sectionSubtitle}>Follow these simple steps</Text>
        </View>

        <View style={styles.instructionsCard}>
          {STEPS.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>🏆 RESULT GUIDE</Text>

          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: "#26D99A" }]}>
              YOU WIN
            </Text>
            <Text style={styles.resultDescription}>
              Your weapon defeats the computer's weapon.
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: "#FF5268" }]}>
              YOU LOSE
            </Text>
            <Text style={styles.resultDescription}>
              The computer's weapon defeats yours.
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: "#91A1BA" }]}>DRAW</Text>
            <Text style={styles.resultDescription}>
              Both players choose the same weapon.
            </Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipEmoji}>💡</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>PRO TIP</Text>
            <Text style={styles.tipDescription}>
              Think strategically, watch your results and aim for your longest
              winning streak!
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          RPS SHOWDOWN • MAY THE BEST PLAYER WIN
        </Text>
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
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  eyebrow: {
    color: COLORS.paper,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2.5,
  },
  header: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 9,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 7,
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  ruleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    padding: 16,
    marginBottom: 12,
  },
  emojiCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    marginRight: 14,
  },
  emoji: {
    fontSize: 29,
  },
  ruleContent: {
    flex: 1,
  },
  ruleName: {
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
  ruleDescription: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
  },
  beatsText: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 7,
  },
  arrow: {
    fontSize: 24,
    fontWeight: "900",
    marginLeft: 5,
  },
  instructionsCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 19,
    marginBottom: 25,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#183E49",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  stepNumberText: {
    color: COLORS.paper,
    fontWeight: "900",
    fontSize: 13,
  },
  stepText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 20,
  },
  resultCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 19,
    marginBottom: 20,
  },
  resultTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 17,
  },
  resultRow: {
    paddingVertical: 10,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },
  resultDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#192B3D",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#31506A",
    padding: 17,
  },
  tipEmoji: {
    fontSize: 28,
    marginRight: 13,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    color: COLORS.scissors,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 5,
  },
  tipDescription: {
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 19,
  },
  footer: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 28,
  },
});

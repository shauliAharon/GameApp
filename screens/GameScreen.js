import {
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../constants/colors";
import GuessLogItem from "../components/game/GuessLogItem";
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxBoundary = 100;
function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, SetCurrentGuess] = useState(initialGuess);
  const [guessRounds, SetGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("DON'T LIE!", "you Know that this is WRONG!", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRudNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    SetCurrentGuess(newRudNumber);
    SetGuessRounds((prevGuessRounds) => [newRudNumber, ...prevGuessRounds]);
  }
  const guessRoundslength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              style={styles.button}
              onPress={nextGuessHandler.bind(this, "lower")}
            >
              <Ionicons
                color={Colors.accent500}
                size={25}
                name="remove-circle-sharp"
              />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              style={styles.button}
              onPress={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons
                color={Colors.accent500}
                size={25}
                name="add-circle-sharp"
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );
  if (width > 500) {
    content = (
      <>
        {/* <InstructionText style={styles.instructionText}>
          Higher or Lower
        </InstructionText> */}
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              style={styles.button}
              onPress={nextGuessHandler.bind(this, "lower")}
            >
              <Ionicons
                color={Colors.accent500}
                size={25}
                name="remove-circle-sharp"
              />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              style={styles.button}
              onPress={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons
                color={Colors.accent500}
                size={25}
                name="add-circle-sharp"
              />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  const marginTopDistance = width < 500 ? 24 : 12;
  return (
    <View style={[styles.screen, { marginTop: marginTopDistance }]}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundslength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
      </View>
    </View>
  );
}
export default GameScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    // marginTop:20,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    fontSize: 25,
    color: Colors.accent500,
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

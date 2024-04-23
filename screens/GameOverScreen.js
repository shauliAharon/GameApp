import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();
  //   const widthDimensions = width < 380 ? 100 : 150;
  //   const heightDimensions = height < 380 ? 100 : 300;
  //   const borderRadiusDimensions = width < 380 ? 100 : 150;
  let imageSize = 300;
  let borderWidthImage = 3;
  let marginTopScreen = 36;
  if (width < 380) {
    imageSize = 250;
    borderWidthImage = 2;
    marginTopScreen = 12;
  }
  if (height < 400) {
    imageSize = 90;
    borderWidthImage = 2;
    marginTopScreen = 12;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    borderWidth: borderWidthImage,
    marginTop: marginTopScreen,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={[styles.rootContainer, { marginTop: marginTopScreen }]}>
        <Title>GAME OVER</Title>
        <View
          style={[
            styles.imageContainer,
            {
              width: imageStyle.width,
              height: imageStyle.height,
              borderRadius: imageStyle.borderRadius,
              borderWidth: imageStyle.borderWidth,
            },
          ]}
        >
          <Image
            style={styles.image}
            source={require("../assets/image/success.png")}
          />
        </View>
        <View>
          <Text style={styles.summaryText}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess
            the number <Text style={styles.highlight}>{userNumber}</Text>
          </Text>
        </View>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    // marginTop:24
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    // marginVertical: 24,
    marginBottom: 26,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});

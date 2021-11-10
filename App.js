import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const App = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <View style={styles.body} testID="body">
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Hello World!</Text>
      </View>
      {isToggled && <Text>I am the toggled component</Text>}
      <Button
        title="Press me!"
        onPress={() => setIsToggled(!isToggled)}
        testID="pressMeButton"
        accessibilityLabel="Press me"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
  },
});

export default App;

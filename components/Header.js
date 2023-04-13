import React from "react";
import { Header } from "react-native-elements";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const HeaderBar = ({ darkMode, toggleTheme }) => {
  return (
    <Header
      containerStyle={styles.headerContainer}
      centerComponent={{
        text: "Dad Jokes",
        style: { color: "#fff", fontSize: 20 },
      }}
      rightComponent={
        <TouchableOpacity onPress={toggleTheme}>
          <Icon
            name={darkMode ? "sun" : "moon"}
            type="font-awesome-5"
            color="#fff"
          />
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20, // Increased padding
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  themeIcon: {
    marginRight: 20,
  },
});

export default HeaderBar;

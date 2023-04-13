import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const JokeCard = ({
  joke,
  index,
  theme,
  handleLike,
  handleDislike,
  isLiked,
  isDisliked,
}) => {
  return (
    <View style={[styles.jokeCard, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.jokeIndex, { color: theme.textColor }]}>
          Joke #{index + 1}
        </Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => handleLike(joke.id)}>
            <Icon
              name="thumbs-up"
              type="font-awesome-5"
              size={20}
              color={isLiked ? "#007bff" : theme.textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDislike(joke.id)}>
            <Icon
              name="thumbs-down"
              type="font-awesome-5"
              size={20}
              color={isDisliked ? "#FF3E3E" : theme.textColor}
              style={styles.dislikeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.jokeText, { color: theme.textColor }]}>
        {joke.joke}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  jokeCard: {
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jokeIndex: {
    fontSize: 16,
    fontWeight: "bold",
  },
  jokeText: {
    fontSize: 16,
    marginTop: 10,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dislikeIcon: {
    marginLeft: 10,
  },
});

export default JokeCard;

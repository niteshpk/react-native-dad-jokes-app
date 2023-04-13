import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JokeCard from "./JokeCard";

const Jokes = ({ jokes, theme }) => {
  const [likedJokes, setLikedJokes] = useState([]);
  const [dislikedJokes, setDislikedJokes] = useState([]);

  useEffect(() => {
    getJokesFromStorage();
  }, []);

  const handleLike = async (jokeId) => {
    if (!likedJokes.includes(jokeId)) {
      setLikedJokes([...likedJokes, jokeId]);
      deleteDislike(jokeId);
      await AsyncStorage.setItem(
        "likedJokes",
        JSON.stringify([...likedJokes, jokeId])
      );
    } else {
      deleteLike(jokeId);
    }
  };

  const deleteLike = async (jokeId) => {
    const newLikedJokes = likedJokes.filter((id) => id !== jokeId);
    setLikedJokes(newLikedJokes);
    await AsyncStorage.setItem("likedJokes", JSON.stringify(newLikedJokes));
  };

  const deleteDislike = async (jokeId) => {
    const newDislikedJokes = dislikedJokes.filter((id) => id !== jokeId);
    setDislikedJokes(newDislikedJokes);
    await AsyncStorage.setItem(
      "dislikedJokes",
      JSON.stringify(newDislikedJokes)
    );
  };

  const handleDislike = async (jokeId) => {
    if (!dislikedJokes.includes(jokeId)) {
      setDislikedJokes([...dislikedJokes, jokeId]);
      await AsyncStorage.setItem(
        "dislikedJokes",
        JSON.stringify([...dislikedJokes, jokeId])
      );
      deleteLike(jokeId);
    } else {
      deleteDislike(jokeId);
    }
  };

  const getJokesFromStorage = async () => {
    try {
      const likedValue = await AsyncStorage.getItem("likedJokes");
      const dislikedValue = await AsyncStorage.getItem("dislikedJokes");
      if (likedValue !== null) {
        setLikedJokes(JSON.parse(likedValue));
      }
      if (dislikedValue !== null) {
        setDislikedJokes(JSON.parse(dislikedValue));
      }
    } catch (error) {
      console.error("Error getting liked and disliked jokes:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.jokeList}>
      {jokes.map((joke, index) => (
        <JokeCard
          key={joke.id}
          joke={joke}
          theme={theme}
          index={index}
          handleLike={handleLike}
          handleDislike={handleDislike}
          isLiked={likedJokes.includes(joke.id)}
          isDisliked={dislikedJokes.includes(joke.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  jokeList: {
    padding: 10,
  },
});

export default Jokes;

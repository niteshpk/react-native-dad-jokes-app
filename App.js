import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import Jokes from "./components/Jokes";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const currentTheme = {
    backgroundColor: darkMode ? "#212529" : "#f8f9fa",
    textColor: darkMode ? "#f8f9fa" : "#212529",
  };

  useEffect(() => {
    fetchJokes();
    getDarkMode();
  }, []);

  const fetchJokes = async (page = 1, searchTerm = "") => {
    setLoading(true);
    const response = await fetch(
      `https://icanhazdadjoke.com/search?page=${page}&limit=10&term=${searchTerm}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    setJokes(data.results);
    setCurrentPage(data.current_page);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchJokes(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchJokes(currentPage + 1);
    }
  };

  const handleSearch = (searchTerm) => {
    fetchJokes(1, searchTerm);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    storeDarkMode(!darkMode);
  };

  const getDarkMode = async () => {
    try {
      const value = await AsyncStorage.getItem("darkMode");
      if (value !== null) {
        setDarkMode(JSON.parse(value));
      }
    } catch (error) {
      console.error("Error getting dark mode setting:", error);
    }
  };

  const storeDarkMode = async (value) => {
    try {
      await AsyncStorage.setItem("darkMode", JSON.stringify(value));
    } catch (error) {
      console.error("Error storing dark mode setting:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <Search theme={currentTheme} onSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color={currentTheme.textColor} />
      ) : (
        <>
          <Jokes jokes={jokes} theme={currentTheme} />
          <Pagination
            theme={currentTheme}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const Search = ({ theme, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={[
          styles.searchInput,
          { color: theme.textColor, borderColor: theme.textColor },
        ]}
        placeholder="Search for a joke..."
        placeholderTextColor={theme.textColor}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <TouchableOpacity
        s
        style={[
          styles.searchButton,
          { color: theme.textColor, borderColor: theme.textColor },
        ]}
        onPress={handleSearch}
      >
        <Icon
          name="search"
          type="font-awesome-5"
          size={18}
          color={theme.textColor}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  searchButton: {
    borderWidth: 1, // Added border
    borderColor: "#000", // Added border color
    backgroundColor: "transparent", // Changed to outlined style
    padding: 8,
    borderRadius: 5,
  },
});

export default Search;

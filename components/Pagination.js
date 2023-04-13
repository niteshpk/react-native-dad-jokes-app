import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
  theme,
}) => {
  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        onPress={handlePrevious}
        style={styles.paginationButton}
      >
        <Icon
          name="chevron-left"
          type="font-awesome-5"
          size={20}
          color={theme.textColor}
        />
        <Text
          style={[
            styles.paginationButtonText,
            {
              color: theme.textColor,
            },
          ]}
        >
          Previous
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.pageInfo,
          {
            color: theme.textColor,
          },
        ]}
      >
        Page {currentPage} of {totalPages}
      </Text>
      <TouchableOpacity onPress={handleNext} style={styles.paginationButton}>
        <Text
          style={[
            styles.paginationButtonText,
            {
              color: theme.textColor,
            },
          ]}
        >
          Next
        </Text>
        <Icon
          name="chevron-right"
          type="font-awesome-5"
          size={20}
          color={theme.textColor}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  paginationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  paginationButtonText: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  pageInfo: {
    fontSize: 16,
  },
});

export default Pagination;

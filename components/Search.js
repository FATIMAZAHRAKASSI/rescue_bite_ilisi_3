// components/SearchBar.js

import React from 'react';
import { StyleSheet, TextInput, View ,TouchableOpacity, Text} from 'react-native';
import {COLORS} from '../constants/colors';
const SearchBar = ({ value, onChangeText, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: COLORS.grey,
    borderRadius: 5,
  
  },
});

export default SearchBar;

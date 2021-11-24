import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { COLORS } from '../constants';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;

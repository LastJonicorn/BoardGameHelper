import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Helper</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="🎲 Go to Dice Roller"
          onPress={() => navigation.navigate('Dice Roller')}
          color="#4e9af1"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="⏱ Go to Timer"
          onPress={() => navigation.navigate('Timer')}
          color="#2ecc71"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="➕ Go to Counters"
          onPress={() => navigation.navigate('Counters')}
          color="#9b59b6"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '70%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden', // ensures rounded corners apply to Button
  },
});

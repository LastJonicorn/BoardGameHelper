import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Helper</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4e9af1' }]}
        onPress={() => navigation.navigate('Dice Roller')}
      >
        <Text style={styles.buttonText}>🎲 Dice Roller</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2ecc71' }]}
        onPress={() => navigation.navigate('Timer')}
      >
        <Text style={styles.buttonText}>⏱ Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#9b59b6' }]}
        onPress={() => navigation.navigate('Counters')}
      >
        <Text style={styles.buttonText}>➕ Counters</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#b65972' }]}
        onPress={() => navigation.navigate('Resources')}
      >
        <Text style={styles.buttonText}>🪙 Resources</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262626',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#dcdcdc',
  },
  button: {
    width: '70%',
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // for Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

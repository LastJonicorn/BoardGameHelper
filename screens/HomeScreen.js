import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Helper</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#496688' }]}
        onPress={() => navigation.navigate('Dice Roller')}
      >
        <Text style={styles.buttonText}>🎲 Dice Roller</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#568569' }]}
        onPress={() => navigation.navigate('Timer')}
      >
        <Text style={styles.buttonText}>⏱ Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#7b5c87' }]}
        onPress={() => navigation.navigate('Counters')}
      >
        <Text style={styles.buttonText}>➕ Counters</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#87606a' }]}
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
    color: '#ffefcf',
  },
  button: {
    width: '70%',
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#6b390a',
    shadowOffset: { width: 3, height: 2 },
    shadowRadius: 5.5,
    elevation: 5, // for Android shadow
    borderWidth: 2,
    borderColor: '#6b390a',   
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

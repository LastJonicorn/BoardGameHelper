import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/CounterStyles';

const counterColors = [
  '#ff2e2e',
  '#2cfff1',
  '#ffd21d',
  '#1e74ff',
  '#fb29ff',
  '#32ff35',
];

export default function CounterScreen() {
  const insets = useSafeAreaInsets();
  const [counters, setCounters] = useState([]);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    loadCounters();
  }, []);

  const loadCounters = async () => {
    try {
      const saved = await AsyncStorage.getItem('counters');
      if (saved) setCounters(JSON.parse(saved));
    } catch (e) {
      console.log('Error loading counters:', e);
    }
  };

  const saveCounters = async (newCounters) => {
    try {
      setCounters(newCounters);
      await AsyncStorage.setItem('counters', JSON.stringify(newCounters));
    } catch (e) {
      console.log('Error saving counters:', e);
    }
  };

  const addCounter = () => {
    if (counters.length >= 6) return;
    const newCounter = {
      id: Date.now().toString(),
      name: `Player ${counters.length + 1}`,
      value: 0,
    };
    saveCounters([...counters, newCounter]);
  };

  const removeCounter = (id) => {
    saveCounters(counters.filter((c) => c.id !== id));
  };

  const changeValue = (id, delta) => {
    const updated = counters.map((c) =>
      c.id === id ? { ...c, value: c.value + delta } : c
    );
    saveCounters(updated);
  };

  const changeName = (id, newName) => {
    const updated = counters.map((c) =>
      c.id === id ? { ...c, name: newName } : c
    );
    saveCounters(updated);
  };

  // Calculate height so 3 rows fit above nav bar
  const availableHeight = height - insets.top - insets.bottom - 80;
  const counterHeight = availableHeight / 3 - 10;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.counterGrid}>
        {counters.map((counter, index) => {
          const color = counterColors[index % counterColors.length];
          return (
            <View
              key={counter.id}
              style={[
                styles.counterBox,
                {
                  borderColor: color,
                  width: width / 2 - 20,
                  height: counterHeight,
                },
              ]}
            >
              <TextInput
                style={[styles.nameInput, { color: '#ffffff'}]}
                value={counter.name}
                onChangeText={(text) => changeName(counter.id, text)}
              />
              <Text style={[styles.valueText, { color }]}>{counter.value}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => changeValue(counter.id, -1)} style={styles.button}>
                  <Text style={[styles.buttonText, { color }]}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeValue(counter.id, 1)} style={styles.button}>
                  <Text style={[styles.buttonText, { color }]}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => removeCounter(counter.id)} style={styles.removeButton}>
                <Text style={[styles.removeButtonText, { color }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {counters.length < 6 && (
          <TouchableOpacity
            style={[
              styles.addTile,
              { width: width / 2 - 20, height: counterHeight },
            ]}
            onPress={addCounter}
          >
            <Text style={styles.addTileText}>+ Add Counter</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

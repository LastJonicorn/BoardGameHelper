import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  findNodeHandle,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  const scrollRef = useRef(null);
  const inputRefs = useRef({});

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
    inputRefs.current[id]?.blur(); // hide keyboard after typing
  };

  // Calculate height so 3 rows fit above nav bar
  const availableHeight = height - insets.top - insets.bottom - 80;
  const counterHeight = availableHeight / 3 - 10;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        ref={scrollRef}
        enableOnAndroid
        extraScrollHeight={80}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
          flexGrow: 1,
          justifyContent: 'center', // keep counters centered when keyboard is closed
        }}
      >
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
                  ref={(ref) => (inputRefs.current[counter.id] = ref)}
                  style={[styles.nameInput, { color: '#ffffff' }]}
                  value={counter.name}
                  onChangeText={(text) => changeName(counter.id, text)}
                  returnKeyType="done"
                  onFocus={(e) => {
                    const handle = findNodeHandle(e.target);
                    scrollRef.current?.scrollToFocusedInput(handle, 80);
                  }}
                  onSubmitEditing={() =>
                    inputRefs.current[counter.id]?.blur()
                  }
                />
                <Text style={[styles.valueText, { color }]}>{counter.value}</Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    onPress={() => changeValue(counter.id, -1)}
                    style={styles.button}
                  >
                    <Text style={[styles.buttonText, { color }]}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => changeValue(counter.id, 1)}
                    style={styles.button}
                  >
                    <Text style={[styles.buttonText, { color }]}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => removeCounter(counter.id)}
                  style={styles.removeButton}
                >
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

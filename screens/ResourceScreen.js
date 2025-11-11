import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  findNodeHandle,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // 👈 smooth scroll
import styles from '../styles/ResourceStyles';

const resourceIcons = {
  gold: '💰',
  money: '💰',
  coins: '🪙',
  health: '❤️',
  hp: '❤️',
  hitpoints: '❤️',
  mana: '🔵',
  energy: '⚡',
  lightning: '⚡',
  stamina: '🟢',
  xp: '⭐',
  experience: '⭐',
  lore: '⭐',
  food: '🍗',
  wood: '🌲',
  trees: '🌲',
  forest: '🌲',
  foliage: '🌲',
  stone: '🪨',
  rock: '🪨',
  iron: '⛓️',
  magic: '🪄',
  magica: '🪄',
  key: '🔑',
  attack: '🗡️',
  power: '🗡️',
  gem: '💎',
  diamond: '💎',
  treasure: '💎',
  scroll: '📜',
  parchment: '📜',
  paper: '📜',
  shield: '🛡️',
  defence: '🛡️',
  fire: '🔥',
  fireball: '🔥',
  water: '💧',
  liquid: '💧',
  food: '🍗',
  meat: '🍗',

};

export default function ResourceScreen() {
  const insets = useSafeAreaInsets();
  const [resources, setResources] = useState([]);
  const scrollRef = useRef(null);
  const inputRefs = useRef({}); // 👈 refs for all inputs

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const saved = await AsyncStorage.getItem('resources');
      if (saved) setResources(JSON.parse(saved));
    } catch (e) {
      console.log('Error loading resources:', e);
    }
  };

  const saveResources = async (newResources) => {
    try {
      setResources(newResources);
      await AsyncStorage.setItem('resources', JSON.stringify(newResources));
    } catch (e) {
      console.log('Error saving resources:', e);
    }
  };

  const addResource = () => {
    if (resources.length >= 6) return;
    const newRes = {
      id: Date.now().toString(),
      name: `Resource ${resources.length + 1}`,
      value: 0,
    };
    saveResources([...resources, newRes]);
  };

  const removeResource = (id) => {
    saveResources(resources.filter((r) => r.id !== id));
  };

  const changeValue = (id, delta) => {
    const updated = resources.map((r) =>
      r.id === id ? { ...r, value: Math.max(0, r.value + delta) } : r
    );
    saveResources(updated);
  };

  const changeName = (id, newName) => {
    const updated = resources.map((r) =>
      r.id === id ? { ...r, name: newName } : r
    );
    saveResources(updated);
    inputRefs.current[id]?.blur();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          ref={scrollRef}
          extraScrollHeight={80}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.listContainer,
            { paddingBottom: insets.bottom + 100 },
          ]}
        >
          {resources.map((item, index) => {
            const icon =
              resourceIcons[item.name.trim().toLowerCase()] ||
              ['❤️', '🟢', '🔵', '🪙', '⭐', '🍗'][index % 6];

            return (
              <View key={item.id} style={styles.resourceRow}>
                <Text style={styles.icon}>{icon}</Text>
                <TextInput
                  style={styles.nameInput}
                  value={item.name}
                  onChangeText={(text) => changeName(item.id, text)}
                  onFocus={(e) => {
                    // scroll smoothly to focused element
                    const handle = findNodeHandle(e.target);
                    scrollRef.current?.scrollToFocusedInput?.(handle, 80);
                  }}
                  returnKeyType="done"
                  onSubmitEditing={() => inputRefs.current[item.id]?.blur()} // 👈 also blur on "Done"

                />
                <TouchableOpacity
                  onPress={() => changeValue(item.id, -1)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.valueText}>{item.value}</Text>
                <TouchableOpacity
                  onPress={() => changeValue(item.id, 1)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeResource(item.id)}>
                  <Text style={styles.removeText}>✖</Text>
                </TouchableOpacity>
              </View>
            );
          })}

          {resources.length < 6 && (
            <View
              style={[
                styles.addButtonContainer,
                { marginBottom: insets.bottom + 20 },
              ]}
            >
              <TouchableOpacity style={styles.addButton} onPress={addResource}>
                <Text style={styles.addButtonText}>+ Add Resource</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,Image,} from 'react-native';
import styles from '../styles/DiceRollerStyles';

// Sidebar dice images (keep these)
const diceImages = {
  4: require('../assets/d4.png'),
  6: require('../assets/d6.png'),
  8: require('../assets/d8d20.png'),
  10: require('../assets/d10.png'),
  12: require('../assets/d12.png'),
  20: require('../assets/d8d20.png'),
};

// Sidebar tint colors
const diceColors = {
  4: '#e74c3c',
  6: '#f39c12',
  8: '#f1c40f',
  10: '#2ecc71',
  12: '#3498db',
  20: '#9b59b6',
};

// 🎬 Animation frames
const diceAnimationFrames = {
  4: [
    require('../assets/Dice/d4/1.png'),
    require('../assets/Dice/d4/2.png'),
    require('../assets/Dice/d4/3.png'),
    require('../assets/Dice/d4/4.png'),
  ],
  6: [
    require('../assets/Dice/d6/1.png'),
    require('../assets/Dice/d6/2.png'),
    require('../assets/Dice/d6/3.png'),
    require('../assets/Dice/d6/4.png'),
  ],
  8: [
    require('../assets/Dice/d8/1.png'),
    require('../assets/Dice/d8/2.png'),
    require('../assets/Dice/d8/3.png'),
    require('../assets/Dice/d8/4.png'),
  ],
  10: [
    require('../assets/Dice/d10/1.png'),
    require('../assets/Dice/d10/2.png'),
    require('../assets/Dice/d10/3.png'),
    require('../assets/Dice/d10/4.png'),
  ],
  12: [
    require('../assets/Dice/d12/1.png'),
    require('../assets/Dice/d12/2.png'),
    require('../assets/Dice/d12/3.png'),
    require('../assets/Dice/d12/4.png'),
  ],
  20: [
    require('../assets/Dice/d20/1.png'),
    require('../assets/Dice/d20/2.png'),
    require('../assets/Dice/d20/3.png'),
    require('../assets/Dice/d20/4.png'),
  ],
};

export default function DiceRollerScreen() {
  const diceTypes = [4, 6, 8, 10, 12, 20];
  const [selectedDice, setSelectedDice] = useState(6);
  const [results, setResults] = useState([null]);
  const [history, setHistory] = useState([]);
  const [diceCount, setDiceCount] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const [frameOffsets, setFrameOffsets] = useState([0, 1, 2]); // random offset per die
  const [frameIndex, setFrameIndex] = useState(0);
  const rollInterval = useRef(null);
  const animInterval = useRef(null);

  // 🌀 Animate frames
  useEffect(() => {
    if (isRolling) {
      animInterval.current = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % 4);
      }, 100);
    } else {
      setFrameIndex(0);
      clearInterval(animInterval.current);
    }
    return () => clearInterval(animInterval.current);
  }, [isRolling]);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    // 🔀 new random frame offsets so each die animates differently
    setFrameOffsets(
      Array.from({ length: diceCount }, () => Math.floor(Math.random() * 4))
    );

    rollInterval.current = setInterval(() => {
      const tempResults = Array.from({ length: diceCount }, () =>
        Math.floor(Math.random() * selectedDice) + 1
      );
      setResults(tempResults);
    }, 80);

    setTimeout(() => {
      clearInterval(rollInterval.current);
      const finalResults = Array.from({ length: diceCount }, () =>
        Math.floor(Math.random() * selectedDice) + 1
      );
      setResults(finalResults);
      setIsRolling(false);

      const newEntries = finalResults.map((r) => ({
        dice: selectedDice,
        result: r,
      }));
      setHistory((prev) => [...newEntries, ...prev].slice(0, 5));
    }, 750);
  };

  const increaseDice = () => {
    setDiceCount((prev) => (prev < 3 ? prev + 1 : prev));
    setResults((prev) => {
      const newCount = Math.min(prev.length + 1, 3);
      return [...prev, null].slice(0, newCount);
    });
  };

  const decreaseDice = () => {
    setDiceCount((prev) => (prev > 1 ? prev - 1 : prev));
    setResults((prev) => {
      const newCount = Math.max(prev.length - 1, 1);
      return prev.slice(0, newCount);
    });
  };

  const total =
    results && results.every((r) => r !== null)
      ? results.reduce((sum, val) => sum + val, 0)
      : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <FlatList
            data={diceTypes}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedDice(item)}>
                <View style={styles.diceWrapper}>
                  <View
                    style={[
                      styles.diceContainer,
                      item === selectedDice && styles.selectedDiceGlow,
                    ]}
                  >
                    <Image
                      source={diceImages[item]}
                      style={[
                        styles.diceImage,
                        { tintColor: diceColors[item] },
                      ]}
                    />
                    <Text
                      style={[
                        styles.diceLabel,
                        item === selectedDice && styles.diceLabelSelected,
                        item === 4 && styles.d4LabelAdjustment,
                      ]}
                    >
                      d{item}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* History */}
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Last 5 Rolls:</Text>
            {history.map((h, i) => (
              <Text key={i} style={styles.historyItem}>
                d{h.dice}, {h.result}
              </Text>
            ))}
          </View>
        </View>

        {/* Main area */}
        <View style={styles.mainArea}>
          <View style={styles.resultCenterContainer}>
            <View style={styles.multiDiceContainer}>
              {results.map((res, index) => {
                const frames = diceAnimationFrames[selectedDice];

                let frameToShow;
                if (!isRolling) {
                  frameToShow = frames[0]; // always show image 1 when idle
                } else {
                  const randIndex = (frameIndex + frameOffsets[index]) % 3 + 1; // only 1,2,3
                  frameToShow = frames[randIndex];
                }

                return (
                  <View key={index} style={styles.resultContainer}>
                    <Image
                      source={frameToShow}
                      style={[
                        styles.resultDiceImage,
                        {
                          width: 160,  // increased size
                          height: 160, // increased size
                        },
                      ]}
                      resizeMode="contain"
                    />
                    <Text
                      style={[
                        styles.resultInsideText,
                        selectedDice === 4 && styles.d4ResultAdjustment,
                      ]}
                    >
                      {res !== null && !isRolling ? res : ''}
                    </Text>
                  </View>
                );
              })}
            </View>
            {diceCount > 1 && total !== null && (
              <Text style={styles.totalText}>Total: {total}</Text>
            )}
          </View>

          <View style={styles.diceCountControls}>
            <TouchableOpacity
              onPress={decreaseDice}
              style={[
                styles.countButton,
                diceCount === 1 && { opacity: 0.4 },
              ]}
              disabled={diceCount === 1}
            >
              <Text style={styles.countButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.diceCountText}>{diceCount}</Text>

            <TouchableOpacity
              onPress={increaseDice}
              style={[
                styles.countButton,
                diceCount === 3 && { opacity: 0.4 },
              ]}
              disabled={diceCount === 3}
            >
              <Text style={styles.countButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={[styles.rollButton, isRolling && { opacity: 0.5 }]}
              onPress={rollDice}
              disabled={isRolling}
            >
              <Text style={styles.rollButtonText}>
                {isRolling ? 'ROLLING...' : 'ROLL'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Vibration,
} from 'react-native';
import styles from '../styles/TimerStyles';

export default function TimerScreen() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const minuteValues = Array.from({ length: 61 }, (_, i) => i); // 0–60
  const secondValues = Array.from({ length: 60 }, (_, i) => i); // 0–59

  const ITEM_HEIGHT = 50;

  useEffect(() => {
    const totalSeconds = minutes * 60 + seconds;
    setRemaining(totalSeconds);
  }, [minutes, seconds]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            Vibration.vibrate([500, 500, 500]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (total) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setRunning(false);
    const total = minutes * 60 + seconds;
    setRemaining(total);
  };

  const scrollToValue = (scrollRef, value) => {
    scrollRef.current?.scrollTo({
      y: value * ITEM_HEIGHT,
      animated: true,
    });
  };

  const minuteScrollRef = useRef(null);
  const secondScrollRef = useRef(null);

  useEffect(() => {
    scrollToValue(minuteScrollRef, minutes);
    scrollToValue(secondScrollRef, seconds);
  }, []);

  const onScrollEnd = (event, type) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const value = Math.round(offsetY / ITEM_HEIGHT);
    if (type === 'min') setMinutes(value);
    else setSeconds(value);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Labels */}
        <View style={styles.labelRow}>
          <Text style={[styles.labelText, { paddingRight: 50 }]}>Min</Text>
          <Text style={[styles.labelText, { paddingLeft: 50 }]}>Sec</Text>
        </View>

        {/* Scroll pickers */}
        <View style={styles.pickerRow}>
          {/* Minutes */}
          <ScrollView
            ref={minuteScrollRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={(e) => onScrollEnd(e, 'min')}
            contentContainerStyle={{
              paddingVertical: (150 - ITEM_HEIGHT) / 2, // centers active item
            }}
            style={styles.picker}
          >
            {minuteValues.map((val) => (
              <View key={val} style={styles.pickerItem}>
                <Text
                  style={[
                    styles.pickerText,
                    val === minutes && styles.pickerSelected,
                  ]}
                >
                  {val.toString().padStart(2, '0')}
                </Text>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.colon}>:</Text>

          {/* Seconds */}
          <ScrollView
            ref={secondScrollRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={(e) => onScrollEnd(e, 'sec')}
            contentContainerStyle={{
              paddingVertical: (150 - ITEM_HEIGHT) / 2, // centers active item
            }}
            style={styles.picker}
          >
            {secondValues.map((val) => (
              <View key={val} style={styles.pickerItem}>
                <Text
                  style={[
                    styles.pickerText,
                    val === seconds && styles.pickerSelected,
                  ]}
                >
                  {val.toString().padStart(2, '0')}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Countdown display */}
        <Text style={styles.timerDisplay}>{formatTime(remaining)}</Text>

        {/* Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.button, running && styles.buttonDisabled]}
            onPress={() => setRunning(true)}
            disabled={running || remaining === 0}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !running && styles.buttonDisabled]}
            onPress={() => setRunning(false)}
            disabled={!running}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

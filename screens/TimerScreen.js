import React, { useState, useEffect, useRef } from 'react';
import {View,Text,TouchableOpacity,SafeAreaView,ScrollView,Vibration,} from 'react-native';
import styles from '../styles/TimerStyles';

export default function TimerScreen() {
  const [mode, setMode] = useState('countdown'); // NEW
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(60);
  const [elapsed, setElapsed] = useState(0);     // NEW stopwatch value
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  const minuteValues = Array.from({ length: 61 }, (_, i) => i);
  const secondValues = Array.from({ length: 60 }, (_, i) => i);
  const ITEM_HEIGHT = 50;

  /* -------------------- Mode-dependent Timer Logic --------------------- */

  // When countdown values change, update remaining time
  useEffect(() => {
    if (mode === 'countdown') {
      setRemaining(minutes * 60 + seconds);
    }
  }, [minutes, seconds, mode]);

  // Timer interval
  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      if (mode === 'countdown') {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            Vibration.vibrate([500, 500, 500]);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setElapsed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  /* -------------------------- Helpers --------------------------- */

  const formatTime = (total) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setRunning(false);
    if (mode === 'countdown') {
      setRemaining(minutes * 60 + seconds);
    } else {
      setElapsed(0);
    }
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

  /* ---------------------------- UI ----------------------------- */

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ----- Only show pickers in countdown mode ----- */}
        {mode === 'countdown' && (
          <>
            <View style={styles.labelRow}>
              <Text style={[styles.labelText, { paddingRight: 50 }]}>Min</Text>
              <Text style={[styles.labelText, { paddingLeft: 50 }]}>Sec</Text>
            </View>

            <View style={styles.pickerRow}>
              <ScrollView
                ref={minuteScrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) => onScrollEnd(e, 'min')}
                contentContainerStyle={{
                  paddingVertical: (150 - ITEM_HEIGHT) / 2,
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

              <ScrollView
                ref={secondScrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) => onScrollEnd(e, 'sec')}
                contentContainerStyle={{
                  paddingVertical: (150 - ITEM_HEIGHT) / 2,
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
          </>
        )}

        {/* Time Display */}
        <Text style={styles.timerDisplay}>
          {mode === 'countdown'
            ? formatTime(remaining)
            : formatTime(elapsed)}
        </Text>

        {/* Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.button, running && styles.buttonDisabled]}
            onPress={() => setRunning(true)}
            disabled={running}
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

        {/* MODE TOGGLE BUTTON */}
        <TouchableOpacity
          style={styles.modeButton}
          onPress={() =>
            setMode((m) => (m === 'countdown' ? 'stopwatch' : 'countdown'))
          }
        >
          <Text style={styles.modeButtonText}>
            {mode === 'countdown' ? 'Switch to Stopwatch' : 'Switch to Countdown'}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

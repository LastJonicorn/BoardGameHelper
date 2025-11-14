// styles/DiceRollerStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#131313',
  },

  container: {
    flex: 1,
    flexDirection: 'row', // Left & right layout
    backgroundColor: '#171717',
  },

  sidebar: {
    width: 100,
    backgroundColor: '#3a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    overflow: 'visible', // allow shadows
  },

  diceWrapper: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    overflow: 'visible',
  },

  diceContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },

  diceImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  diceLabel: {
    position: 'absolute',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },

  diceLabelSelected: {
    color: '#fff',
  },

selectedDiceGlow: {
  shadowColor: '#ffffff',        // visible blue glow
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.9,
  shadowRadius: 20,
  elevation: 12,                 // Android support
  transform: [{ scale: 1.25 }],
},

  mainArea: {
    flex: 1,
    justifyContent: 'space-between', // ensures button sits at bottom naturally
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 0, // SafeAreaView handles real bottom inset
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },

  resultCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  resultContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  resultDiceImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  resultInsideText: {
    position: 'absolute',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  d4LabelAdjustment: {
    top: 25, // move text slightly down in the selector dice
  },

  d4ResultAdjustment: {
    top: 50, // move result text down in the main result dice
  },

  // 🎲 Roll button safely anchored above nav bar
  bottomButtonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50, // keeps spacing above gesture/navigation bar
  },

  rollButton: {
    backgroundColor: '#676767',
    paddingVertical: 14,
    paddingHorizontal: 50,
    marginBottom: 10,
    borderRadius: 25,
    shadowColor: '#d8c5ad',      // stronger inner shadow color
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#6b390a',       // subtle outer highlight
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',           // ensures inner pseudo-lines stay inside
    position: 'relative',
  },

  rollButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  historyContainer: {
    position: 'absolute',
    bottom: 10,
    left: 5,
    padding: 8,
    paddingBottom: 30,
  },

  historyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },

  historyItem: {
    fontSize: 14,
    color: '#fff',
  },

  multiDiceContainer: {
    flexDirection: 'column', // stack vertically
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  
  diceCountControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },

countButton: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: '#676767',
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#d8c5ad',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.5,
  shadowRadius: 6,
  elevation: 8,
  borderWidth: 2,
  borderColor: '#6b390a',
  position: 'relative',
},

countButtonText: {
  color: '#fff',
  fontSize: 28,
  fontWeight: 'bold',
  textShadowColor: 'rgba(0,0,0,0.2)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 1.5,
},

  diceCountText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  totalText: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#fff',
  marginTop: 15,
  textAlign: 'center',
},


});

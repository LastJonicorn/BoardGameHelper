import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    width: 70,
    height: 60,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  colon: {
    fontSize: 32,
    marginHorizontal: 10,
  },
  timerDisplay: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    backgroundColor: '#5e5e5e',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#f1d64e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  labelRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 5,
},
labelText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#fff',
  width: 100,
  textAlign: 'center',
},
timeRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
},
timeInput: {
  width: 100,
  height: 60,
  borderWidth: 2,
  borderColor: '#ffffff',
  borderRadius: 10,
  textAlign: 'center',
  fontSize: 32,
  fontWeight: 'bold',
  color: '#ffffff',
},

pickerRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
  height: 150, // visible area (3 numbers visible at a time)
},
picker: {
  width: 100,
  height: 150,
},
pickerItem: {
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
},
pickerText: {
  fontSize: 26,
  color: '#aaa',
},
pickerSelected: {
  fontSize: 36,
  color: '#fdffd4',
  fontWeight: 'bold',
},
colon: {
  fontSize: 36,
  marginHorizontal: 15,
  color: '#ffffff',
  fontWeight: 'bold',
},


});

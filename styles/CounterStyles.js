import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0e0e0e',
  },
  counterGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-evenly',
    paddingHorizontal: 6,
    paddingBottom: 8,
  },
  counterBox: {
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  nameInput: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    borderBottomWidth: 1,
    width: '80%',
    marginBottom: 6,
  },
  valueText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#7e7e7e32',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 8,
    padding: 1,
    zIndex: 10,
  },

  removeIcon: {
    fontSize: 20,
    color: '#ff3b30', // iOS-style red
    fontWeight: 'bold',
  },
  addTile: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTileText: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'bold',
  },
});

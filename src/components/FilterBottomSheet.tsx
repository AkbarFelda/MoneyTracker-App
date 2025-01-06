import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';

// Mengambil dimensi layar
const { width, height } = Dimensions.get('window');

interface FilterBottomSheetProps {
  isVisible: boolean;
  onFilterChange: (newFilter: 'all' | 'income' | 'expense') => void;
  onClose: () => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ isVisible, onFilterChange, onClose }) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>Filter Transactions</Text>
          <TouchableOpacity onPress={() => onFilterChange('all')} style={styles.optionButton}>
            <Text style={styles.optionText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFilterChange('income')} style={styles.optionButton}>
            <Text style={styles.optionText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFilterChange('expense')} style={styles.optionButton}>
            <Text style={styles.optionText}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    width: '100%',
    backgroundColor: '#fff',
    padding: width * 0.05, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: width * 0.05, 
    fontWeight: 'bold',
    marginBottom: height * 0.02, 
  },

  optionButton: {
    marginVertical: height * 0.01,
    paddingVertical: height * 0.015, 
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },

  optionText: {
    fontSize: width * 0.045, 
    color: '#333',
  },
  closeButton: {
    marginTop: height * 0.02, 
    alignItems: 'center',
    paddingVertical: height * 0.015, 
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  closeText: {
    fontSize: width * 0.045, 
    color: '#333',
    fontWeight: 'bold',
  },
});

export default FilterBottomSheet;

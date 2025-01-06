import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

// Mendapatkan dimensi layar
const { width, height } = Dimensions.get('window');

const AddTransaction = ({ navigation }: any) => {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date] = useState(new Date());

  const saveTransaction = async () => {
    if (!title || !amount) {
      Alert.alert('Error', 'Title and amount are required');
      return;
    }

    try {
      const newTransaction = {
        id: Date.now().toString(), // Unique ID menggunakan waktu saat ini
        type,
        title,
        description,
        amount: parseFloat(amount),
        date: date.toISOString(),
      };

      const storedTransactions = await AsyncStorage.getItem('@transactions');
      const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

      transactions.push(newTransaction);
      await AsyncStorage.setItem('@transactions', JSON.stringify(transactions));

      Alert.alert('Success', 'Transaction saved successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={width * 0.06} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Transaction</Text>
      </View>

      {/* Pilih Tipe Transaksi */}
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'income' && styles.selectedType]}
          onPress={() => setType('income')}
        >
          <Text style={type === 'income' ? styles.selectedTypeText : styles.typeText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'expense' && styles.selectedType]}
          onPress={() => setType('expense')}
        >
          <Text style={type === 'expense' ? styles.selectedTypeText : styles.typeText}>Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Input Form */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description (optional)"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity style={styles.datePicker}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveTransaction}>
        <Text style={styles.saveButtonText}>Save Transaction</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, 
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.02, 
  },
  typeButton: {
    padding: height * 0.015, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.02, 
    marginHorizontal: width * 0.02, 
    width: width * 0.4, 
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  typeText: {
    fontSize: width * 0.04, 
    color: '#333',
  },
  selectedTypeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: height * 0.03, 
  },
  label: {
    fontSize: width * 0.04, 
    marginBottom: height * 0.01, 
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.02, 
    padding: height * 0.015, 
    marginBottom: height * 0.02, 
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.02, 
    padding: height * 0.015,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: height * 0.02, 
    borderRadius: width * 0.02, 
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: width * 0.045, 
    fontWeight: 'bold',
  },
});

export default AddTransaction;

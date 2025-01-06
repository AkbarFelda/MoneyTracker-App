import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionCard from '../components/TransactionCard'; // Pastikan sesuai struktur foldermu
import FilterBottomSheet from '../components/FilterBottomSheet'; // Import komponen FilterBottomSheet

const { width, height } = Dimensions.get('window');

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  title: string;
  description: string;
  amount: string;
  time: string;
  color: string;
}

const TransactionPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem('@transactions');
        if (storedTransactions !== null) {
          const parsedTransactions: Transaction[] = JSON.parse(storedTransactions);
          setTransactions(parsedTransactions);
          setFilteredTransactions(parsedTransactions);
        }
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(transaction => transaction.type === filter));
    }
  }, [filter, transactions]);

  const handleFilterChange = (newFilter: 'all' | 'income' | 'expense') => {
    setFilter(newFilter);
    setIsBottomSheetVisible(false);
  };

  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const deleteTransaction = (id: string) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
              setTransactions(updatedTransactions);
              await AsyncStorage.setItem('@transactions', JSON.stringify(updatedTransactions));
              Alert.alert('Success', 'Transaction deleted successfully');
            } catch (error) {
              console.error('Failed to delete transaction:', error);
              Alert.alert('Error', 'Failed to delete transaction');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction</Text>
        <TouchableOpacity onPress={openBottomSheet}>
          <Icon name="filter-outline" size={width * 0.06} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {filteredTransactions.length === 0 ? (
          <Text style={styles.emptyText}>No transactions available</Text>
        ) : (
          filteredTransactions.map(transaction => (
            <TransactionCard
              key={transaction.id}
              type={transaction.type}
              title={transaction.title}
              description={transaction.description}
              amount={transaction.amount}
              time={transaction.time}
              color={transaction.color}
              onLongPress={() => deleteTransaction(transaction.id)}
            />
          ))
        )}
      </ScrollView>
      <FilterBottomSheet
        isVisible={isBottomSheetVisible}
        onFilterChange={handleFilterChange}
        onClose={closeBottomSheet}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: height * 0.02,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
  },
  scrollView: {
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: width * 0.045,
    color: '#6c6c6c',
    marginTop: height * 0.02,
  },
});

export default TransactionPage;

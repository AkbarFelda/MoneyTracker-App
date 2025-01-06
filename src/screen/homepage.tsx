import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { userImage } from '../../assets';
import IncomeExpensesCard from '../components/IncomeExpensesCard';
import IncomeExpensesChart from '../components/IncomeExpensesChart';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import tipe navigasi
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Ganti dengan path yang sesuai

const { width, height } = Dimensions.get('window'); // Mendapatkan dimensi layar

// Tipe navigasi untuk HomePage
type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const HomePage = () => {
  const navigation = useNavigation<HomePageNavigationProp>();
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);

  const getTransactions = async () => {
    try {
      const transactions = await AsyncStorage.getItem('@transactions');
      if (transactions !== null) {
        const parsedTransactions = JSON.parse(transactions);

        let totalIncome = 0;
        let totalExpense = 0;

        parsedTransactions.forEach((transaction: any) => {
          if (transaction.type === 'income') {
            totalIncome += transaction.amount;
          } else if (transaction.type === 'expense') {
            totalExpense += transaction.amount;
          }
        });

        setIncome(totalIncome);
        setExpense(totalExpense);
      }
    } catch (e) {
      console.error('Error fetching transactions:', e);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={userImage} style={styles.profileImage}/>
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddTransaction')}>
          <Icon name="add" size={width * 0.07} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceAmount}>${income - expense}</Text>
      </View>

      <View style={styles.cardsContainer}>
        <IncomeExpensesCard type="Income" amount={income.toString()} color="green" />
        <IncomeExpensesCard type="Expense" amount={expense.toString()} color="red" />
      </View>

      <IncomeExpensesChart />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: width * 0.04, // Padding dinamis berdasarkan lebar layar
    marginTop: height * 0.01, // Margin dinamis berdasarkan tinggi layar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.03, // Padding vertikal dinamis
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: width * 0.045, 
    fontWeight: 'bold',
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.001, 
  },
  balanceLabel: {
    fontSize: width * 0.04, 
    fontWeight: 'normal',
  },
  balanceAmount: {
    fontSize: width * 0.08, 
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: height * 0.01, 
  },
});

export default HomePage;

import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mendapatkan ukuran layar
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const IncomeExpensesChart = () => {
  const [chartData, setChartData] = useState<any>(null);  // State untuk data chart

  // Fungsi untuk mengambil data transaksi dari AsyncStorage dan mengolahnya
  const getTransactions = async () => {
    try {
      const transactions = await AsyncStorage.getItem('@transactions');
      console.log('Transactions from AsyncStorage:', transactions); // Log data transaksi
      if (transactions !== null) {
        const parsedTransactions = JSON.parse(transactions);
        console.log('Parsed Transactions:', parsedTransactions); // Log data setelah parsing
  
        // Mengelompokkan data berdasarkan bulan
        const monthlyData: { [key: string]: { income: number, expense: number } } = {};
  
        parsedTransactions.forEach((transaction: any) => {
          const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
          if (!monthlyData[month]) {
            monthlyData[month] = { income: 0, expense: 0 };
          }
  
          // Mengkategorikan income dan expense
          if (transaction.type === 'income') {
            monthlyData[month].income += transaction.amount;
          } else if (transaction.type === 'expense') {
            monthlyData[month].expense += transaction.amount;
          }
        });
  
        console.log('Monthly Data:', monthlyData); // Log data setelah pengelompokan
  
        // Membuat data untuk chart berdasarkan bulan yang ada
        const months = Object.keys(monthlyData);
        const incomeData = months.map(month => monthlyData[month].income);
        const expenseData = months.map(month => monthlyData[month].expense);
  
        console.log('Income Data:', incomeData); // Log data income
        console.log('Expense Data:', expenseData); // Log data expense
  
        setChartData({
          labels: months,  // Label bulan
          datasets: [
            {
              data: incomeData,  // Data pemasukan
              color: () => 'green',  // Warna grafik income
              strokeWidth: 2,
            },
            {
              data: expenseData,  // Data pengeluaran
              color: () => 'red',  // Warna grafik expense
              strokeWidth: 2,
            },
          ],
        });
      }
    } catch (e) {
      console.error('Error fetching transactions:', e);
    }
  };
  

  useEffect(() => {
    // Panggil fungsi untuk mengambil dan mengolah data transaksi ketika komponen pertama kali dimuat
    getTransactions();
  }, []);

  if (!chartData) {
    // Menampilkan loading sebelum data chart tersedia
    return <View>
      <Text>Loading chart data...</Text>
      </View>;
  }

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <LineChart
          data={chartData}
          width={screenWidth * 1.1}  // Lebar chart
          height={screenHeight * 0.7}  // Tinggi chart
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default IncomeExpensesChart;

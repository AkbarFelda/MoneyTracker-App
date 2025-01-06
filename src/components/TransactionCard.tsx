import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment'; // Pastikan sudah menginstal moment

// Mengambil dimensi layar
const { width, height } = Dimensions.get('window');

interface TransactionCardProps {
  type: 'income' | 'expense'; // Tipe transaksi
  title: string;
  description: string;
  amount: string;
  time: string;
  color: string;
  onLongPress: () => void; // Tambahkan prop onLongPress
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  description,
  amount,
  time,
  title,
  color,
  onLongPress,
}) => {
  // Menentukan ikon berdasarkan tipe transaksi
  const iconName = type === 'income' ? 'arrow-up-circle' : 'arrow-down-circle';
  const iconColor = type === 'income' ? 'green' : 'red';
  const amountStyle = type === 'income' ? styles.income : styles.expense;

  // Menggunakan Moment.js untuk format tanggal
  const formattedTime = moment(time).format('DD MMM YYYY'); // Format: 06 Jan 2025

  return (
    <TouchableOpacity onLongPress={onLongPress} activeOpacity={0.8}>
      <View style={styles.card}>
        {/* Ikon */}
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon name={iconName} size={width * 0.08} color={iconColor} />
        </View>

        {/* Detail */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* Jumlah dan Waktu */}
        <View style={styles.amountContainer}>
          <Text style={amountStyle}>{`$${amount}`}</Text>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: width * 0.04, 
    marginVertical: height * 0.01, 
    backgroundColor: '#fff',
    borderRadius: width * 0.02, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: width * 0.1, 
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: width * 0.03, 
  },
  title: {
    fontSize: width * 0.045, 
    fontWeight: 'bold',
  },
  description: {
    fontSize: width * 0.04, 
    color: '#6c6c6c',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  income: {
    fontSize: width * 0.045, 
    fontWeight: 'bold',
    color: 'green',
  },
  expense: {
    fontSize: width * 0.045, 
    fontWeight: 'bold',
    color: 'red',
  },
  time: {
    fontSize: width * 0.035, 
    color: '#6c6c6c',
  },
});

export default TransactionCard;

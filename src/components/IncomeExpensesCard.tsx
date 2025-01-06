import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  type: 'Income' | 'Expense';
  amount: String;
  color: string;
}

// Mendapatkan dimensi layar
const { width, height } = Dimensions.get('window');

const IncomeExpensesCard: React.FC<Props> = ({ type, amount, color }) => {
  const iconName = type === 'Income' ? 'arrow-down-circle-outline' : 'arrow-up-circle-outline';

  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={width * 0.08} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.typeText}>{type}</Text>
        <Text style={styles.amountText}>${amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.04, 
    borderRadius: width * 0.05, 
    width: width * 0.4, 
    justifyContent: 'space-between',
    margin: width * 0.02, 
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: width * 0.03, 
    borderRadius: (width * 0.1) / 2, 
  },
  textContainer: {
    marginLeft: width * 0.02, 
  },
  typeText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
  },
  amountText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default IncomeExpensesCard;

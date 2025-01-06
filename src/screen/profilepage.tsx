import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { userImage } from '../../assets';

const { width, height } = Dimensions.get('window');

const ProfilePage = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // navigation.navigate('');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={userImage} style={styles.profileImage} />
        <Text style={styles.userName}>Nesya Aksara</Text>
        <Text style={styles.userEmail}>nesya@gmail.com</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Icon name="person-outline" size={width * 0.06} color="#333" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Icon name="settings-outline" size={width * 0.06} color="#333" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Icon name="lock-closed-outline" size={width * 0.06} color="#333" />
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Icon name="log-out-outline" size={width * 0.06} color="#333" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: width * 0.05,
  },
  header: {
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    marginBottom: height * 0.01,
  },
  userName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: height * 0.01,
  },
  userEmail: {
    fontSize: width * 0.04,
    color: '#6c6c6c',
    marginTop: height * 0.005,
  },
  optionsContainer: {
    marginTop: height * 0.03,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: width * 0.045,
    marginLeft: width * 0.05,
    color: '#333',
  },
});

export default ProfilePage;

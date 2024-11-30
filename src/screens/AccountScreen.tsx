import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ChevronRight, User } from 'lucide-react-native';

const AccountScreen: React.FC = () => {
  const handlePress = (option: string) => {
    Alert.alert(option, `Bạn đã chọn: ${option}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={[styles.option, styles.topOption]} onPress={() => handlePress('Thông tin cá nhân')}>
          <View style={styles.optionContent}>
            
            <Text style={styles.optionText}>Thông tin cá nhân</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Email và số điện thoại')}>
          <View style={styles.optionContent}>
            
            <Text style={styles.optionText}>Email và số điện thoại</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Liên kết mạng xã hội')}>
          <View style={styles.optionContent}>
            
            <Text style={styles.optionText}>Liên kết mạng xã hội</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Quản lý thiết bị')}>
          <View style={styles.optionContent}>
            
            <Text style={styles.optionText}>Quản lý thiết bị</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, styles.bottomOption]} onPress={() => handlePress('Xóa tài khoản')}>
          <View style={styles.optionContent}>
            
            <Text style={styles.optionText}>Xóa tài khoản</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff9f3' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffaa00', marginBottom: 20 },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    paddingHorizontal: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  topOption: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomOption: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 0,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default AccountScreen;

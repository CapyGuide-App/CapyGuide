import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User, Lock, MapPin, Bell, Info, Trash2 } from 'lucide-react-native';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={navigateToProfile}>
        <TouchableOpacity style={styles.avatarContainer} onPress={navigateToProfile}>
          <View style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.username}>loilon504</Text>
        <TouchableOpacity onPress={navigateToProfile} style={styles.xem}>
          <Text style={styles.viewText}>Xem</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cài Đặt Tài Khoản</Text>
        <View style={styles.itemContainer}>
          <User size={20} color="#555" />
          <Text style={styles.itemText}>Hình đại diện</Text>
        </View>
        <View style={styles.itemContainer}>
          <Lock size={20} color="#555" />
          <Text style={styles.itemText}>Mật khẩu</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cài Đặt Ứng Dụng</Text>
        <View style={styles.itemContainer}>
          <MapPin size={20} color="#555" />
          <Text style={styles.itemText}>Đổi vị trí</Text>
        </View>
        <View style={styles.itemContainer}>
          <Bell size={20} color="#555" />
          <Text style={styles.itemText}>Cài đặt thông báo</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hỗ trợ</Text>
        <View style={styles.itemContainer}>
          <Info size={20} color="#555" />
          <Text style={styles.itemText}>Về CopyGuide</Text>
        </View>
        <View style={styles.itemContainer}>
          <Trash2 size={20} color="#555" />
          <Text style={styles.itemText}>Xóa tài khoản</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logout}>
        <Text style={styles.logoutText} numberOfLines={1}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: -20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    height: 150,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  xem: {
    padding: 10,
    borderRadius: '5%',
    backgroundColor: '#f2f2f2',
    flex: 1,
    width: 100,
  },
  viewText: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#555',
    flex: 1,
    width: 'auto',
  },
  logout: {
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
    width: 'auto',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});

export default SettingsScreen;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User, Lock, MapPin, Bell, Info, Trash2 } from 'lucide-react-native';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const navigateToAvatar = () => {
    navigation.navigate('AvatarSettingScreen')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={navigateToProfile}>
        <TouchableOpacity style={styles.avatarContainer} onPress={navigateToProfile}>
          <View style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.username}>loilon504</Text>
        <TouchableOpacity onPress={navigateToProfile}>
          <Text style={styles.viewText}>Xem</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cài Đặt Tài Khoản</Text>
        <View style={styles.itemContainer}>
          <User size={24} color="#555" />
          <TouchableOpacity
            style={styles.option}
            onPress={navigateToAvatar}
            activeOpacity={0.6} // Hiệu ứng nhấn
          >
           <Text style={styles.itemText}>Hình đại diện</Text>
         </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <Lock size={24} color="#555" />
          <Text style={styles.itemText}>Mật khẩu</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cài Đặt Ứng Dụng</Text>
        <View style={styles.itemContainer}>
          <MapPin size={24} color="#555" />
          <Text style={styles.itemText}>Đổi vị trí</Text>
        </View>
        <View style={styles.itemContainer}>
          <Bell size={24} color="#555" />
          <Text style={styles.itemText}>Cài đặt thông báo</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hỗ trợ</Text>
        <View style={styles.itemContainer}>
          <Info size={24} color="#555" />
          <Text style={styles.itemText}>Về CopyGuide</Text>
        </View>
        <View style={styles.itemContainer}>
          <Trash2 size={24} color="#555" />
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
  },
  viewText: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
    width: 70,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#555',
    flex: 1,
    width: 'auto',
  },
  logout: {
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    width: 200,
  },
  option: {
    backgroundColor: '#f9f9f9',
  },
});

export default SettingsScreen;

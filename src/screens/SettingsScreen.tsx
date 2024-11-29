import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  User, Bell, Eye, Lock, Headphones, Info, ChevronRight,
  LogOut,
  LucideEdit3,
} from 'lucide-react-native';
import avatar from '../assets/avatar.jpg';
import { useAuth } from '../context/AuthContext';

type SettingsScreenNavigationProp = {
  navigate: (
    screen: 'ProfileScreen' | 'AvatarSettingScreen' | 'ChangePasswordScreen' | 'LoginScreen',
  ) => void;
};

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { logout } = useAuth();

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const navigateToAvatar = () => {
    navigation.navigate('AvatarSettingScreen');
  };
  
  const navigateToPassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };
  
  const logOutNavigate = () => {
    logout();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Hiển Nguyễn</Text>
            <Text style={styles.profileHandle}>@kaitonmh</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={navigateToAvatar}>
            <View style={styles.editButtonContent}>
              <LucideEdit3 size={16} color="#000" />
              <Text style={styles.editText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>230</Text>
            <Text style={styles.statLabel}>READS</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>100</Text>
            <Text style={styles.statLabel}>SAVED</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>200</Text>
            <Text style={styles.statLabel}>SHARE</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>

        <TouchableOpacity
          style={styles.itemContainer}>
          <User size={24} color="#ffaa00" />
          <Text style={styles.itemText}>Tài khoản</Text>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContainer}>
          <Bell size={24} color="#ffaa00" />
          <Text style={styles.itemText}>Thông báo</Text>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

<TouchableOpacity style={styles.itemContainer}>
  <Eye size={24} color="#ffaa00" />
  <Text style={styles.itemText}>Appearance</Text>
  <ChevronRight size={24} color="#ffaa00" />
</TouchableOpacity>

<TouchableOpacity style={styles.itemContainer}>
  <Lock size={24} color="#ffaa00" />
  <Text style={styles.itemText}>Bảo mật</Text>
  <ChevronRight size={24} color="#ffaa00" />
</TouchableOpacity>

        <TouchableOpacity style={styles.itemContainer}>
          <Headphones size={24} color="#ffaa00" />
          <Text style={styles.itemText}>Trợ giúp</Text>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContainer}>
          <Info size={24} color="#ffaa00" />
          <Text style={styles.itemText}>Về CapyGuide</Text>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logout} onPress={logOutNavigate}>
        <LogOut size={24} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f3',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: '#fff9e6',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0c17d',
    marginRight: 15,
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  profileHandle: {
    fontSize: 14,
    color: '#888',
  },

  editButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  editButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  editText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginLeft: 5,
  },

  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 10,
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  statLabel: {
    fontSize: 12,
    color: '#888',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffaa00',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffaa00',
    padding: 15,
    borderRadius: 10,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SettingsScreen;

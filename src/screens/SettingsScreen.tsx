import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  User,
  Bell,
  Eye,
  Lock,
  Headphones,
  Info,
  ChevronRight,
  LogOut,
  LucideEdit3,
} from 'lucide-react-native';
import {useAuth} from '../context/AuthContext';
import { fetchProfile } from '../request/DataRequest';

type SettingsScreenNavigationProp = {
  navigate: (
    screen:
      | 'ProfileScreen'
      | 'ProfileSettingScreen'
      | 'ChangePasswordScreen'
      | 'LoginScreen'
      | 'AccountScreen'
      | 'NotificationsScreen'
      | 'AppearanceScreen'
      | 'SecurityScreen'
      | 'HelpScreen'
      | 'AboutScreen',
  ) => void;
};

const SettingsScreen: React.FC = () => {
  const {currentUser} = useAuth();

  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const {logout} = useAuth();

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const navigateToAvatar = () => {
    navigation.navigate('ProfileSettingScreen');
  };

  const navigateToAccountScreen = () => {
    navigation.navigate('AccountScreen');
  }

  const navigateToNotificationsScreen = () => {
    navigation.navigate('NotificationsScreen');
  }

  const navigateToAppearanceScreen = () => {
    navigation.navigate('AppearanceScreen');
  }

  const navigateToSecurityScreen = () => {
    navigation.navigate('SecurityScreen');
  }

  const navigateToHelpScreen = () => {
    navigation.navigate('HelpScreen');
  }

  const navigateToAboutScreen = () => {
    navigation.navigate('AboutScreen');
  }

  const logOutNavigate = () => {
    logout();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={{uri: currentUser?.avatar}}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{currentUser?.displayname}</Text>
            <Text style={styles.profileHandle}>@{currentUser?.username}</Text>
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
        <Pressable style={styles.profileStats} onPress={navigateToProfile}>
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
        </Pressable>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, styles.topOption]}
          onPress={navigateToAccountScreen}>
          <View style={styles.optionContent}>
            <User size={24} color="#ffaa00" />
            <Text style={styles.optionText}>Tài khoản</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={navigateToNotificationsScreen}>
          <View style={styles.optionContent}>
            <Bell size={24} color="#ffaa00" />
            <Text style={styles.optionText}>Thông báo</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={navigateToAppearanceScreen}>
          <View style={styles.optionContent}>
            <Eye size={24} color="#ffaa00" />
            <Text style={styles.optionText}>Appearance</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={navigateToSecurityScreen}>
          <View style={styles.optionContent}>
            <Lock size={24} color="#ffaa00" />
            <Text style={styles.optionText}>Bảo mật</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={navigateToHelpScreen}>
          <View style={styles.optionContent}>
            <Headphones size={24} color="#ffaa00" />
            <Text style={styles.optionText}>Trợ giúp</Text>
          </View>
          <ChevronRight size={24} color="#ffaa00" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.bottomOption]}
          onPress={navigateToAboutScreen}>
          <View style={styles.optionContent}>
            <Info size={24} color="#ffaa00" />
            <Text style={styles.optionText}>Về CapyGuide</Text>
          </View>
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
    borderRadius: 10,
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
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
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
    borderBottomWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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

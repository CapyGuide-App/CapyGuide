import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useAuth } from '../context/AuthContext';
import { th } from 'date-fns/locale';

const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = dynamicStyles(theme);
  const {currentUser} = useAuth();
  return (
    <View style={styles.container}>

      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{uri: currentUser?.avatar}}
        />
        <Text style={styles.username}>{currentUser?.displayname}</Text>
      </View>

      <View style={styles.tabs}>
        <Text style={styles.tabActive}>Hoạt động</Text>
        <Text style={styles.tab}>Sưu tập</Text>
      </View>

      <View style={styles.posts}>
        <View style={styles.post}>
          <Text style={styles.postUser}>{currentUser?.displayname}</Text>
          <Text style={styles.postTime}>5.6</Text>
          <Text style={styles.postContent}>Tuy đẹp nhưng rất đông</Text>
          <View style={styles.reactions}>
          </View>
        </View>

        <View style={styles.post}>
          <Text style={styles.postUser}>{currentUser?.displayname}</Text>
          <Text style={styles.postTime}>8.2</Text>
          <Text style={styles.postContent}>Địa điểm này khá là chilll</Text>
        </View>
      </View>
    </View>
  );
};

const dynamicStyles = (theme: any) =>StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: theme.colors.grey2,
  },
  menuButton: {
    fontSize: 18,
    color: theme.colors.grey2,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 18,
    color: theme.colors.grey2,
  },
  tabActive: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  posts: {
    marginTop: 10,
  },
  post: {
    backgroundColor: theme.colors.element,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  postUser: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.text,
  },
  postTime: {
    fontSize: 13,
    color: theme.colors.dimText,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 10,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;

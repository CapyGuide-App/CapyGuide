import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>

      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://via.placeholder.com/80' }}
        />
        <Text style={styles.username}>loilon504</Text>
      </View>

      <View style={styles.tabs}>
        <Text style={styles.tabActive}>Hoạt động</Text>
        <Text style={styles.tab}>Sưu tập</Text>
      </View>

      <View style={styles.posts}>
        <View style={styles.post}>
          <Text style={styles.postUser}>loilon504</Text>
          <Text style={styles.postTime}>5.6</Text>
          <Text style={styles.postContent}>Nội dung</Text>
          <View style={styles.reactions}>
            <Text>❤️ Thích</Text>
            <Text>💬 Thảo luận</Text>
          </View>
        </View>

        <View style={styles.post}>
          <Text style={styles.postUser}>loilon504</Text>
          <Text style={styles.postTime}>8.2</Text>
          <Text style={styles.postContent}>Nội dung</Text>
          <View style={styles.reactions}>
            <Text>❤️ Thích</Text>
            <Text>💬 Thảo luận</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#555',
  },
  menuButton: {
    fontSize: 18,
    color: '#555',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: '#aaa',
  },
  tabActive: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  posts: {
    marginTop: 10,
  },
  post: {
    backgroundColor: '#fff',
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postTime: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
  },
  postContent: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;

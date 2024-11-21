import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';

const DetailScreen: React.FC = ({route, navigation}) => {
  const {item} = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>⭐</Text>
        </TouchableOpacity>
      </View> */}

      <Image source={{uri: item.image}} style={styles.mainImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statItem}>157 bình luận</Text>
          <Text style={styles.statItem}>421 hình ảnh</Text>
          <Text style={styles.statItem}>502 lưu lại</Text>
          <Text style={styles.rating}>8.7</Text>
        </View>

        <Text style={styles.sectionTitle}>Thông tin về địa điểm</Text>
        <Text style={styles.infoItem}>Vị trí cụ thể</Text>
        <Text style={styles.infoItem}>4.9 km (từ vị trí hiện tại)</Text>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.sectionTitle}>157 bình luận</Text>
        <View style={styles.reactionsRow}>
          <Text style={styles.reactionItem}>Tuyệt vời</Text>
          <Text style={styles.reactionItem}>Khá tốt</Text>
          <Text style={styles.reactionItem}>Trung bình</Text>
          <Text style={styles.reactionItem}>Kém</Text>
        </View>

        <View style={styles.comment}>
          <Text style={styles.username}>@vanphuongcute</Text>
          <Text style={styles.userRating}>8.9</Text>
          <Text style={styles.commentText}>Nội dung</Text>
          <View style={styles.actionRow}>
            <Text style={styles.action}>❤️ Thích</Text>
            <Text style={styles.action}>💬 Thảo luận</Text>
          </View>
        </View>

        <View style={styles.comment}>
          <Text style={styles.username}>@mhiennoob</Text>
          <Text style={styles.userRating}>4.2</Text>
          <Text style={styles.commentText}>Nội dung</Text>
          <View style={styles.actionRow}>
            <Text style={styles.action}>❤️ Thích</Text>
            <Text style={styles.action}>💬 Thảo luận</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconButton: {padding: 5},
  icon: {fontSize: 24},
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  commentsSection: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  reactionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  reactionItem: {
    fontSize: 14,
    color: '#333',
  },
  comment: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  userRating: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  action: {
    fontSize: 14,
    color: '#007bff',
  },
});

export default DetailScreen;

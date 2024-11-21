import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Heart, MessageCircle, Smile, Meh, Frown, SmilePlus  } from "lucide-react-native";

const renderComment = (username: string, userRating: string, commentText: string) => {
  return (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.userRating}>{userRating}</Text>
      </View>

      <Text style={styles.commentText}>{commentText}</Text>

      <View style={styles.commentActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={16} color="#333" />
          <Text style={styles.actionText}>Thích</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={16} color="#333" />
          <Text style={styles.actionText}>Thảo luận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const comments = [
  {username: '@vanphuongcute', userRating: '8.9', commentText: 'Chơi rất vui'},
  {username: '@mhiennoob', userRating: '4.2', commentText: 'Phục vụ hơi kém'},
];

const reactions = [
  { id: "great", label: "Tuyệt vời", icon: <SmilePlus color="#333" size={24} /> },
  { id: "good", label: "Khá tốt", icon: <Smile color="#333" size={24} /> },
  { id: "average", label: "Trung bình", icon: <Meh color="#333" size={24} /> },
  { id: "poor", label: "Kém", icon: <Frown color="#333" size={24} /> },
];

const DetailScreen: React.FC = ({route, navigation}) => {
  const {item} = route.params;
  const [selectedReaction, setSelectedReaction] = React.useState<string | null>(null);

  return (
    <ScrollView style={styles.container}>

      <Image source={{uri: item.image}} style={styles.mainImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItemContainer}>
            <Text style={styles.statNumber}>157</Text>
            <Text style={styles.statLabel}>bình luận</Text>
          </View>
          <View style={styles.statItemContainer}>
            <Text style={styles.statNumber}>421</Text>
            <Text style={styles.statLabel}>hình ảnh</Text>
          </View>
          <View style={styles.statItemContainer}>
            <Text style={styles.statNumber}>502</Text>
            <Text style={styles.statLabel}>lưu lại</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>8.7</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Thông tin về địa điểm</Text>
        <Text style={styles.infoItem}>Vị trí cụ thể</Text>
        <Text style={styles.infoItem}>4.9 km (từ vị trí hiện tại)</Text>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.sectionTitle}>157 bình luận</Text>
        <View style={styles.reactionsRow}>
          {reactions.map((reaction) => (
            <TouchableOpacity
              key={reaction.id}
              style={[
                styles.reactionItem,
                selectedReaction === reaction.id && styles.selectedReaction,
              ]}
              onPress={() => setSelectedReaction(reaction.id)}
            >
              {reaction.icon}
              <Text style={styles.reactionText}>{reaction.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {comments.map((comment, index) => (
          <View key={index}>
            {renderComment(
              comment.username,
              comment.userRating,
              comment.commentText,
            )}
          </View>
        ))}
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
    marginVertical: 15,
  },
  statItemContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    minWidth: 50,
    textAlign: 'center',
  },
  ratingContainer: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    borderWidth: 4,
    borderColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ratingText: {
    fontSize: 24,
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  reactionItem: {
    alignItems: "center",
    padding: 10,
  },
  reactionText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    minWidth: 70,
    textAlign: "center",
  },
  selectedReaction: {
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
    padding: 10,
  },
  comment: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatarPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    flex: 1, // Đẩy rating sang bên phải
  },
  userRating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4caf50",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  commentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 5,
    marginTop: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
});

export default DetailScreen;

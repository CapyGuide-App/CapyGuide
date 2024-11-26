import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Smile, Meh, Frown, SmilePlus, MessageSquare, LucideImage, Bookmark} from 'lucide-react-native';
import renderComment from '../components/renderComment';

const comments = [
  {username: '@vanphuongcute', userRating: '8.9', commentText: 'Chơi rất vui'},
  {username: '@mhiennoob', userRating: '8.2', commentText: 'Phục vụ hơi kém'},
];

const reactions = [
  {id: 'great', label: 'Tuyệt vời', icon: <SmilePlus color="#333" size={24} />},
  {id: 'good', label: 'Khá tốt', icon: <Smile color="#333" size={24} />},
  {id: 'average', label: 'Trung bình', icon: <Meh color="#333" size={24} />},
  {id: 'poor', label: 'Kém', icon: <Frown color="#333" size={24} />},
];

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type DetailScreenRouteProp = RouteProp<{Detail: {item: any}}, 'Detail'>;
type DetailScreenNavigationProp = StackNavigationProp<
  {Detail: {item: any}},
  'Detail'
>;

type Props = {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
};

const DetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {item} = route.params;
  const [selectedReaction, setSelectedReaction] = React.useState<string | null>(
    null,
  );

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: item.properties.picture}} style={styles.mainImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.properties.name}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItemContainer}>
            <MessageSquare color="#4caf50" size={20} />
            <Text style={styles.statNumber}>157</Text>
            <Text style={styles.statLabel}>bình luận</Text>
          </View>
          <View style={styles.statItemContainer}>
            <LucideImage color="#4caf50" size={20} />
            <Text style={styles.statNumber}>421</Text>
            <Text style={styles.statLabel}>hình ảnh</Text>
          </View>
          <View style={styles.statItemContainer}>
            <Bookmark color="#4caf50" size={20} />
            <Text style={styles.statNumber}>502</Text>
            <Text style={styles.statLabel}>lưu lại</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              {item.properties.avg_rating.toFixed(1)}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Thông tin về địa điểm</Text>
        <Text style={styles.infoItem}>Địa chỉ: {item.properties.address}</Text>
        <Text style={styles.infoItem}>Quận: {item.properties.district}</Text>
        <Text style={styles.infoItem}>Loại hình: {item.properties.type}</Text>
        <Text style={styles.infoItem}>
          {item.properties.distance.toFixed(1)} km (từ vị trí hiện tại)
        </Text>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.sectionTitle}>157 bình luận</Text>
        <View style={styles.reactionsRow}>
          {reactions.map(reaction => (
            <TouchableOpacity
              key={reaction.id}
              style={[
                styles.reactionItem,
                selectedReaction === reaction.id && styles.selectedReaction,
              ]}
              onPress={() => setSelectedReaction(reaction.id)}>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  reactionItem: {
    alignItems: 'center',
    padding: 10,
  },
  reactionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    minWidth: 70,
    textAlign: 'center',
  },
  selectedReaction: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 10,
  },
});

export default DetailScreen;

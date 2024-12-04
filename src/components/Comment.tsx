import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Heart, MessageCircle  } from "lucide-react-native";
import { fetchReviewsOfPOI, reloadData } from '../request/DataRequest';
import ErrorContent from './ErrorContent';
import { useTheme } from '@rneui/themed';
import { FlashList } from '@shopify/flash-list';

interface CommentItemProps {
  item: {
    displayname: string;
    avg_rating: number;
    comment: string;
    avatar: string;
    created_on: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [shouldExpand, setShouldExpand] = React.useState(false);
  const date = Intl.DateTimeFormat('vi-VN', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(item.created_on));

  return (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <View style={styles.avatarPlaceholder}>
          <Image source={{ uri: item.avatar }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>{item.displayname}</Text>
          <Text style={{ fontSize: 12, color: "#8e8e8e" }}>{date}</Text>
        </View>
        <Text style={styles.userRating}>{item.avg_rating.toFixed(1)}</Text>
      </View>

      <Text style={styles.commentText} numberOfLines={expanded ? 0 : 3}
        onTextLayout={(event) => {
          if (event.nativeEvent.lines.length > 3) {
            setShouldExpand(true);
          }
        }}
      >
        {item.comment}
      </Text>

      {shouldExpand && 
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ marginTop: -5 }}>
        <Text style={{ color: "#8e8e8e" }}>{expanded ? "Thu gọn" : "Xem thêm"}</Text>
      </TouchableOpacity>}

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

interface CommentProps {
  poiId: string;
  data?: any[];
}

const Comment: React.FC<CommentProps> = ({ poiId, data }) => {
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');
  const [comments, setComments] = React.useState<any[]>(data || []);
  const {theme} = useTheme();

  const reloadComments = (poiId: any, saveData: any, setStatus: any, controller: AbortController) => {
    const request = fetchReviewsOfPOI(poiId, controller.signal);
    reloadData(request, saveData, setStatus);
  };

  React.useEffect(() => {
    const controller = new AbortController();
    if (data) {
      setComments(data);
      setStatus('success');
    } else {
      reloadComments(poiId, setComments, setStatus, controller);
    }

    return () => {
      controller.abort();
    }
  }, [poiId, data]);

  return (
    <View style={styles.commentsSection}>
      <Text style={styles.sectionTitle}>157 bình luận</Text>

      {status === 'loading' && <ActivityIndicator size="large" color={theme.colors.primary} />}
      {status === 'error' && <ErrorContent onRetry={reloadComments} />}
      {status === 'success' && 
        <FlashList
          data={comments}
          renderItem={({ item }) => <CommentItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          removeClippedSubviews={true}
          onEndReachedThreshold={0.2}
          estimatedItemSize={200}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  commentsSection: {
    padding: 15,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
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
    flex: 1,
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
    justifyContent: "space-around",
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
    width: 100,
  },});

  export default Comment;
  export { CommentItem };
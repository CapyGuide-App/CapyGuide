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
import { fetchReviewsOfPOI } from '../request/DataRequest';
import ErrorContent from './ErrorContent';
import { useTheme } from '@rneui/themed';

interface CommentItemProps {
  username: string;
  userRating: number;
  commentText: string;
  avatar: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ username, userRating, commentText, avatar }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <View style={styles.avatarPlaceholder}>
          <Image source={{ uri: avatar }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </View>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.userRating}>{userRating}</Text>
      </View>

      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.commentText} numberOfLines={expanded ? 0 : 3}>
          {commentText}
        </Text>
      </TouchableOpacity>

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
}

const Comment: React.FC<CommentProps> = ({ poiId }) => {
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');
  const [comments, setComments] = React.useState<any[]>([]);
  const {theme} = useTheme();

  const reloadComments = () => {
    setStatus('loading');
    fetchReviewsOfPOI(poiId, {page: 1, limit: 3})
      .then((response) => {
        setComments(response);
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
  };

  React.useEffect(() => {
    reloadComments();
  }, [poiId]);

  return (
    <View style={styles.commentsSection}>
      <Text style={styles.sectionTitle}>157 bình luận</Text>

      {status === 'loading' && <ActivityIndicator size="large" color={theme.colors.primary} />}
      {status === 'error' && <ErrorContent onRetry={reloadComments} />}
      {status === 'success' && comments.map((comment, index) => (
        <CommentItem
          key={index}
          username={comment.displayname}
          userRating={comment.avg_rating}
          commentText={comment.comment}
          avatar={comment.avatar}
        />
      ))}
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
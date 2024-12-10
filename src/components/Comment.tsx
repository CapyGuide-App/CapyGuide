import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Heart, MessageCircle} from 'lucide-react-native';
import {fetchReviewsOfPOI, reloadData} from '../request/DataRequest';
import ErrorContent from './ErrorContent';
import {useTheme} from '@rneui/themed';
import {FlashList} from '@shopify/flash-list';
import {th} from 'date-fns/locale';

interface CommentItemProps {
  item: {
    displayname: string;
    avg_rating: number;
    comment: string;
    avatar: string;
    created_on: string;
  };
}

const timeAgo = (dateString: any) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds} giây`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} phút`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} giờ`;
  } else if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days} ngày`;
  } else if (seconds < 2592000) {
    const weeks = Math.floor(seconds / 604800);
    return `${weeks} tuần`;
  } else if (seconds < 31536000) {
    const months = Math.floor(seconds / 2592000);
    return `${months} tháng`;
  } else {
    const years = Math.floor(seconds / 31536000);
    return `${years} năm`;
  }
};

const CommentItem: React.FC<CommentItemProps> = ({item}) => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const [isLoved, setIsLoved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shouldExpand, setShouldExpand] = useState(false);
  const date = timeAgo(item.created_on);

  return (
    <View style={styles.commentItem}>
      <View style={styles.mainComment}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.displayname}</Text>
            <Text style={styles.userRating}>{item.avg_rating.toFixed(1)}</Text>
          </View>
          <Text
            style={styles.commentText}
            numberOfLines={expanded ? undefined : 2}
            onTextLayout={event => {
              if (event.nativeEvent.lines.length > 2) {
                setShouldExpand(true);
              }
            }}>
            {item.comment}
          </Text>

          {shouldExpand && (
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.expandText}>
                {expanded ? 'Thu gọn' : 'Xem thêm'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={styles.timestamp}>{date}</Text>
          <TouchableOpacity style={styles.actionButton} onPress={() => setIsLoved(!isLoved)}>
            <Text style={[styles.actionText, isLoved && {color:  '#FF5A5F'}]}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Phản hồi</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={16} color="#FF5A5F" fill="#FF5A5F"/>
          <Text style={styles.reactionCount}>6</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface CommentProps {
  poiId: string;
  data?: any[];
}

const Comment: React.FC<CommentProps> = ({poiId, data}) => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [comments, setComments] = React.useState<any[]>(data || []);

  const reloadComments = (
    poiId: any,
    saveData: any,
    setStatus: any,
    controller: AbortController,
  ) => {
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
    };
  }, [poiId, data]);

  return (
    <View style={styles.commentsSection}>
      <Text style={styles.sectionTitle}>{comments.length} bình luận</Text>

      {status === 'loading' && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}
      {status === 'error' && (
        <ErrorContent
          onRetry={() =>
            reloadComments(poiId, setComments, setStatus, new AbortController())
          }
        />
      )}
      {status === 'success' && (
        <FlashList
          data={comments}
          renderItem={({item}) => <CommentItem item={item} />}
          keyExtractor={item => item.id.toString()}
          removeClippedSubviews={true}
          onEndReachedThreshold={0.2}
          estimatedItemSize={200}
        />
      )}
    </View>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
    commentsSection: {
      padding: 15,
      backgroundColor: theme.colors.background,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.text,
    },
    userRating: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#4caf50',
      borderRadius: 50,
      // borderWidth: 2,
      // borderColor: '#4caf50',
      // padding: 5,
    },
    commentItem: {
      marginBottom: 10,
    },
    mainComment: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 5,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    infoContainer: {
      marginLeft: 10,
      flex: 1,
      backgroundColor: theme.colors.grey5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingRight: 10,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 14,
      color: theme.colors.text,
    },
    commentText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '400',
    },
    expandText: {
      color: theme.colors.dimText,
      fontSize: 13,
      fontWeight: '500',
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingLeft: 60,
    },
    timestamp: {
      fontSize: 14,
      fontWeight: '400',
      color: theme.colors.dimText,
      minWidth: 50,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
    },
    emojiReaction: {
      fontSize: 16,
    },
    reactionCount: {
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 5,
      color: theme.colors.dimText,
    },
    actionText: {
      fontSize: 14,
      color: theme.colors.dimText,
      fontWeight: 'bold',
      marginLeft: 5,
    },
  });

export default Comment;
export {CommentItem};

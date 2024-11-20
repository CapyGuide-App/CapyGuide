import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

const reactions = [
  {type: 'like', emoji: '👍'},
  {type: 'love', emoji: '❤️'},
  {type: 'haha', emoji: '😂'},
  {type: 'wow', emoji: '😮'},
  {type: 'sad', emoji: '😢'},
  {type: 'angry', emoji: '😡'},
];

interface ReactionButtonProps {
  onReact: (reaction: string) => void;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({onReact}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const handleLongPress = () => {
    setShowReactions(true);
  };

  const handleSelectReaction = (reaction: string) => {
    setSelectedReaction(reaction);
    setShowReactions(false);
    onReact(reaction);
  };

  return (
    <View>
      {/* Nút chính */}
      <TouchableOpacity
        onPress={() => handleSelectReaction('like')}
        onLongPress={handleLongPress}
        onPressOut={() => setShowReactions(false)}
        style={styles.likeButton}>
        <Text style={styles.likeText}>
          {selectedReaction ? reactions.find(r => r.type === selectedReaction)?.emoji : '👍'}
        </Text>
      </TouchableOpacity>

      {/* Biểu tượng cảm xúc */}
      {showReactions && (
        <View style={styles.reactionsContainer}>
          {reactions.map((reaction, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectReaction(reaction.type)}
              style={styles.reaction}>
              <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  likeButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  reactionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  reaction: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  reactionEmoji: {
    fontSize: 24,
  },
});

export default ReactionButton;

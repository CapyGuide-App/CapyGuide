import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface PostReactionsProps {
  onReact: (reaction: string) => void;
}

const reactions = [
  {type: 'like', emoji: '👍'},
  {type: 'love', emoji: '❤️'},
  {type: 'haha', emoji: '😂'},
  {type: 'wow', emoji: '😮'},
  {type: 'sad', emoji: '😢'},
  {type: 'angry', emoji: '😡'},
];

const PostReactions: React.FC<PostReactionsProps> = ({onReact}) => {
  return (
    <View style={styles.reactionsContainer}>
      {reactions.map((reaction, index) => (
        <TouchableOpacity key={index} onPress={() => onReact(reaction.type)}>
          <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  reactionEmoji: {
    fontSize: 24,
  },
});

export default PostReactions;

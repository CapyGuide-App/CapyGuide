import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CameraHandler from './CameraHandler';

interface PostTaskBarProps {
  onImageSelected: (imageUri: string) => void;
}

const PostTaskBar: React.FC<PostTaskBarProps> = ({ onImageSelected }) => {
  const { handleCameraPress } = CameraHandler({ onImageSelected });

  const options = [
    { icon: '📷', action: handleCameraPress },
    { icon: '✏️', action: () => console.log('Text clicked') },
    { icon: '📃', action: () => console.log('List clicked') },
    { icon: '😊', action: () => console.log('Emoji clicked') },
    { icon: '⋯', action: () => console.log('More clicked') },
  ];

  return (
    <View style={styles.taskBar}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.taskBarButton}
          onPress={option.action}
        >
          <Text style={styles.icon}>{option.icon}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PostTaskBar;

const styles = StyleSheet.create({
  taskBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  taskBarButton: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
});

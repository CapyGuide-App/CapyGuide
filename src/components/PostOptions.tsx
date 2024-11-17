import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/AddPostStyles';

const PostOptions: React.FC = () => {
  const options = [
    { icon: '📷', label: 'Ảnh/Video' },
    { icon: '👤', label: 'Gắn thẻ người khác' },
    { icon: '😊', label: 'Cảm xúc/hoạt động' },
    { icon: '📍', label: 'Check-in' },
    { icon: '📹', label: 'Video trực tiếp' },
    { icon: '🎨', label: 'Màu nền' },
    { icon: '📸', label: 'Camera' },
  ];

  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity key={index} style={styles.postOptionRow}>
          <Text style={styles.postOptionIcon}>{option.icon}</Text>
          <Text style={styles.postOptionLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PostOptions;

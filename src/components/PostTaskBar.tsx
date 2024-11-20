import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Edit, FileText, Smile, MoreHorizontal } from 'lucide-react-native';
import CameraHandler from './CameraHandler';

interface PostTaskBarProps {
  onImageSelected: (imageUri: string) => void;
}

const PostTaskBar: React.FC<PostTaskBarProps> = ({ onImageSelected }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const options = [
    {
      icon: <Camera size={24} color="#000" />,
      action: () => setIsModalVisible(true),
    },
    { icon: <Edit size={24} color="#000" />, action: () => console.log('Text clicked') },
    { icon: <FileText size={24} color="#000" />, action: () => console.log('List clicked') },
    { icon: <Smile size={24} color="#000" />, action: () => console.log('Emoji clicked') },
    { icon: <MoreHorizontal size={24} color="#000" />, action: () => console.log('More clicked') },
  ];

  return (
    <>
      <View style={styles.taskBar}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.taskBarButton}
            onPress={option.action}
          >
            {option.icon}
          </TouchableOpacity>
        ))}
      </View>

      <CameraHandler
        isVisible={isModalVisible}
        onImageSelected={onImageSelected}
        onClose={() => setIsModalVisible(false)}
      />
    </>
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
});

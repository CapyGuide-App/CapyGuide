import React from 'react';
import {View, Text, Modal, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

interface Comment {
  id: number;
  user: string;
  content: string;
}

interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  comments: Comment[];
}

const CommentsModal: React.FC<CommentsModalProps> = ({visible, onClose, comments}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <FlatList
          data={comments}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentUser}>{item.user}</Text>
              <Text>{item.content}</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentUser: {
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommentsModal;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';
import {Slider, Icon, useTheme} from '@rneui/themed';
import StarRating from 'react-native-star-rating-widget';

type ModalCommentProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (comment: {rating: number; text: string}) => void;
};

const ModalComment: React.FC<ModalCommentProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);

  const interpolate = (start: number, end: number) => {
    let k = (rating - 0) / 100;
    return Math.ceil((1 - k) * start + k * end) % 256;
  };
  
  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  const handleSend = () => {
    if (comment.trim().length > 0) {
      onSubmit({rating, text: comment});
      onClose();
    }
  };

  useEffect(() => {
    setRating(5);
    setComment(''); 
  }, [visible]);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <ArrowLeft size={30} color={theme.colors.primary} />
            </TouchableOpacity>

            <View>
                <Text style={styles.title}>Bình luận</Text></View>

            <Text style={styles.label}>Đánh giá</Text>
            <View style={styles.sliderRow}>
              <StarRating
                rating={rating}
                onChange={setRating}
                color='#f8d12d'
              />
            </View>

            <Text style={styles.label}>Bình luận</Text>
            <TextInput
              style={styles.commentBox}
              placeholder="Nội dung bình luận ..."
              value={comment}
              onChangeText={setComment}
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSend}>
              <Text style={styles.submitText}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const dynamicStyles = (theme: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: `${theme.colors.black}CC`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: theme.colors.text,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: theme.colors.text,
  },
  input: {
    backgroundColor: theme.colors.element,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 10,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    minWidth: 35,
    textAlign: 'right',
    color: theme.colors.text,
  },
  commentBox: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
    minHeight: 100,
    color: theme.colors.text,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalComment;
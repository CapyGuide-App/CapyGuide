import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {useTheme} from '@rneui/themed';
import {th} from 'date-fns/locale';

const ChangePasswordScreen: React.FC = () => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [conNewPass, setConNewPass] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const savePass = () => {
    if (newPass !== conNewPass) {
      setIsModalVisible(true);
      return;
    }

    setIsModalVisible(true);

    setCurPass('');
    setNewPass('');
    setConNewPass('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>

      <View style={styles.groupInput}>
        <Text style={styles.label}>Mật khẩu hiện tại</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập mật khẩu hiện tại"
          secureTextEntry={true}
          onChangeText={newValue => setCurPass(newValue)}
          value={curPass}
        />
      </View>

      <View style={styles.groupInput}>
        <Text style={styles.label}>Mật khẩu mới</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập mật khẩu mới"
          secureTextEntry={true}
          onChangeText={newValue => setNewPass(newValue)}
          value={newPass}
        />
      </View>

      <View style={styles.groupInput}>
        <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập lại mật khẩu mới"
          secureTextEntry={true}
          onChangeText={newValue => setConNewPass(newValue)}
          value={conNewPass}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={savePass}>
        <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              {newPass !== conNewPass
                ? 'Mật khẩu mới không trùng khớp!'
                : 'Mật khẩu của bạn đã được cập nhật!'}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: 20,
    },
    groupInput: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    textInput: {
      backgroundColor: theme.colors.element,
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
      color: theme.colors.text,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 50,
      alignSelf: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${theme.colors.black}CC`,
    },
    modalContainer: {
      backgroundColor: theme.colors.background,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: 300,
    },
    modalText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 40,
    },
    modalButtonText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: 'bold',
    },
  });

export default ChangePasswordScreen;

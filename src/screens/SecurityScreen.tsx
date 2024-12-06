import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {ChevronLeft, ChevronRight} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@rneui/themed';

type SettingsScreenNavigationProp = {
  navigate: (screen: 'ChangePasswordScreen') => void;
  goBack: () => void;
};

const SecurityScreen: React.FC = () => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handlePress = (option: string) => {
    Alert.alert(option, `Bạn đã chọn: ${option}`);
  };

  const navigateToPassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <ChevronLeft size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Bảo mật</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, styles.topOption]}
          onPress={navigateToPassword}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Đổi mật khẩu</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handlePress('Xác thực hai yếu tố')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Xác thực hai yếu tố</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handlePress('Quyền riêng tư')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Quyền riêng tư</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handlePress('Hoạt động đăng nhập')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Hoạt động đăng nhập</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.bottomOption]}
          onPress={() => handlePress('Cài đặt khóa ứng dụng')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Cài đặt khóa ứng dụng</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
    container: {flex: 1, padding: 20, backgroundColor: theme.colors.background},
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
      width: '90%',
    },
    optionsContainer: {
      backgroundColor: theme.colors.element,
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
      paddingHorizontal: 15,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e5e5',
    },
    topOption: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    bottomOption: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomWidth: 0,
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      color: theme.colors.text,
      marginLeft: 10,
      width: '90%',
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
    },
  });

export default SecurityScreen;

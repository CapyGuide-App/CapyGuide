import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ChevronRight, Bell } from 'lucide-react-native';
import {useTheme} from '@rneui/themed';

const NotificationsScreen: React.FC = () => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const handlePress = (option: string) => {
    Alert.alert(option, `Bạn đã chọn: ${option}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông báo</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={[styles.option, styles.topOption]} onPress={() => handlePress('Thông báo ứng dụng')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Thông báo ứng dụng</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Thông báo email')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Thông báo email</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Thông báo đẩy')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Thông báo đẩy</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Lịch sử thông báo')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Lịch sử thông báo</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, styles.bottomOption]} onPress={() => handlePress('Tần suất thông báo')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Tần suất thông báo</Text>
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 20,
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
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
    },
  });

export default NotificationsScreen;

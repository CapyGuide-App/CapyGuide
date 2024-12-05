import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import {ChevronRight, Eye} from 'lucide-react-native';
import {useTheme} from '@rneui/themed';
import {useThemeContext} from '../context/ThemeContext';

const AppearanceScreen: React.FC = () => {
  const {theme} = useTheme();
  const {isDarkMode, toggleTheme} = useThemeContext();
  const handlePress = (option: string) => {
    Alert.alert(option, `Bạn đã chọn: ${option}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appearance</Text>

      <View style={styles.optionsContainer}>
      <TouchableOpacity
  style={[styles.option, styles.topOption]}
  onPress={() => handlePress('Chế độ tối (Dark Mode)')}>
  <View style={styles.optionContent}>
    <Text style={styles.optionText}>Chế độ tối (Dark Mode)</Text>
    <View style={styles.actionContainer}>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        thumbColor={isDarkMode ? theme.colors.button : theme.colors.disabled}
        trackColor={{ false: theme.colors.disabled, true: theme.colors.button }}
      />
    </View>
  </View>
</TouchableOpacity>


        <TouchableOpacity
          style={styles.option}
          onPress={() => handlePress('Cỡ chữ')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Cỡ chữ</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.button} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handlePress('Màu nền')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Màu nền</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.button} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handlePress('Phong cách hiển thị')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Phong cách hiển thị</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.button} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.bottomOption]}
          onPress={() => handlePress('Hình nền ứng dụng')}>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Hình nền ứng dụng</Text>
          </View>
          <ChevronRight size={24} color={theme.colors.button} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff9f3'},
  title: {fontSize: 24, fontWeight: 'bold', color: '#ffaa00', marginBottom: 20},
  optionsContainer: {
    backgroundColor: '#fff',
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
    color: '#333',
    marginLeft: 10,
  },actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  
});

export default AppearanceScreen;

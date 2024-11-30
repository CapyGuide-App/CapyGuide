import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Về CapyGuide</Text>
      <Text style={styles.content}>
        CapyGuide là ứng dụng hướng dẫn người dùng với giao diện thân thiện, giúp bạn ???
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phiên bản ứng dụng</Text>
        <Text style={styles.sectionContent}>1.2.3 (Build 45)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nhà phát triển</Text>
        <Text style={styles.sectionContent}>
          CapyTech Solutions Co., Ltd.
          {'\n'}Địa chỉ: Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội
          {'\n'}Email: support@capyguide.com
          {'\n'}Số điện thoại: +84 123 456 789
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ghi chú phát hành</Text>
        <Text style={styles.sectionContent}>
          - Cải thiện hiệu suất ứng dụng{'\n'}
          - Sửa lỗi đăng nhập ở phiên bản trước{'\n'}
          - Bổ sung tính năng chế độ tối
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Điều khoản và chính sách</Text>
        <Text style={styles.sectionContent}>
          Để biết thêm thông tin về điều khoản sử dụng và chính sách bảo mật, vui lòng truy cập website của chúng tôi tại{' '}
          <Text style={styles.link}>https://capyguide.com</Text>.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff9f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffaa00',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'justify',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffaa00',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});

export default AboutScreen;

import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useAuth} from '../context/AuthContext';
import {Tab, useTheme} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeft} from 'lucide-react-native';

const ProfileScreen: React.FC = () => {
  const {currentUser} = useAuth();
  const [indexTab, setIndexTab] = React.useState(0);
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <ChevronLeft size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: currentUser?.avatar}} />
        <Text style={styles.displayname}>{currentUser?.displayname}</Text>
        <Text style={styles.username}>@{currentUser?.username}</Text>
      </View>

      <Tab
        value={indexTab}
        onChange={setIndexTab}
        indicatorStyle={{backgroundColor: theme.colors.primary}}
        titleStyle={{
          fontSize: 15,
          fontWeight: 'bold',
          color: theme.colors.primary,
        }}
        dense>
        <Tab.Item title="Hoạt động" />
        <Tab.Item title="Đã lưu" />
        <Tab.Item title="Bộ sưu tập" />
      </Tab>
    </View>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    backButton: {
      fontSize: 18,
      color: theme.colors.grey2,
    },
    menuButton: {
      fontSize: 18,
      color: theme.colors.grey2,
    },
    displayname: {
      width: '100%',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    username: {
      width: '100%',
      fontSize: 15,
      color: '#aaa',
      textAlign: 'center',
    },
    avatarContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 10,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    tab: {
      fontSize: 18,
      color: theme.colors.grey2,
    },
    tabActive: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: 'bold',
    },
    posts: {
      marginTop: 10,
    },
    post: {
      backgroundColor: theme.colors.element,
      borderRadius: 8,
      padding: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
      elevation: 1,
    },
    postUser: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 5,
      color: theme.colors.text,
    },
    postTime: {
      fontSize: 13,
      color: theme.colors.dimText,
      marginBottom: 10,
    },
    postContent: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 10,
    },
    reactions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default ProfileScreen;

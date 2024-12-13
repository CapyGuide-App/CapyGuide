import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Tab, TabView, useTheme } from '@rneui/themed';
import { fetchProfile } from '../request/DataRequest';
import { FlashList } from '@shopify/flash-list';
import Video from 'react-native-video';

interface ProfileScreenProps {
  navigation: any;
  route: {
    params: {
      user: {
        id: string;
        avatar: string;
        displayname: string;
        username: string;
      };
    };
  };
}
import {ChevronLeft} from 'lucide-react-native';

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation, route}) => {
  const {user} = route.params;
  const [data, setData] = React.useState();
  const [indexTab, setIndexTab] = React.useState(0);
  const [gallery, setGallery] = React.useState([]);
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);

  useEffect(() => {
    fetchProfile(user.id).then((data) => {
      setData(data);
    });
  }, []);
  
  useEffect(() => {
    if (data) {
      console.log(data);
      setGallery(data.collection);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <ChevronLeft size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: user?.avatar}} />
        <Text style={styles.displayname}>{user?.displayname}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
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

      <TabView value={indexTab}>
        <TabView.Item>
          <Text>Tab 1</Text>
        </TabView.Item>

        <TabView.Item>
          <Text>Tab 2</Text>
        </TabView.Item>
        <TabView.Item style={{padding: 20, flex: 1, overflow: 'hidden'}}>
          <FlashList
            numColumns={3}
            horizontal={false}
            data={gallery}
            renderItem={({item}) => (
              item.type === 'image' ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Gallery', {gallery})}
                >
                  <Image
                    source={{uri: item.uri}}
                    style={{width: '100%', aspectRatio: 1}}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Gallery', {gallery})}
                >
                  <Video
                    source={{uri: item.uri}}
                    style={{width: '100%', aspectRatio: 1}}
                    resizeMode="cover"
                    paused={true}
                  />
                </TouchableOpacity>
              )
            )}
            keyExtractor={(item) => item.id}
            estimatedItemSize={120}
          />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
    color: theme.colors.text,
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

import {SearchBar, useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from '@rneui/base';
import {useTranslation} from 'react-i18next';
import i18n, {changeLanguage} from '../i18n/i18n';
import Post from '../components/Post';

const hexToRGBA = (hex: string, opacity: number) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const HomeScreen: React.FC = ({}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Post mẫu
  const [posts, setPosts] = useState([
    {
      author: 'Mẫn Thị Bích Lợi',
      avatar:
        'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/271731848_1860371254351185_7983418418645333699_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHmgBV7HKmnmIFs7EB4DBicagPguRLKezpqA-C5Esp7OkSzJxGwFE6YoEwlgCHTsAw-vNfX8L76wFCjzYUhrGQb&_nc_ohc=hvjEMDS_a60Q7kNvgEhsf0N&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=APpC2E-sJATzePD5qgENbWw&oh=00_AYCF1IkIf04Tubsg9TVECaFOoXXArJvt1-4xk2XZAvUgFQ&oe=673F93A9',
      title: 'Món Phở Hà Nội',
      description: 'Một tô phở Hà Nội đậm đà, thơm ngon.',
      images: [
        'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/2/25/1151545/Pho-Thin-13-Lo-Duc.jpeg',
        'https://bizweb.dktcdn.net/thumb/1024x1024/100/479/802/products/z5194061623055-ede48447ded9e0c2110fd134381c1f6d.jpg?v=1708933772720',
        'https://thanhnien.mediacdn.vn/uploaded/hoangnam/2019_08_19/f011_MXTR.jpg?width=500',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/cd/52/02/menu-ph-thin-qu-n-1-ph.jpg?w=1100&h=-1&s=1',
        'https://hotel84.com/hotel84-images/news/img1/pho-thin-day-du.jpg',
      ],
    },
    {
      author: 'Nguyễn Văn Phương',
      avatar:
        'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/427978829_948230886648969_5695521880172434301_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHq6LdezTZmmcxdg-dbWkLnQDjAuSPeXkRAOMC5I95eRPpf82l2BnJlks8xgQgjICxSe_GALMb5KYrgOo3flxJw&_nc_ohc=vF-hHUi9DqQQ7kNvgG2G-BZ&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AHGmMVZ-JQtTLrc9Taiuue8&oh=00_AYCANXNHTSEaWf1ixa_TmJgDNV4_UcnggsHqII0rBksuHg&oe=67413D9A',
      title: 'Bánh Mì Sài Gòn',
      description: 'Bánh mì giòn tan, đầy đủ topping hấp dẫn.',
      images: [
        'https://static.vinwonders.com/production/banh-mi-sai-gon-2.jpg',
        'https://mms.img.susercontent.com/vn-11134513-7r98o-lsv8k31xzphgf6@resize_ss1242x600!@crop_w1242_h600_cT',
      ],
    },
    {
      author: 'Mẫn Thị Bích Lợi',
      avatar:
        'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/271731848_1860371254351185_7983418418645333699_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHmgBV7HKmnmIFs7EB4DBicagPguRLKezpqA-C5Esp7OkSzJxGwFE6YoEwlgCHTsAw-vNfX8L76wFCjzYUhrGQb&_nc_ohc=hvjEMDS_a60Q7kNvgEhsf0N&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=APpC2E-sJATzePD5qgENbWw&oh=00_AYCF1IkIf04Tubsg9TVECaFOoXXArJvt1-4xk2XZAvUgFQ&oe=673F93A9',
      title: 'Cơm Tấm Sườn Bì Chả',
      description: 'Món cơm tấm ngon tuyệt với sườn nướng thơm lừng.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/C%C6%A1m_T%E1%BA%A5m%2C_Da_Nang%2C_Vietnam.jpg/1200px-C%C6%A1m_T%E1%BA%A5m%2C_Da_Nang%2C_Vietnam.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYbc5sxnNQfo8RB3Tp6XxFUovD0zlQFzIYvA&s',
        'https://product.hstatic.net/200000523823/product/com_tam_suon_bi_1e02dda4630a4d9fa3db1ea70f65a4dd.jpg',
      ],
    },
    {
      author: 'Nguyễn Văn Sáng',
      avatar:
        'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/449787039_1326404601650302_4425883548731143589_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEhJ1VBy760-t7HT3Pte_FetuCquAHcb-y24Kq4Adxv7IZxWcPmFRroBHcEW7pCZEtjaQ-YaZG7IxR4hT57dj5w&_nc_ohc=GxkkgSvm2fwQ7kNvgEa6FXn&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=A1ca-hbxT7G52pwLwCaor-7&oh=00_AYAAckwtY8fNBVx4PuWueFfHES_ZzXTlDsXpqOTG_7paJg&oe=6741450B',
      title: 'Chè 3 Màu',
      description: 'Món chè ngọt mát với đủ loại màu sắc.',
      images: [
        'https://cheori.vn/wp-content/uploads/2022/08/Che-buoi-hat-sen-scaled.jpg',
      ],
    },
    {
      author: 'Phạm Xuân Trung',
      avatar:
        'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/452151788_1247840283037837_1106463935465432367_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG91TuiqL_OoFHo4yadoYF8WRiY3K14Lt5ZGJjcrXgu3iXbQH3DSo9JUsZdkBQ_YcYezJxagi4VeuHkuxsaYped&_nc_ohc=3nn2Eg0eLHkQ7kNvgERN9Da&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=APo6NkAdhluhzG72tWN1sE-&oh=00_AYAajj8AJO9hR_OVzb9IjO2guWuTsnwADRUz26Msxc4ZjQ&oe=6741465E',
      title: 'Bún Chả',
      description: 'Bún chả Hà Nội với hương vị đậm đà truyền thống.',
      images: [
        'https://example.com/buncha1.jpg',
        'https://example.com/buncha2.jpg',
        'https://example.com/buncha3.jpg',
        'https://example.com/buncha4.jpg',
        'https://example.com/buncha5.jpg',
      ],
    },
    {
      author: 'Nguyễn Minh Hiển',
      avatar:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/460522419_2117933608600516_9220295292444476206_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEHwAF1qGbsFbUMGX7zskDP8uDMMiTQdvHy4MwyJNB28eQZE11ijZvWKZa1DcSmOYdZpgSo-wEzV0q_aepliI9V&_nc_ohc=UR6Dxy5rl84Q7kNvgGOQp8V&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=ACLbYq06F2s_7iBe030hECx&oh=00_AYDHcHW8PMYe396hXLopVLuAAzU1gSnQklPKiMCo5_pmJQ&oe=67415DB0',
      title: 'Gỏi Cuốn Tôm Thịt',
      description: 'Món gỏi cuốn tươi ngon, chấm cùng nước mắm chua ngọt.',
      images: [
        'https://example.com/goicuon1.jpg',
        'https://example.com/goicuon2.jpg',
      ],
    },
  ]);

  const updateSearch = (search: string) => setSearch(search);

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder={t('search')}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: hexToRGBA(theme.colors.primary, 0.1),
          borderColor: isFocused ? theme.colors.primary : 'transparent',
          borderWidth: 2,
          borderBottomWidth: 2,
        }}
        inputStyle={{
          color: theme.colors.primary,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        searchIcon={{color: theme.colors.primary, size: 24}}
        clearIcon={{color: theme.colors.primary, size: 24}}
        cancelIcon={{color: theme.colors.primary, size: 24}}
        round
        lightTheme
        onChangeText={updateSearch}
        value={search}
        placeholderTextColor={hexToRGBA(theme.colors.primary, 0.7)}
      />

      <Button
        onPress={() => changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}>
        {t('change language')}
      </Button>

      {posts.map((post, index) => (
        <Post
          author={post.author}
          avatar={post.avatar}
          key={index}
          title={post.title}
          description={post.description}
          images={post.images}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default HomeScreen;

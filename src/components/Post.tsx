import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface PostProps {
  author: string;
  avatar: string;
  title: string;
  description: string;
  images: string[];
}

const Post: React.FC<PostProps> = ({
  author,
  avatar,
  title,
  description,
  images,
}) => {
  const visibleImages = images.slice(0, 4); // Hiển thị tối đa 4 ảnh
  const remainingImagesCount = images.length > 4 ? images.length - 4 : 0;
  const renderImages = () => {
    switch (visibleImages.length) {
      case 1:
        return (
          <Image source={{uri: visibleImages[0]}} style={styles.singleImage} />
        );
      case 2:
        return (
          <View style={styles.twoImagesContainer}>
            {visibleImages.map((uri, index) => (
              <Image key={index} source={{uri: uri}} style={styles.halfImage} />
            ))}
          </View>
        );
      case 3:
        return (
          <View style={styles.threeImagesContainer}>
            <Image source={{uri: visibleImages[0]}} style={styles.fullImage} />
            <View style={styles.row}>
              {visibleImages.slice(1).map((uri, index) => (
                <Image
                  key={index}
                  source={{uri: uri}}
                  style={styles.halfImage}
                />
              ))}
            </View>
          </View>
        );
      case 4:
        return (
          <View style={styles.fourImagesContainer}>
            <View style={styles.row}>
              {visibleImages.slice(0, 2).map((uri, index) => (
                <Image
                  key={index}
                  source={{uri: uri}}
                  style={styles.halfImage}
                />
              ))}
            </View>
            <View style={styles.row}>
              {visibleImages.slice(2).map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{uri: uri}} style={styles.halfImage} />
                  {index === 1 && remainingImagesCount > 0 && (
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>
                        +{remainingImagesCount}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.postContainer}>
      <View style={styles.authorContainer}>
        <Image source={{uri: avatar}} style={styles.avatar} />
        <Text style={styles.authorName}>{author}</Text>
      </View>

      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postDescription}>{description}</Text>

      <View style={styles.imageContainer}>{renderImages()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  imageContainer: {
    marginTop: 10,
  },
  singleImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  twoImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  threeImagesContainer: {
    flexDirection: 'column',
    gap: 5,
  },
  fourImagesContainer: {
    flexDirection: 'column',
    gap: 5,
  },
  fullImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  halfImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
  },
  imageWrapper: {
    position: 'relative',
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Post;

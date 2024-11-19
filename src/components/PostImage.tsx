import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface PostImageProps {
  images: string[];
}

const PostImage: React.FC<PostImageProps> = ({images}) => {
  const visibleImages = images.slice(0, 4); // Hiển thị tối đa 4 ảnh
  const remainingImagesCount = images.length > 4 ? images.length - 4 : 0;

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
              <Image key={index} source={{uri: uri}} style={styles.halfImage} />
            ))}
          </View>
        </View>
      );
    case 4:
      return (
        <View style={styles.fourImagesContainer}>
          <View style={styles.row}>
            {visibleImages.slice(0, 2).map((uri, index) => (
              <Image key={index} source={{uri: uri}} style={styles.halfImage} />
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

const styles = StyleSheet.create({
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

export default PostImage;

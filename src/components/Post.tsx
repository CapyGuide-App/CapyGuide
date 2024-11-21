import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, MessageCircle, Heart } from "lucide-react-native";

interface PostProps {
  author: string;
  title: string;
  description: string;
  date: string;
  images: string[]; // Mảng hình ảnh, chỉ hiển thị ảnh đầu tiên
  reactionCount: number;
  commentCount: number;
  onPress: () => void;
}

const Post: React.FC<PostProps> = ({
  author,
  title,
  description,
  date,
  images,
  reactionCount,
  commentCount,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.postContainer}>
      {/* Hình ảnh bên trái */}
      {images.length > 0 && (
            <Image source={{ uri: images[0] }} style={styles.thumbnail} />
          )}

      {/* Nội dung bên phải */}
      <View style={styles.textContainer}>
        {/* Tiêu đề và Tác giả */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {author}
        </Text>

        {/* Miêu tả */}
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>

        {/* Ngày tháng và tương tác */}
        <View style={styles.infoRow}>
          <View style={styles.dateRow}>
            <Calendar size={16} color="#888" />
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.reactionRow}>
            <Heart size={16} color="#f44" />
            <Text style={styles.reactionText}>{reactionCount}</Text>
            <MessageCircle size={16} color="#555" />
            <Text style={styles.commentText}>{commentCount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  author: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginLeft: 5,
  },
  reactionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reactionText: {
    fontSize: 12,
    color: "#555",
    marginLeft: 5,
    marginRight: 10,
  },
  commentText: {
    fontSize: 12,
    color: "#555",
    marginLeft: 5,
  },
});


export default Post;

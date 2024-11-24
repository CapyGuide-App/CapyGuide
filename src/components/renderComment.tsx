import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Heart, MessageCircle  } from "lucide-react-native";

const renderComment = (username: string, userRating: string, commentText: string) => {
    return (
      <View style={styles.comment}>
        <View style={styles.commentHeader}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.userRating}>{userRating}</Text>
        </View>
  
        <Text style={styles.commentText}>{commentText}</Text>
  
        <View style={styles.commentActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={16} color="#333" />
            <Text style={styles.actionText}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={16} color="#333" />
            <Text style={styles.actionText}>Thảo luận</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    
  comment: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatarPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    flex: 1,
  },
  userRating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4caf50",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  commentActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 5,
    marginTop: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
    width: 100,
  },});

  export default renderComment;
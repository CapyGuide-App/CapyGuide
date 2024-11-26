import { darkColors } from '@rneui/base';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const ChangePasswordScreen: React.FC = () => {
    const [curPass, setCurPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [conNewPass, setConNewPass] = useState('');

    const savePass = () =>{
        // Xử lý logic lưu mật khẩu ở đây (nếu cần)
        Alert.alert("Đã lưu!", "Mật khẩu của bạn đã được cập nhật.");

        // Reset các giá trị input về rỗng
        setCurPass('');
        setNewPass('');
        setConNewPass('');
    }
    return (
        <View style = {styles.container}>
            <View style = {styles.groupInput}> 
                <Text style = {styles.text}>Mật khẩu hiện tại</Text>
                <TextInput
                style={styles.textInput}
                placeholder="Nhập mật khẩu hiện tại"
                onChangeText={newValue => setCurPass(newValue)}
                defaultValue={curPass}
                />
            </View>
            
            <View style = {styles.groupInput}>
                <Text style = {styles.text}>Mật khẩu mới</Text>
                <TextInput
                style={styles.textInput}
                placeholder="Nhập mật khẩu mới"
                onChangeText={newValue => setNewPass(newValue)}
                defaultValue={newPass}
                /> 
            </View>

            <View style = {styles.groupInput}>
                <Text style = {styles.text}>Xác nhận mật khẩu mới</Text>
                <TextInput
                style={styles.textInput}
                placeholder="Nhập lại mật khẩu mới"
                onChangeText={newValue => setConNewPass(newValue)}
                defaultValue={conNewPass}
                /> 
             </View>

             <TouchableOpacity style={styles.save} onPress={savePass}>
                <Text style={styles.saveText} numberOfLines={1}>Lưu</Text>
            </TouchableOpacity>
                
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
    textInput: {
        height: 40,
        borderWidth: 1, 
        padding: 7, 
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        borderTopRightRadius: 5, 
        fontSize: 15, 

    }, 

    groupInput: {
        padding: 0, 
        margin: 10, 
    }, 

    text: {
        fontSize: 20, 
        color: "rgb(60, 60, 60)", 
        margin: 3, 
    }, 
    save: {
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    
  },
  saveText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    width: 150,
  }
}) 

export default ChangePasswordScreen;
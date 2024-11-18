import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickOptionRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  quickOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    minWidth: '40%',
  },
  quickOptionText: {
    fontSize: 14,
    color: '#000',
  },
  textInput: {
    padding: 15,
    fontSize: 18,
    textAlignVertical: 'top',
    color: '#000',
    minHeight: 150,
  },
  headerButton: {
    marginRight: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  postOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  postOptionIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  postOptionLabel: {
    fontSize: 16,
    color: '#000',
    minWidth: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  visibilityOptionItem: {
    padding: 15,
    width: '200%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  visibilityOptionText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageScroll: {
    flexDirection: 'column',
    alignContent: 'center',
  },
  imagePreview: {
    width: '90%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default styles;

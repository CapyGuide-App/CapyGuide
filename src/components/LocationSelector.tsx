import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface LocationSelectorProps {
  onLocationSelected: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationSelected }) => {
  const [location, setLocation] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const selectLocation = (newLocation: string) => {
    setLocation(newLocation);
    onLocationSelected(newLocation);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => setModalVisible(true)}
      >
        <MapPin color="#007BFF" size={18} />
        <Text style={styles.locationText}>
          {location ? ` ${location}` : ' Add location'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a location</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => selectLocation('New York, USA')}
            >
              <Text>New York, USA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => selectLocation('Los Angeles, USA')}
            >
              <Text>Los Angeles, USA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => selectLocation('Paris, France')}
            >
              <Text>Paris, France</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    color: '#007BFF',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LocationSelector;

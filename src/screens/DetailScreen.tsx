import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Smile,
  Meh,
  Frown,
  SmilePlus,
  MessageSquare,
  LucideImage,
  Bookmark,
  ArrowLeft,
  MapPin,
  Map,
  Utensils,
  Heart,
  MessageCircle,
  Share2,
  Navigation2,
  HotelIcon,
  BlocksIcon,
} from 'lucide-react-native';
import Comment, { CommentItem } from '../components/Comment';
import {MapView, Camera, MarkerView} from '@rnmapbox/maps';
import PlacePin from '../assets/place-pin.png';
import FoodPin from '../assets/food-pin.png';
import Share from 'react-native-share';

const reactions = [
  {id: 'great', label: 'Tuyệt vời', icon: <SmilePlus color="#333" size={24} />},
  {id: 'good', label: 'Khá tốt', icon: <Smile color="#333" size={24} />},
  {id: 'average', label: 'Trung bình', icon: <Meh color="#333" size={24} />},
  {id: 'poor', label: 'Kém', icon: <Frown color="#333" size={24} />},
];

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { googleMapRoute } from '../request/GoogleMapRequest';
import { fetchPOI, reloadData } from '../request/DataRequest';

type DetailScreenRouteProp = RouteProp<{Detail: {poiID: string; initItem: any}}, 'Detail'>;
type DetailScreenNavigationProp = StackNavigationProp<any, 'Detail'>;

type Props = {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
};

const DetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {poiID, initItem} = route.params;
  const [item, setItem] = useState<any>({});
  const [selectedReaction, setSelectedReaction] = React.useState<string | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const markerIcon = item.type === 'travel' ? PlacePin : FoodPin;
    
  const reload = (poiID: string, setItem: any, controller: AbortController) => {
    const request = fetchPOI(poiID, controller.signal);
    reloadData(request, setItem);
  };

  useEffect(() => {
    const controller = new AbortController();
    reload(poiID, setItem, controller);
    return () => {
      controller.abort();
    };
  }, [poiID]);

  const handleShare = async ({title, url}: {title: string; url?: string}) => {
    try {
      await Share.open({
        title: 'Share Post',
        message: `Check out this post: ${title}`,
        url: url || '',
      });
    } catch (error) {
      console.log('Share Error: ', error);
    }
  };

  if (!item) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Pressable onPress={openModal}>
          <Image
            source={{uri: initItem.picture}}
            style={styles.mainImage}
          />
        </Pressable>
  
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{initItem.name}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItemContainer}>
              <MessageSquare color="#4caf50" size={20} />
              <Text style={styles.statNumber}>157</Text>
              <Text style={styles.statLabel}>bình luận</Text>
            </View>
            <View style={styles.statItemContainer}>
              <LucideImage color="#4caf50" size={20} />
              <Text style={styles.statNumber}>421</Text>
              <Text style={styles.statLabel}>hình ảnh</Text>
            </View>
            <View style={styles.statItemContainer}>
              <Bookmark color="#4caf50" size={20} />
              <Text style={styles.statNumber}>502</Text>
              <Text style={styles.statLabel}>lưu lại</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                {initItem.avg_rating?.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
  
        <View style={styles.sectionContainer}>
          <View style={styles.row}>
            <View style={{flex: 1}} >
              <Text style={styles.sectionTitle}>Thông tin về địa điểm</Text>
              <View style={styles.row}>
                <MapPin size={20} color="#000" style={styles.icon2} />
                <Text style={styles.text}>
                  {initItem.address}
                </Text>
              </View>
      
              <View style={styles.row}>
                <Map size={20} color="#4CAF50" style={styles.icon2} />
                <Text style={styles.text}>
                  <Text style={styles.distance}>
                    {initItem.distance?.toFixed(2)}
                  </Text>
                  {' (From current location)'}
                </Text>
              </View>
      
              <View style={styles.row}>
                {initItem.type === 'place' ? 
                  (<BlocksIcon size={20} color="#000" style={styles.icon2} />) : 
                  (<Utensils size={20} color="#000" style={styles.icon2} />)
                }
                <Text style={styles.text}>Loại hình: {initItem.type === 'place' ? 'Địa điểm' : 'Ẩm thực'}</Text>
              </View>
            </View>
            <TouchableOpacity style={{borderRadius: 50, backgroundColor: '#1b6ff4', padding: 8, 
              alignContent: 'center', justifyContent: 'center', alignItems: 'center',
              transform: [{rotate: '45deg'}]
            }}
              onPress={() => googleMapRoute(item)}
            >
              <Navigation2 size={20} color="white" fill="white" />
            </TouchableOpacity>
          </View>
  
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              styleURL="mapbox://styles/mapbox/streets-v11"
              localizeLabels={{locale: 'current'}}
              logoEnabled={false}
              attributionEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              compassEnabled={false}
              scaleBarEnabled={false}
            >
            {initItem.longitude && initItem.latitude && <Camera
              centerCoordinate={[initItem.longitude, initItem.latitude]}
              zoomLevel={15}
              animationDuration={0}
            />}
            <MarkerView
              coordinate={[initItem.longitude, initItem.latitude]}>
              <Image source={markerIcon} style={styles.markerIcon} />
            </MarkerView>
            </MapView>
          </View>
        </View>
  
        <View style={styles.reactionsRow}>
          {reactions.map(reaction => (
            <TouchableOpacity
              key={reaction.id}
              style={[
                styles.reactionItem,
                selectedReaction === reaction.id && styles.selectedReaction,
              ]}
              onPress={() => setSelectedReaction(reaction.id)}>
              {reaction.icon}
              <Text style={styles.reactionText}>{reaction.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
  
      <Comment poiId={item.id} data={item.reviews} />
      </ScrollView>
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setLoved(!loved)}>
            <Heart
              size={24}
              color={loved ? '#ff5050' : '#333'}
              fill={loved ? '#ff5050' : 'none'}
            />
            <Text
              style={[styles.actionText, {color: loved ? '#ff5050' : '#333'}]}>
              Love
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color="#333" />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setSaved(!saved)}>
            <Bookmark size={24} color="#333" fill={saved ? '#333' : 'white'} />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleShare({title: item.name, url: item.url})}>
            <Share2 size={24} color="#333" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeModal} onPress={closeModal}>
                <ArrowLeft size={40} color="#fff" />
              </TouchableOpacity>
              <View style={styles.innerContainer}>
                <Image
                  source={{uri: item.picture}}
                  style={styles.fullImage}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f7f7f7'},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconButton: {padding: 5},
  icon: {fontSize: 24},
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 0,
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  statItemContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    minWidth: 50,
    textAlign: 'center',
  },
  ratingContainer: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    borderWidth: 4,
    borderColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ratingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon2: {
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  reactionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
    backgroundColor: '#fff',
    padding: 10,
  },
  reactionItem: {
    alignItems: 'center',
    padding: 10,
  },
  reactionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    minWidth: 70,
    textAlign: 'center',
  },
  selectedReaction: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 10,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
    width: 60,
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  innerContainer: {
    width: '95%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModal: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default DetailScreen;

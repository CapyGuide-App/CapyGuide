import axios from 'axios';
import { useLocation } from '../context/LocationContext';
import { Linking, Platform } from 'react-native';

const googleMapRoute = async (target) => {
    const lat = target.latitude;
    const lng = target.longitude;
    const label = target.name;
    const scheme = Platform.OS === 'ios' ? `maps://?q=${label}&ll=${lat},${lng}` : `google.navigation:q=${lat},${lng}&mode=l`;
    
    if (scheme) {
        Linking.openURL(scheme).catch(err =>
            console.error('Error opening map: ', err),
        );
    }
};

export { googleMapRoute };

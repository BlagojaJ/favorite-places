import { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
  reverseGeocodeAsync,
} from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import OutlinedButton from '../ui/OutlinedButton';
import { Colors } from '../../constants/colors';
import Location from '../../models/location';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type LocationPickerProps = {
  onLocationPick: (location: Location) => void;
};

const LocationPicker = ({ onLocationPick }: LocationPickerProps) => {
  const [pickedLocation, setPickedLocation] = useState<Location>();

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  // Only route is sufficient to get the params
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation: Location = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await reverseGeocodeAsync({
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
        });

        onLocationPick({
          ...pickedLocation,
          address: address?.[0]?.district ?? '',
        });
      }
    }

    handleLocation();
  }, [pickedLocation, onLocationPick]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions',
        'You need to grant location permissions to use this app.'
      );

      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate('Map' as never);
  }

  let locationPreview = <Text>No location preview yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
          }}
        />
      </MapView>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});

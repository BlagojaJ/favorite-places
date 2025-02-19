import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import OutlinedButton from '../components/ui/OutlinedButton';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../util/database';
import Place from '../models/place';

const PlaceDetails = ({ route, navigation }: any) => {
  const selectedPlaceId = route.params.placeId;

  const [fetchedPlace, setFetchedPlace] = useState<Place>();

  useEffect(() => {
    async function LoadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);

      setFetchedPlace(place);

      navigation.setOptions({
        title: place.title,
      });
    }

    LoadPlaceData();
  }, [selectedPlaceId]);

  function showOnMapHandler() {
    if (fetchedPlace) {
      navigation.push('Map', {
        location: fetchedPlace.location,
      });
    }
  }

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.location.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: { justifyContent: 'center', alignItems: 'center' },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

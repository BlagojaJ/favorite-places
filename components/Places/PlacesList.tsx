import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Place from '../../models/place';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

type PlacesListProps = {
  places: Place[];
};

const PlacesList = ({ places }: PlacesListProps) => {
  const navigation = useNavigation();

  function selectPlaceHandler(id: number) {
    navigation.push('PlaceDetails', { placeId: id });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainerStyle}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});

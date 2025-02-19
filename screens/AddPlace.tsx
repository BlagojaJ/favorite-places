import { StyleSheet } from 'react-native';
import React from 'react';

import PlaceForm from '../components/Places/PlaceForm';
import { PlaceCreate } from '../models/place';
import { insertPlace } from '../util/database';

const AddPlace = ({ navigation }) => {
  async function createPlaceHandler(place: PlaceCreate) {
    await insertPlace(place);
    navigation.pop();
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;

const styles = StyleSheet.create({});

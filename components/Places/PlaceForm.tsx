import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import React, { useCallback, useState } from 'react';

import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import Location from '../../models/location';
import { PlaceCreate } from '../../models/place';

type PlaceFormProps = {
  onCreatePlace: (place: PlaceCreate) => void;
};

const PlaceForm = ({ onCreatePlace }: PlaceFormProps) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>();
  const [pickedLocation, setPickedLocation] = useState<Location>();

  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function imageTakeHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const locationPickHandler = useCallback((location: Location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    if (enteredTitle && selectedImage && pickedLocation) {
      const placeData: PlaceCreate = {
        title: enteredTitle,
        imageUri: selectedImage,
        location: pickedLocation,
      };

      onCreatePlace(placeData);
    }
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          onChangeText={changeTitleHandler}
        />
      </View>
      <ImagePicker onImageTake={imageTakeHandler} />
      <LocationPicker onLocationPick={locationPickHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: { fontWeight: 'bold', marginBottom: 4, color: Colors.primary700 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

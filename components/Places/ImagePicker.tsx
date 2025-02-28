import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

type ImagePickerProps = {
  onImageTake: (imageUri: string) => void;
};

const ImagePicker = ({ onImageTake }: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState<string>();

  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions',
        'You need to grant camera permissions to use this app.'
      );

      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      setPickedImage(imageUri);
      onImageTake(imageUri);
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    // Need to set a width and height if no require() image
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
});

import Location from './location';

export type PlaceCreate = Omit<Place, 'id'>;

class Place {
  id: number;
  title: string;
  imageUri: string;
  location: Location;

  constructor(id: number, title: string, imageUri: string, location: Location) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.location = location;
  }
}

export default Place;

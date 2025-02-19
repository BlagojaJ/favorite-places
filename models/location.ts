class Location {
  lat: number;
  lng: number;
  address: string;

  constructor(lat: number, lng: number, address: string = '') {
    this.lat = lat;
    this.lng = lng;
    this.address = address;
  }
}

export default Location;

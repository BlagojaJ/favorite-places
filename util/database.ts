import * as SQLite from 'expo-sqlite';

import Place, { PlaceCreate } from '../models/place';
import Location from '../models/location';

let database: SQLite.SQLiteDatabase;

export async function init() {
  database = await SQLite.openDatabaseAsync('places.db');

  return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
            )
    `);
}

export async function insertPlace(place: PlaceCreate) {
  const result = await database.runAsync(
    'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
    [
      place.title,
      place.imageUri,
      place.location.address,
      place.location.lat,
      place.location.lng,
    ]
  );

  console.log(result);
  return result.lastInsertRowId;
}

export const fetchPlaces = async () => {
  const result = await database.getAllAsync('SELECT * FROM places;');

  console.log(result);
  return result.map(
    (dp: any) =>
      new Place(
        dp.id,
        dp.title,
        dp.imageUri,
        new Location(dp.lat, dp.lng, dp.address)
      )
  );
};

export const fetchPlaceDetails = async (id: number) => {
  const result: any = await database.getFirstAsync(
    'SELECT * FROM places WHERE id = ?;',
    [id]
  );

  console.log(result);

  return new Place(
    result.id,
    result.title,
    result.imageUri,
    new Location(result.lat, result.lng, result.address)
  );
};

// export const deletePlace = async (id) => {
//   const db = await openDatabase();
//   const result = await db.runAsync('DELETE FROM places WHERE id = ?;', [id]);
//   console.log('Place deleted successfully', result);
//   return result.changes;
// };

// export const updatePlace = async (id, title, imageUri, address, lat, lng) => {
//   const db = await openDatabase();
//   const result = await db.runAsync(
//     'UPDATE places SET title = ?, imageUri = ?, address = ?, lat = ?, lng = ? WHERE id = ?;',
//     [title, imageUri, address, lat, lng, id]
//   );
//   console.log('Place updated successfully', result);
//   return result.changes;
// };

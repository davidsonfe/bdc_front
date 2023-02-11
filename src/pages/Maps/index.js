import React, {useState, useEffect} from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: -8.041853,
    longitude: -34.876459,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      setError('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    });
  }

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker' />
        <Circle
          center={{
            latitude: 37.785834,
            longitude: -122.406417,
          }}
          radius={200}
          strokeWidth={5}
          strokeColor="blue"
          fillColor="rgba(15, 40, 200, 0.2)"
        />
      </MapView>
      <Button title='Get Location' onPress={userLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

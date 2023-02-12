import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import * as Location from 'expo-location';
import MapView, {Marker, Circle} from 'react-native-maps';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused  } from '@react-navigation/native';

import api from "../../services/api";

export default function OutRoom () {
  const navigation = useNavigation();

  let intervalIDOutRoom = 0
  const [user,setUser]=useState("")
  const [room, setRoom]=useState("")
  const [mapRegion, setMapRegion] = useState({
    latitude: -8.041853,
    longitude: -34.876459,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });
  const [userFora,setUserFora]=useState("")
  const [alertaId,setAlertaId]=useState("")
  let alerta = {};
  let intervalIDUserLocation = {};
  let intervalIDAlertaPersistente = {};
  const isFocused = useIsFocused();

  const userLocation = async () => {
    api.get("alerta/" + alertaId).then(async (response) => {
      if (!response.data || (response.data.length < 1)) {
        let intervalId = await AsyncStorage.getItem('intervalIDUserLocation');
        clearInterval(parseInt(intervalId, 10));
        intervalId = await AsyncStorage.getItem('intervalIDAlertaPersistente');
        clearInterval(parseInt(intervalId, 10));
        navigation.navigate('StartRoom')
      } else {
        setMapRegion({
          latitude: alerta.latitude,
          longitude: alerta.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        });
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  const loadSoundAsync = async () => { 
    const soundObject = new Audio.Sound(); 
    try { 
      await soundObject.loadAsync(require('../../assents/sound/alarm.mp3')); // Play the sound file 
      soundObject.playAsync(); 
    } catch (error) { 
      console.log(error); 
    } 
  }

  const falsoAlerta = async () => { 
    api.get("alerta/deletAll" ).then(async (response) => {
      let intervalId = await AsyncStorage.getItem('intervalIDUserLocation');
      clearInterval(parseInt(intervalId, 10));
      intervalId = await AsyncStorage.getItem('intervalIDAlertaPersistente');
      clearInterval(parseInt(intervalId, 10));
      navigation.navigate('StartRoom')
    }).catch((error) => {
      console.log(error)
    });
  }

  const listarEmergencias = async () => { 
    let intervalId = await AsyncStorage.getItem('intervalIDUserLocation');
    clearInterval(parseInt(intervalId, 10));
    intervalId = await AsyncStorage.getItem('intervalIDAlertaPersistente');
    clearInterval(parseInt(intervalId, 10));
    navigation.navigate('Emergency')
  }

  const alertaPersistente = async () => { 
    loadSoundAsync();
    Vibration.vibrate(4000);
  }

  const mostrarFalsoAlerta = () => { 
    if(room && (user.id === room.usuario.id)) {
      return (
        <TouchableOpacity style={styles.buttonFalsoAlerta}
            onPress={ () => falsoAlerta() }>
          <Text style={styles.buttonText}>Falso Alerta</Text>
        </TouchableOpacity>
    )}
  }

  const getInitialData = async () => {
    const usr = await AsyncStorage.getItem('user');
    setUser(JSON.parse(usr));
    const sala = await AsyncStorage.getItem('room');
    setRoom(JSON.parse(sala));
    let intervalIDOutR = await AsyncStorage.getItem('intervalIDOutRoom');
    intervalIDOutRoom = +intervalIDOutR;
    let alr = await AsyncStorage.getItem('alertaUser');
    alerta = JSON.parse(alr);
    setUserFora(alerta.nomeUsuario);
    setAlertaId(alerta.alertaId);
    intervalIDUserLocation = setInterval( () => { userLocation() }, 1000);
    intervalIDAlertaPersistente = setInterval( () => { alertaPersistente() }, 5500);
    await AsyncStorage.setItem('intervalIDUserLocation', intervalIDUserLocation + "");
    await AsyncStorage.setItem('intervalIDAlertaPersistente', intervalIDAlertaPersistente + "");
  }

  useEffect(() => {
    if(isFocused) {
      getInitialData();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* Cabeçalho Sala - INICIO */}
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}>
          <AntDesign
            name="exclamationcircle"
            size={50}
            style={styles.iconAlert}
          />
      </Animatable.View>
      <Text style={styles.foraPerimetro}>Participante Fora do Perímetro</Text>
      {/* Cabeçalho Sala - FIM */}
      {/* Participante - INICIO */}
      <Animatable.View animation="fadeInUp" style={styles.containerParticipante} >
        <View style={styles.card}>
          <Text style={styles.cardText}>
            {/* {usuario.nome} */}
            {userFora}
          </Text>
        </View>
      </Animatable.View>
      {/* Participante - FIM */}
      <Animatable.View animation="fadeInUp" style={styles.containerMap}>
        {/* Map - INICIO */}
        <View style={styles.mapView}>
          <MapView style={styles.map} region={mapRegion}>
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
        </View>
        {/* Map - FIM */}
        {/* Botões ação - INICIO */}
        <Animatable.View animation="fadeInUp" style={styles.containerAcoes} >
          <View style={styles.main}>
            { mostrarFalsoAlerta() }
            <TouchableOpacity style={styles.buttonEmergencia}
                onPress={ () => listarEmergencias() }>
              <Text style={styles.buttonText}>Emergência</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        {/* Botões ação - FIM */}
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  containerHeader: {
    width: "100%",
    marginTop: "10%",
    marginBottom: "5%",
    paddingStart: "5%",
    flexDirection: "row",
    justifyContent: "center",
    paddingEnd: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    fontWeight: 'bold',
  },
  titleSub: {
    fontSize: 14,
  },
  rastreamento: {
    fontSize: 22,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  iconAlert: {
    color: 'red',
  },
  foraPerimetro: {
    fontSize: 18,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  card: {
    width: '80%',
    backgroundColor: '#ebebeb',
    padding: 25,
    marginTop: '2%',
    margin: '1%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
  },
  containerParticipante: {
    alignItems: 'center'
  },
  containerMap: {
    marginTop: "5%",
    alignItems: 'center',
    height: '80%',
  },
  mapView: {
    backgroundColor: 'blue',
    height: '70%',
    width:"90%",
    borderRadius: 10
  },
  containerAcoes: {
    alignItems: 'center',
  },
  button:{
    backgroundColor: '#1e90ff',
    width: '40%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  buttonText:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  main: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  buttonFalsoAlerta: {
    backgroundColor: '#1e90ff',
    width: '40%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 5
  },
  buttonEmergencia: {
    backgroundColor: '#1e90ff',
    width: '40%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginLeft: 5
  }
});
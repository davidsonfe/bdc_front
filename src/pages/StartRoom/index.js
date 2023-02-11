import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import api from "../../services/api";

export default function StartRoom () {
  const navigation = useNavigation();

  let usuario = {};
  let sala = {};
  const [location,setLocation]=useState({});
  const [user,setUser]=useState("")
  const [room, setRoom]=useState("")
  let intervalIDOutRoom = 0;
  const isFocused = useIsFocused();

  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      setError('Permission to access location was denied');
    }
    let lct = await Location.getCurrentPositionAsync({});
    setLocation(lct);
  }

  const mostrarPararSala = () => {
    if(room && (user.id === room.usuario.id)) {
      return (
        <Animatable.View animation="fadeInUp" style={styles.containerAcoes} >
          <View style={styles.main}>
          <TouchableOpacity style={styles.button}
            onPress={ () => pararSala() }>
              <Text style={styles.buttonText}>Parar Sala</Text>
          </TouchableOpacity>
            
          </View>
        </Animatable.View>
    )}
  };

  const pararSala = async () => {
    if(room) {
      room.salaIniciada = false;
      api.get("alerta/deletAll" ).then(async (response) => {
        api.put("sala/" + room.id, room).then((resp) => {
          clearInterval(intervalIDOutRoom);
          navigation.navigate('Room');
        }).catch((error) => {
          console.log(error)
        });
      }).catch((error) => {
        console.log(error)
      });
    }
  }

  const iniciarGeolocalizacao = async (sala) => {
    api.get("sala/" + sala.id).then(async (response) => {
      if(!response.data.salaIniciada) {
        let intervalId = await AsyncStorage.getItem('intervalIDOutRoom');
        clearInterval(parseInt(intervalId, 10));
        navigation.navigate('Room');
        return;
      }
      let lct = await Location.getCurrentPositionAsync({});
      setLocation(lct);
      if(lct && lct.coords) {
        let usrLoc = {
          usuario: usuario.id,
          sala: sala.id,
          latitude:lct.coords.latitude,
          longitude: lct.coords.longitude,
        }
        api.post("sala/localizacaoUsuario", usrLoc).then(async (response) => {
          if(response.data) {
            let intervalId = await AsyncStorage.getItem('intervalIDOutRoom');
            clearInterval(parseInt(intervalId, 10));
            await AsyncStorage.setItem('alertaUser', JSON.stringify(response.data));
            navigation.navigate('OutRoom')
            return;
          }
        }).catch((error) => {
          console.log(error)
        });
      }
    }).catch((error) => {
      console.log(error)
    });
  };

  const getInitialData = async () => {
    await userLocation();
    let usr = await AsyncStorage.getItem('user');
    usuario = JSON.parse(usr);
    setUser(usuario);
    let sal = await AsyncStorage.getItem('room');
    sala = JSON.parse(sal);
    setRoom(sala);
    intervalIDOutRoom = setInterval(() => {iniciarGeolocalizacao(sala)}, 10000)
    await AsyncStorage.setItem('intervalIDOutRoom', intervalIDOutRoom + "");
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
          <Text style={styles.message}>
          {room.nome}
            <Text style={styles.titleSub}> ({room.perimetro}m)</Text>
          </Text>
      </Animatable.View>
      {/* Cabeçalho Sala - FIM */}
      {/* Imagem - INICIO */}
      <Animatable.Image
        animation="flipInY"
        source={require('../../assents/traking.png')}
        style={{ width: '100%', height: '65%' }}
        resizeMode="contain"
      />
      {/* Imagem - FIM */}
      <Animatable.View animation="fadeInUp" style={styles.containerForm} >
        <Text style={styles.rastreamento}>Rastreamento Iniciado</Text>
      </Animatable.View>
      {mostrarPararSala()}
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
    marginTop: "5%",
    marginBottom: "5%",
    paddingStart: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
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
  containerAcoes: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingStart: '5%',
    paddingEnd: '5%', 
    paddingBottom: '2%',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  main: {
    width: '95%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button:{
    backgroundColor: '#1e90ff',
    width: '40%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    alignItems: 'center',
  },
  buttonText:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

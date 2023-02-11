import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import api from "../../services/api";

export default function Emergency () {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
    })();
  }, []);


  return (
    <View style={styles.container}>
      {/* Cabeçalho Sala - INICIO */}
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}>
          <Text style={styles.message}>
            Serviços de Emergência
          </Text>
      </Animatable.View>
      {/* Cabeçalho Sala - FIM */}
      {/* Imagem - INICIO */}
      <Animatable.Image
        animation="flipInY"
        source={require('../../assents/emergencia.png')}
        style={{ width: '100%', height: '80%' }}
        resizeMode="contain"
      />
      {/* Imagem - FIM */}
      <Animatable.View animation="fadeInUp" style={styles.containerAcoes} >
          <View style={styles.main}>
          <TouchableOpacity style={styles.button}
            onPress={ () => navigation.navigate('OutRoom') }>
              <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
            
          </View>
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
    marginTop: "5%",
    marginBottom: "5%",
    paddingStart: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingEnd: "5%",
  },
  message: {
    fontSize: 24,
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

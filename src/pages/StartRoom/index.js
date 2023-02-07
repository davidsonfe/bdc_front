import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../../services/api";

export default function StartRoom () {

  const [user,setUser]=useState("")

  useEffect(() => {
    (async () => {
      const usr = await AsyncStorage.getItem('user');
      setUser(JSON.parse(usr));
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
            Calourada IFPE
            <Text style={styles.titleSub}> (50m)</Text>
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
});

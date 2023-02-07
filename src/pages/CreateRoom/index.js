import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import api from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import * as Animatable from 'react-native-animatable'

export default function CreateRoom(){
  const navigation = useNavigation();

  const [nome,setNome]=useState("")
  const [perimetro,setPerimetro]=useState("")
  const [notificacaoPersistente,setNotificacaoPersistente]=useState("")
  const [user,setUser]=useState("")
  const [location,setLocation]=useState({})

  const criarSala = async () => {
    let salaCriada = {
      nome: nome,
      perimetro: perimetro,
      notificacaoPersistente: notificacaoPersistente,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      usuario: user
    }
    api.post("sala", salaCriada).then( async (response) => {
      await AsyncStorage.setItem('room', JSON.stringify(response.data));
      navigation.navigate('Room')
    }).catch((error) => {
      console.log(error)
    });
  };

  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      setError('Permission to access location was denied');
    }
    setLocation(await Location.getCurrentPositionAsync({enableHighAccuracy: true}));
  }

  useEffect(() => {
    userLocation();
    (async () => {
      const usr = await AsyncStorage.getItem('user');
      setUser(JSON.parse(usr));
    })();
  }, []);

  return (
      <View style={styles.container}>
          <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
            <Text style={styles.message}>Criar Sala</Text>
          </Animatable.View>


        <Animatable.View animation="fadeInUp" style={styles.containerForm} >

            <Text style={styles.title}>Nome da Sala</Text>
            <TextInput
              placeholder="Digite um Nome da Sala..."
              style={styles.input}
              value={nome}
              onChangeText={setNome }
            />
      
            <Text style={styles.title}>Perímetro Permitido <Text style={styles.titleSub}>(m)</Text></Text>
            <TextInput
              keyboardType='numeric'
              placeholder="Digite o Perímetro..."
              style={styles.input}
              value={perimetro}
              onChangeText={setPerimetro}
            />
            <View style={styles.checkboxContainer}>
              <CheckBox 
                style={styles.checkbox}
                value={notificacaoPersistente}
                onValueChange={setNotificacaoPersistente}
              />
              <Text style={styles.label}>Notificação insistente?</Text>
            </View>

            <TouchableOpacity style={styles.button}
              onPress={ () => criarSala() }>
                <Text style={styles.buttonText}>Criar Sala</Text>
            </TouchableOpacity>

        </Animatable.View>

      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff'
  },
  containerHeader:{
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  containerForm:{
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'

  },

  title: {
    fontSize: 20,
    marginTop: 28
  },

  input: {
    borderBottomWidth: 1,
    height: 40,
    marginTop: 12,
    fontSize: 16,
  },

  button:{
    backgroundColor: '#1e90ff',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister:{
    marginTop: 14,
    alignItems: 'center'
  },
  registerText:{
    color: '#a1a1a1'
  },
  titleSub: {
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
  checkbox: {
    alignSelf: "center",
  },

})

import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import api from "../../services/api";

import * as Animatable from 'react-native-animatable'

export default function CreateRoom(){
  const navigation = useNavigation();

  const [nome,setNome]=useState("")
  const [perimetro,setPerimetro]=useState("")
  const [notificacaoPersistente,setNotificacaoPersistente]=useState("")

  const criarSala = async () => {
    /*await api
      .post("sala", {
        nome,
        perimetro,
        notificacaoPersistente
      }).then((response) => {
        navigation.navigate('Room')
      }).catch((error) => {
        console.log(error)
      });*/
      navigation.navigate('Room')
  };

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
              onPress={ () => navigation.navigate('Room') }>
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

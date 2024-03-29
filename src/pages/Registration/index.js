import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native'
import {useState} from 'react'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';

import api from "../../services/api";

export default function Registration(){
  const navigation = useNavigation();

  React.useEffect(() => {
    api.get("usuarios").then((response) => {
    }).catch((error) => {
      console.log(error)
    });

  }, []);

  const [nome,setNome]=useState("")
  const [email,setEmail]=useState("")
  const [telefone,setTelefone]=useState("")
  const [senha,setSenha]=useState("")

  const handlerPost = async () => {
    let usuario = {
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha,
    }

    api.post("usuarios", usuario).then( async (response) => {
      navigation.navigate('SignIn')
    }).catch((error) => {
      console.log(error)
    });
  };

  return (
      <View style={styles.container}>
          <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
            <Text style={styles.message}>Cadastre-se</Text>
          </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm} >
          <ScrollView style={styles.scrollview} ke>

            <Text style={styles.title}>Nome</Text>
            <TextInput
              placeholder="Digite um Nome..."
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.title}>Email</Text>
            <TextInput
              placeholder="Digite um email..."
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />


            <Text style={styles.title}>Telefone</Text>
            <TextInput
              placeholder="Digite Seu Telefone..."
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone}
            />

            <Text style={styles.title}>Senha</Text>
            <TextInput
              placeholder="Digite sua senha..."
              style={styles.input}
              value={senha}
              secureTextEntry={true}
              onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={() => handlerPost()}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

          </ScrollView>
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
  scrollview: {
    marginBottom: 5
  }

})
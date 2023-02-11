import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import api from "../../services/api";

const schema = yup.object({
  email: yup.string().email("Email Invalido").required("Informe seu Email!"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos").required("Informe sua senha!")
})


export default function SignIn(){
  const navigation = useNavigation();
  const [email,setEmail]=useState("")
  const [senha,setSenha]=useState("")

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const logIn = async () => {
    let login = {
      email: email,
      senha: senha
    }
    await api.post("usuarios/login", login).then(async (response) => {
      if(response.data || (response.data.length > 0)) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        navigation.navigate('Home')
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
      <View style={styles.container}>
          <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
            <Text style={styles.message}>Bem-vindo(a)</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" style={styles.containerForm} >
            <Text style={styles.title}>Login</Text>

            
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Digite um email..."
                  style={styles.input}
                  onChangeText={setEmail}
                  onBlur={onBlur}
                  value={email}
                />
              )}

            />
            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Digite uma senha..."
                  secureTextEntry={true}
                  style={styles.input}
                  onChangeText={setSenha}
                  onBlur={onBlur}
                  value={senha}
                />
              )}

            />
            {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

            <TouchableOpacity style={styles.button}
            onPress={ () => logIn() }>
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.buttonRegister}
            onPress={ () => navigation.navigate('Registration') }>
              <Text style={styles.registerText}>Não possui uma conta? <Text style={styles.cadastrese}>Cadastre-se</Text></Text>
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
  labelError:{
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8,
  },
  cadastrese: {
    color: '#1e90ff',
    fontWeight: 'bold'
  }

})

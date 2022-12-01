import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable'

const Stack = createNativeStackNavigator();

export default function Home(){
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
          <Text style={styles.message}>Bem Vindo, Luiz</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm} >
          <View style={styles.main}>
            <TouchableOpacity style={styles.button}
                onPress={ () => navigation.navigate('EntryRoom') }>
              <Text style={styles.buttonText}>Entrar Sala</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={ () => navigation.navigate('CreateRoom') }>
              <Text style={styles.buttonText}>Criar Sala</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: '2%',
    marginBottom: '2%',
    paddingStart: '5%',
  },
  message:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  containerForm:{
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingStart: '5%',
    paddingEnd: '5%', 
    paddingBottom: '5%'

  },

  title: {
    fontSize: 20,
    marginTop: 28
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
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})

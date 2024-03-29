import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../../services/api";

export default function Room() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [participantes, setParticipantes] = useState([])
  const [user,setUser]=useState("")
  const [room, setRoom]=useState("")
  const isFocused = useIsFocused();

  const listarParticipantes = (sala) => {
    api.get("sala/" + sala.id).then(async (response) => {
      if(response.data.salaIniciada) {
        let idInterv = await AsyncStorage.getItem('intervalIdListarParticipantes');
        clearInterval(parseInt(idInterv, 10))
        navigation.navigate('StartRoom');
      }
      var participantesAux = [];
      response.data.participantes.forEach(participante => {
        participantesAux.push(participante);
      });
      if(participantesAux.length !== participantes.length) {
        setParticipantes(participantesAux);
      }
    }).catch((error) => {
      console.log(error)
    });
  };

  const mostrarIniciarSala = () => {
    if(room && (user.id === room.usuario.id)) {
      return (
        <Animatable.View animation="fadeInUp" style={styles.containerAcoes} >
          <View style={styles.main}>
          <TouchableOpacity style={styles.button}
            onPress={ () => iniciarSala() }>
              <Text style={styles.buttonText}>Iniciar Sala</Text>
          </TouchableOpacity>
            
          </View>
        </Animatable.View>
    )}
  };

  const iniciarSala = () => {
    api.get("sala/" + room.id).then(async (response) => {
      let sala = response.data;
      sala.salaIniciada = true;
      await AsyncStorage.setItem('room', JSON.stringify(sala));
      api.put("sala/" + room.id, sala).then(async (resp) => {
        let idInterv = await AsyncStorage.getItem('intervalIdListarParticipantes');
        clearInterval(parseInt(idInterv, 10))
        navigation.navigate('StartRoom');
      }).catch((error) => {
        console.log(error)
      });
    }).catch((error) => {
      console.log(error)
    });
    
  };

  const getInitialData = async () => {
    const usr = await AsyncStorage.getItem('user');
    setUser(JSON.parse(usr));
    const sala = await AsyncStorage.getItem('room');
    setRoom(JSON.parse(sala));
    let intervalID = setInterval( () => { listarParticipantes(JSON.parse(sala))}, 1000);
    await AsyncStorage.setItem('intervalIdListarParticipantes', intervalID + "");
  }

  useEffect(() => {
    if(isFocused) {
      getInitialData();
    }
  }, [isFocused]);
  
  return (
    <View style={styles.container}>
      {/* CABEÇALHO PAGINA - INICIO */}
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}>
          <Text style={styles.message}>
            {room.nome}
            <Text style={styles.titleSub}> ({room.perimetro}m)</Text>
          </Text>
          <TouchableOpacity>
            <AntDesign
              name="qrcode"
              size={40}
              style={styles.qrcode}
              onPress={() => setModalVisible(true)}
            />
          </TouchableOpacity>
      </Animatable.View>
      {/* CABEÇALHO PAGINA - FIM */}
      {/* Modal para mostrar QR_CODE - INICIO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}>
        <View style={styleModal.centeredView}>
          <View style={styleModal.modalView}>
          <QRCode
            value={room.id + ""}
            size={300}
          />
            <TouchableOpacity>
              <AntDesign name="closecircle" style={styleModal.closecircle} size={30} onPress={() => setModalVisible(!modalVisible)}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal para mostrar QR_CODE - FIM*/}
      {/* Lista dos Participantes - INICIO */}
      <Animatable.View animation="fadeInUp" style={styles.containerForm} >
        <Text style={styles.tituloParticipantes}>Participantes</Text>
          <FlatList
            keyExtractor = {item => item.id}
            data={participantes}
            renderItem = {item => (
              <View style={styles.card}>
                <Text style={styles.cardText}>
                  {item.item.nome}
                </Text>
              </View>)} />
      </Animatable.View>
      {/* Lista dos Participantes - FIM */}
      {/* Mostrar Localização do Usuário - INICIO*/}
      { mostrarIniciarSala() }
      {/* Mostrar Localização do Usuário - FIM*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e90ff",
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
    color: "#FFF",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: '5%',
    width: '100%'
  },

  title: {
    fontSize: 20,
    marginTop: 28,
  },

  input: {
    borderBottomWidth: 1,
    height: 40,
    marginTop: 12,
    fontSize: 16,
  },
  buttonRegister: {
    marginTop: 14,
    alignItems: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
  titleSub: {
    fontSize: 14,
  },
  qrcode: {
    color: "white",
  },
  card: {
    width: '99%',
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
  },
  tituloParticipantes: {
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  cardText: {
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

const styleModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    size: 400,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closecircle: {
    color: "#1e90ff",
    marginTop: 20,
  },
  
});

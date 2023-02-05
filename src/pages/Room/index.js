import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";

import api from "../../services/api";

export default function Room() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  var stopInterval = useNavigation();
  const [participantes, setParticipantes] = useState([])

  const listarParticipantes = function preencher() {
    api.get("sala").then((response) => {
      var participantesAux = [];
      participantesAux.push(response.data[0].usuario);
      response.data[0].participantes.forEach(participante => {
        participantesAux.push(participante);
      });
      if(participantesAux.length !== participantes.length) {
        setParticipantes(participantesAux);
      }
      console.log(participantes);
    }).catch((error) => {
      console.log(error)
    });
  };

  useEffect(() => {
    api.get("sala").then((response) => {
      stopInterval = setInterval(() => {listarParticipantes()}, 500);
    }).catch((error) => {
      console.log(error)
    });
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      clearInterval(stopInterval);
    });
    return unsubscribe;
  }, []);


  return (
    <View style={styles.container}>
      {/* CABEÇALHO PAGINA - INICIO */}
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}>
          <Text style={styles.message}>
            Calourada IFPE
            <Text style={styles.titleSub}> (50m)</Text>
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
            value="{id: 1}"
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
      <Animatable.View animation="fadeInUp">
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Maps")}
        >
          <Text style={styles.buttonText}>Loc_Usuario</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button}
          onPress={ () => navigation.navigate('OutRoom') }>
            <Text style={styles.buttonText}>Iniciar Sala</Text>
        </TouchableOpacity>
      </Animatable.View>
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

  button: {
    backgroundColor: "#1e90ff",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
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
  button: {
    position: "absolute",
    backgroundColor: "#1e90ff",
    borderRadius: 50,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
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
  buttonText: {
    fontWeight: 18,
    color: "#FFF",
    fontWeight: "bold",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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

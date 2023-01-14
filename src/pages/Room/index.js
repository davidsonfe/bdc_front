import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";

export default function Room() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
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

      {/* Modal para mostrar QR_CODE */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styleModal.centeredView}>
          <View style={styleModal.modalView}>
            <QRCode value="http://localhost?idRoom=15" size={300} />
            <TouchableOpacity>
              <AntDesign
                name="closecircle"
                style={styleModal.closecircle}
                size={30}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Animatable.View
        animation="fadeInUp"
        style={styles.containerForm}
      ></Animatable.View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Maps")}
      >
        <Text style={styles.buttonText}>Loc_Usuario</Text>
      </TouchableOpacity>
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
    paddingStart: "5%",
    paddingEnd: "5%",
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

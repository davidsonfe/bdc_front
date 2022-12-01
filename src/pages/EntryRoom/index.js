import React, {useEffect, useState} from 'react';
import {Button, Dimensions, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';

const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function EntryRoom() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (scanningResult) => {
    if (!scanned) {
      const {type, data, bounds: {origin} = {}} = scanningResult;
      const {x, y} = origin;
      if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
        setScanned(true);
        alert(`Codigo de barra escaneado: ${data}!`);
      }
    }
  };
  if (hasPermission === null) {
      return <Text>Solicitando Permissão da Câmera</Text>;
  }

  if (hasPermission === false) {
      return <Text>Sem Acesso à Câmera</Text>;
  }
  return (
    <View style={{flex: 1}}>
        <BarCodeScanner 
          onBarCodeScanned={handleBarCodeScanned}
          type={type}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={[StyleSheet.absoluteFillObject, styles.container]}>
            <View style={styles.view} >
              <TouchableOpacity
                style={styles.touchableopacity}
                onPress={() => navigation.navigate('Home')}>
                <Text style={{fontSize: 18, margin: 5, color: 'white'}}> Voltar </Text>
              </TouchableOpacity>
            </View>
            <BarcodeMask edgeColor="#62B1F6" showAnimatedLine/>
            {scanned && <Button title="Scan Again" onPress={() => setScanned(false)}/>}
        </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    view: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
    },
    touchableopacity: {
      flex: 1,
      alignItems: 'flex-start',
    }
});
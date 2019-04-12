
import React, { Component } from 'react';
import {
  NativeModules,
    Dimensions,
    View,
    Text,
    Platform,
    TouchableOpacity,
    Linking
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import postApi from './src/api/postApi';
const {height, width} = Dimensions.get('window');
//import CryptoJS from 'crypto-js';
const crypto = require('crypto-js');
const RSAKey = require('react-native-rsa');
import {RSA, RSAKeychain} from 'react-native-rsa-native';

//const NodeRSA = require('node-rsa');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = [];
        this.state = {
            keypublic:'',
            supported: true,
            enabled: false,
            QRcode:'',
            tag: {},
            response:'',
            camera: {
               type: RNCamera.Constants.Type.back,
      	       flashMode: RNCamera.Constants.FlashMode.auto,
      	       barcodeFinderVisible: true
               },

        }
    }

    componentDidMount() {
        // NfcManager.isSupported()
        //     .then(supported => {
        //         this.setState({ supported });
        //         if (supported) {
        //             this._startNfc();
        //         }
        //     })
    }

    onBarCodeRead(scanResult) {
      // console.warn(scanResult.type);
      // console.warn(scanResult.data);
      if (scanResult.data != null) {
        if (!this.barcodeCodes.includes(scanResult.data)) {
          this.barcodeCodes.push(scanResult.data);
          console.warn('onBarCodeRead call');
          this.setState({QRcode:scanResult.data});
          console.log("QRcode",scanResult.data);
          let jsonData = {
            "partnerCode": "MOMOSH2Q20190410",
            "partnerRefId": "Merchant123556666",
            "amount": 30000,
            "paymentCode": scanResult.data,
            "storeId": "001",
            "storeName": "Cua hang doi tac"
          };
//'-----BEGIN PUBLIC KEY-----'+'-----END PUBLIC KEY-----'
          var publickey='MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAgP8nP97p9gVZLrhGgRGv'+
                        'Ki/7QOIxJeTFPZ3iayoq6YwpRcK0wF5mdzFmO4cD0IvWdHIKdEbcT7xaHIfnYPvC'+
                        'IdFfKAhomFTJTKcsM3Jz2rJOBoKr8yatqS4AT+0HIf7x6jyHgLOCWcAchfzh2fqT'+
                        'rk2Gqw9qPHS9rIo+MKG4hSi9CoUc4TfLYday01gVuFN9o778pEqrW7Wr/OwLIY+p'+
                        '+2m0zKtiSanJw6UJnN9eB++3xII+Z5ollTf8o5Fimid1PlYRPThTw1SCQEW94Ly9'+
                        'q/up4VP0+0oG8+gCtY6WskgiPnatT5ZgRoQTvcj4QcmlaHez31kStCWlFMEW6eEx'+
                        '+FM2a1E6uk221I+UMdlFXvdyRZatsyFzFe1e9Qjj04kOWFSCdzo48AwnGOsLWUNN'+
                        'EYjOEK/JZbLHJoRmvlKUkbCQBQglcPpBf7rtOEa7/3k2P9xp10H0lwRDfKWhNRvR'+
                        'pgU2Yt3C7lARBeXNboLmCVjs82bdvVrAIhyoixSoWx0yxBpmg/b+Ad9iquI4qQHe'+
                        '7zuma4K0NmaQ/7q1xtpxxq3w20WeADcPgAKtSrmKTlL+/o5+tp2Os4DWBNXz2WVe'+
                        'dejQBFjKL6xQqxsNAiKvy7fn74rDr7QKTX1ctMxC5EvvwxKPRwQw8EVLy0SkQcF9'+
                        'iQwG+VmN6M2NDSpGU5OoFN8CAwEAAQ==';
          RSA.encrypt(JSON.stringify(jsonData), publickey)
           .then(encodedMessage => {
             console.log(encodedMessage);
             RSA.decrypt(encodedMessage, publickey)
               .then(message => {
                 console.log(message);
               });
             });
          // var message = crypto.AES.encrypt(JSON.stringify(jsonData), publickey).toString();
          // // Xem chuỗi đã mã hóa
          // console.log(message);
          // var bytes = crypto.AES.decrypt(message, publickey);
          // // Chuyển sang chuỗi gốc

          // var rsa = new RSAKey();
          // rsa.setPublicString(publickey);
          // var originText = 'sample String Value';
          // var encrypted = rsa.encrypt(originText);
          // console.log(encrypted);
          // console.log(bytes);// 'my message'

          // let url = 'https://test-payment.momo.vn/pay/pos';
          // let params = {
          //     "partnerCode": "MOMOSH2Q20190410",
          //     "partnerRefId": "Merchant123556666",
          //     "description": "thanh toan MoMo POS DFM",
          //     "hash": message,
          //     "version": 2
          //     };
          // postApi(url,params).then(
          //     data => {
          //       this.setState({response:data});
          //       console.log('response',data);
          //     });
          }
        }
      }

    render() {
        let { supported, enabled, tag, QRcode, response,keypublic   } = this.state;
        return (
          <View style={{flex:1}}>
            <View style={{alignItems: 'center',height:(height/2), width }}>
              <Text style={{ marginTop: 5 }}> {`Current QRcode JSON: ${JSON.stringify(QRcode)}`}</Text>
              <Text style={{ marginTop: 5 }}> {`Current QRcode JSON: ${JSON.stringify(response)}`}</Text>
            </View>
            <View style={{alignItems: 'center',height:(height/2), width }}>
              <RNCamera
                  ref={ref => {
                    this.camera = ref;
                  }}
                  barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                  barcodeFinderWidth={280}
                  barcodeFinderHeight={220}
                  barcodeFinderBorderColor="white"
                  barcodeFinderBorderWidth={2}
                  defaultTouchToFocus
                  flashMode={this.state.camera.flashMode}
                  mirrorImage={false}
                  onBarCodeRead={this.onBarCodeRead.bind(this)}
                  permissionDialogTitle={'Permission to use camera'}
                  permissionDialogMessage={'We need your permission to use your camera phone'}
                  style={{justifyContent:"center",height:(width/2), width:(width/2)}}
                  type={this.state.camera.type}
              />
            </View>
          </View>

        )
    }
}

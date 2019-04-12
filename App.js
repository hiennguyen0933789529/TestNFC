
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
import {RSA, RSAKeychain} from 'react-native-rsa-native';
//import NodeRSA from './src/api/nodeRsa';
//const NodeRSA = require('node-rsa');
const {RSAmodules} = NativeModules;

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

          var publickey="MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAgP8nP97p9gVZLrhGgRGvKi/7QOIxJeTFPZ3iayoq6YwpRcK0wF5mdzFmO4cD0IvWdHIKdEbcT7xaHIfnYPvCIdFfKAhomFTJTKcsM3Jz2rJOBoKr8yatqS4AT+0HIf7x6jyHgLOCWcAchfzh2fqTrk2Gqw9qPHS9rIo+MKG4hSi9CoUc4TfLYday01gVuFN9o778pEqrW7Wr/OwLIY+p+2m0zKtiSanJw6UJnN9eB++3xII+Z5ollTf8o5Fimid1PlYRPThTw1SCQEW94Ly9q/up4VP0+0oG8+gCtY6WskgiPnatT5ZgRoQTvcj4QcmlaHez31kStCWlFMEW6eEx+FM2a1E6uk221I+UMdlFXvdyRZatsyFzFe1e9Qjj04kOWFSCdzo48AwnGOsLWUNNEYjOEK/JZbLHJoRmvlKUkbCQBQglcPpBf7rtOEa7/3k2P9xp10H0lwRDfKWhNRvRpgU2Yt3C7lARBeXNboLmCVjs82bdvVrAIhyoixSoWx0yxBpmg/b+Ad9iquI4qQHe7zuma4K0NmaQ/7q1xtpxxq3w20WeADcPgAKtSrmKTlL+/o5+tp2Os4DWBNXz2WVedejQBFjKL6xQqxsNAiKvy7fn74rDr7QKTX1ctMxC5EvvwxKPRwQw8EVLy0SkQcF9iQwG+VmN6M2NDSpGU5OoFN8CAwEAAQ==";
          RSAmodules.encrypt(JSON.stringify(jsonData),publickey).then(
            encrypt =>{
              console.log(encrypt);
              let url = 'https://test-payment.momo.vn/pay/pos';
              let params = {
                  "partnerCode": "MOMOSH2Q20190410",
                  "partnerRefId": "Merchant123556666",
                  "description": "thanh toan MoMo POS DFM",
                  "hash": encrypt,
                  "version": 2
                  };
              postApi(url,params).then(
                  data => {
                    this.setState({response:data});
                    console.log('response',data);
                  });
              let decrypt = RSAmodules.decrypt(encrypt,publickey);
              console.log('  ',decrypt);
            }
          )
          // RSA.generate()
          //   .then(keys => {
          //   // console.log(keys.private) // the private key
          //   // console.log(keys.public) // the public key
          //   RSA.encrypt(JSON.stringify(jsonData), keys.public)
          //     .then(encodedMessage => {
          //       let url = 'https://test-payment.momo.vn/pay/pos';
          //       let params = {
          //           "partnerCode": "MOMOSH2Q20190410",
          //           "partnerRefId": "Merchant123556666",
          //           "description": "thanh toan MoMo POS DFM",
          //           "hash": encodedMessage,
          //           "version": 2
          //           };
          //       postApi(url,params).then(
          //           data => {
          //             this.setState({response:data});
          //             console.log('response',data);
          //           });
          //       console.log(encodedMessage);
          //       RSA.decrypt(encodedMessage, keys.private)
          //         .then(message => {
          //           console.log(message);
          //         })
          //       })
          //     });

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


import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    Platform,
    TouchableOpacity,
    Linking
} from 'react-native';
//import NfcManager, {NdefParser} from 'react-native-nfc-manager';
import { RNCamera } from 'react-native-camera';
import postApi from './src/api/postApi';
const NodeRSA = require('node-rsa');
const {height, width} = Dimensions.get('window');


export default class App extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = [];
        this.state = {
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
            "partnerCode": "MOMOIQA420180417",
            "partnerRefId": "Merchant123556666",
            "amount": 10000,
            "paymentCode": scanResult.data,
            "storeId": "001",
            "storeName": "Cua hang doi tac"
          };
          let publicKey = '-----BEGIN PUBLIC KEY-----'+'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkpa+qMXS6O11x7jBGo9W3yxeHEsAdyDE40UoXhoQf9K6attSIclTZMEGfq6gmJm2BogVJtPkjvri5/j9mBntA8qKMzzanSQaBEbr8FyByHnf226dsLt1RbJSMLjCd3UC1n0Yq8KKvfHhvmvVbGcWfpgfo7iQTVmL0r1eQxzgnSq31EL1yYNMuaZjpHmQuT24Hmxl9W9enRtJyVTUhwKhtjOSOsR03sMnsckpFT9pn1/V9BE2Kf3rFGqc6JukXkqK6ZW9mtmGLSq3K+JRRq2w8PVmcbcvTr/adW4EL2yc1qk9Ec4HtiDhtSYd6/ov8xLVkKAQjLVt7Ex3/agRPfPrNwIDAQAB'+'-----END PUBLIC KEY-----';
          console.log(publicKey,jsonData);
          // let publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkpa+qMXS6O11x7jBGo9W3yxeHEsAdyDE40UoXhoQf9K6attSIclTZMEGfq6gmJm2BogVJtPkjvri5/j9mBntA8qKMzzanSQaBEbr8FyByHnf226dsLt1RbJSMLjCd3UC1n0Yq8KKvfHhvmvVbGcWfpgfo7iQTVmL0r1eQxzgnSq31EL1yYNMuaZjpHmQuT24Hmxl9W9enRtJyVTUhwKhtjOSOsR03sMnsckpFT9pn1/V9BE2Kf3rFGqc6JukXkqK6ZW9mtmGLSq3K+JRRq2w8PVmcbcvTr/adW4EL2yc1qk9Ec4HtiDhtSYd6/ov8xLVkKAQjLVt7Ex3/agRPfPrNwIDAQAB';
          // RSA.generate().then(keys => {
          // // console.log("keys.private 1",keys.private) // the private key
          // console.log("keys.public 1",keys.public) // the public key
          // RSA.encrypt(JSON.stringify(hash), keys.public).then(encodedMessage => {
          //   console.log("hash",encodedMessage);
          //   let url = 'https://test-payment.momo.vn/pay/pos';
          //   let params = {
          //     "partnerCode": "MOMOIQA420180417",
          //     "partnerRefId": "Merchant123556666",
          //     "description": "thanh toan MoMo POS DFM",
          //     "hash": encodedMessage,
          //     "version": 2
          //     };
          //   postApi(url,params).then(
          //     data => {
          //       this.setState({response:data});
          //       console.log('response',data);
          //     });
          //     RSA.decrypt(encodedMessage,keys.private).then(message => {
          //     console.log("message 2",message);
          //     })
          //   })
          // });
          }
        }
      }

    render() {
        let { supported, enabled, tag, QRcode, response } = this.state;
        return (
          <View style={styles.container}>
            <View style={{alignItems: 'center',height:(height/2), width }}>
              <Text style={{ marginTop: 5 }}> {`Current QRcode JSON: ${JSON.stringify(QRcode)}`}</Text>
              <Text style={{ marginTop: 5 }}> {`Current datarespon JSON: ${JSON.stringify(response)}`}</Text>
              </View>

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
        )
    }

    // _startNfc() {
    //     NfcManager.start({
    //         onSessionClosedIOS: () => {
    //             console.log('ios session closed');
    //         }
    //     })
    //         .then(result => {
    //             console.log('start OK', result);
    //         })
    //         .catch(error => {
    //             console.warn('start fail', error);
    //             this.setState({supported: false});
    //         })
    //
    //     if (Platform.OS === 'android') {
    //         NfcManager.getLaunchTagEvent()
    //             .then(tag => {
    //                 console.log('launch tag', tag);
    //                 if (tag) {
    //                     this.setState({ tag });
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //         NfcManager.isEnabled()
    //             .then(enabled => {
    //                 this.setState({ enabled });
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }
    // }
    //
    // _onTagDiscovered = tag => {
    //     console.log('Tag Discovered', tag.id);
    //     this.setState({ tag });
    //     // let url = this._parseUri(tag);
    //     // if (url) {
    //     //     Linking.openURL(url)
    //     //         .catch(err => {
    //     //             console.warn(err);
    //     //         })
    //     // }
    // }
    //
    // _startDetection = () => {
    //     NfcManager.registerTagEvent(this._onTagDiscovered)
    //         .then(result => {
    //             console.log('registerTagEvent OK', result)
    //         })
    //         .catch(error => {
    //             console.warn('registerTagEvent fail', error)
    //         })
    // }
    //
    // _stopDetection = () => {
    //     NfcManager.unregisterTagEvent()
    //         .then(result => {
    //             console.log('unregisterTagEvent OK', result)
    //         })
    //         .catch(error => {
    //             console.warn('unregisterTagEvent fail', error)
    //         })
    // }
    //
    // _clearMessages = () => {
    //     this.setState({tag: null});
    // }
    //
    // _goToNfcSetting = () => {
    //     if (Platform.OS === 'android') {
    //         NfcManager.goToNfcSetting()
    //             .then(result => {
    //                 console.log('goToNfcSetting OK', result)
    //             })
    //             .catch(error => {
    //                 console.warn('goToNfcSetting fail', error)
    //             })
    //     }
    // }
    //
    // _parseUri = (tag) => {
    //     let result = NdefParser.parseUri(tag.ndefMessage[0]),
    //         uri = result && result.uri;
    //     if (uri) {
    //         console.log('parseUri: ' + uri);
    //         return uri;
    //     }
    //     return null;
    // }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
};


// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

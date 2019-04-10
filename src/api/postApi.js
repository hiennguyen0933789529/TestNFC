import {AsyncStorage, ToastAndroid, NetInfo} from 'react-native';

const postApi = async (url, params) => {
  try {
    // const net = await NetInfo.getConnectionInfo();
    // if(net.type === 'none') return {connection: false };

    // const imei = await AsyncStorage.getItem('imei');
    // // 359261051175011
    let response = await fetch(url, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Version': '1.0.0'
        },
        body: JSON.stringify(params)
      },
    );
    // console.log('response.status',response);
    // console.log('imei',imei);
    // console.log('params',params);
    // if (response.status === 200) {
      const res = await response.json();
      return res;
    // }
  } catch (error) {
    return {connection: false };
  }
}
export default postApi;

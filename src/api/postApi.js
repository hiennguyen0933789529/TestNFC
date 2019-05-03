import {AsyncStorage, ToastAndroid, NetInfo} from 'react-native';

const postApi = async (url, params) => {
  try {
    let response = await fetch(url, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Version': '1.0.0'
        },
        body: JSON.stringify(params)
      },
    );
      const res = await response.json();
      return res;
  } catch (error) {
    return {connection: false };
  }
}
export default postApi;

const NodeRSA = require('node-rsa');

// using your public key get from https://business.momo.vn/
//const fs = require('fs');
//const pubKey = fs.readFileSync('rsa.pub');

const nodeRsa = async (jsonData) => {
  try {
    const pubKey = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkpa+qMXS6O11x7jBGo9W3yxeHEsAdyDE40UoXhoQf9K6attSIclTZMEGfq6gmJm2BogVJtPkjvri5/j9mBntA8qKMzzanSQaBEbr8FyByHnf226dsLt1RbJSMLjCd3UC1n0Yq8KKvfHhvmvVbGcWfpgfo7iQTVmL0r1eQxzgnSq31EL1yYNMuaZjpHmQuT24Hmxl9W9enRtJyVTUhwKhtjOSOsR03sMnsckpFT9pn1/V9BE2Kf3rFGqc6JukXkqK6ZW9mtmGLSq3K+JRRq2w8PVmcbcvTr/adW4EL2yc1qk9Ec4HtiDhtSYd6/ov8xLVkKAQjLVt7Ex3/agRPfPrNwIDAQAB-----END PUBLIC KEY-----';

    const key = new NodeRSA(pubKey, {encryptionScheme: 'pkcs1'});
    const encrypted = key.encrypt(JSON.stringify(jsonData), 'base64');
    console.log('encrypted: ', encrypted);
      return encrypted
  } catch (error) {
    return {connection: false };
  }
}
export default nodeRsa;

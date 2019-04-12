
package rsa;

import android.os.AsyncTask;

import com.facebook.react.bridge.NoSuchKeyException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.Promise;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;


import android.os.Build;
import android.support.annotation.RequiresApi;

import java.util.Base64;

import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;

public class RSAmodules extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RSAmodules(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNRSAaaaaa";
  }
  @ReactMethod
  @RequiresApi(api = Build.VERSION_CODES.O)
  public String encrypt(String dataEnCrypt, String Key) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidKeySpecException, IllegalBlockSizeException, BadPaddingException {
      Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
      PublicKey publicKey = KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(Key.getBytes())));
      cipher.init(Cipher.ENCRYPT_MODE, publicKey);
      byte[] encryptedbytes = cipher.doFinal(dataEnCrypt.getBytes());
      return new String(Base64.getEncoder().encode(encryptedbytes));
  }

  @ReactMethod
  @RequiresApi(api = Build.VERSION_CODES.O)
  public String decrypt(String dataEnCrypt, String Key) throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
      Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
      PrivateKey pk = KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(Base64.getDecoder().decode(Key.getBytes())));
      cipher.init(Cipher.DECRYPT_MODE, pk);
      byte[] encryptedbytes = cipher.doFinal(Base64.getDecoder().decode(dataEnCrypt.getBytes()));
      return new String(encryptedbytes);

  }

}

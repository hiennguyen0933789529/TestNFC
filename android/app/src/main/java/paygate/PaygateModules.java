package paygate;

import android.util.Base64;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.crypto.Cipher;

public class PaygateModules extends ReactContextBaseJavaModule {
    private static final String PARTNER_CODE = "partnerCode";
    private static final String PARTNER_REF_ID = "partnerRefId";
    private static final String AMOUNT = "amount";
    private static final String PAYMENTCode = "paymentCode";
    private static final String STOREID = "storeId";
    private static final String STOREName = "storeName";
    public static final String DEVK = "DEVK";
    private String hash;

    public PaygateModules(@Nonnull ReactApplicationContext reactContext) {
			super(reactContext);

    }

    @Override
    public String getName() {
        return "PaygateModules";
    }

    @ReactMethod
    public void init(String partnerCode, String partnerRefId, int amount, String paymentCode, String storeId, String storeName, String publicKey,Callback callback){
        try {
            String hashRSA = paygate(partnerCode,partnerRefId, amount,paymentCode,storeId,storeName, publicKey);
            String rsaT = hashRSA.replaceAll("\n","");
            callback.invoke(rsaT);
        }catch (Exception e){
            Toast.makeText(getReactApplicationContext(), "Error", Toast.LENGTH_SHORT).show();
        }
    }
    public String paygate(String partnerCode,String partnerRefId, long amount,String paymentCode,String storeId,String storeName,String publicKey) {
        Map<String, Object> rawData = new HashMap<>();
        rawData.put(PARTNER_CODE, partnerCode);
        rawData.put(PARTNER_REF_ID, partnerRefId);
        rawData.put(AMOUNT, amount);
        rawData.put(PAYMENTCode, paymentCode);
        rawData.put(STOREID, storeId);
        rawData.put(STOREName, storeName);
        Gson gson = new Gson();
        String jsonStr = gson.toJson(rawData);
        try {
            hash = enccriptData(jsonStr, publicKey);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return hash;
    }
    public static String enccriptData(String data, String puclicKeyText)
    {
        String encoded = "";
        byte[] encrypted = null;
        try {
            byte[] publicBytes = Base64.decode(puclicKeyText, Base64.DEFAULT);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PublicKey pubKey = keyFactory.generatePublic(keySpec);
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1PADDING"); //or try with "RSA"
            cipher.init(Cipher.ENCRYPT_MODE, pubKey);
            encrypted = cipher.doFinal(data.getBytes());
            encoded = Base64.encodeToString(encrypted, Base64.DEFAULT);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return encoded;
    }


}

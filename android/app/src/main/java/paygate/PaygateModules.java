package paygate;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.widget.Toast;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import paygate.processor.Processor;

import javax.annotation.Nonnull;
import java.io.IOException;

public class PaygateModules extends ReactContextBaseJavaModule {

    public PaygateModules(@Nonnull ReactApplicationContext reactContext) {
			super(reactContext);

    }

    @Override
    public String getName() {
        return "PaygateModules";
    }

    @ReactMethod
    public void paygate(String partnerCode, String partnerRefId, Double amount, String paymentCode, String storeId, String storeName, String publicKey,Callback hash) throws Exception
    {
        final String a = Processor.generateRSA(partnerCode,partnerRefId,amount,paymentCode,storeId,storeName,publicKey);
        Toast.makeText(getReactApplicationContext(), a, Toast.LENGTH_LONG).show();
        hash.invoke(a);

    }


}

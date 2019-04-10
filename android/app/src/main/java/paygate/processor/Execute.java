package paygate.processor;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import paygate.model.Environment;
import paygate.utils.$$;
import paygate.utils.$$HttpRequest;
import paygate.utils.$$HttpResponse;
import paygate.utils.Console;
import paygate.utils.Headers;
import com.sun.istack.internal.NotNull;

@SuppressWarnings("restriction")
public class Execute {

	public static String sendToMoMo(@NotNull Environment environment,@NotNull String payload) throws Exception{
        Headers headers = new Headers();
        headers.put("Content-Type", "application/json")
                .put("Charset", "utf-8");

        $$HttpRequest httpRequest = new $$HttpRequest("POST", payload, environment.getMomoEndpoint(), headers);

        Console.debug("sendToMoMoServer::Endpoint::"+httpRequest.getUrl());
        Console.debug("sendToMoMoServer::RequestBody::"+httpRequest.getData());
        Console.debug("sendToMoMoServer::Header::"+httpRequest.getHeaders());

        $$HttpResponse httpResponse = $$.post(httpRequest);

        Console.debug("sendToMoMoServer::ResponseStatus::"+ httpResponse.getStatus());
        Console.debug("sendToMoMoServer::ResponseData::"+httpResponse.getData());

        if (httpResponse.getStatus() != 200) {
            throw new Exception(httpResponse.getData());
        } else {
            return httpResponse.getData();
        }
    }
    public static Gson getGson() {
        return new GsonBuilder()
                .disableHtmlEscaping()
                .create();
    }
}

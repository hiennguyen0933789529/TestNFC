package paygate.processor;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import paygate.constants.Parameter;
import paygate.constants.RequestType;
import paygate.model.CaptureMoMoRequest;
import paygate.model.CaptureMoMoResponse;
import paygate.model.Environment;
import paygate.model.PartnerInfo;
import paygate.model.PayATMRequest;
import paygate.model.PayATMResponse;
import paygate.model.PaymentResponse;
import paygate.model.QueryStatusTransactionRequest;
import paygate.model.QueryStatusTransactionResponse;
import paygate.model.RefundATMMoMoRequest;
import paygate.model.RefundMoMoRequest;
import paygate.utils.Console;
import paygate.utils.Encoder;

@SuppressWarnings("static-access")
public class Processor {

    public static PayATMRequest createPayWithATMRequest(String requestId, String orderId, String bankCode, String amount, String orderInfo, String returnUrl,
                                                        String notifyUrl, String extra, PartnerInfo partnerInfo) {
        String dataCryption
                = Parameter.PARTNER_CODE + "=" + partnerInfo.getPartnerCode() + "&"
                + Parameter.ACCESS_KEY + "=" + partnerInfo.getAccessKey() + "&"
                + Parameter.REQUEST_ID + "=" + requestId + "&"
                + Parameter.BANK_CODE + "=" + bankCode + "&"
                + Parameter.AMOUNT + "=" + amount + "&"
                + Parameter.ORDER_ID + "=" + orderId + "&"
                + Parameter.ORDER_INFO + "=" + orderInfo + "&"
                + Parameter.RETURN_URL + "=" + returnUrl + "&"
                + Parameter.NOTIFY_URL + "=" + notifyUrl + "&"
                + Parameter.EXTRA_DATA + "=" + extra + "&"
                + Parameter.REQUEST_TYPE + "=" + RequestType.PAY_WITH_ATM;
        try {
            String signature = Encoder.signHmacSHA256(dataCryption, partnerInfo.getSecretKey());

            PayATMRequest payATMRequest = new PayATMRequest();
            payATMRequest.setPartnerCode(partnerInfo.getPartnerCode());
            payATMRequest.setAccessKey(partnerInfo.getAccessKey());
            payATMRequest.setAmount(amount);
            payATMRequest.setRequestId(requestId);
            payATMRequest.setOrderId(orderId);
            payATMRequest.setReturnUrl(returnUrl);
            payATMRequest.setNotifyUrl(notifyUrl);
            payATMRequest.setOrderInfo(orderInfo);
            payATMRequest.setBankCode(bankCode);
            payATMRequest.setRequestType(RequestType.PAY_WITH_ATM);
            payATMRequest.setSignature(signature);
            return payATMRequest;
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Invalid params capture MoMo Request");
        }
    }

    public static RefundATMMoMoRequest createRefundMoMoATMRequest(String requestId, String orderId, String bankCode, String amount, String momoTransId, PartnerInfo partnerInfo) {
        RefundATMMoMoRequest refundATMMoMoRequest = new RefundATMMoMoRequest();
        String dataCryption
                = Parameter.PARTNER_CODE + "=" + refundATMMoMoRequest.getPartnerCode() + "&"
                + Parameter.ACCESS_KEY + "=" + refundATMMoMoRequest.getAccessKey() + "&"
                + Parameter.REQUEST_ID + "=" + refundATMMoMoRequest.getRequestId() + "&"
                + Parameter.BANK_CODE + "=" + refundATMMoMoRequest.getBankCode() + "&"
                + Parameter.AMOUNT + "=" + refundATMMoMoRequest.getAmount() + "&"
                + Parameter.ORDER_ID + "=" + refundATMMoMoRequest.getOrderId() + "&"
                + Parameter.TRANS_ID + "=" + refundATMMoMoRequest.getTransId() + "&"
                + Parameter.REQUEST_TYPE + "=" + refundATMMoMoRequest.getRequestType();
        String signature = "";
        try {
            signature = Encoder.signHmacSHA256(dataCryption, partnerInfo.getSecretKey());
            refundATMMoMoRequest.setPartnerCode(partnerInfo.getPartnerCode());
            refundATMMoMoRequest.setAccessKey(partnerInfo.getAccessKey());
            refundATMMoMoRequest.setRequestId(requestId);
            refundATMMoMoRequest.setAmount(amount);
            refundATMMoMoRequest.setBankCode(bankCode);
            refundATMMoMoRequest.setOrderId(orderId);
            refundATMMoMoRequest.setTransId(momoTransId);
            refundATMMoMoRequest.setSignature(signature);
            refundATMMoMoRequest.setRequestType(RequestType.REFUND_ATM);

            return refundATMMoMoRequest;
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid params capture MoMo Request");
        }
    }

    public static RefundMoMoRequest createRefundMoMoRequest(String requestId, String orderId, String amount, String momoTransId, PartnerInfo partnerInfo) {
        RefundMoMoRequest refundMoMoRequest = new RefundMoMoRequest();
        String dataCryption =
                Parameter.PARTNER_CODE + "=" + partnerInfo.getPartnerCode() +
                        "&" + Parameter.ACCESS_KEY + "=" + partnerInfo.getAccessKey() +
                        "&" + Parameter.REQUEST_ID + "=" + requestId +
                        "&" + Parameter.AMOUNT + "=" + amount +
                        "&" + Parameter.ORDER_ID + "=" + orderId +
                        "&" + Parameter.TRANS_ID + "=" + momoTransId +
                        "&" + Parameter.REQUEST_TYPE + "=" + RequestType.REFUND_MOMO_WALLET;
        String signature = "";
        try {
            signature = Encoder.signHmacSHA256(dataCryption, partnerInfo.getSecretKey());
            refundMoMoRequest.setPartnerCode(partnerInfo.getPartnerCode());
            refundMoMoRequest.setAccessKey(partnerInfo.getAccessKey());
            refundMoMoRequest.setRequestId(requestId);
            refundMoMoRequest.setAmount(amount);
            refundMoMoRequest.setOrderId(orderId);
            refundMoMoRequest.setTransId(momoTransId);
            refundMoMoRequest.setSignature(signature);
            refundMoMoRequest.setRequestType(RequestType.REFUND_MOMO_WALLET);

            return refundMoMoRequest;
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid params capture MoMo Request");
        }
    }

    public static QueryStatusTransactionRequest createQueryTransactionRequest(String requestId, String orderId, PartnerInfo partnerInfo) {
        QueryStatusTransactionRequest request = new QueryStatusTransactionRequest();
        String rawData =
                Parameter.PARTNER_CODE + "=" + partnerInfo.getPartnerCode() +
                        "&" + Parameter.ACCESS_KEY + "=" + partnerInfo.getAccessKey() +
                        "&" + Parameter.REQUEST_ID + "=" + requestId +
                        "&" + Parameter.ORDER_ID + "=" + orderId +
                        "&" + Parameter.REQUEST_TYPE + "=" + RequestType.TRANSACTION_STATUS;
        String signature = "";
        try {
            Console.debug("createQueryStatusRequest::rawDataBeforeHash::" + rawData);
            signature = Encoder.signHmacSHA256(rawData, partnerInfo.getSecretKey());
            Console.debug("createQueryStatusRequest::signature::" + signature);
        } catch (Exception e) {
            e.printStackTrace();
        }

        request.setAccessKey(partnerInfo.getAccessKey());
        request.setPartnerCode(partnerInfo.getPartnerCode());
        request.setOrderId(orderId);
        request.setRequestId(requestId);
        request.setRequestType(RequestType.TRANSACTION_STATUS);
        request.setSignature(signature);
        return request;
    }

    public static CaptureMoMoRequest createCaptureMoMoRequest(String orderId, String requestId, String amount, String orderInfo, String returnUrl, String notifyUrl, String extraData, PartnerInfo partnerInfo) {
        try {
            String rawData =
                    Parameter.PARTNER_CODE + "=" + partnerInfo.getPartnerCode() +
                            "&" + Parameter.ACCESS_KEY + "=" + partnerInfo.getAccessKey() +
                            "&" + Parameter.REQUEST_ID + "=" + requestId +
                            "&" + Parameter.AMOUNT + "=" + amount +
                            "&" + Parameter.ORDER_ID + "=" + orderId +
                            "&" + Parameter.ORDER_INFO + "=" + orderInfo +
                            "&" + Parameter.RETURN_URL + "=" + returnUrl +
                            "&" + Parameter.NOTIFY_URL + "=" + notifyUrl +
                            "&" + Parameter.EXTRA_DATA + "=" + extraData;
            Console.debug("createCaptureMoMoRequest::rawDataBeforeHash::" + rawData);
            String signature = Encoder.signHmacSHA256(rawData, partnerInfo.getSecretKey());
            Console.debug("createCaptureMoMoRequest::signature::" + signature);

            CaptureMoMoRequest captureMoMoRequest = new CaptureMoMoRequest();
            captureMoMoRequest.setAccessKey(partnerInfo.getAccessKey());
            captureMoMoRequest.setRequestId(requestId);
            captureMoMoRequest.setPartnerCode(partnerInfo.getPartnerCode());
            captureMoMoRequest.setRequestType(RequestType.CAPTURE_MOMO_WALLET);
            captureMoMoRequest.setNotifyUrl(notifyUrl);
            captureMoMoRequest.setReturnUrl(returnUrl);
            captureMoMoRequest.setOrderId(orderId);
            captureMoMoRequest.setAmount(amount);
            captureMoMoRequest.setSignature(signature);
            captureMoMoRequest.setExtraData(extraData);
            captureMoMoRequest.setOrderInfo(orderInfo);
            return captureMoMoRequest;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new IllegalArgumentException("Invalid params capture MoMo Request");
        }
    }


    public static PaymentResponse resultCaptureMoMoWallet(Environment env, PaymentResponse paymentResponse) throws Exception {
        PartnerInfo partnerInfo = env.getPartnerInfo();
        String rawData
                = Parameter.PARTNER_CODE + "=" + paymentResponse.getPartnerCode() + "&"
                + Parameter.ACCESS_KEY + "=" + paymentResponse.getAccessKey() + "&"
                + Parameter.REQUEST_ID + "=" + paymentResponse.getRequestId() + "&"
                + Parameter.AMOUNT + "=" + paymentResponse.getAmount() + "&"
                + Parameter.ORDER_ID + "=" + paymentResponse.getOrderId() + "&"
                + Parameter.ORDER_INFO + "=" + paymentResponse.getOrderInfo() + "&"
                + Parameter.ORDER_TYPE + "=" + paymentResponse.getOrderType() + "&"
                + Parameter.TRANS_ID + "=" + paymentResponse.getTransId() + "&"
                + Parameter.MESSAGE + "=" + paymentResponse.getMessage() + "&"
                + Parameter.LOCAL_MESSAGE + "=" + paymentResponse.getLocalMessage() + "&"
                + Parameter.DATE + "=" + paymentResponse.getResponseDate() + "&"
                + Parameter.ERROR_CODE + "=" + paymentResponse.getErrorCode() + "&"
                + Parameter.PAY_TYPE + "=" + paymentResponse.getPayType() + "&"
                + Parameter.EXTRA_DATA + "=" + paymentResponse.getExtraData();

        Console.debug("resultCaptureMoMoWallet::partnerRawDataBeforeHash::" + rawData);
        String signature = Encoder.signHmacSHA256(rawData, partnerInfo.getSecretKey());
        Console.debug("resultCaptureMoMoWallet::partnerSignature::" + signature);
        Console.debug("resultCaptureMoMoWallet::momoSignature::" + paymentResponse.getSignature());

        if (signature.equals(paymentResponse.getSignature())) {
            return paymentResponse;
        } else {
            throw new IllegalArgumentException("Wrong signature from MoMo side - please contact with us");
        }
    }

    /**
     * Some errors will be showed in process
     * Read detail error in documents
     * [Find out] (https://business.momo.vn/solution/document) - Section 7
     *
     * @param errorCode
     * @throws Exception
     */
    public static void errorMoMoProcess(int errorCode) throws Exception {

        switch (errorCode) {
            case 0:
                // O is meaning success
                break;
            case 1:
                throw new Exception("Empty access key or partner code");

        }
    }

    /**
     * @author nhat.nguyen
     */
    public static String generateRSA(String partnerCode, String partnerRefId, Double amount, String paymentCode, String storeId, String storeName, String publicKey) throws Exception {
        // current version of Parameter key name is 2.0
    	Map<String, Object> rawData = new HashMap<>();
    	rawData.put("partnerCode", partnerCode);
    	rawData.put("partnerRefId", partnerRefId);
    	rawData.put("amount", amount);
    	rawData.put("paymentCode", paymentCode);
    	rawData.put("storeId", storeId);
    	rawData.put("storeName", storeName);

    	Gson gson = new Gson();
    	String jsonStr = gson.toJson(rawData);
	    byte[] testByte = jsonStr.getBytes("UTF-8");
	    final String hash = Encoder.encryptRSA(testByte, publicKey);
	    return hash;
    }
}

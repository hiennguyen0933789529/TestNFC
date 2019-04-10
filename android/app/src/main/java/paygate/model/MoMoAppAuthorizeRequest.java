package paygate.model;

public class MoMoAppAuthorizeRequest extends Request {

	private String email;
	private String fullName;
	private String clientId;
	private String deeplinkCallback;

	private String walletId;
	private String pin;
	private String platform;
	private int appVersion;
	private String sessionData;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getDeeplinkCallback() {
		return deeplinkCallback;
	}

	public void setDeeplinkCallback(String deeplinkCallback) {
		this.deeplinkCallback = deeplinkCallback;
	}

	public String getWalletId() {
		return walletId;
	}

	public void setWalletId(String walletId) {
		this.walletId = walletId;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public int getAppVersion() {
		return appVersion;
	}

	public void setAppVersion(int appVersion) {
		this.appVersion = appVersion;
	}

	public String getSessionData() {
		return sessionData;
	}

	public void setSessionData(String sessionData) {
		this.sessionData = sessionData;
	}
}

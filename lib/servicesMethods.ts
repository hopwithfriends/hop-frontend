import { ApiService } from "./services";

export class ServiceMethods {
	private accessToken = "";
	private refreshToken = "";
	constructor(accessToken: string, refreshToken: string) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
	apiService() {
		return new ApiService(this.accessToken, this.refreshToken);
	}
	async fetchUser() {
		return this.apiService().get("/user");
	}
}

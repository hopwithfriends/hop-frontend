export class ApiService {
	private BASE_URL = "localhost:8080/api";
	private accessToken = "";
	private refreshToken = "";

	constructor(accessToken: string, refreshToken: string) {
		if (!accessToken || !refreshToken) {
			throw new Error("Access/refresh token are required for the ApiSerice");
		}
	}

	private getHeaders() {
		const headers = new Headers();
		headers.append("x-stack-access-token", this.accessToken);
		headers.append("x-stack-refresh-token", this.refreshToken);
		return headers;
	}

	async get(endpoint: string) {
		const res = await fetch(`${this.BASE_URL}${endpoint}`, {
			headers: this.getHeaders(),
		});
		return await res.json();
	}

	async post(endpoint: string, data) {
		const res = await fetch(`${this.BASE_URL}${endpoint}`, {
			method: "POST",
			headers: this.getHeaders(),
			body: JSON.stringify(data),
		});
		return await res.json();
	}

	async put(endpoint: string, data) {
		const res = await fetch(`${this.BASE_URL}${endpoint}`, {
			method: "PUT",
			headers: this.getHeaders(),
			body: JSON.stringify(data),
		});
		return await res.json();
	}
	async delete(endpoint: string, data) {
		const res = await fetch(`${this.BASE_URL}${endpoint}`, {
			method: "DELETE",
			headers: this.getHeaders(),
		});
		return await res.json();
	}
}

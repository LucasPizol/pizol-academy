import { LoginAttributes } from "../designers/Auth/LoginAttributes";
import { RegisterAttributes } from "../designers/Auth/RegisterAttributes";

export abstract class PublicAPI {
  static async #fetchJsonData(endpoint: string, body?: any) {
    const stringify = body ? JSON.stringify(body) : null;

    const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: stringify,
    });
    const data = await response.json();

    return data;
  }

  static async login(params: LoginAttributes) {
    const data = PublicAPI.#fetchJsonData("/login", params);
    return data;
  }

  static async register(params: RegisterAttributes) {
    if (params.password !== params.confirmPassword) {
      return { error: "Senhas não conferem." };
    }
    const data = PublicAPI.#fetchJsonData("/register", params);
    return data;
  }

  static async getUser() {
    const response = await fetch(import.meta.env.VITE_BASE_URL + "/user");
    const data = await response.json();
    return data;
  }
}

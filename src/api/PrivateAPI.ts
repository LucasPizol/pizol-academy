export abstract class PrivateAPI {
  static async fetchData(
    endpoint: string,
    method?: "POST" | "PUT" | "DELETE",
    body?: any
  ) {
    const token = sessionStorage.getItem("AUTH_SESSION_KEY");

    const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: method ?? "GET",
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await response.json();

    if (data.error) {
      return { data: null, error: data.error };
    }

    return {
      data,
      error: null,
    };
  }

  static async fetchBlob(
    endpoint: string,
    method?: "POST" | "PUT" | "DELETE",
    body?: any
  ) {
    const token = sessionStorage.getItem("AUTH_SESSION_KEY");

    const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: method ?? "GET",
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.blob();

    return {
      data,
      error: null,
    };
  }

  static async get(endpoint: string) {
    return await PrivateAPI.fetchData(endpoint);
  }

  static async post(endpoint: string, body: any) {
    return await PrivateAPI.fetchData(endpoint, "POST", body);
  }

  static async put(endpoint: string, body?: any) {
    return await PrivateAPI.fetchData(endpoint, "PUT", body);
  }

  static async delete(endpoint: string, body?: any) {
    return await PrivateAPI.fetchData(endpoint, "DELETE", body);
  }

  static async blobPost(endpoint: string, body: any) {
    console.log(body);
    return await PrivateAPI.fetchBlob(endpoint, "POST", body);
  }
}

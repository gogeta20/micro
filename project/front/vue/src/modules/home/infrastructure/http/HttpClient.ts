import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 10000, // 10 segundos
    });

    // Configurar interceptores de solicitud
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Configurar interceptores de respuesta
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.instance.get(url, { params });
  }

  public post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data);
  }

  public put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data);
  }

  public delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.instance.delete(url);
  }
}

export default new HttpClient();

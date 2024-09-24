import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

class HttpClient {
  private instanceSymfony: AxiosInstance;
  // private instanceDjango: AxiosInstance;
  // private instanceBoot: AxiosInstance;

  constructor() {
    this.instanceSymfony = axios.create({
      baseURL,
      timeout: 10000, // 10 segundos
    });

    // Configurar interceptores de solicitud
    this.instanceSymfony.interceptors.request.use(
      (config: any) => {
        console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Configurar interceptores de respuesta
    this.instanceSymfony.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.instanceSymfony.get(url, { params });
  }

  public post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.instanceSymfony.post(url, data);
  }

  public put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.instanceSymfony.put(url, data);
  }

  public delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.instanceSymfony.delete(url);
  }
}

export default new HttpClient();

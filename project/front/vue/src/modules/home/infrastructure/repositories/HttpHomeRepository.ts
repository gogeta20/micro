import { HomeEntity } from '@/modules/home/domain/entities/HomeEntity';
import type { HomeRepository } from '@/modules/home/domain/repositories/HomeRepository';
import HttpClient from '@/modules/home/infrastructure/http/HttpClient';
import { UtilHelper } from "@/core/utilities/UtilHelper";
import Mock from './mock.json';

// Implementación del repositorio para el dominio "Home" usando Axios
class HttpHomeRepository implements HomeRepository {

  async InMemory(): Promise<any> {
    await UtilHelper.wait(500);
    return Mock.data;
  }

  async Api() {
    // const response = await http.get<ResponseData>(`presentacion/${idPresentacion}`);
    // const { data } = response.data;
    // return data;

    try {
      const response = await HttpClient.get<HomeEntity>('/home');
      return response.data;
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw error;
    }
  }

  async fetchHomeData(): Promise<HomeEntity> {
    return UtilHelper.checkEnvironment() ? await this.InMemory() : await this.Api();
  }
}

export default HttpHomeRepository;

import HttpClient from '@/core/http/HttpClient';
import { UtilHelper } from "@/core/utilities/UtilHelper";
import Mock from './mock.json';
import type { SymfonyRepository } from '@/modules/home/domain/repositories/SymfonyRepository';

// Implementación del repositorio para el dominio "Symfony" usando Axios
class HttpSymfonyRepository implements SymfonyRepository {

  async InMemory(): Promise<any> {
    await UtilHelper.wait(500);
    return Mock.data;
  }

  async Api() {
    // const response = await http.get<ResponseData>(`presentacion/${idPresentacion}`);
    // const { data } = response.data;
    // return data;

    try {
      // const response = await HttpClient.get<SymfonyEntity>('/home');
      const response = await HttpClient.get('/home');
      return response.data;
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw error;
    }
  }

  async fetchData() {
    return UtilHelper.checkEnvironment() ? await this.InMemory() : await this.Api();
  }
}

export default HttpSymfonyRepository;

import { HomeEntity } from '@/modules/home/domain/entities/HomeEntity';
import type { HomeRepository } from '@/modules/home/domain/repositories/HomeRepository';
import HttpClient from '@/modules/home/infrastructure/http/HttpClient';

// Implementación del repositorio para el dominio "Home" usando Axios
class HttpHomeRepository implements HomeRepository {
  async fetchHomeData(): Promise<HomeEntity> {
    try {
      // Realiza una solicitud GET al endpoint de la API usando HttpClient
      const response = await HttpClient.get<HomeEntity>('/home');
      return response.data;
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw error;
    }
  }
}

export default HttpHomeRepository;

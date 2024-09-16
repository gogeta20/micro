import { HomeEntity } from '@/modules/home/domain/entities/HomeEntity';

// Interfaz del repositorio para el dominio "Home"
export interface HomeRepository {
  fetchHomeData(): Promise<HomeEntity>;
}

import type { HomeRepository } from '@/modules/home/domain/repositories/HomeRepository';
import { HomeEntity } from '@/modules/home/domain/entities/HomeEntity';

export class HomeService {
  constructor(private homeRepository: HomeRepository) { }

  async getHomeData(): Promise<HomeEntity> {
    return await this.homeRepository.fetchHomeData();
  }
}

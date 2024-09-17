import HomeService from '@/modules/home/domain/services/HomeService';
import { HomeEntity } from '@/modules/home/domain/entities/HomeEntity';
import HttpHomeRepository from '@/modules/home/infrastructure/repositories/HttpHomeRepository';

export class FetchHomeData {
  private homeService: HomeService;

  constructor(homeService: HomeService) {
    this.homeService = homeService;
  }

  async execute(): Promise<HomeEntity> {
    try {
      const data = await this.homeService.getHomeData();
      return data;
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw error;
    }
  }
}

export default new FetchHomeData(new HomeService(new HttpHomeRepository()));

import { HomeService } from '@/modules/home/domain/services/HomeService';
import { HomeEntity } from '@/modules/home/domain/entities/HomeEntity';

export class FetchHomeData {
  private homeService: typeof HomeService;

  constructor(homeService: typeof HomeService) {
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

// Exportar una instancia del caso de uso
export default new FetchHomeData(HomeService);

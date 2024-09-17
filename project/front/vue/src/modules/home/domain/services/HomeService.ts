import type { HomeRepository } from '@/modules/home/domain/repositories/HomeRepository';

export class HomeService {

  private homeRepository: HomeRepository;

  constructor(homeRepository: HomeRepository) {
    this.homeRepository = homeRepository;
  }
  async getHomeData() {
    return await this.homeRepository.fetchHomeData();
  }
}

export default HomeService;

// export class HomeService {
//   constructor(private httpHomeRepository: typeof HttpHomeRepository) { }

//   async getHomeData(): Promise<HomeEntity> {
//     return await this.httpHomeRepository.fetchHomeData();
//   }
// }

// export default new HomeService(HttpHomeRepository);

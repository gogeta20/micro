// import type { SymfonyRepository } from '@/modules/symfony/domain/repositories/SymfonyRepository';
import type { SymfonyRepository } from '@/modules/home/domain/repositories/SymfonyRepository';

export class SymfonyService {

  private symfonyRepository: SymfonyRepository;

  constructor(symfonyRepository: SymfonyRepository) {
    this.symfonyRepository = symfonyRepository;
  }
  async getData() {
    return await this.symfonyRepository.fetchData();
  }
}

export default SymfonyService;

// export class SymfonyService {
//   constructor(private httpSymfonyRepository: typeof HttpSymfonyRepository) { }

//   async getSymfonyData(): Promise<SymfonyEntity> {
//     return await this.httpSymfonyRepository.fetchSymfonyData();
//   }
// }

// export default new SymfonyService(HttpSymfonyRepository);

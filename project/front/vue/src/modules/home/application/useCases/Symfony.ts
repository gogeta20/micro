import { SymfonyService } from "@/modules/home/domain/services/SymfonyService";
import HttpSymfonyRepository from "@/modules/home/infrastructure/repositories/HttpSymfonyRepository";

export class Symfony {
  private symfonyService: SymfonyService;

  constructor(symfonyService: SymfonyService) {
    this.symfonyService = symfonyService;
  }

  // async execute(): Promise<HomeEntity> {
  async execute() {
    try {
      const data = await this.symfonyService.getData();
      return data;
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw error;
    }
  }
}

export default new Symfony(new SymfonyService(new HttpSymfonyRepository()));

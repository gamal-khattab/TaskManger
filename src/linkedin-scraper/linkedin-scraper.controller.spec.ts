import { Test, TestingModule } from '@nestjs/testing';
import { LinkedInScraperController } from './linkedin-scraper.controller';

describe('LinkedinScraperController', () => {
  let controller: LinkedInScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkedInScraperController],
    }).compile();

    controller = module.get<LinkedInScraperController>(LinkedInScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

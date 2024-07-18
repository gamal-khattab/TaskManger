// src/linkedin-scraper/linkedin-scraper.module.ts
import { Module } from '@nestjs/common';
import { LinkedinScraperService } from './linkedin-scraper.service';
import { LinkedInScraperController } from './linkedin-scraper.controller';
@Module({
  controllers: [LinkedInScraperController],
  providers: [LinkedinScraperService],
})
export class LinkedinScraperModule {}

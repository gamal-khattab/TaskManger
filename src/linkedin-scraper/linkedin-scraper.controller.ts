// src/linkedin-scraper/linkedin-scraper.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { LinkedinScraperService } from './linkedin-scraper.service';
@Controller('linkedin-scraper')
export class LinkedInScraperController {
  constructor(private readonly linkedinScraperService: LinkedinScraperService) {}

  @Get('profile')
  async getProfile(@Query('username') username: string, @Query('password') password: string, @Query('profileUrl') profileUrl: string) {
    console.log(username);
    console.log(password);
    console.log(profileUrl);
    
    return this.linkedinScraperService.scrapeProfile(username, password, profileUrl);
  }
}

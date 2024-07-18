// src/linkedin-scraper/linkedin-scraper.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Builder, By, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

@Injectable()
export class LinkedinScraperService {
  private readonly logger = new Logger(LinkedinScraperService.name);

  async scrapeProfile(username: string, password: string, profileUrl: string) {
    const options = new chrome.Options();
    options.addArguments('--headless'); // Run in headless mode
    options.addArguments('--no-sandbox'); // Add other necessary arguments
    options.addArguments('--disable-dev-shm-usage'); // Disable shared memory usage

    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
      this.logger.log('Navigating to LinkedIn login page...');
      await driver.get('https://www.linkedin.com/login');
      this.logger.log('LinkedIn login page loaded');

      this.logger.log('Entering username...');
      const usernameField = await driver.findElement(By.id('username'));
      await usernameField.sendKeys(username);
      this.logger.log('Username entered');

      this.logger.log('Entering password...');
      const passwordField = await driver.findElement(By.id('password'));
      await passwordField.sendKeys(password);
      this.logger.log('Password entered');

      this.logger.log('Clicking submit button...');
      const submitButton = await driver.findElement(By.css('button[type="submit"]'));
      await submitButton.click();
      this.logger.log('Submit button clicked');

      this.logger.log('Waiting for LinkedIn feed page...');
      await driver.wait(until.urlContains('linkedin.com/feed'), 10000);
      this.logger.log('LinkedIn feed page loaded');

      this.logger.log(`Navigating to profile URL: ${profileUrl}`);
      await driver.get(profileUrl);
      await driver.wait(until.elementLocated(By.css('.pv-top-card__photo-wrapper')), 10000);
      this.logger.log('Profile page loaded');

      this.logger.log('Scraping profile data...');
      const name = await driver.findElement(By.css('.text-heading-xlarge')).getText();
      const photoUrl = await driver.findElement(By.css('.profile-photo-edit__preview')).getAttribute('src');
      this.logger.log(`Profile data scraped: Name: ${name}, Photo URL: ${photoUrl}`);

      return { name, profileUrl, photoUrl };
    } catch (error) {
      this.logger.error('Failed to scrape profile:', error);

      // Capture screenshot on error
      const screenshot = await driver.takeScreenshot();
      require('fs').writeFileSync('error_screenshot1.png', screenshot, 'base64');
      this.logger.log('Screenshot taken and saved as error_screenshot.png');

      throw error;
    } finally {
      this.logger.log('Closing the browser');
      await driver.quit();
    }
  }
}

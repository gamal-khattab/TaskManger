// src/selenium/selenium.service.ts
import { Injectable } from '@nestjs/common';
import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeleniumService {
  private driver: WebDriver;

  async init() {
    const options = new chrome.Options();
    options.addArguments('--headless'); // Run in headless mode

    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }

  async scrapeLinkedInProfile(username: string, password: string, profileUrl: string) {
    await this.driver.get('https://www.linkedin.com/login');
    await this.driver.findElement(By.id('username')).sendKeys(username);
    await this.driver.findElement(By.id('password')).sendKeys(password, Key.RETURN);

    await this.driver.wait(until.urlContains('feed'), 10000);

    await this.driver.get(profileUrl);

    const name = await this.driver.findElement(By.css('li.inline.t-24.t-black.t-normal.break-words')).getText();
    const photoUrl = await this.driver.findElement(By.css('div.profile-photo-edit__preview')).getAttribute('src');

    return { name, profileUrl, photoUrl };
  }

  async quit() {
    await this.driver.quit();
  }
}

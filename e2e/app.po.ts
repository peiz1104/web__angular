import { browser, by, element } from 'protractor';

export class ParimSparkWebPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('spk-root h1')).getText();
  }
}

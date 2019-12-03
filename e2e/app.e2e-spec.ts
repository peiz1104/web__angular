import { ParimSparkWebPage } from './app.po';

describe('parim-spark-web App', () => {
  let page: ParimSparkWebPage;

  beforeEach(() => {
    page = new ParimSparkWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to spk!!');
  });
});

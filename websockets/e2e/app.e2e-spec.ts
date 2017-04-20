import { WebsocketsPage } from './app.po';

describe('websockets App', () => {
  let page: WebsocketsPage;

  beforeEach(() => {
    page = new WebsocketsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

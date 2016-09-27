import { EchelonwebPage } from './app.po';

describe('echelonweb App', function() {
  let page: EchelonwebPage;

  beforeEach(() => {
    page = new EchelonwebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { Final2017Page } from './app.po';

describe('final2017 App', function() {
  let page: Final2017Page;

  beforeEach(() => {
    page = new Final2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

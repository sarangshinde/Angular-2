import { AsyncpipePage } from './app.po';

describe('asyncpipe App', () => {
  let page: AsyncpipePage;

  beforeEach(() => {
    page = new AsyncpipePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

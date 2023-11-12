const ScrapePageService = require('#app/items/web-scraper/scrape-page.service');

describe('Scrape Page Service', () => {
  it('returns scraped details for a requested url page', async () => {
    expect(await ScrapePageService.getOGFromUrl('www.example.com')).toEqual(
      {
        ogTitle: 'Scraped title from url: www.example.com'
      }
    );
  });
});

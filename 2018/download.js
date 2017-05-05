const scrape = require('website-scraper');

const options = {
  urls: ['http://demo.themestreet.net/eventura/'],
  directory: './theme',
};

scrape(options)
	.then(() => console.log('Website succesfully downloaded'))
	.catch(err => console.log('An error ocurred', err))

import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.google.com/');
  console.log('page ok')

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector('textarea');
  console.log('input ok')
  await page.type('textarea', 'Alternance développement web');
  console.log('text ok')

  // Press enter to search
  await page.keyboard.press('Enter');
    console.log('enter ok')
  await page.screenshot({
    path: 'Image.png'
  })
  console.log('image ok')

  // Print the full title
  console.log('end');

  await browser.close();
})();
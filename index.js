import puppeteer from 'puppeteer';

const selections = ['front', 'javascript', 'java'];

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time);
  });
}

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.welcometothejungle.com/fr/pages/emploi-developpeur-web-rennes-35000');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Locate the full title with a unique string
  await page.waitForSelector('#axeptio_btn_dismiss');
  await page.click('#axeptio_btn_dismiss');
  await delay(1e3);
  
  await page.screenshot({
    path: 'Image.png'
  })
  console.log('screenshot taken');

  const headingText = await page.evaluate(() => {
    const elements = document.querySelectorAll('h4');
    return Array.from(elements, element => element.innerHTML);
  });
  console.log(headingText);

  const jobs = headingText.filter(text => selections.some(selection => text.toLowerCase().includes(selection)));
  console.log(jobs);
  console.log(jobs.length);

  await browser.close();
})();
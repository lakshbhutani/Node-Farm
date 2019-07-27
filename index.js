const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replace-template');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const jsonObj = JSON.parse(data);

const slugs = jsonObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

//////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    const responseHtml = jsonObj
      .map(item => replaceTemplate(item, cardTemplate))
      .join('');
    const overviewHtml = overviewTemplate.replace(
      /{%PRODUCT_CARDS%}/g,
      responseHtml
    );
    res.end(overviewHtml);
  } else if (pathname === '/product') {
    const product = jsonObj[query.id];
    const productHtml = replaceTemplate(product, productTemplate);
    res.end(productHtml);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not Found.</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});

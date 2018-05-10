## Recusive Web Scrapping

### install

into `./api` run:
`npm install`

into `./scrapping` run:
`npm install`

set the env variables:
 - MONGODB_URL=mongodb://localhost:27017/ibm
 - API_URL=http://localhost.com:3000

### Run

into `./api` run:

 - `npm install`

 - `npm run start:debug`

into `./scrapping` run:

 - `npm install`

 - `npm run start`

input a link to start the scraping in `? input the start link:` 
question's terminal

### How can i see the links scrappeds?

`wget http://localhost.com:3000?limit=2&offset=2`

### Docker

 - `docker build ./api -t user/repository`

 - `docker run --name myscrapapi -p 3000:3000 user/repository`


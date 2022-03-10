# Crypocurrency Table

## Description
This project was developed using ReactJS, Redux, Typescript, Jest. It loads data via calling API endpoints in https://www.coingecko.com/en/api/documentation. As CSS is not required for this challenge, there's only basic CSS included.

The table page contains 
- a list of all cryptocurrencies,
- name/symbol filter,
- pagination,
- loading state,
- error handling, and 
- a modal with selected cryptocurrency details triggered by clicking on a row.

Unit tests were developed using Jest. As I finished this challenge using a couple of nights, I didn't have much time for writing unit tests for everything. Therefore, there's only unit test for `src/utilities/pagination.ts`

## Setup Application
### Clone the repo and install packages
```
$ git clone git@github.com:andih2013/Cryptocurrency.git
$ cd Cryptocurrency
$ npm install
```

### Run the application
```
$ npm run start
```
and open http://localhost:3000/ in browser

### Run unit tests
```
$ npm run test
```
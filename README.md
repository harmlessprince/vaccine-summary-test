# Vaccine Summary Data API

## Introduction

A mini Rest API endpoint that provides report on covid vaccine distribution summary using [**Data source**](https://www.ecdc.europa.eu/en/publications-data/data-covid-19-vaccination-eu-eea)


## Table of Contents
1. <a href="#how-it-works">How it works</a>
2. <a href="#technology-stack">Technology Stack</a>
3. <a href="#application-features">Application Features</a>
4. <a href="#api-endpoints">API Endpoints</a>
5. <a href="#setup">Setup</a>
6. <a href="#author">Author</a>
7. <a href="#license">License</a>

## How it works
  - Seed databased using the seed endpoint (Please this takes some couple of minutes due to weight of data)
  - Visit /vaccine-summary by supplying the neccesary filters to get summary of report.


## Technology Stack
  - [Typescript](https://www.typescriptlang.org/)
  - [NodeJs (NESTJS framework)](https://nestjs.com/)
  - [MongoDB](https://www.mongodb.com/)
  ### Testing tools
  - [Jest](https://jestjs.io/) 
  - [Postman](https://www.postman.com/)

## Application Features
* Seed data into database.
* Report vaccine summary based on supplied queries.


## API Endpoints
### Base URL = http://localhost:4000/

Method | Route | Description | Query Params
--- | --- | ---|---
`GET` | `/seed` | Populate database with data |
`GET` | `/vaccine-summary` | fetch vaccine summary data | dateFrom: yyyy-Www, eg. 2020-W10 (Including)  <br> dateTo: yyyy-Www, eg, 2020-W20 (Excluding) <br> range: number, eg, the period for which to calculate metrics <br> sort: either by NumberDosesReceived[descending], NumberDosesReceived[ascending] or weekStart [ascending], weekStart [descending]

### Query
 dateFrom => example: 2020-W10 <br>
 dateTo => 2020-W20 (dateTo must be greater than dateFrom, else you will get a validation error)
 range => This must be a postive number e.g 1, 2, 3 ,4 5 <br>
 sort => This can be used to sort covid data available values are 
- NumberDosesReceived[descending] 
- NumberDosesReceived[ascending] 
- weekStart[ascending]
- weekStart[descending]
 
 ### Seed database with Data
    ```
     http://localhost:4000/seed
    ```
 ### Fetch Vaccine summary data
 ```
  http://localhost:4000/vaccine-summary?c=AT&dateFrom=2022-W25&dateTo=2022-W28&range=1&sort=weekStart[descending]
 ```
## Setup
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

  #### Dependencies
  - [Docker](https://docs.docker.com/desktop/)
  - [Docker compose](https://docs.docker.com/compose/install/)
 
  #### Getting Started
  - Install and setup docker
  - Open terminal and run the following commands
    ```
    $ git clone https://github.com/harmlessprince/vaccine-summary-test.git
    $ cd vaccine-summary-test
    $ cp .env.example .env
    $ docker-compose build app
    $ docker-compose up
    ```
    If all goes well 
  - Visit http://localhost:4000/ on your browser you should get "Hello World" printed on your screen
  - Visit http://localhost:4000/seed on your postman. Note: wait a few minutes for seeding of data to complete, you will get a response
  
  if Seeding goes well, you should  get a response that looks like this 
  ```
   {
    "success": true,
    "message": "Database seeded successfully with 332346 data",
    "total": 332346
   }
  ```
  ### Testing
  ```
  $ npm run test
  ```
  If correctly setup, all tests should pass
  
  #### Stop Application
  
  ```$ docker-compose down```
  
## Author
 Name: Adewuyi Taofeeq <br>
 Email: realolamilekan@gmail.com <br>
 LinkenIn:  <a href="#license">Adewuyi Taofeeq Olamikean</a> <br>

## License
ISC

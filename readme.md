### Introduction

I get this nodejs boilerplate from https://github.com/kutia-software-company/express-typescript-starter. 

It's awesome nodejs boilerplate. 


### Installation

#### Step 1: Set up Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install a MySQL database.

> If you work with a mac, i recommend to use [DBngin](https://dbngin.com) for the installation.

Install Redis

#### Step 2: Application Set up and Configuration
Clone k-link-web app.

Create your database.

Change your config in `.env` file (especially for database connection).

Then setup your application environment.

```console
npm install
```

> This installs all dependencies with npm. So after that your development environment is ready to use.

#### Step 3: Data Migration and Seeding

- To migrate your database run `npm run typeorm migration:run`.

#### Step 4: Serve your App

Go to the project dir and start your app with this npm script.

```console
npm run dev
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://localhost:3000`.

#### Step 4: Access your App
Swagger API Docs -> http://localhost:3000/docs

Login to get access token -> 

curl -X 'POST' \
  'http://localhost:3000/api/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@email.com",
  "password": "password"
}'


Product list ->

curl -X 'GET' \
  'http://localhost:3000/api/products' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjE4MDIxNTEzLCJleHAiOjE2MTgxMDc5MTN9.Yflkrg6NDc2-lVFY6NUaAq7UEgVqW0rhkkZOEjYqKjo' \
  -H 'accept: application/json'

  Change Authorization token with access token that you get from login above.


Cart list ->

curl -X 'GET' \
  'http://localhost:3000/api/carts' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjE4MDIxNTEzLCJleHAiOjE2MTgxMDc5MTN9.Yflkrg6NDc2-lVFY6NUaAq7UEgVqW0rhkkZOEjYqKjo' \
  -H 'accept: application/json'

  Change Authorization token with access token that you get from login above.


Add item to Cart ->

curl -X 'POST' \
  'http://localhost:3000/api/carts/add-item' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjE4MDIxNTEzLCJleHAiOjE2MTgxMDc5MTN9.Yflkrg6NDc2-lVFY6NUaAq7UEgVqW0rhkkZOEjYqKjo' \
  -d '{
  "trans_date": "2021-04-10 10:10:10",
  "trans_no": "T-000-001",
  "user_email": "ariawan@example.com",
  "product_name": "PROPOLIS",
  "price": 100000,
  "quantity": 3,
  "checkout": ""
}'

curl -X 'POST' \
  'http://localhost:3000/api/carts/add-item' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjE4MDIxNTEzLCJleHAiOjE2MTgxMDc5MTN9.Yflkrg6NDc2-lVFY6NUaAq7UEgVqW0rhkkZOEjYqKjo' \
  -d '{
  "trans_date": "2021-04-10 10:10:10",
  "trans_no": "T-000-001",
  "user_email": "ariawan@example.com",
  "product_name": "MADU",
  "price": 150000,
  "quantity": 5,
  "checkout": ""
}'

curl -X 'POST' \
  'http://localhost:3000/api/carts/add-item' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjE4MDIxNTEzLCJleHAiOjE2MTgxMDc5MTN9.Yflkrg6NDc2-lVFY6NUaAq7UEgVqW0rhkkZOEjYqKjo' \
  -d '{
  "trans_date": "2021-04-11 11:11:11",
  "trans_no": "T-000-002",
  "user_email": "ariawan@example.com",
  "product_name": "MADU",
  "price": 150000,
  "quantity": 5,
  "checkout": ""
}'


Cart checkout ->

curl -X 'POST' \
  'http://localhost:3000/api/carts/checkout/T-000-001' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjE4MDIxNTEzLCJleHAiOjE2MTgxMDc5MTN9.Yflkrg6NDc2-lVFY6NUaAq7UEgVqW0rhkkZOEjYqKjo'


Payment checkout ->

curl -X 'POST' \
  'http://localhost:3000/api/carts/payment/T-000-001' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjE4MDIxNTEzLCJleHAiOjE2MTgxMDc5MTN9.Yflkrg6NDc2-lVFY6NUaAq7UEgVqW0rhkkZOEjYqKjo'


Users list -> 

curl -X 'GET' \
  'http://localhost:3000/api/users' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjE4MDIxNTEzLCJleHAiOjE2MTgxMDc5MTN9.Yflkrg6NDc2-lVFY6NUaAq7UEgVqW0rhkkZOEjYqKjo' \
  -H 'accept: application/json'

  Change Authorization token with access token that you get from login above.

Create new user ->

curl -X 'POST' \
  'http://localhost:3000/api/users' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNjE4MDIxNTEzLCJleHAiOjE2MTgxMDc5MTN9.Yflkrg6NDc2-lVFY6NUaAq7UEgVqW0rhkkZOEjYqKjo' \
  -d '{
  "first_name": "ariawan",
  "last_name": "graha",
  "email": "ariawan@example.com",
  "password": "mautauaja"
}'

 Change Authorization token with access token that you get from login above.

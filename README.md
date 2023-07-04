# Productlance-Ecommerce Application
A REST API based eCommerce Web application handling all basic functionalities like : 
- cart functionality 
- checkout functionality
- Product reviews
- Admin product management
- User Authentication and profile
- Admin side Orders list
- previous orders on user profile 
- dummy payment feature using PayPal sandbox accounts

## Techstack:
- frontend: React, Redux , react-bootstrap
- backend : Node.js, Express.js, MongoDB

## Deploying on local machine
frontend runs on 3000 and backend runs on 5000
### Install dependencies
```
npm install
cd frontend
npm install
```
### Add .env file 
add the environment variables in .env file
```
PORT =5000
NODE_ENV= development
MONGO_URI= your mongodb uri 
JWT_SECRET= your jwt secret
PAYPAL_CLIENT_ID = your developer paypal client ID
```
### Run
make sure be in root directory while running the following commands
```
npm run dev
```

## Build and deploying
```
cd frontend
npm run build
```





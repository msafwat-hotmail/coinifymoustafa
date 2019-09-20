# Coinify Solution @ Moustafa Safwat

This is a ATM Withdraw sloution for Coinify assignment by Moustafa Safwat.

## Ecosystem

UI

- React
- Matrial UI

Backend

- AWS Lambda (Nodejs10.x)
- AWS API Gateway
- AWS DynamoDB

Unit Testing

- Jest

Archticture

- Serverless and Microservices

## Prerequisites

- Nodejs 10.x
- Docker
- AWS CLI
- SAM

## Run The Application

```bash
# Set AWS credential profile. Access Key and Access Secret.
$ vi ~/.aws/credentials

# Deploy Lamdas and API Gateway with Infrastructure As Code.
$ sam package --output-template-file packaged.yaml --s3-bucket sam-app-deploy --region us-east-1 --profile 'Moustafa AWS Profile'

$ sam deploy --template-file packaged.yaml --stack-name coinify --capabilities CAPABILITY_IAM --region us-east-1 --profile 'Moustafa AWS Profile'

# Update UI .env "REACT_APP_API_BASE_URL" with API Gateway URL.
aws cloudformation describe-stacks \
    --stack-name coinify \
    --query 'Stacks[].Outputs[?OutputKey==`{ApiName}`]' \
    --output table

# Run UI local. (It's up to you if you like to run from S3 Website).
$ cd ui
$ npm i
$ npm start

## Note:
# You might require to Enable CORS for Api Gateway Resources.
# AWS Console > Api Gateway > Create New Model> application/json with empty schema {} > on each Resource > Enable CORS
# on OPTIONS method> Add method response 200 > Add response model with schema > Deploy API
```

## Endpoints

- GET /accounts
- POST /accounts/verifyPIN
- POST /operations/withdraw (Not implmented, should be another microservice)

## Testing

Accounts Microservice

```bash
$ cd accounts
$ npm install
$ npm run test
```

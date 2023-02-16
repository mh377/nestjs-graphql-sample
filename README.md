### Instructions

Run `yarn install` to install the required node modules

To start the service run `yarn start` and it will start the service on `http://localhost:3000/`

The service contains a REST endpoint and a GraphQL endpoint.

#### REST

To call the REST endpoint import the postman collection `users.postman_collection.json` postman and click send.

It contains the following `GET` request

headers: `x-request-id`: `581e5da1-ccc0-49d4-853c-03f2323dd44d`
url: `http://localhost:3000/`

You should recieve a 200 status code with the following response:

`
{
    "id": 1,
    "title": "Mr",
    "firstname": "Test",
    "surname": "User"
}
`

The logs should be formatted as follows with the supplied `x-request-id` as configured in the `src/logger.module.ts`:

`
[2023-02-16T10:45:09.748Z] INFO: 581e5da1-ccc0-49d4-853c-03f2323dd44d [AppController] Received a REST request to retrieve a user with id 1
[2023-02-16T10:45:09.748Z] INFO: 581e5da1-ccc0-49d4-853c-03f2323dd44d [AppService] Found user with id 1
`

#### GraphQL

To call the GrapqhQL endpoint open the GraphQL playground using `http://localhost:3000/graphql` and enter the following `Query`:

`
{
  getUser(userId: 1) {
    title,
    firstname,
    surname
  }
}
`

with the following http headers

`
{
  "x-request-id":"12970634-7d3a-4a55-a3f7-f5a348c513e3"
}
`


The logs should be formatted as they were for the REST request but they DO NOT contain the `x-request-id` that was supplied

`
[2023-02-16T10:51:38.807Z] INFO:  [AppResolver] Received a GraphQL request to retrieve a user with id 1
[2023-02-16T10:51:38.807Z] INFO:  [AppService] Found user with id 1
`
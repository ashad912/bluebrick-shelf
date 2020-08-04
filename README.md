# **Bluebrick Shelf**

Users rate provided books, and get a feed of books recently rated by other users.
User is able to sign up, sign in and sign out.


## Setup

### Using docker-compose: 

#### Run app:
1. Run: docker-compose up --build

#### Run tests:
1. Run: docker-compose build
2. Run: docker-compose run node-app npm test

### Manually:

#### Run app:
1. Install and run MongoDB server
2. Run: npm start

#### Run tests:
1. Install and run MongoDB server
2. Run: npm test

## API Documentation

At the server start, app clears up all existing activities and populates five sample books to the db. A token attached to cookie is used for authentication. To test app conveniently, use Postman (files are attached in `<root>/postman`).

Server listens to **localhost:4000**.

**Warning!** If you user Docker Toolbox or Minikube, server will listen to **192.168.99.100:4000**.

### POST - /api/signup

User can register to app using valid email and password has at least 7 characters long.

Body schema:
~~~
 {
     email: user1@test.com
     password: secretpass
 }
~~~
### POST - /api/signin

User can sign in to already registered account.

Body schema:
~~~
 {
     email: user1@test.com
     password: secretpass
 }
~~~

### POST - /api/signout

User can sign out from already signed in account.
No body required.

### POST - /api/rate

User can rate and review book. User must be signed in to perform this action.

Body schema:
~~~
{
    "bookNo": 5,
    "rate": 8,
    "review": "Addictive!"
}
~~~

- **bookNo** field has to be integer number from 1 to 5 (pointers to populated books).

- **rate** field has to be integer number from 1 to 10.

- **review** field is OPTIONAL, has to be up to 200 characters long.

Additional fields are ignored.

### GET - /api/feed

User can fetch a feed of books rated by other users after user registration date. User can never see the same action twice in different requests. User can never see own actions. User must be signed in to perform this action.









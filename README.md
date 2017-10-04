# Bucket List API

REST API that is a patr of "My Bucket List" MEAN stack application.

Gives ability to:
* create new users
* change user password
* delete existing user
* check if given user exists
* check if given username and password is correct
* load user data
* create new goal for logged user
* complete given goal for logged user
* edit given goal for logged user
* remove given goal for logged iser

Built on Node.js, Express and connected to MongoDB database hosted on https://mlab.com/

## API documentation

### Base URL:

http://my-bucket-list-api.herokuapp.com/

### Endpoints:

All of the endpoints are POST type endpoints.

**/login**

...

Parameters:
* username - user's login
* password - user's password

**/newuser**

...

Parameters:
* username - user's login
* password - user's password

**/checkusername**

...

Parameters:
* username - user's login

**/getuser**

...

Parameters:
* username - user's login

**/changepassword**

...

Parameters:
* username - user's login
* password - user's password

**/deleteuser**

...

Parameters:
* username - user's login

**/addgoal**

...

Parameters:
* username - user's login
* goal - goal description
* dateAdded - date when a goal was added to user's list

**/completegoal**

...

Parameters:
* username - user's login
* id - goal's id
* dateDone - date when a goal was completed

**/editgoal**

...

Parameters:
* username - user's login
* id - goal's id
* goal - goal description
* dateAdded - date when a goal was added to user's list
* done - whether a goal is done or not (true | false)
* dateDone - date when a goal was completed

**/deletegoal**

...

Parameters:
* username - user's login
* id - goal's id

## The application:

Application that uses that API can be found under the following URL: https://michalw1988.github.io/my-bucket-list/
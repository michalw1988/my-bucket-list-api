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

Checks if given username and password pair exists in the database.

If executed correctly, returns status 200 and "Login OK" or "Login failed" message.

Parameters:
* username - user's login
* password - user's password

**/newuser**

Creates new user in the database and assigns him a password. 

If executed correctly, returns status 200 and "User created" message.

Parameters:
* username - user's login
* password - user's password

**/checkusername**

Checks if given username exists in the database.

If executed correctly, returns status 200 and "Username taken" or "Username is free" message.

Parameters:
* username - user's login

**/getuser**

Gets all data for given username from the database.

If executed correctly, returns status 200 and entire user document.

Parameters:
* username - user's login

**/changepassword**

Chagnes password for given username.

If executed correctly, returns status 200 and "Password changed" message.

Parameters:
* username - user's login
* password - user's password

**/deleteuser**

Removes given user from the database.

If executed correctly, returns status 200 and "User deleted" message.

Parameters:
* username - user's login

**/addgoal**

Adds new goal for given user.

If executed correctly, returns status 200 and "Goal added" message.

Parameters:
* username - user's login
* goal - goal description
* dateAdded - date when a goal was added to user's list

**/completegoal**

For given user, marks goal with given id as done and sets a completion date.

If executed correctly, returns status 200 and "Goal completed" message.

Parameters:
* username - user's login
* id - goal's id
* dateDone - date when a goal was completed

**/editgoal**

For given user, assigns new values for goal with given id.

If executed correctly, returns status 200 and "Goal edited" message.

Parameters:
* username - user's login
* id - goal's id
* goal - goal description
* dateAdded - date when a goal was added to user's list
* done - whether a goal is done or not (true | false)
* dateDone - date when a goal was completed

**/deletegoal**

For given user, removes goal with given id.

If executed correctly, returns status 200 and "Goal deleted" message.

Parameters:
* username - user's login
* id - goal's id

## The application:

Application that uses that API can be found under the following URL: https://michalw1988.github.io/my-bucket-list/
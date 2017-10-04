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

Built on Node.js, Express and connected to MongoDB database hosted on mlab.com.

## API documentation

### Base URL:

http://my-bucket-list-api.herokuapp.com/

### Endpoints:

All of the endpoints are POST type endpoints.

**/login**

...

Parameters:
* username - ...
* password - ...

**/newuser**

...

Parameters:
* username - ...
* password - ...

**/checkusername**

...

Parameters:
* username - ...

**/getuser**

...

Parameters:
* username - ...

**/changepassword**

...

Parameters:
username - ...
password - ...

**/deleteuser**

...

Parameters:
* username - ...

**/addgoal**

...

Parameters:
* username - ...
* goal - ...
* dateAdded - ...

**/completegoal**

...

Parameters:
* username - ...
* id - ...
* dateDone - ...

**/editgoal**

...

Parameters:
* username - ...
* id - ...
* goal - ...
* dateAdded - ...
* done - ...
* dateDone - ...

**/deletegoal**

...

Parameters:
* username - ...
* id - ...

## The application:

Application that uses that API can be found under the following URL: https://michalw1988.github.io/my-bucket-list/
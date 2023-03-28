
# Routing APIs




## User APIs
APIs called by the user during authentication

### Login
##### This API is used for user authentication by checking the login credentials provided in the request body.
#### 

```http
  POST /api/login
```
#
#### Body:

{
  "email": "Jon@fluxmarine.com",
  "password": "fluxmarine"
}
#

#### Success Response

* Code 200


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `success` | `boolean` | Display Authentication Status |
| `message` | `string` | Display successful Login message |
| `data` | `varchar` | Data Token |
| `id` | `int` | User ID |
| `name` | `varchar` | Username |
| `email` | `varchar` | User Email |

#### Error Response 

* Code 400 - Username/Password missing
* Code 401 - Wrong credentials
* Code 403 - User already loggedin
* Code 500 - Server error
# 

### Signup
##### This API is used for creating a new user account by providing the required user information in the request body.
#### 

```http
  POST /api/signup
```
#
#### Body:

{
  "name": "Jon Lord",
  "email": "Jon@fluxmarine.com",
  "password": "fluxmarine"
}
# 

#### Success Response

* Code 200 - User created successfully


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `success` | `boolean` | Display Authentication Status |
| `message` | `string` | Display successful User created message |
| `data` | `varchar` | Data Token(contains id, name and email ) |


#### Error Response 

* Code 400 - Username/Password missing
* Code 409 - User already exists
* Code 500 - Server error
# 

### Get All Users
##### This API retrieves a list of all users from the database.
#### 

```http
  GET /api/signup
```
#
#### Body:

{
  "name": "Jon Lord",
  "email": "Jon@fluxmarine.com",
  "password": "fluxmarine"
}
# 

#### Success Response

* Code 200 - User created successfully


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `success` | `boolean` | Display Authentication Status |
| `message` | `string` | Display successful User created message |
| `data` | `varchar` | Data Token(contains id, name and email ) |


#### Error Response 

* Code 400 - Username/Password missing
* Code 409 - User already exists
* Code 500 - Server error
# 

### Delete Users
##### This API is used for deleting a user by email. The email of the user to be deleted is provided in the request body.
#### 

```http
  DELETE /api/user
```
#
#### Body:

{
  "email": "Jon@fluxmarine.com"
}
# 

#### Success Response

* Code 200 - Successfully deleted User

#### Error Response 

* Code 400 - Email to be deleted is missing
* Code 401 - User not authorized
* Code 404 - User not found
* Code 409 - User cannot delete self
* Code 500 - Server error
# 

### Update Users
##### This API is used for updating a user by email. The email of the user to be updated is provided in the request body. Only admin can change this role
#### 

```http
  PUT /api/user
```
#
#### Body:

{
  "email": "Jon@fluxmarine.com"
}
# 

#### Success Response

* Code 200 - Successfully deleted User

#### Error Response 

* Code 400 - Email to be updated is missing
* Code 401 - User not authorized
* Code 404 - User not found
* Code 409 - User cannot update self
* Code 500 - Server error
# 

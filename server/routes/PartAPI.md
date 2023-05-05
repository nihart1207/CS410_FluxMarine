
## Part APIs
This document provides the details of the API called for the Parts resource.



### Get All Parts
##### This API retrives all existing Part details from the Database.
#### 

```http
  GET /api/parts
```


#

#### Success Response

* Code 200 - Data Fetched Successfully


#### Error Response 
* Code 500 - Server error
# 

### Add new Part
##### This API is used to add new Part details to the Database
#### 

```http
  POST /api/part
```
#
#### Body:

{
  "partName": "abc", 
  "partDescription": "xyz"
}
# 

#### Success Response

* Code 200 - Successfully added new Part

#### Error Response 

* Code 401 - Unathorized to add
* Code 500 - Server error
# 

### Delete Part by ID
##### This API deletes a specific part data by ID
#### 

```http
  DELETE /api/part/:_id
```
#
#### Body:

{
  "_id" : 1
}
# 

#### Success Response

* Code 200 - Successfully removed part

#### Error Response 

* Code 401- Unathorized
* Code 500 - Server error
# 

### Get Part by ID
##### This API displays details of an existing part in the database with the corresponding id. 
#### 

```http
  GET /api/part/:_id
```
#
#### Body:

{
  "_id": 1
}
# 

#### Success Response

* Code 200 - OK 

#### Error Response 

* Code 500 - Server error
# 

### Update Part by ID
##### This API updates a specific part item from the database.
#### 

```http
  PUT /api/part/:_id
```
#
#### Body:

{
  "id": 1
}
# 

#### Success Response

* Code 200 - Successfully Added
#### Error Response 

* Code 401 - Unathorized to add
* Code 404 - Part not found
* Code 500 - Server error
# 


## Supplier APIs
This document provides the details of the API endpoints for the Supplier resource.


Authentication is not required to access these endpoints.
### Get All Suppliers
##### This API retrives all existing Suppliers
#### 

```http
  GET /api/getAllSuppliers
```


#

#### Success Response

* Code 200 - Data Fetched Successfully


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `success` | `boolean` | Displays Status |
| `data` | `varchar` | Displays data |

#### Error Response 
* Code 500 - Server error
# 

### Add New Supplier
##### This API is used to add new Supplier to the Database
#### 

```http
  POST /api/addNewSupplier
```
#
#### Body:

{
  "Company name": "Fluxmarine", 
  "Contact Person": Jon Lord
  "email": "Jon@fluxmarine.com",
  "Contact Number": "1234567890"
  "Company Address": "abcd"
}
# 

#### Success Response

* Code 200 - Successfully added new Supplier

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `success` | `boolean` | Displays Status |
| `data` | `varchar` | Displays data |


#### Error Response 

* Code 401 - Unathorized to add
* Code 500 - Server error
# 

### Update Supplier by ID
##### This API updates a Supplier data by ID
#### 

```http
  PUT /api/supplier/:_id
```
#
#### Body:

{
  "Company name": "Fluxmarine", 
  "Contact Person": Jon Lord
  "email": "Jon@fluxmarine.com",
  "Contact Number": "1234567890"
  "Company Address": "abcd"
}
# 

#### Success Response

* Code 200 - Supplier data updated successfully

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `success` | `boolean` | Displays Status |
| `data` | `varchar` | Displays data |

#### Error Response 

* Code 404 - Supplier Doesn't exist
* Code 500 - Server error
# 

### Delete Supplier by ID
##### This API is used for deleting an existing supplier by ID
#### 

```http
  DELETE /api/suppler/:_id
```
#
#### Body:

{
  "_id": 1
}
# 

#### Success Response

* Code 200 - Supplier removed successfully 

#### Error Response 

* Code 404 - Supplier not found
* Code 500 - Server error
# 

### Get Supplier by ID
##### This API is used to get Supplier details by providing supplier ID
#### 

```http
  GET /api/supplier/:id
```
#
#### Body:

{
  "id": 1
}
# 

#### Success Response

* Code 200 - Data Fetched Successfully

#### Error Response 


* Code 404 - User not found
* Code 500 - Server error
# 

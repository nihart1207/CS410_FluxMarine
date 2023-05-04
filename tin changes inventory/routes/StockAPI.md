
## Stock APIs
This document provides the details of the API called for the Stocks resource.



### Get All Stocks
##### This API retrives all existing Stock details from the Database.
#### 

```http
  GET /api/stocks
```


#

#### Success Response

* Code 200 - Data Fetched Successfully


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `int` | Displays id |
| `supplier` | `varchar` | Displays supplier name |
| `part` | `varchar` | Displays part name |
| `status` | `varchar` | Displays part status |
| `notes` | `varchar` | For additional notes |

#### Error Response 
* Code 500 - Server error
# 

### Create new Stock
##### This API is used to add new Stock details to the Database
#### 

```http
  POST /api/stock
```
#
#### Body:

{
  "notes": "abcdefg", 
  "supplier id": 1
  "part id": "123",
  
}
# 

#### Success Response

* Code 200 - Successfully added new Stock

#### Error Response 

* Code 401 - Unathorized to add
* Code 404 - Supplier id/part number not provided
* Code 500 - Server error
# 

### Get Stock by ID
##### This API retrieves a specific stock data by ID
#### 

```http
  PUT /api/stock/:id
```
#
#### Body:

{
  "id" : 1
}
# 

#### Success Response

* Code 200 - Stock data fetched successfully

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | Displays ID |
| `supplier` | `varchar` | Displays supplier name |
| `part` | `varchar` | Displays part name |
| `status` | `varchar` | Displays part status |
| `notes` | `varchar` | For additional notes |

#### Error Response 

* Code 404 - Stock not found
* Code 500 - Server error
# 

### Update Stock by ID
##### This API updates an existing stock item in the database with the corresponding id. 
#### 

```http
  PUT /api/stock/:id
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

### Delete Stock by ID
##### This API deletes a specific stock item from the database.
#### 

```http
  DELETE /api/stock/:id
```
#
#### Body:

{
  "id": 1
}
# 

#### Success Response

* Code 200 - Stock item deleted

#### Error Response 


* Code 404 - Stock not found
* Code 500 - Server error
# 

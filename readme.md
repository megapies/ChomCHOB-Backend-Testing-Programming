# API description
## Register
Use for register to be user.
* **API for** : User only
* **method** : POST
* **path** : /register
* **input** :
  * **username** : username to register (*body*)
  * **password** : password for username (*body*)
  * **first_name** : first name of user (*body*)
  * **last_name** : last name of user (*body*)
* **output** :
  ```
  {
    "username": username,
    "firstName": first name,
    "lastName": last name,
    "publicId": public id of this user
  }
  ```
## Login
Use for login to platform.
* **API for** : User, Admin
* **methhod** : POST,
* **path** : /login
* **input** :
  * username : username for login (*body*)
  * password : password (*body*)
* **output** :
  ```
  {
    "user": {
      "username": username,
      "firstName": first name,
      "lastName": last name,
      "publicId": public ID,
      "role": role of user
    },
    "accessToken": access token for call others API
  }
  ```

## Create Currency
Use for create new curency
* **API for** : Admin only
* **method** : POST
* **path** : /currency
* **input** :
  * **access-token** : access token from login API (*header*)
  * **currency_name** : currency name (*body*)
* **output** :
  ```
  {
    "id": ID of new currency,
    "name": name of new currency,
  }
  ```

## Get All Currency
Use for query all currency
* **API for** : User, Admin
* **method** : GET
* **path** : /currency
* **input** :
  * **access-token** : access token
* **output** :
  ```
  [
    {
      "id" : ID of currency,
      "name" : name of currency
    }
  ]
  ```

## Modufy Exchange Rate
Use for modify exchange rate.
* **API for** : Admin only
* **method** : PUT
* **path** : /exchangeRate/:from_id/:to_id
* **input** :
  * access-token : access token (*header*)
  * from_id : from currency ID (*params*)
  * to_id : to currency ID (*params*)
  * rate : new exchange rate (*body*)
* **output** :
  ```
  {
    "from" : from currency ID,
    "to" : to currency ID,
    "rate" : exchanger rate
  }
  ```

## Get Exchange Rate
Use for query exchange rate.
* **API for** : User, Admin
* **method** : GET
* **path** : /exchangeRate/:from_id/:to_id
* **input** :
  * **access-token** : access token (*header*)
  * **from_id** : from currency ID (*params*)
  * **to_id** : to currency ID (*params*)
* **output** :
  ```
  {
    "from" : from currency ID,
    "to" : to currency ID,
    "rate" : exchange rate
  }
  ```

## Get Balance
Use for query all currency balance
* **API for** : User only
* **method** : GET
* **path** : /balance
* **input** :
  * **access-token** : access token (*header*)
* **output** :
  ```
  [
    {
      "currency": {
        "id": ID of currency,
        "name": name of currency,
      },
      "balance": balance of this currency 
    }
  ]
  ```

## Get User Balance
Use for query all currency balance of target user.
* **API for** : Admin only
* **method** : GET
* **path** : /balance/user/:user_id
* **input** :
  * **access-token** : access token (*header*)
  * **user_id** : ID of target user (*params*)
* **output**
  ```
  [
    {
      "currency": {
        "id": ID of currency,
        "name": name of currency,
      },
      "balance": balance of this currency 
    }
  ]
  ```

## Increase User Balance
Use for increase currency balance of target user.
* **API for** : Admin only
* **method** : PUT
* **path** : /balance/increase
* **input** :
  * **access-token** : access token (*header*)
  * **user_id** : ID of target user (*body*)
  * **currency_id** : ID of target currency (*body*)
  * **amount** : amount to increase
* **output** :
  ```
  {
    "id" : ID of wallet,
    "user_id" : ID of user,
    "currency_id" : ID of currency,
    "balance" : current balance,
    "User" : {
      "id" : Id of user,
      "username" : username,
      "firstName" : first name,
      "lastName" : last name,
      "publicId" : public ID,
      "role" : role
    }
  }
  ```

## Decrease User Balance
Use for Decrease currency balance of target user.
* **API for** : Admin only
* **method** : PUT
* **path** : /balance/decrease
* **input** :
  * **access-token** : access token (*header*)
  * **user_id** : ID of target user (*body*)
  * **currency_id** : ID of target currency (*body*)
  * **amount** : amount to decrease
* **output** :
  ```
  {
    "id" : ID of wallet,
    "user_id" : ID of user,
    "currency_id" : ID of currency,
    "balance" : current balance,
    "User" : {
      "id" : Id of user,
      "username" : username,
      "firstName" : first name,
      "lastName" : last name,
      "publicId" : public ID,
      "role" : role
    }
  }
  ```

## Transfer currency
Use for transfer currency to another user.
* **API for** : User only
* **method** : POST
* **path** : /transfer
* **input** :
  * **access-token** : access token (*header*)
  * **receiver_public_id** : receiver public ID (*body*)
  * **orgin_currency_id** : origin currency to transfer (*body*)
  * **new_currency_id** : new currency to transfer (*body*)
  * **amount** : amount to transfer (in origin currency) (*body*)
* **output** :
  ```
  {
    "id" : ID of transaction,
    "refNum" : reference number of transaction,
    "sender" : ID of sender user,
    "receiver" : ID of receiver user,
    "origin_currency" : origin currency ID,
    "new_currency" : new currency ID,
    "exchangeRate" : exchange rate to transfer,
    "amount" : amount to transfer
  }
  ```
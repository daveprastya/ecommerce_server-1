# ecommerce_server

**POST LOGIN**
----
  Login to application

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkYXZlIHByYXN0eWEiLCJlbWFpbCI6ImRhdmUuYWRtaW5AZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA1MTExNDgxfQ.3fBh6HiiT8OCEokqGvvkZncMeEui6etn86Fuz-w0Rlk",
    "username": "dave prastya"
}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong Email / Password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`


**GET PRODUCTS**
----
  Fetch data Product from database

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `token=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 2,
        "name": "Emas antam 10 gram",
        "imgUrl": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//108/MTA-7797816/antam_logam_mulia_10_gram_-_lm_antam_-_emas_batangan_kepingan_10_gram_full01_efipx8jq.jpg",
        "price": 9810900,
        "stock": 6,
        "createdAt": "2020-11-11T07:33:04.370Z",
        "updatedAt": "2020-11-11T07:33:04.370Z"
    },
    {
        "id": 3,
        "name": "Iphone 11 256GB",
        "imgUrl": "https://static.bmdstatic.com/pk/product/medium/5de487365acd1.jpg",
        "price": 16999000,
        "stock": 7,
        "createdAt": "2020-11-11T07:47:56.035Z",
        "updatedAt": "2020-11-11T09:57:33.315Z"
    }
]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication Failed!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`


**POST PRODUCTS**
----
  Add Product to database

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `token=[string]`

* **Data Params**

  **Required:**

   `name=[string]`
   `imgUrl=[string]`
   `price=[integer]`
   `stock=[integer]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{
    "id": 4,
    "name": "Tolak angin",
    "imgUrl": "https://www.watsons.co.id/medias/SM-TOLAK-ANGIN-CAIR-5S-14250.jpg?context=bWFzdGVyfGZyb250L3pvb218NjEyMjY3fGltYWdlL2pwZWd8ZnJvbnQvem9vbS84ODk2NTA3MjgxNDM4LmpwZ3xkZjMwM2FhMTUzOGU2MjUzNjg0OTA5ODU4ZTI2ZTBjNGY1ZDZkMmFhNDFmNjczM2RlMjcwOTEyNjM1NGRmY2Jk",
    "price": 15000,
    "stock": 10,
    "updatedAt": "2020-11-11T16:41:06.065Z",
    "createdAt": "2020-11-11T16:41:06.065Z"
}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication Failed!" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authorization Failed!" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Product Name is required!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "ImgUrl is required!" }`
    
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Price is required!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Price must be greater than 0!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Price must be in numeric!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Stock is required!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Stock must be in numeric!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Stock must be greater than 0!" }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`


**PUT PRODUCTS**
----
  Edit Product from database and send product back to database

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
* **URL Params**

  **Required:**
 
   `token=[string]`
   `id=[integer]`

* **Data Params**

  **Required:**

   `name=[string]`
   `imgUrl=[string]`
   `price=[integer]`
   `stock=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[
      1
    ]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication Failed!" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authorization Failed!" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Product Name is required!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "ImgUrl is required!" }`
    
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Price is required!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Price must be greater than 0!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Price must be in numeric!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Stock is required!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Stock must be in numeric!" }`
  
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Stock must be greater than 0!" }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`


**DELETE PRODUCTS**
----
  Delete product from database

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
* **URL Params**

  **Required:**
 
   `token=[string]`
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[
      1
    ]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication Failed!" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authorization Failed!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`
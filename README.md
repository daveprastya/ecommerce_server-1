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


**POST REGISTER**
----
  REGISTER to application

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
 
   `username=[string]`
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 12,
    "username": "davin3",
    "email": "davin3@email.com",
    "password": "$2a$10$hKrcTrdVW4VqhfFWrdPSzezxQwk3eH5qsjiU0DJIo4W6Vra4eBCBy",
    "updatedAt": "2020-11-19T02:17:32.233Z",
    "createdAt": "2020-11-19T02:17:32.233Z",
    "role": "user"
}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong Email / Password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`



**GET CART**
----
  Fetch data cart to application

* **URL**

  /carts

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
 
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "count": "3",
        "UserId": 11,
        "Product": {
            "id": 5,
            "name": "Samsung Galaxy S20 Plus Smartphone [128GB/ 8GB]",
            "imgUrl": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//105/MTA-6387666/samsung_samsung_galaxy_s20_plus_-8gb-128gb-_-_garansi_resmi_full41_eyqnl31b.jpg",
            "price": 10660000,
            "stock": 17,
            "CategoryId": 2,
            "createdAt": "2020-11-14T06:31:37.804Z",
            "updatedAt": "2020-11-14T06:31:37.804Z"
        }
    },
    {
        "count": "1",
        "UserId": 11,
        "Product": {
            "id": 8,
            "name": "Sepatu Nike Airmax 720 New Series Running Pria - Abu-abu, 39",
            "imgUrl": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/10/27/9458263/9458263_1328d10f-5b57-4a63-9639-cae6036f2f75_800_800.jpg",
            "price": 165000,
            "stock": 15,
            "CategoryId": 1,
            "createdAt": "2020-11-14T09:40:28.878Z",
            "updatedAt": "2020-11-14T09:40:28.878Z"
        }
    },
    {
        "count": "1",
        "UserId": 11,
        "Product": {
            "id": 10,
            "name": "Precious Bee Gentle Laundry Liquid Bottle [1000 mL]",
            "imgUrl": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//91/MTA-4524346/precious_bee_precious_bee_gentle_laundry_liquid_bottle_-1000_ml-_full02_cez1fpvz.jpg",
            "price": 33000,
            "stock": 50,
            "CategoryId": 6,
            "createdAt": "2020-11-14T09:49:33.673Z",
            "updatedAt": "2020-11-14T09:49:33.673Z"
        }
    }
]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong Email / Password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`


**POST CART**
----
  Add data cart to application

* **URL**

  /carts

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
 
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      ProductId: 2
      UserId: 11
      createdAt: "2020-11-19T03:02:29.875Z"
      id: 6
      updatedAt: "2020-11-19T03:02:29.875Z"
    }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong Email / Password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`


**DELETE CART**
----
  Delete all data cart to application / Remove item from cart

* **URL**

  /carts/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   `ProductId=[string]`

* **Data Params**

  **Required:**
 
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
      1
    ]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong Email / Password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`


**DECREASE CART**
----
  Decrease data qty of item in cart

* **URL**

  /carts/decrease/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   `ProductId=[string]`

* **Data Params**

  **Required:**
 
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
      1
    ]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong Email / Password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : NULL }`
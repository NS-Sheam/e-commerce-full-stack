# Multivendor E-commerce Website

## `User Routes`

### create Customer

- **Method:** **`POST`**
- **Endpoint:** **`/users/create-customer`**
  **Request Body:**

```json
{
  "password": "customer123",
  "customer": {
    "userName": "customer",
    "name": {
      "firstName": "Customer",
      "middleName": "Nazmus",
      "lastName": "Sakib"
    },
    "gender": "male",
    "email": "customer@example.com",
    "mobileNo": "012323232323",
    "image": "https://example.com/profile.jpg"
  }
}
```

### create Vendor

- **Method:** **`POST`**
- **Endpoint:** **`/users/create-vendor`**
  **Request Body:**

```json
{
  "password": "vendor123",
  "vendor": {
    "userName": "vendor",
    "name": {
      "firstName": "Vendor",
      "middleName": "Nazmus",
      "lastName": "Sakib"
    },
    "email": "vendo2@example.com",
    "mobileNo": "1234567893",
    "image": "https://example.com/john-doe.jpg"
  }
}
```

### create Admin

- **Method:** **`POST`**
- **Endpoint:** **`/users/create-admin`**
  **Request Body:**

```json
{
  "password": "admin123",
  "admin": {
    "userName": "Admin",
    "name": {
      "firstName": "Admin",
      "middleName": "Nazmus",
      "lastName": "Sakib"
    },
    "email": "admin@example.com",
    "mobileNo": "12345678961",
    "image": "https://example.com/john-doe.jpg"
  }
}
```

### make Vendor

- **Method:** **`PATCH`**
- **Endpoint:** **`/users/make-vendor/_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN>
```

### Get Me

- **Method:** **`GET`**
- **Endpoint:** **`/me`**

#### Headers

```bash
Authorization <USER_ACCESS_TOKEN>
```

---

## `Customer Routes`

### Get All customers

- **Method:** **`GET`**
- **Endpoint:** **`/customers`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | CUSTOMER_ACCESS_TOKEN>
```

### Get Single Customer

- **Method:** **`GET`**
- **Endpoint:** **`/customers/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | CUSTOMER_ACCESS_TOKEN>
```

### Update Single Customer

- **Method:** **`PATCH`**
- **Endpoint:** **`/customers/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | CUSTOMER_ACCESS_TOKEN>
```

**Request Body:**

```json
{
  "customer": {
    "name": {
      "firstName": "Sakib"
    }
    // Other field to update
  }
}
```

### Delete Single Customer

- **Method:** **`DELETE`**
- **Endpoint:** **`/customers/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | CUSTOMER_ACCESS_TOKEN>
```

---

## `Vendor Routes`

### Get All vendors

- **Method:** **`GET`**
- **Endpoint:** **`/vendors`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | VENDOR_ACCESS_TOKEN>
```

### Get Single Vendor

- **Method:** **`GET`**
- **Endpoint:** **`/vendors/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | VENDOR_ACCESS_TOKEN>
```

### Update Single Vendor

- **Method:** **`PATCH`**
- **Endpoint:** **`/vendors/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | VENDOR_ACCESS_TOKEN>
```

**Request Body:**

```json
{
  "vendor": {
    "name": {
      "firstName": "Sakib"
    }
    // Other field to update
  }
}
```

### Delete Single Vendor

- **Method:** **`DELETE`**
- **Endpoint:** **`/vendors/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | VENDOR_ACCESS_TOKEN>
```

---

## `Admin Routes`

### Get All Admins

- **Method:** **`GET`**
- **Endpoint:** **`/admins`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN>
```

### Get Single Admin

- **Method:** **`GET`**
- **Endpoint:** **`/admins/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN>
```

### Update Single Vendor

- **Method:** **`PATCH`**
- **Endpoint:** **`/admins/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN>
```

**Request Body:**

```json
{
  "admin": {
    "name": {
      "firstName": "Sakib"
    }
    // Other field to update
  }
}
```

### Delete Single Vendor

- **Method:** **`DELETE`**
- **Endpoint:** **`/admins/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN>
```

---

## Auth Routes

### Login User

- **Method:** **`POST`**
- **Endpoint:** **`/login`**

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response Body:**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZlbmRvMkBleGFtcGxlLmNvbSIsInVzZXJUeXBlIjoidmVuZG9yIiwiaWF0IjoxNzAzOTYwMjQ2LCJleHAiOjE3MDQwNDY2NDZ9.RbITJSc2XqpoEjHrS6k7ylsXVJcu5_z3mSF4iwqeDB0"
  }
}
```

### Change Password

- **Method:** **`POST`**
- **Endpoint:** **`/change-password`**

**Request Body:**

```json
{
  "oldPassword": "customer123",
  "newPassword": "customer321"
}
```

**Response Body:**

```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null
}
```

### Refresh Token

- **Method:** **`POST`**
- **Endpoint:** **`/refresh-token`**

#### Request Cookies

```bash
refreshToken <ADMIN_REFRESH_TOKEN>
```

**Response Body:**

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyMkBleGFtcGxlLmNvbSIsInVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDM5Njk2NDksImV4cCI6MTcwNDA1NjA0OX0.X19IltUNlQB68ktIl-W1vI9faCgU9WUrrR89dFSC_yo"
  }
}
```

### Forget Password

- **Method:** **`POST`**
- **Endpoint:** **`/forget-password`**

#### Request Cookies

**Response Body:**

```json
{
  "email": "vendor@gmail.com"
}
```

### Reset Password

- **Method:** **`POST`**
- **Endpoint:** **`/reset-password`**

#### Headers

```bash
Authorization <USER_ACCESS_TOKEN>
```

**Response Body:**

```json
{
  "email": "8625sakib@gmail.com",
  "newPassword": "amiVendor"
}
```

---

## `Product Routes`

### Create Product

- **Method:** **`POST`**
- **Endpoint:** **`/products`**
- Only vendors can add a product

#### Headers

```bash
Authorization <VENDOR_ACCESS_TOKEN>
```

```json
{
  "name": "Laptop",
  "description": "Powerful laptop for professional use",
  "price": 1200,
  "images": ["laptop_image1.jpg", "laptop_image2.jpg"],
  "category": "Electronics",
  "inventory": {
    "quantity": 10,
    "lowSockNotification": "No"
  },
  "discount": 100
}
```

### Get All products

- **Method:** **`GET`**
- **Endpoint:** **`/vendors`**

### Get Single Product

- **Method:** **`GET`**
- **Endpoint:** **`/products/:_id`**

### Update Single Product

- **Method:** **`PUT`**
- **Endpoint:** **`/products/:_id`**
- Only vendors can update a product

#### Headers

```bash
Authorization <VENDOR_ACCESS_TOKEN>
```

**Request Body:**

```json
{
  "images": ["laptop_image3.jpg", "laptop_image4.jpg"]
  // Other field to update
}
```

### Delete Single Product

- **Method:** **`DELETE`**
- **Endpoint:** **`/products/:_id`**
- Only vendors and admins can delete a product

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | VENDOR_ACCESS_TOKEN>
```

---

## `Category Routes`

### Create Product

- **Method:** **`POST`**
- **Endpoint:** **`/categories`**
- Only vendors can add a product

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN| VENDOR_ACCESS_TOKEN>
```

```json
{
  "name": "Electric"
}
```

### Get All categories

- **Method:** **`GET`**
- **Endpoint:** **`/categories`**

---

## Upload images in file

- First send all data in text formate inside 'data'
- Then send image as file formate and received it with req.file
- Have to parse the file with multer before going to the controller
- Make sure that we have parse text **`req.body.data`** to json format and add in **`req.body`** before data going to validateRequest.

### **`Example:`**

**`Route:`**

```javascript
router.post(
  "/create-customer",
  upload.single("file"), // parse file with multer
  textToJsonParser, // parse req.data.body which is in text formate to req.body with textToJson Middleware
  validateRequest(CustomerValidations.createCustomerValidationSchema),
  UserControllers.createCustomer,
);
```

**`Cloudiniary:`**

```javascript
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ex_cloud_name",
  api_key: "ex_api_key",
  api_secret: "ex_api_secret",
});

return new Promise(resolve, reject) =>{
  cloudinary.uploader.upload(
  "file_path",
  { public_id: "file_name" },
  function (error, result) {
    if (error) {
      reject(error);
    }
    resolve(result);
    fs.unlink(imagePath, (err) => { // Delete file from temporary location after uploading in cloudinary
      if (err) {
        reject(err);
      } else {
        console.log("File is deleted.");
      }
    });
  },
)};
```

**`Multer:`**

```javascript
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/temporary_file_uploading_path");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix); // can customize file name
  },
});

export const upload = multer({ storage: storage }); // export upload for parsing file in router eg:- upload.single("file")
```

---

## Error format

```javascript
res.status(statusCode).json({
    success: false,
    message,
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ],
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
```

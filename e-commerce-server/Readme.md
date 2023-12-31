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

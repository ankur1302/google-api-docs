### Create Google Docs file and shared with others

---

## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/ankur1302/google-api-docs.git # or clone your own fork
cd google-api-docs
npm install
npm start
```

copy example.env file and create new .env file with and set environment variables

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Functions

1. Signup in system using this API

```sh
Url - http://localhost:3000/signup
type - post
body(JSON) - {
    "email": "test-email@gmail.com",
    "password": "Test@123",
    "firstName":"Firs name",
    "lastName":"last name"
}
```

2. Login API

```sh
Url - http://localhost:3000/login
type - post
body(JSON) - {
    "email": "test-email@gmail.com",
    "password": "Test@123",
}
```

3. Generate Google Drive API Token

```sh
open this url in your browser [URL](http://localhost:3000/google) 
```

Note - Now following API are protected you have to pass token in header

```sh
Authorization - Bearer token
```

4. Update Token

```sh
Url - http://localhost:3000/users/me
type - patch
body(JSON) - {
    "refreshToken": "token which you got",
}
```

5. Create Google Docs
```sh
Url - http://localhost:3000/google-docs
type - post
body(JSON) - {{
    "name": "Test-content-1",
    "content": "You can start write hete"
}
```

6. Update Google Docs
```sh
Url - http://localhost:3000/google-docs/:id(docId)
type - patch
body(JSON) - {{
    "content": "You can start write hete"
}
```

7. Assign Permission
```sh
Url - http://localhost:3000/google-docs/permission/:id(docId)
type - patch
body(JSON) - {{
    "permissions":  [{ "type": "user", "role": "writer", "emailAddress": "test-email@gmail.com" }]
}
```

8. Get Activity
```sh
Url - http://localhost:3000/google-docs/activity/:id(docId)
type - get
```

9. Delete doc
```sh
Url - http://localhost:3000/google-docs/:id(docId)
type - delete
```


10. Get My Docs
```sh
Url - http://localhost:3000/users/my-files
type - get
```

11. Get Docs which shared with me
```sh
Url - http://localhost:3000/users/shared-files
type - get
```

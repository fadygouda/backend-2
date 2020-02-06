# Backend

Base URL: [https://spotify-song-suggester-3.herokuapp.com/](https://spotify-song-suggester-3.herokuapp.com/)

## Introduction
Welcome to the Back End Development Portion of this Spotify Song Suggester App!!! 
This app gives the user the ability to search for a specific song and see its audio features displayed in a visually appealing way. The app also identifies songs with similar audio features.

## Database Schema

`Users`

```
{
  
  "username": "username",                  - String, required
  "password": "password",                  - String, required 
  "email": "email",                        - String, required
  "firstName: "firstName",                 - String, required
  "lastName": "lastName"                   - String, required
}

```

`Songs`

```
{
    "id": 1,                                - Integer (primary key)
    "user_id": 2,                           - Integer(foreign key, references id from Users Table)
    "song_title": "If It Isn't Love",       - String, required
    "artist": "New Edition",                - String, required
    "favorite": "true"                      - Boolean, required
}

```

# Auth Routes

## Sign Up
### Registers A User
Method Url: ``` /api/auth/signup ```
HTTP Method: **POST**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name        | type   | required | description    |
| ----------- | ------ | -------- | -------------- |
| `username`  | String | Yes      | Not Nullable   |
| `password`  | String | Yes      | Not Nullable   |
| `email`     | String | Yes      | Not Nullable   |
| `firstName` | String | Yes      | Not Nullable   |
| `lastName`  | String | Yes      | Not Nullable   |


#### Example:

```
{
	"username": "daniel",
	"password": "abc123",
	"email": "daniely@gmail.com",
	"firstName": "Daniel",
	"lastName": "LaRusso"
}

```

#### Response 

#### Status 201 - Successful Signup
- If the user signup is successful, the server will return the following  response:

```
{
	"username": "daniel",
	"password": "abc123",
	"email": "daniely@gmail.com",
	"firstName": "Daniel",
	"lastName": "LaRusso"
}

```

#### User Already In Database
- If the user already has an account, the server will return the following  response:

```

{
    "errors": [
        {
            "username": "Username Already Exists!"
        }
    ]
}

```

#### Minimum Character Length
- The first name, last name, email, and password must have at least 5 characters.  If not, the server will return the following response:

```

{
    "errors": [
        {
            "username": "Must be a minimum of 5 chars"
        }
    ]
}

```

#### Maximum Character Length
- The server will allow a maximum of 50 characters for username, otherwise the server will return the following response:

```

{
    "errors": [
        {
            "username": "Must be a maximum of 50 chars"
        }
    ]
}

```

#### Invalid Email Address
- If the user inputs an invalid email, the server will respond with:

```
{
    "errors": [
        {
            "error": "Unexpected Email Address"
        }
    ]
}

```

#### Status 500 - Internal Server Error


# Signin

### Signs In An Existing User
Method Url: ``` /api/auth/signin ```
HTTP Method: **POST**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name        | type   | required | description    |
| ----------- | ------ | -------- | -------------- |
| `username`  | String | Yes      | Not Nullable   |
| `password`  | String | Yes      | Not Nullable   |

#### Status 200 - Successful Sign In
- If the user sign in is successful, the server will return a token, the username,and the User ID in the following  response:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndhbHRlciIsImlhdCI6MTU4MTAwMjQ3OSwiZXhwIjoxNTgxMDg4ODc5fQ.wJLvIcMHK26IElSh4cAcemCxg9mCOL4WyOd8FjCnToE",
    "user": "walter",
    "id": 10,
    "message": "Hello walter, You're logged in!"
}

```

#### Invalid Credentials
- If the user inputs an invalid username and/or password, the server will respond with:

```
{
    "message": "Invalid Credentials"
}

```
#User Routes

### Edit A User

### Edits User Information
Method Url: ``` /api/users/:id ```
HTTP Method: **PUT**

### CRUD OPERATIONS CANNOT BE ACCESSED WITHOUT A TOKEN

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name        | type   | required | description    |
| ----------- | ------ | -------- | -------------- |
| `username`  | String | Yes      | Not Nullable   |
| `password`  | String | Yes      | Not Nullable   |
| `email`     | String | Yes      | Not Nullable   |
| `firstName` | String | Yes      | Not Nullable   |
| `lastName`  | String | Yes      | Not Nullable   |

#### Status 200 - Successful Edit
- If the user edit is successful, the server will return a token, the username,and the User ID in the following  response:
```

{
    "message": "User updated successfully!!!"
}

```

### Delete A User
- Removes a user from the database

Method Url: ``` /api/users/:id ```
HTTP Method: **DELETE**

### CRUD OPERATIONS CANNOT BE ACCESSED WITHOUT A TOKEN

- This action doesn't return a response.  If there are no listed error messages, user was deleted successfully.




# Song Routes

## Get Songs
### Returns Full List of Songs In The Database
Method Url: ``` /api/songs ```
HTTP Method: **GET**

### SONGS CANNOT BE ACCESSED WITHOUT A TOKEN

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | JSON Web Token           |

#### Response
- Successful GET Requests gives the following response:

```
[
     { 
          "id": "2RM4jf1Xa9zPgMGRDiht8O",
          "song_title": "Big Bank feat. 2 Chainz, Big Sean, Nicki Minaj",
          "artist": "YG",
          "favourite": null,
          "user_id": null,
          "suggested_songs": null,
          "suggested_track_ids": null
      },
      {
          "id": "1tHDG53xJNGsItRA3vfVgs",
          "song_title": "BAND DRUM (feat. A$AP Rocky)",
          "artist": "YG",
          "favourite": null,
          "user_id": null,
          "suggested_songs": null,
          "suggested_track_ids": null
      }
]


```

#### Status Code 500 - List Could Not Be Retrieved.
- A problem with the server or hosting issue could render a response in the list not being retrieved. 


## Get Songs By Id
### Selects A Song Based The Id#
Method Url: ``` /api/songs/:id ```
HTTP Method: **GET**

### SONGS CANNOT BE ACCESSED WITHOUT A TOKEN

#### Response
- A Successful Get by id request will render the following response:

```

{
    "id": "1tHDG53xJNGsItRA3vfVgs",
    "song_title": "BAND DRUM (feat. A$AP Rocky)",
    "artist": "YG",
    "favourite": null,
    "user_id": null,
    "suggested_songs": null,
    "suggested_track_ids": null
}

```

#### Status Code 404
- An invalid song id will render the following response:

```
{
    "errorMessage": "Could not find song"
}

```
#### Status Code 500 - List Could Not Be Retrieved.
- A problem with the server or hosting issue could render a response in the song not being retrieved. 


























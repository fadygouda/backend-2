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
- If the user signup was successful, the server will return the following  response:

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
- If the user already has an account, the server will will return the following  response:

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








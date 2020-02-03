# Backend

Base URL: [https://spotify-song-suggester-3.herokuapp.com/](https://spotify-song-suggester-3.herokuapp.com/)

## Introduction
Welcome to the Back End Development Portion of this Spotify Song Suggester App!!! 
This app gives the user the ability to search for a specific song and see its audio features displayed in a visually appealing way. The app also identifies songs with similar audio features.

## Database Schema

`Users`

```
{
  "id": 1,                                - Integer (primary key)
  "username": "username",                 - String, required
  "password": "password"                  - String, required 
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



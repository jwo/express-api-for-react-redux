# express-api-for-react-redux

API for React-Redux

code for front-end: https://github.com/jwo/react-redux-giffy
```
// send in a "Authorization: Bearer $TOKEN"
// without, you'll get a 401
// Only endpoints without the 401: registration / auth

// GET https://api.giffy.com/api/me -> "Information about me"
// GET https://api.giffy.com/api/me/gifs -> "My Gifs"
// GET https://api.giffy.com/api/gifs -> "All Gifs"
//
// POST https://api.giffy.com/api/registration -> "create a user"
// POST https://api.giffy.com/api/auth -> "give you a token if you give me username/password"
// POST https://api.giffy.com/api/gifs -> "create a gif"
```

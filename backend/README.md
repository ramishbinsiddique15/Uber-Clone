# User Registration

## Endpoint
POST /users/register

## Description
Creates a new user account and returns a token.

## Request Body
• fullname.firstname (string) – Required, minimum 3 characters  
• fullname.lastname (string) – Optional, minimum 3 characters  
• email (string) – Required, valid email format  
• password (string) – Required, minimum 6 characters  

## Response
• 201 – Returns a JSON object with { token, user } on successful creation.  
### Example
```json
{
  "token": "exampletoken123",
  "user": {
    "_id": "0123456789",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@doe.com"
    // ...other user data...
  }
}
```
• 400 – Returns validation errors if any field is invalid or missing.

# User Login

## Endpoint
POST /users/login

## Description
Logs in a user and returns a token.

## Request Body
• email (string) – Required, valid email format  
• password (string) – Required, minimum 6 characters  

## Response
• 200 – Returns a JSON object with { token, user } on successful login.  
### Example
```json
{
  "token": "exampletoken456",
  "user": {
    "_id": "9876543210",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@smith.com"
    // ...other user data...
  }
}
```
• 400 – Returns validation errors for invalid or missing fields.  
• 401 – Returns message "Invalid email or password" on login failure.

# User Profile

## Endpoint
GET /users/profile

## Description
Fetches the currently authenticated user’s profile.

## Required
• Authenticated request with a valid token (cookie or Authorization header)

## Response
• 200 – Returns the user object.  
• 401 – Unauthorized if token is missing or invalid.

# User Logout

## Endpoint
GET /users/logout

## Description
Logs out the user by clearing the token and blacklisting it.

## Required
• Authenticated request with a valid token

## Response
• 200 – Returns { message: 'User logged out' } on successful logout.  
• 401 – Unauthorized if token is missing or invalid.

# Captain Registration

## Endpoint
POST /captains/register

## Description
Creates a new captain account and returns a token.

## Request Body
• fullname.firstname (string) – Required  
• fullname.lastname (string) – Optional  
• email (string) – Required, valid email format  
• password (string) – Required, minimum 6 characters  
• vehicle.color (string) – Required, minimum 3 characters  
• vehicle.plate (string) – Required, minimum 3 characters  
• vehicle.capacity (integer) – Required, must be ≥ 1  
• vehicle.vehicleType (string) – Required, one of ["car", "bike", "auto"]

## Response
• 201 – Returns a JSON object with { token, captain } on successful creation.  
### Example
```json
{
  "token": "exampleCaptainToken",
  "captain": {
    "_id": "abc123",
    "fullname": {
      "firstname": "Saifi",
      "lastname": "Bhai"
    },
    "email": "saifi@kale.com",
    "vehicle": {
      "color": "black",
      "plate": "CT 17",
      "capacity": 6,
      "vehicleType": "car"
    }
    // ...other captain data...
  }
}
```
• 400 – Returns validation errors if any field is invalid or missing.  
• 401 – Returns an error if captain already exists or token is invalid.

# Captain Profile

## Endpoint
GET /captains/profile

## Description
Fetches the currently authenticated captain’s profile.

## Required
• Authenticated request with a valid token (cookie or Authorization header)

## Response
• 200 – Returns the captain object.  
• 401 – Unauthorized if token is missing or invalid.

# Captain Logout

## Endpoint
GET /captains/logout

## Description
Logs out the captain by clearing the token and blacklisting it.

## Required
• Authenticated request with a valid token

## Response
• 200 – Returns { message: "Logged out" } on successful logout.  
• 401 – Unauthorized if token is missing or invalid.
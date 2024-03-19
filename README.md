## Catcher Game
An in-browser game built on MERN stack
The game is deployed on [HEROKU](https://reiner-catcher-frontend-cf9af3651b63.herokuapp.com/)

### Instructions:
Backend:
 - Tested on node version v20.11.0 nodejs.org/en
 - On command prompt navigate to repo folder `/backend`, run `npm install`
 - Create .env file in /backend root directory and add MONGODB_URI="add your mongodb uri string"
 - run `node app.js` to start server (Listens on localhost:5000)

Frontend:
 - On command prompt, navigate to repo folder `/frontend`, run `npm install`
 - run `npm start` to start FE server
 - runs on http://localhost:3000

###  Backend Api Endpoints:

#### GET /scores
Retrieves a specified number of score documents from MongoDB.

Request:
 * Method: GET
 * Params: 
	 * count (integer, optional): Number of documents to retrieve

Response:
* Format: JSON
* Body:
	* Array of score documents (limited by count)

#### POST /scores
Saves a new player score to the MongoDb collection.

Request:
* Method: POST
* Content-Type: application/json
* Body:
 ```
	 {
		 "playerName": "string",(required),
		 "score": "integer" (required)}
	 }
```

Response:
* Format: JSON
* Body example:
```
	{
		"playerName":  "winner winner",
		"score":  855,
		"_id":  "65f8d08a4a947d23e57cda46",
		"createdAt":  "2024-03-18T23:38:50.731Z",
		"updatedAt":  "2024-03-18T23:38:50.731Z","__v":  0
	}
```

Example Request:
POST /scores 
HTTP/1.1 
Content-Type: application/json
 ```
	 { 
		 "playerName": "John Doe", "score": 7800 
	 }
 ```

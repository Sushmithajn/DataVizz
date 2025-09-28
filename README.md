# Excel Analytics Platform (datavizz)

A MERN stack web app to upload Excel files, analyze data and create interactive 2D & 3D charts.

## Features
 User signup/login with JWT authentication
 Upload `.xls`, `.xlsx` or .csv files
 Parse Excel data with SheetJS and store in MongoDB
 Create 2D charts (Chart.js) and 3D charts (Three.js)
 Choose X and Y axes dynamically
 Download generated charts
 View history of uploads and analyses

## Tech Stack
 **Frontend:** React.js, Chart.js, Three.js
 **Backend:** Node.js, Express.js
 **Database:** MongoDB Atlas
 **Other:** SheetJS for Excel parsing, JWT for authentication


## Create a .env file:
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_secret_key>

## run the code
Backend 
npm server.cjs

frontend
npm run dev

Open http://localhost:5173 in your browser.

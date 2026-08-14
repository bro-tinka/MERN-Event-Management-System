This Script will tell you how we actually moved step by step on each DAY 




## Day 1 :
- Project architecture
- folder initialisation

#
## Day 2 :
- Installed node package manager ( npm init -y )
- Installed express.js (npm install express)


#
## Day 3:
- Installed nodemon (which is a dev dependency) - helps automatically restarting server when any change is made
- Installed (.dotenv) & setup .env file
- Installed `cors` [allows frontend-backend communication on different ports] ,
- Installed `express.json()` [allows json parsing of req.body]
- Tested POST api using Thunder Client Extension in VS CODE
- Separated routes from the main server.js & mounted the prefix "/api" using Express Router on another file inside /routes
- app.use("api/", routePath) redirects any url with prefix "/api" to that router

-> ADDED FRONTEND
- setup the basic frontend using React (vite) framework 
- vite handled automatically initial setup
- replaced the default frontend/src/app.jsx contents with a simple working frontend application






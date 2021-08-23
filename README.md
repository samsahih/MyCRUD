# MyCRUD
Vue 3 test CRUD application

In your terminal, please type:

// to install JSON and link it to project

npm install -g json-server



// This launches the app, should be okay at this stage

npm run serve


// If you get a "Failed to fetch error. No articles available" error in the homepage 
// Please check the console, if the port error shown is 8081, then please type the below.
// If port error is different than 8081 replace it with the correct port in the command below
// This command is used to track the "database values" or in this case the json nodes mimicking database data from an expternal API

npm json-server --watch -p 8081 data/db.json


# MyCRUD
Vue 3 test CRUD application

// Open your terminal first

// to install JSON and link it to project

npm install -g json-server
 
 
// This command is used to track the "database values" or in this case the json nodes mimicking database data from an expternal API

json-server --watch data/db.json


// update the .env file (on root of application) to the correct localhost link (http://localhost:3000/posts is the default one)
// This is used in the async methods to call functions

VUE_APP_ENV_VARIABLE="http://localhost:3000"


// This launches the app, should be okay at this stage

npm run serve


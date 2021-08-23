# MyCRUD
Vue 3 test CRUD application

// Open your terminal first
<br /><br />
// to install JSON and link it to project

npm install -g json-server
 <br /><br />
 
// This command is used to track the "database values" or in this case the json nodes mimicking database data from an expternal API

json-server --watch data/db.json
<br /><br />

// update the .env file (on root of application) to the correct localhost link (http://localhost:3000/posts is the default one)
// This is used in the async methods to call functions

VUE_APP_ENV_VARIABLE="http://localhost:3000"
<br /><br />

// This launches the app, should be okay at this stage

npm run serve


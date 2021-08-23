# mycrud

## Install JSON and link it to project
```
npm install -g json-server
```

## Track the "database values" (json file) to see the changes when you CRUD
```
json-server --watch data/db.json
```

### update the .env file (on root of application) to the correct localhost link (http://localhost:3000/posts is the default one) // This is used in the async methods to call functions
```
VUE_APP_ENV_VARIABLE="http://localhost:3000"
```


### Compiles and hot-reloads for development
```
npm run serve
```

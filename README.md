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

### If 'npm run serve' gives you an error, like it did on my pc right now for some reason, try this:
```
npm i
```

### and then serve again
npm run serve

## airtouch_challenge

**Documentation**

You can generate project documentation by running `npm run generate-docs`. The documentation will be outputted to `docs` in the HTML format.

* For API documentation, please refer to the [swagger docs](./swagger/index.html).
* You can import the `airtouch_challenge.postman_collection.json` Postman collection to your Postman for easier testing.

**Prerequisites**

* NodeJS 8 or later
* Docker

**Installation**

* Run `npm install` to install project dependencies

**Building**

* You can build this project by running `npm run build`. This will create the `build` folder, containing transpiled javascript source code.
* You can build the project and docker containers by running `npm run build:docker`. This will build the project and create the following containers: `mongo` and `airtouch_challenge`

**Running**

When you run the app, you need to specify the environment you're on. You can do this by setting the `NODE_ENV` environment variable to `local`, `test` or `prod`.

* In a production environment, it is enough to run `npm run start:prod`. This will not build the app.
* In a development environment, you can run `npm run start:dev` to both build and run the app.
* For starting up the test environment, you can run `npm run start:docker`. Please only do so after running `npm run build:docker`.

The default admin credentials are `admin:admin`.

**Configuration**

* The configuration file can be found under `src/configuration/configuration.yml`, and it has the following format:
```
local:
  mongo:
    connectionUri: YOUR_MONGODB_CONNECTION_URI
    options:
      YOUR_MONGO_OPTION1: YOUR_MONGO_SETTING1
      YOUR_MONGO_OPTION2: YOUR_MONGO_SETTING2
  express:
    port: YOUR_EXPRESS_PORT
test:
  mongo:
    connectionUri: YOUR_MONGODB_CONNECTION_URI
    options:
      YOUR_MONGO_OPTION1: YOUR_MONGO_SETTING1
      YOUR_MONGO_OPTION2: YOUR_MONGO_SETTING2
  express:
    port: YOUR_EXPRESS_PORT
prod:
  mongo:
    connectionUri: YOUR_MONGODB_CONNECTION_URI
    options:
      YOUR_MONGO_OPTION1: YOUR_MONGO_SETTING1
      YOUR_MONGO_OPTION2: YOUR_MONGO_SETTING2
  express:
    port: YOUR_EXPRESS_PORT
```

The configuration object that will be loaded depends on the `NODE_ENV` environment variable. 
* For example, if your `NODE_ENV` is set to `prod`, the config under `prod` will be loaded.
* You can inject environment variables into the config using the syntax `${VAR_NAME}`.
* You can provide a fallback value using the syntax `${VAR_NAME:default_value}`.

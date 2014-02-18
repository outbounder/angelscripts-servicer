# angelscripts-servicer

Create nodejs apps as services using upstart with forever.
Implemetation based on [exratione's post](https://www.exratione.com/2013/02/nodejs-and-forever-as-a-service-simple-upstart-and-init-scripts-for-ubuntu/)

## Usage

1. Create ./service.json:

    {
      "description": "My app",
      "APPLICATION_START": "app.js",
      "APPLICATION_DIRECTORY": "/home/node/app",
      "LOG": "/home/node/app/app.js.out",
      "NODE_BIN_DIR": "/home/node/local/node/bin",
      "NODE_PATH": "/home/node/local/node/lib/node_modules",
      "ENV": [{KEY: "NODE_ENV", VALUE:"production"}]
    }

2. Wire everything up:

    $ cd ./myproject
    $ npm install organic-angel --save-dev
    $ npm install angelscripts-servicer --save-dev
    $ sudo node ./node_modules/.bin/angel make service ./service.json /etc/init/app.conf
    $ sudo start app

## When using nvm

Your package.json could look like this:

    {
      ...
      "NODE_BIN_DIR": "/home/node/.nvm/v0.10.24/bin",
      "NODE_PATH": "/home/node/.nvm/v0.10.24/lib/node_modules",
      ...
    }
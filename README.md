# angelscripts-servicer

Create nodejs apps as services using simple angel command

## Usage

1. Create ./service.json

        {
          "name":"my-service",
          "description": "",
          "user": "myuser",
          "start": "node app.js",
          "cwd": "/home/myuser/myservice",
          "log": "/home/myuser/myservice/output.log",
          "startOn": "filesystem and started networking",
          "forks": false,
          "NODE_BIN_DIR": "/path/to/bin/with/node",
          "NODE_PATH": "/path/to/standard/node_modules",
          "ENV": [
            { 
              "key": "HOME", 
              "value": "/home/myuser"
            }
          ]
        }

2. Wire everything up

        $ cd ./myservice
        $ npm install organic-angel --save-dev
        $ npm install angelscripts-servicer --save-dev
        $ sudo node ./node_modules/.bin/angel make service ./service.json /etc/init/app.conf
        $ sudo start app

## When using node via nvm

Your package.json could look like this

    {
      ...
      "NODE_BIN_DIR": "/home/node/.nvm/v0.10.24/bin",
      "NODE_PATH": "/home/node/.nvm/v0.10.24/lib/node_modules",
      ...
    }
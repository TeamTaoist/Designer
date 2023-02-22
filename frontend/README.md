
## Getting started

### Install packages:

```sh
yarn install
```

### Declare environment variables:

Create `.env` file, `.env.example` will let you know what variables are expected.

In order for all features to work as expected, the node and it's runtime version should be chosen based on the current `@gear-js/api` version.

In case of issues with the application, try to switch to another network or run your own local node and specify its address in the .env file. When applicable, make sure the smart contract(s) wasm files are uploaded and running in this network accordingly.

``` 
REACT_APP_NODE_ADDRESS=wss://node-workshop.gear.rs

REACT_APP_PROGRAM_ID=0x8....dff36083

REACT_APP_API_KEY=

REACT_APP_API_SECRET=
```

REACT_APP_NODE_ADDRESS and REACT_APP_PROGRAM_ID is the configuration of Gear.
[idea.gear-tech.io](https://idea.gear-tech.io/programs?node=wss%3A%2F%2Fnode-workshop.gear.rs)

REACT_APP_API_KEY and REACT_APP_API_SECRET is the configuration of Fleek
[docs.fleek.co](https://docs.fleek.co/storage/fleek-storage-js/)

### Run the app:

```sh
yarn start
```

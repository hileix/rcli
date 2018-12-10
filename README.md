## rcli

### Use [`create-react-app`](https://github.com/facebook/create-react-app) to create applications

```shell
rcli new PROJECT-NAME
cd PROJECT-NAME
yarn start
```

or you can use `npm`

```shell
rcli new PROJECT-NAME --use-npm
cd PROJECT-NAME
npm start
```

### Generating Components

```shell
rcli g component my-new-component
```

is equal:

```shell
rcli g component ./my-new-component
```

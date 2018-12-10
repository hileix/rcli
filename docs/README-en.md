## rcli

[中文文档](https://github.com/hileix/rcli/blob/master/docs/README-zh.md) | English Doc

### Install

```shell
npm i -g rcli
```

### Userage

#### Use [`create-react-app`](https://github.com/facebook/create-react-app) to create applications

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

#### Generating Components

```shell
rcli g component my-new-component
```

is equal:

```shell
rcli g component ./my-new-component
```

### Next step

- custom component template

`If you have new ideas, you may bring up the issue.`

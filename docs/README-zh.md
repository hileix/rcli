## rcli

中文文档 | [English Doc](https://github.com/hileix/rcli/blob/master/docs/README-en.md)

### 安装

```shell
npm i -g hileix-rcli
```

### 用法

#### 使用 [`create-react-app`](https://github.com/facebook/create-react-app) 来创建一个应用

```shell
rcli new PROJECT-NAME
cd PROJECT-NAME
yarn start
```

获取你可以使用 `npm`

```shell
rcli new PROJECT-NAME --use-npm
cd PROJECT-NAME
npm start
```

#### 生成组件

```shell
rcli g component my-new-component
```

等于：

```shell
rcli g component ./my-new-component
```

### 下一步计划

- 支持自定义 react 组件模板

`如果你有新的想法，可以提 issue，或联系我 qq:304192604`

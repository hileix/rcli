## rcli

### 安装

```shell
npm i -g hileix-rcli
```

```
Usage: rcli [command] [options]

Commands:
  new <appName>
  g <componentName>

`new` command options:
  -n, --use-npm                    Whether to use npm to download dependencies

`g` command options:
  -c, --component <componentName>  The name of the component
  --no-folder                      Whether the component have not it's own folder
  -p, --pure-component             Whether the component is a extend from PureComponent
  -s, --stateless                  Whether the component is a stateless component
```

### 用法

#### 使用 [`create-react-app`](https://github.com/facebook/create-react-app) 来创建一个应用

```shell
rcli new PROJECT-NAME
cd PROJECT-NAME
yarn start
```

或者你可以使用 `npm` 安装依赖

```shell
rcli new PROJECT-NAME --use-npm
cd PROJECT-NAME
npm start
```

#### 生成纯组件（继承自 PureComponent，以提高性能）

```shell
rcli g -c MyNewComponent -p
```

#### 生成类组件（有状态组件）

```shell
rcli g -c MyNewComponent
```

等于：

```shell
rcli g -c ./MyNewComponent
```

#### 生成函数组件（无状态组件）

```shell
rcli g -c MyNewComponent -s
```

#### 生成组件不在文件夹内（也不包含 css 文件和 index.js 文件）

```shell
rcli g -c MyNewComponent --no-folder
```

## changelog

- 0.2.1：修复生成文件内组件时报错的 bug（2018-12-19）
- 0.2.0：重新设计 Api，使其更方便使用（2018-12-15）
- 0.1.0：参照 angular-cli 的 api 设计，完成第一个版本（2018-12-10）

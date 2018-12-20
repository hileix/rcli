## rcli

### 安装

```shell
npm i -g hileix-rcli
```

```
Usage: rcli [command] [options]

Commands:
  new <appName> [options]
  g <componentName> [options]
  config [options]

`new` command options:
  -n, --use-npm                    Whether to use npm to download dependencies

`g` command options:
  -c, --component <componentName>  The name of the component
  --no-folder                      Whether the component have not it's own folder
  -p, --pure-component             Whether the component is a extend from PureComponent
  -s, --stateless                  Whether the component is a stateless component

`config` command options:
  -d, --dir                        Sets the default path for component generation
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

#### 设置组件生成的默认路径（不设置的话，默认在当前文件夹）

```shell
rcli config -d ./src/components
# 直接使用组件名时，会在 “组件生成默认路径” 生成组件：如 Aaa
# 否则，会相对于 “当前路径” 生成组件：如 ./Aaa、./components/Aaa
```

## changelog

- 0.3.0：添加 config 命令（2018-12-20）
- 0.2.1：修复生成文件内组件时报错的 bug（2018-12-19）
- 0.2.0：重新设计 Api， 使其更方便使用（2018-12-15）
- 0.1.0：参照 angular-cli 的 api 设计，完成第一个版本（2018-12-10）

## plan

- 添加生成 React.mom() 包装的无状态组件（和类组件继承 React.PureComponent 一样）

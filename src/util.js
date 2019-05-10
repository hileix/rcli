#!/usr/bin/env node

'use strict';
const program = require('commander');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const isRelative = require('is-relative');
const isAbsolute = require('is-absolute');
const pathExists = require('path-exists');

const log = console.log;
const HOME_PATH = process.env.HOME;

// new command
program
  .command('new <projectName>')
  .description('use create-react-app create a app')
  .option('-n, --use-npm', 'Whether to use npm to download dependencies')
  .action(function(projectName, cmd) {
    const isUseNpm = cmd.useNpm ? true : false;
    createReactApp(projectName, isUseNpm);
  });

// g command
program
  .command('g')
  .description('Generate a component')
  .option('-c, --component-name <componentName>', 'The name of the component')
  .option('--no-folder', 'Whether the component have not it is own folder')
  .option(
    '-p, --pure-component',
    'Whether the component is a extend from PureComponent'
  )
  .option(
    '-s, --stateless',
    'Whether the component is a extend from PureComponent'
  )
  .action(function(cmd) {
    if (!cmd.componentName) {
      log(chalk.red('error: missing required argument `componentName`'));
      process.exit(1);
    }
    createComponent(
      cmd.componentName,
      cmd.folder,
      cmd.stateless,
      cmd.pureComponent
    );
  });

// config command
program
  .command('config')
  .description('Configuration rcli')
  .option(
    '-d, --dir <dir>',
    'The directory in which the generated component resides'
  )
  .action(function(cmd) {
    if (!cmd.dir) {
      printConfig();
    }
    setConfig(cmd.dir);
  });

program.parse(process.argv);

/**
 * 使用 create-react-app 创建项目
 * @param {string} projectName 项目名称
 * @param {boolean} isUseNpm 是否使用 npm 安装依赖
 */
function createReactApp(projectName, isUseNpm) {
  let args = ['create-react-app', projectName];
  if (isUseNpm) {
    args.push('--use-npm');
  }
  spawn.sync('npx', args, { stdio: 'inherit' });
}

/**
 * 创建组件
 * @param {string} componentPath 组件路径
 * @param {boolean} hasFolder 是否含有文件夹
 * @param {boolean} isStateless 是否是无状态组件
 * @param {boolean} isPureComponent 是否是纯组件
 */
function createComponent(
  componentPath,
  hasFolder,
  isStateless = false,
  isPureComponent = false
) {
  /**
   * 1. 只传组件名称：则相对设置的默认组件生成文件夹路径
   * 2. 其他，相对当前文件夹路径
   */
  const componentName = path.basename(componentPath);

  let curPath = path.join(process.cwd());

  // 只传了组件名称：如 Aaa（非 ./Aaa、./src/Aaa 等路径）
  if (componentName === componentPath) {
    curPath = getDefaultComponentDir();
  }

  let componentDir;
  if (componentName === componentPath) {
    componentDir = './';
  } else {
    const index = componentPath.indexOf(componentName) - 1;
    componentDir = componentPath.substring(0, index);
  }

  let dirPath = path.join(curPath, componentDir);

  // 组件在文件夹中
  if (hasFolder) {
    dirPath = path.join(dirPath, componentName);

    const result = fs.ensureDirSync(dirPath);
    // 目录已存在
    if (!result) {
      log(chalk.red(`${dirPath} already exists`));
      process.exit(1);
    }
    const indexJs = getIndexJs(componentName);
    const css = '';
    fs.writeFileSync(path.join(dirPath, `index.js`), indexJs);
    fs.writeFileSync(path.join(dirPath, `${componentName}.css`), css);
  }
  let component;
  // 无状态组件
  if (isStateless) {
    component = getStatelessComponent(componentName, hasFolder);
  } else {
    // 有状态组件
    component = getClassComponent(
      componentName,
      isPureComponent ? 'React.PureComponent' : 'React.Component',
      hasFolder
    );
  }

  fs.writeFileSync(path.join(dirPath, `${componentName}.js`), component);
  log(
    chalk.green(`The ${componentName} component was successfully generated!`)
  );
  process.exit(1);
}

/**
 * 获取类组件字符串
 * @param {string} componentName 组件名称
 * @param {string} extendFrom 继承自：'React.Component' | 'React.PureComponent'
 * @param {boolean} hasFolder 组件是否在文件夹中（在文件夹中的话，就会自动加载 css 文件）
 */
function getClassComponent(componentName, extendFrom, hasFolder) {
  let s1 = `import React from 'react';
import PropTypes from 'prop-types';
`;
  if (hasFolder) {
    s1 += `import './${componentName}.css'`;
  }
  return (
    s1 +
    `
/**
 * ${componentName}
 */
export default class ${componentName} extends ${extendFrom} {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return <div>${componentName}</div>;
  }
}
  `
  );
}

/**
 * 获取无状态组件字符串
 * @param {string} componentName 组件名称
 * @param {boolean} hasFolder 组件是否在文件夹中（在文件夹中的话，就会自动加载 css 文件）
 */
function getStatelessComponent(componentName, hasFolder) {
  let s1 = `import React from 'react';
import PropTypes from 'prop-types';  
`;
  if (hasFolder) {
    s1 += `import './${componentName}.css'`;
  }
  return (
    s1 +
    `
/**
* ${componentName}
*/
const ${componentName} = props => {
  
  return (
    <div>

    </div>
  );
};

${componentName}.propTypes = {
  
};

${componentName}.defaultProps = {

};

export default ${componentName};
`
  );
}

/**
 * 获取 index.js 文件内容
 * @param {string} componentName 组件名称
 */
function getIndexJs(componentName) {
  return `import ${componentName} from './${componentName}';
export default ${componentName};
`;
}

/**
 * 设置配置
 * @param {string} dir 生成的组件所在的目录
 */
function setConfig(dir) {
  if (isRelative(dir)) {
    dir = path.join(process.cwd(), dir);
  } else if (!isAbsolute(dir)) {
    log(chalk.red('dir is invalidate folder path'));
    process.exit(1);
  }
  fs.writeFileSync(`${HOME_PATH}/.rcliconfig`, `dir=${dir}`);
  log(chalk.green('Configuration is successful!'));
}

/**
 * 获取默认的组件生成所在的文件夹
 */
function getDefaultComponentDir() {
  let config = '';
  if (pathExists.sync(`${HOME_PATH}/.rcliconfig`)) {
    config = fs.readFileSync(`${HOME_PATH}/.rcliconfig`, {
      encoding: 'utf8'
    });
  }
  let defaultComponentDir = process.cwd();
  if (config) {
    defaultComponentDir = config.split('=')[1];
  }
  return defaultComponentDir;
}

/**
 * 打印配置
 */
function printConfig() {
  log(getDefaultComponentDir());
  process.exit(1);
}

module.exports = {
  createComponent
};

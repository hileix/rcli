#!/usr/bin/env node

'use strict';
const program = require('commander');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

const log = console.log;

program.option('--use-npm').parse(process.argv);

if (program.args[0] === 'new') {
  if (program.args[1]) {
    createReactApp(program.args[1]);
  } else {
    log(chalk.red('Please give a [PROJECT-NAME]'));
    process.exit(1);
  }
}

if (program.args[0] === 'g') {
  switch (program.args[1]) {
    // 生成组件
    case 'component': {
      const componentPath = path.join(process.cwd(), program.args[2]);
      const componentName = path.basename(componentPath);
      generateComponent(componentName, componentPath);
    }
  }
}

/**
 * 生成组件
 * @param {string} componentName 组件名称
 * @param {string} componentPath 组件文件夹所在的绝对路径
 */

function generateComponent(componentName, componentPath) {
  const result = fs.ensureDirSync(componentPath);
  // 目录已存在
  if (!result) {
    log(chalk.red(`${componentPath} already exists`));
    process.exit(1);
  }
  const componentTmplate = `import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './${componentName}.css'

export class ${componentName} extends Component {
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <div>${componentName}</div>
  }
}
  
export default ${componentName};`;

  const indexTmplate = `import ${componentName} from './${componentName}';
export default ${componentName};`;

  fs.writeFileSync(
    path.join(componentPath, `${componentName}.js`),
    componentTmplate
  );
  fs.writeFileSync(path.join(componentPath, `index.js`), indexTmplate);
  fs.writeFileSync(path.join(componentPath, `${componentName}.css`), '');
  log(
    chalk.green(`The ${componentName} component was successfully generated!`)
  );
  process.exit(1);
}

/**
 * 使用 create-react-app 创建项目
 * @param {string} projectName 项目名称
 */
function createReactApp(projectName) {
  let args = ['create-react-app', projectName];
  // 使用 npm 安装依赖
  if (program.useNpm) {
    args.push('--use-npm');
  }
  spawn.sync('npx', args, { stdio: 'inherit' });
}

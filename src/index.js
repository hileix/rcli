#!/usr/bin/env node

'use strict';
const inquirer = require('inquirer');
const { createComponent } = require('./util');

const questions = [
  {
    type: 'input',
    name: 'componentName',
    message: '请输入组件名称：',
    validate: function(text) {
      if (!text) {
        return '必须输入组件名称';
      }
      if (text[0].charCodeAt() < 65 || text[0].charCodeAt() > 90) {
        return '组件名称首字母必须大写';
      }

      return true;
    }
  },
  {
    type: 'checkbox',
    message: 'componentType',
    name: '请选择组件类型：',
    choices: [
      {
        name: '类组件'
      },
      {
        name: '函数组件'
      }
      // {
      //   name: 'Hooks'
      // }
    ],
    validate: function(answer) {
      if (answer.length !== 1) {
        return '只能选择一个类型';
      }
      return true;
    }
  }
];

inquirer.prompt(questions).then(answers => {
  const { componentName, componentType } = answers;
  const hasFolder = true;
  let isStateless = false;
  if (componentType === '函数组件') {
    isStateless = true;
  }
  createComponent(componentName, hasFolder, isStateless, false);
});

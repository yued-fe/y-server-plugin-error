'use strict';

const path = require('path');

const ejsPlugin = require('y-server-plugin-ejs');

const errorPlugin = require('../index.js');

module.exports = {
  watch: path.join(__dirname, '../index.js'),
  plugins: [
    ejsPlugin({
      viewDir: path.join(__dirname, './view'), // 模板根目录
      renderAdapter: (result) => {
        result.$render = true;
        return result;
      },
    }),
    function (app) {
      app.get('/error', function (req, res, next) {
        next(new Error('error msg'));
      });
    },
    errorPlugin({
      // debug: false,
      views: {
        '404': '404.html',
        '500': '500.html',
      },
    }),
  ],
};

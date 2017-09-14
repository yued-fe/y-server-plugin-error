'use strict';
require('colors');

const path = require('path');

/**
 * 错误处理插件
 * @param {Object} options 配置
 * @param {Object} options.views 模板配置
 * @param {String} options.views.404 404模板
 * @param {String} options.views.500 500模板
 * @return {Function} 插件安装方法
 */
module.exports = function (options) {
  if (!options) {
    throw new Error('[y-server-plugin-template]'.red, '"views"配置错误');
  }

  const debug = options.debug;
  const views = options.views || {};

  const getErrorMessage = function (err, req) {
    if (debug === true) {
      return err.stack;
    }
    if (debug === false) {
      return err.toString();
    }
    return req.query.__debug ? err.stack : err.toString();
  };

  const isStaticFile = function (req) {
    return !!path.extname(req.path);
  };

  /**
   * 插件安装方法
   * @param {Object} app Express实例
   */
  return function (app) {
    const handle404 = function (req, res) {
      console.log('[404]'.red, `"${req.path}"`);

      const msg = 'Not Found';
      if (req.xhr || !views['404'] || isStaticFile(req)) { // ajax请求或者静态资源直接返回404
        res.status(404).send(msg);
      } else {
        res.status(404).render(views['404'], { msg: msg });
      }
    };

    app.use(function (req, res) {
      handle404(req, res);
    });

    app.use(function (err, req, res, next) {
      if (!(err instanceof Error)) {
        err = new Error(`non-error thrown: ${err}`);
      }

      if (err.code === 'ENOENT' || err.status === 404) {
        return handle404(req, res);
      }

      console.log('[500]'.red, err.stack);

      const msg = getErrorMessage(err, req);
      if (req.xhr || !views['500']) {
        res.status(500).send(msg);
      } else {
        res.status(500).render(views['500'], { msg: msg });
      }
    });
  };
};

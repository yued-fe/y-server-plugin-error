'use strict';
require('colors');

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

  /**
   * 插件安装方法
   * @param {Object} app Express实例
   */
  return function (app) {
    const render404 = function (req, res, msg) {
      console.log('[404]'.red, `"${req.path}"`);

      msg = msg || 'Not Found';

      if (views['404']) {
        res.status(404).render(views['404'], { msg: msg });
      } else {
        res.send(msg);
      }
    };

    app.use(function (req, res) {
      render404(req, res);
    });

    app.use(function (err, req, res, next) {
      if (!(err instanceof Error)) {
        err = new Error(`non-error thrown: ${err}`);
      }

      const msg = getErrorMessage(err, req);

      if (err.code === 'ENOENT') {
        return render404(req, res, msg);
      }

      console.log('[500]'.red, err.stack);

      if (views['500']) {
        res.status(500).render(views['500'], { msg: msg });
      } else {
        res.send(msg);
      }
    });
  };
};

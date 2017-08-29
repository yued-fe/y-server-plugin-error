# y-server-plugin-error

y-server-plugin-error is a [y-server](https://github.com/yued-fe/y-server) plugin to handle error.

## Install

```bash
npm install y-server-plugin-error
```

## Usage

```javascript
const path = require('path');

const yServer = require('y-server');
const ejsPlugin = require('y-server-plugin-ejs');
const errorPlugin = require('y-server-plugin-error');

yServer({
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
});
```

## Notes

* `debug` is the switcher to show error detail.
* `views.404` is the not found page template.
* `views.500` is the error page template.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

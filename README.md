# y-server-plugin-template

y-server-plugin-template is a [y-server](https://github.com/yued-fe/y-server) template render plugin.

## Install

```bash
npm install y-server-plugin-template
```

## Usage

```javascript
const path = require('path');

const yServer = require('y-server');
const templatePlugin = require('y-server-plugin-template');

yServer({
  plugins: [
    templatePlugin({
      apiPaths: ['/majax/*'],

      proxyServer: 'http://m.readnovel.com',
      proxyOptions: {
        query: {},
        headers: {},
      },

      mockEnable: true,
      mockDir: path.join(__dirname, './json'),
      mockResultResolver: path.join(__dirname, './json/resultResolver.js'),
      throwMockError: true,
    }),
  ],
});
```

## Notes

* `apiPaths` is the Array which will be proxy/mock.
* `proxyServer` is the proxy server.
* `proxyOptions` is the proxy options (see [express-request-proxy](https://github.com/4front/express-request-proxy)).
* `mockEnable` is the mock switch.
* `mockDir` is the base directory of mock data.
* `mockResultResolver` is the handler of mock data.
* `throwMockError` is the switch of throw/proxy on mock error.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

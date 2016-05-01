# latest-push [![Build Status](https://travis-ci.org/SamVerschueren/latest-push.svg?branch=master)](https://travis-ci.org/SamVerschueren/latest-push)

> Get the latest push of a GitHub user.


## Install

```
$ npm install --save latest-push
```


## Usage

```js
const latestPush = require('latest-push');

latestPush('SamVerschueren', {token: 'foo'}).then(push => {
	//=> the latest push object
});
```


## API

### latestPush(user, [options])

Returns a promise for the latest push object.

#### user

Type: `string`

User to retrieve the latest commit for.

#### options

##### token

Type: `string`

GitHub [access token](https://github.com/settings/tokens/new).

Can be set globally with the `GITHUB_TOKEN` environment variable.

##### pages

Type: `Number`<br>
Default: `5`

Maximum number of pages to iterate over to retrieve the latest push.

##### exclude

Type: `Array`

Push IDs that should be skipped as result.


## License

MIT © [Sam Verschueren](http://github.com/SamVerschueren)

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

The user to retrieve the latest commit for.

#### options

##### token

Type: `string`

GitHub [access token](https://github.com/settings/tokens/new).

Can be overriden globally with the `GITHUB_TOKEN` environment variable.

##### pages

Type: `Number`  
Default: `5`

The maximum number of pages to iterate over to retrieve the latest push.


## License

MIT © [Sam Verschueren](http://github.com/SamVerschueren)

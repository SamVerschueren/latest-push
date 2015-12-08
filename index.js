'use strict';
var ghGot = require('gh-got');
var Promise = require('pinkie-promise');
var parse = require('github-parse-link');
var objectAssign = require('object-assign');

function fetch(user, opts, url, page) {
	page = page || 0;

	return ghGot(url || 'users/' + user + '/events', {token: opts.token})
		.then(function (res) {
			if (res.body.length === 0) {
				throw new Error('no contributions found for this user');
			}

			var pushEvents = res.body.filter(function (event) {
				return event.type === 'PushEvent' && opts.exclude.indexOf(event.id) === -1;
			});

			if (pushEvents.length === 0) {
				var links = parse(res.headers.link);

				if (page >= opts.pages || !links.next) {
					throw new Error('No contributions found for this user');
				}

				return fetch(user, opts, links.next.replace('https://api.github.com/', ''), page + 1);
			}

			return pushEvents[0];
		})
		.catch(function (err) {
			if (err.statusCode === 404) {
				throw new Error('No contributions found for this user');
			}

			throw err;
		});
}

module.exports = function (user, opts) {
	if (typeof user !== 'string') {
		return Promise.reject(new TypeError('Expected a user'));
	}

	opts = objectAssign({pages: 5, exclude: []}, opts);

	return fetch(user, opts);
};
